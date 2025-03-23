const CACH_KEY = "cache-v7";

const initCache = async () => {
  const cache = await caches.open(CACH_KEY);
  await cache.addAll([
    "/",
  //  "/miner-report/index.html",
  ]);
};

const tryNetwork = (req, timeout) => {

  return new Promise((resolve, reject) => {

    const timeoutId = setTimeout(reject, timeout);

    fetch(req).then((res) => {
      clearTimeout(timeoutId);
      const responseClone = res.clone();

      caches.open(CACH_KEY).then((cache) => {
        cache.put(req, responseClone);
      });
      resolve(res);

      //Reject is request reject
    }, reject);
  });
};

const getFromCache = (req) => {

  caches.open(CACH_KEY).then((cache) => {
    console.log(caches.keys(), 667, req);
    return cache.match(req).then((result) => {
      console.log(result);
      return result || Promise.reject("no-match");
    })
  })
};

self.addEventListener('install', (e) => {
  console.log('Service worker install event!');
  e.waitUntil(initCache());
});

// Be sure to call self.clients.claim()
self.addEventListener('activate', function  (e) {

  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACH_KEY) {
            return;// caches.delete(key);
          }
        })
      ).then(() => self.clients.claim())
    })
  )
});

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACH_KEY);
  await cache.addAll(resources);
};

self.addEventListener('fetch', (e) => {
  console.log('Fetch intercepted for:', e.request.url)
  e.respondWith(tryNetwork(e.request, 400).catch(() => getFromCache(e.request)));
})


self.addEventListener('message', function(e) {
  console.log(e.data);
}, false);


// self.addEventListener('message', function (e) {
//   var data = e.data;
//
//   switch (data.cmd) {
//     case 'average':
//       var result = calculateAverage(data); // Функция, вычисляющая среднее значение числового массива
//       self.postMessage(result);
//       break;
//     default:
//       self.postMessage('Unknown command');
//   }
// }, false);
//
//
// function createDB() {
//
//   idb.open('products', 1, function (upgradeDB) {
//     var store = upgradeDB.createObjectStore('beverages', {
//       keyPath: 'id',
//     });
//
//     store.put({id: 123, name: 'coke', price: 10.99, quantity: 200})
//     store.put({id: 321, name: 'pepsi', price: 8.99, quantity: 100})
//     store.put({id: 222, name: 'water', price: 11.99, quantity: 300})
//   });
// }
//
// function readDB() {
//   idb
//     .open('products', 1)
//     .then(function (db) {
//       var tx = db.transaction(['beverages'], 'readonly')
//       var store = tx.objectStore('beverages')
//       return store.getAll()
//     })
//     .then(function (items) {
//       // Use beverage data
//     })
// }


const calculateAverage = () => {
  return 123;
}