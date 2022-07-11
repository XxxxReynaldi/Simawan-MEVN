<template>
	<div class="overlay" v-if="show === true" @click="setShow(false)"></div>
	<div class="card card-jurusan" :style="{ background: payload.warna ? payload.warna : '#a9a9a9e' }">
		<div class="card-body">
			<div :class="`btn-group dropdown float-end ${show ? 'open' : ''}`">
				<a class="btn" style="z-index: 4" @click="setShow(show ? false : true)">
					<i class="fa-solid fa-angle-down text-white"></i>
				</a>
				<ul class="dropdown-menu dropdown-menu-right" style="opacity: 1">
					<li>
						<a @click.prevent="editClicked(payload)" @mouseup.prevent="setShow(false)">Edit</a>
					</li>
					<li>
						<!-- <a @click.prevent="removeClicked(payload._id)" @mouseup.prevent="setShow(false)">Hapus</a> -->
						<a @click.prevent="removeClicked(payload)" @mouseup.prevent="setShow(false)">Hapus</a>
					</li>
				</ul>
			</div>
			<p class="text-singkatan">{{ payload.singkatan }}</p>
			<p class="text-paket-keahlian">{{ payload.paketKeahlian }}</p>
			<p class="text-kode">Kode : {{ payload.kode }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		payload: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			show: false,
		};
	},
	emits: ['edit-click', 'remove-click'],
	methods: {
		setShow(e: any) {
			this.show = !this.show;
		},
		editClicked(payload: any) {
			this.$emit('edit-click', payload);
		},
		removeClicked(payload: any) {
			this.$emit('remove-click', payload);
		},
	},
});
</script>
<style>
.text-singkatan {
	font-weight: 500;
	font-size: 42px;
	line-height: 63px;
	color: #ffffff;
	margin-bottom: 0px;
}

.text-paket-keahlian {
	font-size: 14px;
	line-height: 21px;
	color: #ffffff;
}

.text-kode {
	font-size: 14px;
	line-height: 21px;
	color: #ffffff;
	margin-bottom: 0px;
}

.card-jurusan {
	background: #a9a9a9e6;
	box-sizing: border-box;
	box-shadow: -5px 5px 10px rgba(176, 176, 176, 0.2), 5px -5px 10px rgba(176, 176, 176, 0.2),
		-5px -5px 10px rgba(216, 216, 216, 0.9), 5px 5px 13px rgba(176, 176, 176, 0.9),
		inset 1px 1px 2px rgba(216, 216, 216, 0.3), inset -1px -1px 2px rgba(176, 176, 176, 0.5);
	border-radius: 10px;
	border: 0px;
}

.overlay {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 6;
}
</style>
