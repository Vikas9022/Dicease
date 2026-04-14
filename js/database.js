// Browser Database for Prediction History using IndexedDB
class Database {
  constructor() {
    this.dbName = 'DiseasePredictDB';
    this.dbVersion = 1;
    this.db = null;
    this.init();
  }

  init() {
    const request = indexedDB.open(this.dbName, this.dbVersion);
    
    request.onerror = () => console.error('Database error:', request.error);
    
    request.onsuccess = () => {
      this.db = request.result;
      console.log('Database connected');
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Predictions store
      if (!db.objectStoreNames.contains('predictions')) {
        const predictionsStore = db.createObjectStore('predictions', { keyPath: 'id' });
        predictionsStore.createIndex('userId', 'userId', { unique: false });
        predictionsStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
      
      // Users store (from login/signup demo)
      if (!db.objectStoreNames.contains('users')) {
        const usersStore = db.createObjectStore('users', { keyPath: 'email' });
        usersStore.createIndex('phone', 'phone', { unique: true });
      }
    };
  }

  async savePrediction(record) {
    // Add user info if available
    record.userName = localStorage.getItem('userName') || 'Anonymous';
    record.email = localStorage.getItem('userEmail') || 'N/A';
    record.phone = localStorage.getItem('userPhone') || 'N/A';
    
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['predictions'], 'readwrite');
      const store = transaction.objectStore('predictions');
      const request = store.add(record);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getUserPredictions(userId) {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['predictions'], 'readonly');
      const store = transaction.objectStore('predictions');
      const index = store.index('userId');
      const request = index.getAll(userId);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async saveUser(user) {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.put(user);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getUser(email) {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const request = store.get(email);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Fallback to LocalStorage if IndexedDB unavailable
  static fallbackSave(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static fallbackGet(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }
}

// Global instance
const Database = new Database();
export default Database;
