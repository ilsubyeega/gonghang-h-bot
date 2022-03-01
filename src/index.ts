import { handleRequest } from './handler'
import { handleScheduled } from './handler'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
addEventListener("scheduled", event => {
  console.log("scheduled")
  event.waitUntil(handleScheduled(event))
})