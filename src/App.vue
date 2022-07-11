<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import TheSidebar from '@/components/organisms/TheSidebar.vue';
import TheBody from '@/components/organisms/TheBody.vue';

interface SideBarToggle {
	collapsed: boolean;
	screenWidth: number;
}

export default defineComponent({
	components: {
		TheSidebar,
		TheBody,
	},
	data() {
		return {
			isSideBarCollapsed: false,
			screenWidth: 0,
			tes: '',
		};
	},

	methods: {
		onToggleSideBar(data: SideBarToggle) {
			this.isSideBarCollapsed = data.collapsed;
			this.screenWidth = data.screenWidth;
		},
	},
	computed: {
		currentView() {
			const namePath = useRoute().fullPath.split('/');
			const getModule = namePath[1];

			return getModule;
		},
	},
});
</script>

<template>
	<header>
		<!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

		<div class="wrapper"></div>
		<div v-show="currentView !== 'auth'">
			<TheSidebar @click-toggle="onToggleSideBar($event)" />
		</div>
	</header>

	<!-- <RouterView /> -->
	<TheBody :collapsed="isSideBarCollapsed" :screenWidth="screenWidth" />
</template>

<style>
@import '@/assets/main.css';
@import '@/assets/button.css';
@import '@/assets/card.css';
@import '@/assets/input.css';
@import '@/assets/picture.css';
/* @import '@/assets/base.css'; */
</style>
