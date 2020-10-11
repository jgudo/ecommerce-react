
import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);
let currentCacheNames: any = Object.assign({ precacheTemp: workbox.core.cacheNames.precache + "-temp" }, workbox.core.cacheNames);

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