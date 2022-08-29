import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import {socketPlugin} from './server/socket'
import path from 'path'

const config: UserConfig = {
	plugins: [sveltekit(), socketPlugin],
	resolve:{
		alias: {
			"$server": path.resolve('./server')
		}
	}
};

export default config;
