<template>
	<div v-if="currentView == 'auth'">
		<div class="body-auth">
			<RouterView />
		</div>
	</div>
	<div v-else>
		<div :class="`body ${getBodyClass()}`">
			<RouterView />
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
	props: {
		collapsed: { type: Boolean, default: false },
		screenWidth: { type: Number, default: 0 },
	},
	methods: {
		getBodyClass() {
			let stylesClass = '';
			if (this.collapsed && this.screenWidth > 768) {
				stylesClass = 'body-trimmed';
			} else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
				stylesClass = 'body-md-screen';
			}
			return stylesClass;
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

<style>
.body {
	width: calc(100% - 250px);
	position: relative;
	z-index: 0;
	top: 0;
	left: 250px;
	height: 100vh;
	transition: all 0.5s ease;
	background: #e4e9f7;
	padding-left: 32px;
}

.body-trimmed {
	width: 100%;
	left: 72px;
}

.body-md-screen {
	width: 100%;
	left: 72px;
}

.body-auth {
	left: 0px;
}
</style>
