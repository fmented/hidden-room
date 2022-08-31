import {writable} from 'svelte/store'

export const userId = writable<string>();
export const userAlias = writable<string>();
export const room = writable<string>('');
