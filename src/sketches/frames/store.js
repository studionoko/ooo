import { writable } from 'svelte/store'

export const frameCount = writable(0)
export const title = writable('bolle bolle')
export const date = writable('24. oktober 2021')

export const setFrameCount = count => {
  frameCount.set(count)
}