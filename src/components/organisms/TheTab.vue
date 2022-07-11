<template>
	<div v-if="isSelected">
		<slot></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		isSelected: { type: Boolean },
	},
});
</script>
