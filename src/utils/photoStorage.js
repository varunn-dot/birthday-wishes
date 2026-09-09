// Native IndexedDB helper for persistent client-side photo storage

const DB_NAME = 'RamyaBirthdayDB';
const DB_VERSION = 1;
const STORE_NAME = 'photos';
const KEY_NAME = 'favorite_memory';

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

export async function savePhoto(dataUrl) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, KEY_NAME);

      req.onsuccess = () => resolve(true);
      req.onerror = (err) => reject(err);
    });
  } catch (e) {
    console.error('IndexedDB save failed:', e);
    return false;
  }
}

export async function getPhoto() {
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
    console.error('IndexedDB get failed:', e);
    return null;
  }
}

export async function deletePhoto() {
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
    console.error('IndexedDB delete failed:', e);
    return false;
  }
}
