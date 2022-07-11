/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_APP_ROOT_API: string = 'http://localhost:4000';
	readonly VITE_APP_IMAGE_API: string = 'http://localhost:4000/images';
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
