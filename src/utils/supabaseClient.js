import { createClient } from '@supabase/supabase-js';
import { getRamyaPhotoBlob, saveRamyaPhotoBlob } from './indexedDBStorage';

// Environment variables or fallback defaults for public client
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Read global birthday config from cloud database or local user upload store
export async function getCloudBirthdayConfig() {
  try {
    // 1. Try reading from Supabase Cloud DB
    const { data, error } = await supabase
      .from('birthday_config')
      .select('*')
      .eq('birthday_name', 'Ramya')
      .single();

    if (!error && data && data.photo_url) {
      return data;
    }

    // 2. Try reading stored user upload from IndexedDB
    const storedBlob = await getRamyaPhotoBlob();
    if (storedBlob) {
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(storedBlob);
      });
      return {
        birthday_name: 'Ramya',
        photo_url: dataUrl,
        updated_at: Date.now()
      };
    }

    // 3. No photo uploaded yet -> return null
    return {
      birthday_name: 'Ramya',
      photo_url: null,
      updated_at: Date.now()
    };
  } catch (e) {
    // Fallback check IndexedDB
    const storedBlob = await getRamyaPhotoBlob();
    if (storedBlob) {
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(storedBlob);
      });
      return {
        birthday_name: 'Ramya',
        photo_url: dataUrl,
        updated_at: Date.now()
      };
    }

    return {
      birthday_name: 'Ramya',
      photo_url: null,
      updated_at: Date.now()
    };
  }
}

// Upload photo to Supabase Storage bucket 'birthday-assets' and save exact file
export async function uploadCloudRamyaPhoto(file) {
  try {
    // Save to IndexedDB locally for instant local availability
    await saveRamyaPhotoBlob(file);

    const filePath = `ramya/birthday-photo-${Date.now()}.jpg`;

    // 1. Try uploading to Supabase Storage Bucket 'birthday-assets'
    const { error: uploadError } = await supabase.storage
      .from('birthday-assets')
      .upload(filePath, file, { upsert: true });

    let finalPhotoUrl = null;

    if (!uploadError) {
      const { data: urlData } = supabase.storage
        .from('birthday-assets')
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        finalPhotoUrl = urlData.publicUrl;
      }
    }

    if (!finalPhotoUrl) {
      // Read exact file as Data URL
      finalPhotoUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    }

    const timestamp = Date.now();
    const versionedUrl = finalPhotoUrl.startsWith('data:') ? finalPhotoUrl : `${finalPhotoUrl}?v=${timestamp}`;

    // 2. Update cloud database table 'birthday_config'
    try {
      await supabase
        .from('birthday_config')
        .upsert({
          birthday_name: 'Ramya',
          photo_url: versionedUrl,
          updated_at: timestamp
        });
    } catch (e) {}

    // Persist in local storage cache
    localStorage.setItem('gb_ramya_cloud_photo_url', versionedUrl);

    return versionedUrl;
  } catch (e) {
    console.error('Photo upload error:', e);
    // Read exact file as Data URL fallback
    const dataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
    localStorage.setItem('gb_ramya_cloud_photo_url', dataUrl);
    return dataUrl;
  }
}
