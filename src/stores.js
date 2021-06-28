import { writable } from 'svelte/store'

export const activeNodeID = writable()

export const network = writable()

export const stabilized = writable(false)
