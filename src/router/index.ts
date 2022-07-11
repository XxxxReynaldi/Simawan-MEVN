import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';

import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/auth/login',
			// name: 'home',
			// component: HomeView,
		},
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (About.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import('../views/AboutView.vue'),
		// 	meta: { requiresAuth: true },
		// },
		{
			path: '/auth/login',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/auth/register',
			name: 'register',
			component: RegisterView,
		},
		{
			path: '/admin/kelas',
			name: 'kelas',
			component: () => import('../views/admin/KelasView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/admin/jurusan',
			name: 'jurusan',
			component: () => import('../views/admin/JurusanView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/admin/pelanggaran',
			name: 'pelanggaran',
			component: () => import('../views/admin/PelanggaranView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/admin/pengaturan',
			name: 'pengaturan',
			component: () => import('../views/admin/PengaturanView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/admin/siswa',
			name: 'siswa',
			component: () => import('../views/admin/siswa/SiswaView.vue'),
		},
		{
			path: '/admin/siswa/validasi',
			name: 'validasi',
			component: () => import('../views/admin/siswa/ValidasiView.vue'),
			meta: { requiresAuth: true },
		},
	],
	linkActiveClass: 'active',
	linkExactActiveClass: 'exact-active',
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		const token = Cookies.get('token');
		if (token) {
			next();
		}
		next('/auth/login');
	} else {
		next();
	}
});

export default router;
