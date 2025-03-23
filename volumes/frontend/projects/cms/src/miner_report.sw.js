const CACH_KEY = "cache-v3";

self.addEventListener('install', (e) => {
    console.log('Service worker install event!' + CACH_KEY);
    e.waitUntil(initCache());
});

const initCache = async () => {
    const cache = await caches.open(CACH_KEY);
    await cache.addAll([
        "/",
          "/workbook/miner-reports/feed",
          "/workbook/miner-reports/add",
    ]);
};

self.addEventListener('fetch', async (e) => {

    console.log('Fetch intercepted for:', e.request.url);

    let response = tryNetwork(e.request, 200).catch((e) => getFromCache(e.request));
    return e.respondWith(response);
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

                resolve(response);
            }, reject);
            // .catch(err => {
            //     console.log('red');
            //     reject(err);
            // });
        // if (!response || response.status !== 200 || response.type !== 'basic') {
        //     console.log('REJE2');
        //     reject("no-match")
        // }

    });
};

const getFromCache = async (request) => {

    // const cache = await caches.open(CACH_KEY);
    // console.log('TRY');
    // return cache.match(request);

    return caches.open(CACH_KEY).then((cache) => {
        return cache.match(request).then((result) => {
            return result || Promise.reject("no-match");
        }).catch(() =>
            caches.match('/')
        );
    });


    //  return cachedResponse;

    // return cachedResponse;
    //
    // let response = await fetch(event.request);
    //
    // if (!response || response.status !== 200 || response.type !== 'basic') {
    //     return response;
    // }
    //
    // response = cache.match(req);

    // if (ENABLE_DYNAMIC_CACHING) {
    const responseToCache = response.clone();
    //const cache = await caches.open(CACH_KEY)
    await cache.put(req, response.clone());
    // }

    return response;

    // return cache.match(req).then((result) => {
    //     console.log(44, result);
    //     return result || Promise.reject("no-match");
    // })
    //})
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

// const addResourcesToCache = async (resources) => {
//     const cache = await caches.open(CACH_KEY);
//     await cache.addAll(resources);
// };

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