<template>
	<div :class="`sidebar ${isCollapsed ? '' : 'open'}`">
		<div class="logo-details">
			<i class="bx bxl-c-plus-plus icon-logo"></i>
			<div class="logo_name">MEVN</div>
			<i class="bx bx-menu" id="btn-toggle" @click="toggleCollapse"></i>
		</div>
		<ul class="nav-list">
			<RouterLink
				v-for="item in menuItems"
				:key="item.label"
				:to="item.routeLink"
				v-slot="{ isActive, isExactActive }"
			>
				<li :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
					<div class="icon">
						<img :src="item.icon" alt="icon menu" />
					</div>
					<span class="links_name"> {{ item.label }} </span>
				</li>
			</RouterLink>

			<li class="profile">
				<div class="profile-details">
					<img class="profile-img" :src="iconUserProfile" alt="profileImg" />
					<div class="name_job">
						<div class="name">{{ dataUser.namaLengkap }}</div>
						<div class="job">{{ dataUser.role }}</div>
					</div>
				</div>
				<a @click.prevent="onLogout" style="cursor: pointer">
					<i class="bx bx-log-out" id="log_out"></i>
				</a>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import type { JWTPayloadTypes, UserPayloadTypes } from '@/services/Data-types';
import { getDataUser } from '@/services/user';

const IMG_PATH = '/src/assets';
const IMAGE_API_URL = import.meta.env.VITE_APP_IMAGE_API;

export default defineComponent({
	mounted() {
		this.screenWidth = window.innerWidth;
		const token = Cookies.get('token');
		if (token) {
			const jwtToken = atob(token);
			const payload: JWTPayloadTypes = jwtDecode(jwtToken);
			const userFromPayload: UserPayloadTypes = payload.user;
			this.isLogin = true;

			this.getUser(userFromPayload);
		}
	},
	data() {
		return {
			isLogin: false,
			dataUser: { namaLengkap: '', role: '', foto: 'default.jpg' },
			iconUserProfile: `${IMG_PATH}/img/default.jpg`,
			isCollapsed: false,
			screenWidth: 0,
			menuItems: [
				{
					routeLink: '/admin/siswa',
					icon: `${IMG_PATH}/icons/users.svg`,
					label: 'Siswa',
				},
				{
					routeLink: '/admin/pelanggaran',
					icon: `${IMG_PATH}/icons/warning-list.svg`,
					label: 'Pelanggaran',
				},
				{
					routeLink: '/admin/kelas',
					icon: `${IMG_PATH}/icons/class.svg`,
					label: 'Kelas',
				},
				{
					routeLink: '/admin/jurusan',
					icon: `${IMG_PATH}/icons/study-program.svg`,
					label: 'Jurusan',
				},
				{
					routeLink: '/admin/pengaturan',
					icon: `${IMG_PATH}/icons/setting.svg`,
					label: 'Pengaturan',
				},
			],
		};
	},
	emits: ['click-toggle'],
	methods: {
		toggleCollapse(): void {
			this.isCollapsed = !this.isCollapsed;
			this.$emit('click-toggle', { collapsed: this.isCollapsed, screenWidth: this.screenWidth });
		},
		async getUser(payload: any) {
			const response = (await getDataUser(payload.id)) as any;
			const data = response.data.data;
			const { namaLengkap, role, foto } = data;
			this.dataUser = { ...this.dataUser, namaLengkap, role, foto };
			this.iconUserProfile = `${IMAGE_API_URL}/user/${foto}`;
		},
		onLogout(): void {
			Cookies.remove('token');
			this.$router.push('/');
			this.isLogin = false;
		},
	},
});
</script>

<style></style>
