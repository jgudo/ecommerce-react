import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { cacheNames } from 'workbox-core';

precacheAndRoute(self.__WB_MANIFEST);
let currentCacheNames = Object.assign({ precacheTemp: cacheNames.precache + "-temp" }, cacheNames);

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
self.addEventListener("activate", function (event) {
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