// Permanent IndexedDB helper for Ramya's Birthday Photo Blob storage

const DB_NAME = 'birthdayWebsiteDB';
const DB_VERSION = 1;
const STORE_NAME = 'photos';
const KEY_NAME = 'ramyaBirthdayPhoto';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function saveRamyaPhotoBlob(blob) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(blob, KEY_NAME);

      req.onsuccess = () => resolve(true);
      req.onerror = (err) => reject(err);
    });
  } catch (e) {
    console.error('IndexedDB save photo failed:', e);
    return false;
  }
}

export async function getRamyaPhotoBlob() {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_NAME);

      req.onsuccess = (event) => resolve(event.target.result || null);
      req.onerror = (err) => reject(err);
    });
  } catch (e) {
    console.error('IndexedDB get photo failed:', e);
    return null;
  }
}

export async function deleteRamyaPhotoBlob() {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY_NAME);

      req.onsuccess = () => resolve(true);
      req.onerror = (err) => reject(err);
    });
  } catch (e) {
    console.error('IndexedDB delete photo failed:', e);
    return false;
  }
}
