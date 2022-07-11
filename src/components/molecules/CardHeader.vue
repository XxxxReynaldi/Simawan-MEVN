<template>
	<div class="card card-header">
		<div class="card-body">
			<div class="container">
				<div class="row">
					<div class="my-auto col-md-1" style="padding: 0">
						<button
							type="button"
							class="btn btn-primary btn-lg"
							style="border-radius: 50%"
							@click="addClicked()"
						>
							<i class="fas fa-plus" style="font-size: 1.8rem"></i>
						</button>
					</div>
					<div class="col-md-11" style="border-left: 2px solid rgb(239, 239, 239)">
						<div class="card-title h5">{{ title }} : {{ countNum }}</div>
						<p class="card-text" style="font-size: 12px">
							{{ subtitle }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		title: { type: String, default: '' },
		countNum: { type: Number, default: 0 },
		subtitle: { type: String, default: '' },
	},
	data() {
		// console.log('collapsed', this.collapsed);
	},
	methods: {
		addClicked() {
			this.$emit('add-click');
		},
	},
	emits: ['add-click'],
});
</script>
<style>
.btn-primary {
	box-shadow: -2px -2px 8px rgb(255 255 255 / 10%), -2px -2px 12px rgb(255 255 255 / 20%),
		inset 2px 2px 4px rgb(255 255 255 / 10%), 2px 2px 8px rgb(0 0 0);
}

.btn-primary:hover {
	color: #fff;
	box-shadow: 1px 1px 2px rgba(82, 104, 255, 0.3), -1px -1px 2px rgba(44, 56, 159, 0.5),
		inset -5px 5px 10px rgba(44, 56, 159, 0.2), inset 5px -5px 10px rgba(44, 56, 159, 0.2),
		inset -5px -5px 10px rgba(82, 104, 255, 0.9), inset 5px 5px 13px rgba(44, 56, 159, 0.9);
}
</style>
