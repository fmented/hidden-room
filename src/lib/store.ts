import { dev } from '$app/environment';
import {writable, derived} from 'svelte/store'
import {page} from '$app/stores'

export const userId = writable<string>();
export const userAlias = writable<string>();
export const room = writable<string>('');
export const hostname = derived(page, $page =>{
    return dev
        ? 'http://localhost:5173' 
        : `http://${$page.url.hostname}`
})