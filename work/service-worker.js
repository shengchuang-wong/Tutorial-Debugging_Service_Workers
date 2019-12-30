// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const CACHE_NAME = 'my-site-cache-v1'
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/smiley.svg'
]

self.addEventListener('install', function(event) {
  console.log('A *new* Service Worker is installing.')

  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
      }).catch(e => {
        console.log(e)
      })
  )
})

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!')  
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
      })
  )
})

self.addEventListener('push', function(event) {
  const title = 'Yay a message'
  const body = 'We have received a push message.'
  const icon = '/images/smiley.svg'
  const tag = 'simple-push-example-tag'

  event.waitUntil(
    self.registration.showNotification(title, {
      body, icon, tag
    })
  )
})