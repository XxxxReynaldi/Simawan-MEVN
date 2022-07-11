<template>
	<div class="modal-header">
		<h4 class="modal-title">{{ prefix }} {{ suffix }}</h4>
		<button
			type="button"
			class="btn-close"
			data-dismiss="modal"
			aria-label="Close"
			@click="close"
		></button>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		prefix: { type: String, default: '' },
		suffix: { type: String, default: '' },
	},
	emits: ['close'],
	setup(props, { emit }) {
		const close = () => {
			emit('close');
		};

		return { close };
	},
});
</script>
