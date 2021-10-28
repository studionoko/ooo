import { writable } from 'svelte/store'

export const frameCount = writable(0)
export const title = writable('')
export const date = writable('')

export const setFrameCount = count => {
  frameCount.set(count)
}