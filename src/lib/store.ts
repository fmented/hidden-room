import {writable} from 'svelte/store'

export const userId = writable<string>();
export const userAlias = writable<string>();
export const room = writable<string>('');
export const objURL = writable<Map<File, string>>(new Map())
