<template>
	<TheHeader title="Halaman Pengaturan" subtitle="Menampilkan halaman pengaturan" />
	<div style="height: 48px"></div>
	<div class="card card-profile">
		<div class="card-body">
			<div class="container">
				<div class="row">
					<div class="col-md-5 my-auto mx-auto">
						<div class="profile-div position-relative my-auto mx-auto">
							<a @click="handleEditImg()">
								<img
									:src="iconUserProfile"
									alt="Picture of the user"
									class="profile-img-b"
									width="300"
									height="300"
							/></a>
						</div>
					</div>
					<div class="col-md-7">
						<TheTabNav
							:tabs="['Ubah Profile', 'Ubah Password']"
							:selected="selectedTab"
							@selected="setSelected"
						>
							<TheTab :isSelected="selectedTab === 'Ubah Profile'">
								<div class="container container-profile">
									<FormProfile :payload="payload" />
								</div>
							</TheTab>
							<TheTab :isSelected="selectedTab === 'Ubah Password'">
								<div class="container container-password">
									<FormPassword :payload="payload" />
								</div>
							</TheTab>
						</TheTabNav>

						<div class="mt-2"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div style="height: 48px"></div>
	<ModalProfile
		v-if="modalProfile"
		:modalActive="modalProfile"
		:defaultPreview="iconUserProfile"
		:prefix="prefix"
		:suffix="suffix"
		:payload="payload"
		@closeModal="closeModal(suffix)"
	/>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import TheHeader from '@/components/atoms/TheHeader.vue';
import TheTabNav from '@/components/organisms/TheTabNav.vue';
import TheTab from '@/components/organisms/TheTab.vue';
import ModalProfile from '@/components/molecules/ModalProfile.vue';
import FormProfile from '@/components/molecules/FormProfile.vue';
import FormPassword from '@/components/molecules/FormPassword.vue';
import type { JWTPayloadTypes, UserPayloadTypes } from '@/services/Data-types';
import { getDataUser } from '@/services/user';

const IMG_PATH = '/src/assets';
const IMAGE_API_URL = import.meta.env.VITE_APP_IMAGE_API;

export default defineComponent({
	components: { TheHeader, TheTabNav, TheTab, ModalProfile, FormProfile, FormPassword },
	props: {
		isSelected: { type: Boolean },
	},
	setup() {
		const modalProfile = ref(false);
		const modalHapus = ref(false);

		return { modalProfile, modalHapus };
	},
	mounted() {
		const token = Cookies.get('token');
		if (token) {
			const jwtToken = atob(token);
			const payload: JWTPayloadTypes = jwtDecode(jwtToken);
			const userFromPayload: UserPayloadTypes = payload.user;

			this.getUser(userFromPayload);
			this.userFromPayload = userFromPayload;
		}
	},
	data() {
		return {
			iconUserProfile: `${IMG_PATH}/img/default.jpg`,
			selectedTab: 'Ubah Profile',
			prefix: '',
			suffix: 'Profile',
			payload: {},
			userFromPayload: {},
		};
	},
	methods: {
		async getUser(user: any) {
			const response = (await getDataUser(user.id)) as any;
			const data = response.data.data;

			const { foto } = data;
			this.iconUserProfile = `${IMAGE_API_URL}/user/${foto}`;
			this.payload = data;
		},
		setSelected(tab: any) {
			this.selectedTab = tab;
		},
		handleEditImg() {
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalProfile = !this.modalProfile;
			this.prefix = 'Ubah';

			this.modalProfile ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		closeModal(suffix: string) {
			if (suffix === 'Profile') {
				this.modalProfile = false;
			}
			this.modalHapus = false;
			this.getUser(this.userFromPayload);
		},
	},
});
</script>

<style>
.card-profile {
	margin: 24px 32px 0px 0px;
	color: #1d1b31;
	padding: 12px;
	border: 0;
	border-radius: 0.5rem;
	background: #f2f2f2;
	box-shadow: -5px 5px 10px rgba(176, 176, 176, 0.2), 5px -5px 10px rgba(176, 176, 176, 0.2),
		-5px -5px 10px rgba(216, 216, 216, 0.9), 5px 5px 13px rgba(176, 176, 176, 0.9),
		inset 1px 1px 2px rgba(216, 216, 216, 0.3), inset -1px -1px 2px rgba(176, 176, 176, 0.5);
}

.container-profile {
	padding: 3rem;
	background: #fafafa;
	box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(217, 217, 217, 0.5),
		inset -5px 5px 10px rgba(217, 217, 217, 0.2), inset 5px -5px 10px rgba(217, 217, 217, 0.2),
		inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px 5px 13px rgba(217, 217, 217, 0.9);
}

.container-password {
	padding: 3rem 3rem 3.1rem;
	background: #fafafa;
	box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(217, 217, 217, 0.5),
		inset -5px 5px 10px rgba(217, 217, 217, 0.2), inset 5px -5px 10px rgba(217, 217, 217, 0.2),
		inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px 5px 13px rgba(217, 217, 217, 0.9);
}

.profile-img-b {
	object-fit: cover;
	border-radius: 1.5rem;
	border: 2px solid #2b2467;
	padding: 8px;
}
</style>
