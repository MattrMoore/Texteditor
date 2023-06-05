// Import 'openDB' from 'idb' library
import { openDB } from 'idb';

// Initialize the database
const initdb = async () => openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      }
    },
});

// Function to add content to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  return await store.put({value: content});
};

// Function to get all content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const result = await store.getAll();
  return result.value;
};

initdb();
