const CACH_KEY = "cache-v5";

self.addEventListener('install', (e) => {
    //console.log('Service worker install event!' + CACH_KEY);
    e.waitUntil(initCache());
});

const initCache = async () => {
    const cache = await caches.open(CACH_KEY);
    await cache.addAll([
       // "/",
       //   "/workbook/miner-reports/feed",
         "/workbook/miner-reports/add",
    ]);
};

self.addEventListener('fetch', async (e) => {
   // console.log('Fetch intercepted for:', e.request.url, e.request, e);
    console.log(e.request.method);
    if (e.request.method === "GET") {
        let response = tryNetwork(e.request, 400)
            .catch((eror) => {
                return getFromCache(e.request);
            });
        return e.respondWith(response);
    }
});

const tryNetwork = (req, timeout) => {

    return new Promise(async (resolve, reject) => {

        const timeoutId = setTimeout(reject, timeout);

        fetch(req).then(
            async (response) => {
                clearTimeout(timeoutId);

                if (req.method === "GET") {
                    let cache = await caches.open(CACH_KEY);
                    await cache.put(req, response.clone());
                }

                if (!response || response.status !== 200 || response.type !== 'basic') {
                    reject("no-match")
                }

                resolve(response);

            }, reject);
    });
};

const getFromCache = async (request) => {

    return caches.open(CACH_KEY).then((cache) => {
        return cache.match(request).then((result) => {
            return result || Promise.reject("no-match");
        }).catch(() =>
            caches.match('/')
        );
    });
};


// Be sure to call self.clients.claim()
self.addEventListener('activate', function (e) {

    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACH_KEY) {
                        //caches.delete(key);
                    }
                })
            ).then(() => self.clients.claim())
        })
    )
});

self.addEventListener('message', function (e) {
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