import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { saveRamyaPhotoBlob, getRamyaPhotoBlob, deleteRamyaPhotoBlob } from '../utils/indexedDBStorage';
import { sounds } from '../utils/soundEffects';
import { launchBurst } from '../utils/confetti';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const photoUrlRef = useRef(null);

  // Helper to revoke old object URLs safely to prevent memory leaks
  const updateDisplayUrl = (newBlob) => {
    if (photoUrlRef.current) {
      URL.revokeObjectURL(photoUrlRef.current);
      photoUrlRef.current = null;
    }

    if (newBlob) {
      const url = URL.createObjectURL(newBlob);
      photoUrlRef.current = url;
      setPhoto(url);
    } else {
      setPhoto(null);
    }
  };

  // Initialize and load saved photo from IndexedDB on startup
  useEffect(() => {
    async function initPhotoStore() {
      setIsLoading(true);
      try {
        const savedBlob = await getRamyaPhotoBlob();
        if (savedBlob) {
          updateDisplayUrl(savedBlob);
        }
      } catch (e) {
        console.error('Photo init failed:', e);
      } finally {
        setIsLoading(false);
      }
    }

    initPhotoStore();

    return () => {
      if (photoUrlRef.current) {
        URL.revokeObjectURL(photoUrlRef.current);
      }
    };
  }, []);

  // Upload or Change Photo Handler
  const uploadPhoto = async (file) => {
    setErrorMsg('');
    if (!file) return false;

    // File Type Check
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please choose a valid image. 📷');
      sounds.playRumble();
      return false;
    }

    // File Size Check (<10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Please choose a photo under 10 MB. 💕');
      sounds.playRumble();
      return false;
    }

    try {
      // Save Blob into IndexedDB
      const success = await saveRamyaPhotoBlob(file);
      if (success) {
        updateDisplayUrl(file);
        sounds.playSuccess();
        launchBurst();
        return true;
      }
    } catch (e) {
      setErrorMsg('Failed to save photo locally.');
    }
    return false;
  };

  // Alias for changePhoto
  const changePhoto = async (file) => {
    return await uploadPhoto(file);
  };

  // Explicit User Removal Handler
  const removePhoto = async () => {
    setErrorMsg('');
    try {
      await deleteRamyaPhotoBlob();
      updateDisplayUrl(null);
      sounds.playClick();
    } catch (e) {
      console.error('Remove photo failed:', e);
    }
  };

  return (
    <PhotoContext.Provider
      value={{
        photo,
        isLoading,
        errorMsg,
        setErrorMsg,
        uploadPhoto,
        changePhoto,
        removePhoto
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const useBirthdayPhoto = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('useBirthdayPhoto must be used within a PhotoProvider');
  }
  return context;
};
