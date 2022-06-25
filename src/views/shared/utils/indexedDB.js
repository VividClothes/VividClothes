// 로그인 쿼리
export const loginQuery = (hashedEmail) => {
    const onRequest = indexedDB.open(hashedEmail, 1);

    onRequest.onsuccess = () => {
      //alert('indexedDB onsuccess');
    };

    onRequest.onupgradeneeded = (e) => {
      //alert('indexedDB onupgradeneeded');
      const db = onRequest.result;
      db.createObjectStore('order', { keyPath: 'shortId' });
      db.createObjectStore('cart', { keyPath: 'shortId' });
    };

    onRequest.onerror = () => {
      //alert('Error creating or accessing db')
    };
}