// src/utils/LocalStorage.jsx

/**
 * Utility functions for interacting with localStorage.
 * Encapsulates JSON parsing and stringifying to simplify data storage.
 */

const LocalStorage = {
  /**
   * Retrieves an item from localStorage and parses it as JSON.
   * @param {string} key - The key of the item to retrieve.
   * @returns {any | null} The parsed value, or null if the item doesn't exist or is invalid JSON.
   */
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error retrieving or parsing item from localStorage for key "${key}":`, error);
      localStorage.removeItem(key); // Remove corrupted item
      return null;
    }
  },

  /**
   * Stores an item in localStorage after stringifying it to JSON.
   * @param {string} key - The key under which to store the item.
   * @param {any} value - The value to store.
   */
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing item in localStorage for key "${key}":`, error);
    }
  },

  /**
   * Removes an item from localStorage.
   * @param {string} key - The key of the item to remove.
   */
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage for key "${key}":`, error);
    }
  },

  /**
   * Clears all items from localStorage for the current origin.
   */
  clear: () => {
    try {
      localStorage.clear();
      console.log("All items cleared from localStorage.");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

export default LocalStorage;
