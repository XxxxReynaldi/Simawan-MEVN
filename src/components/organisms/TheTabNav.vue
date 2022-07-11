<template>
	<div style="30%">
		<ul class="mb-4 nav justify-content-end nav nav-tabs">
			<li v-for="(tab, index) in tabs" :key="index" class="nav-item">
				<a
					class="nav-link"
					style="cursor: pointer"
					:class="{ active: tab === selected }"
					@click="setTab(tab)"
				>
					{{ tab }}
				</a>
			</li>
		</ul>
		<slot></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		tabs: { type: Array, required: true },
		selected: { type: String, required: true },
	},
	methods: {
		setTab(tab: any) {
			this.$emit('selected', tab);
		},
	},
});
</script>
<style></style>
