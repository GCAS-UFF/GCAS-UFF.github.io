'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "65f85cfadbfe22cb374c30b4edceb71b",
"index.html": "1db6d4b8279277d152736fe1175b6f7e",
"/": "1db6d4b8279277d152736fe1175b6f7e",
"main.dart.js": "6a2b1166eed91bd929aff203414ba7fa",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "2fc4d0db5631ba794c7d35ae8c4c4310",
"assets/AssetManifest.json": "2b33ba059b3d32eb949f1cb14e1b8ea1",
"assets/NOTICES": "6d9bde769c180957eae18dfacdcb5e2a",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/localization/test/assets/lang2/en_US.json": "b389499c34b7ee2ec98c62fe49e08fa0",
"assets/packages/localization/test/assets/lang2/pt_BR.json": "08e9b784a138126822761beec7614524",
"assets/packages/localization/test/assets/lang/en_US.json": "18804652fbce3b62aacb6cce6f572f3c",
"assets/packages/localization/test/assets/lang/pt_BR.json": "f999b93065fe17d355d1ac5dcc1ff830",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/lib/shared/ui/menu_card/i18n/it_IT.json": "9e8b40328c5561af85c78e2c3795d47c",
"assets/lib/shared/ui/menu_card/i18n/en_US.json": "a04349929d0570a41cbe68c7f98a8b54",
"assets/lib/shared/ui/menu_card/i18n/pt_BR.json": "ef9034ca34e37a9bc0e890eb1a1c6787",
"assets/lib/shared/ui/meal_item_card/i18n/it_IT.json": "5602b7e1bd398865f1cfaa0a3f8c0126",
"assets/lib/shared/ui/meal_item_card/i18n/en_US.json": "d3e9202c2bd982f9f1364691fee5989c",
"assets/lib/shared/ui/meal_item_card/i18n/pt_BR.json": "2b9adf76c0ef568f14ed7c3698b6cb0d",
"assets/lib/modules/admin/submodules/meal_item/presenter/i18n/it_IT.json": "0103e0577e23af201508d0efc3bad028",
"assets/lib/modules/admin/submodules/meal_item/presenter/i18n/en_US.json": "1098a05da89bdc2f045e832612784dd7",
"assets/lib/modules/admin/submodules/meal_item/presenter/i18n/pt_BR.json": "daee8c83ecbe4e0542c71799a0bf7cb2",
"assets/lib/modules/admin/submodules/menu/presenter/i18n/it_IT.json": "f7c5be2a6086f02b36ab4bafbbb36390",
"assets/lib/modules/admin/submodules/menu/presenter/i18n/en_US.json": "c47ffc3040ddfae82a644325e0f19889",
"assets/lib/modules/admin/submodules/menu/presenter/i18n/pt_BR.json": "242a9cbc96bb9e4eab05723a175fab51",
"assets/lib/modules/admin/submodules/meal/presenter/i18n/it_IT.json": "585b524f3302ea5bf3bfd0959d0fb437",
"assets/lib/modules/admin/submodules/meal/presenter/i18n/en_US.json": "062df24c281b5e7221af38b53b340809",
"assets/lib/modules/admin/submodules/meal/presenter/i18n/pt_BR.json": "5b73a3c2b7f5faddee2496011b4d9dc1",
"assets/lib/modules/admin/i18n/it_IT.json": "94ab2ee1319249418332b0e0d161ab01",
"assets/lib/modules/admin/i18n/en_US.json": "a7da2438f7693b0c1e962fa593f96ebb",
"assets/lib/modules/admin/i18n/pt_BR.json": "73612806984a4ba25daad2caaa40de0c",
"assets/AssetManifest.bin": "6b3bbac33edc7945a27bf4f3921452e9",
"assets/fonts/MaterialIcons-Regular.otf": "fed9f0bdfa8cd54de682d26718cf23b8",
"assets/assets/images/green_logo.png": "99493da405d57f21308f1e1d9cd33dd5",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
