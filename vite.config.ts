import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Dotenv from 'dotenv-webpack';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	// base:
	// 	process.env.VUE_APP_ROOT_API === 'development'
	// 		? 'http://localhost:4000'
	// 		: 'http://localhost:4001',
});
