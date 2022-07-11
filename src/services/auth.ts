import { callAuthAPI } from '../config/api';
import type { LoginTypes, RegisterTypes } from './Data-types';

const ROOT_API = import.meta.env.VITE_APP_ROOT_API;
const API_VERSION = `api/v1`;

export async function setSignUp(data: RegisterTypes) {
	const url = `${ROOT_API}/${API_VERSION}/auth/signup`;

	return callAuthAPI({ url, method: 'POST', data });
}

export async function setSignIn(data: LoginTypes) {
	const url = `${ROOT_API}/${API_VERSION}/auth/signin`;

	return callAuthAPI({ url, method: 'POST', data });
}
