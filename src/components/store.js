import { writable } from 'svelte/store'

export const activeMenuItems = writable([
  true, true, true, true,
])

export const resetMenuItems = () => {
  activeMenuItems.set([true, true, false, false])
}