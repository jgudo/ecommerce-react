
import { precacheAndRoute } from 'workbox-precaching';
<<<<<<< HEAD:src/sw-src.ts
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
import { cacheNames } from 'workbox-core';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);
let currentCacheNames: any = Object.assign({ precacheTemp: cacheNames.precache + "-temp" }, cacheNames);
=======
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { cacheNames } from 'workbox-core';

precacheAndRoute(self.__WB_MANIFEST);
let currentCacheNames = Object.assign({ precacheTemp: cacheNames.precache + "-temp" }, cacheNames);
>>>>>>> 8577603228250acd4278f07b4a77199e7a391d5f:src/sw-src.js

currentCacheNames.fonts = "googlefonts";
registerRoute(
	/https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
	new CacheFirst({
		cacheName: currentCacheNames.fonts,
		plugins: [new ExpirationPlugin({ maxEntries: 30 })]
	}),
	"GET"
);

// clean up old SW caches
self.addEventListener("activate", function (event: any) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			let validCacheSet = new Set(Object.values(currentCacheNames));
			return Promise.all(
				cacheNames
					.filter(function (cacheName) {
						return !validCacheSet.has(cacheName);
					})
					.map(function (cacheName) {
						console.log("deleting cache", cacheName);
						return caches.delete(cacheName);
					})
			);
		})
	);
});