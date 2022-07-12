/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_APP_ROOT_API: string = 'https://simawan-app.herokuapp.com';
	readonly VITE_APP_IMAGE_API: string = 'https://simawan-app.herokuapp.com/images';
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
