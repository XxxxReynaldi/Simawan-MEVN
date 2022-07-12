<template>
	<div class="overlay" v-if="show === true" @click="setShow(false)"></div>
	<div
		class="card card-kelas"
		:style="{ background: payload.keahlian ? payload.keahlian.warna : '' }"
	>
		<div class="card-body">
			<div class="card card-count">
				<p class="text-center text-white" style="{ margin: '0px', 'font-weight': '600' }">
					<i class="fas fa-user"></i> {{ payload.jumlah }}
				</p>
			</div>
			<p class="text-kelas">
				<!-- X-RPL-B -->
				{{ payload.tingkatan }}-{{ payload.keahlian.singkatan }}-{{ payload.abjad.toUpperCase() }}
			</p>
			<p class="text-paket-keahlian">
				<!-- Rekayasa Perangkat Lunak  -->
				{{ payload.keahlian.paketKeahlian }}
			</p>

			<div v-show="dropdown === true" :class="`btn-group dropdown float-end ${show ? 'open' : ''}`">
				<a class="btn" style="z-index: 4" @click="setShow(show ? false : true)">
					<i class="fa-solid fa-angle-down text-white"></i>
				</a>
				<ul class="dropdown-menu dropdown-menu-right" style="opacity: 1">
					<li>
						<a @click.prevent="editClicked(payload)" @mouseup.prevent="setShow(false)">Edit</a>
					</li>
					<li>
						<a @click.prevent="removeClicked(payload)" @mouseup.prevent="setShow(false)">Hapus</a>
					</li>
				</ul>
			</div>
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
		dropdown: { type: Boolean, default: false },
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
	updated() {
		// console.log('this.payload', this.payload);
	},
});
</script>
<style>
.card-kelas {
	background: #c3c3c3;
	border: 8px solid #ffffff;
	box-sizing: border-box;
	box-shadow: -5px 5px 10px rgba(176, 176, 176, 0.2), 5px -5px 10px rgba(176, 176, 176, 0.2),
		-5px -5px 10px rgba(216, 216, 216, 0.9), 5px 5px 13px rgba(176, 176, 176, 0.9),
		inset 1px 1px 2px rgba(216, 216, 216, 0.3), inset -1px -1px 2px rgba(176, 176, 176, 0.5);
	border-radius: 10px;
}

.card-count {
	width: 80px;
	height: 35px;
	padding: 4px;
	max-width: 100px;
	border-radius: 5px;
	position: absolute;
	top: -16px;
	right: 12px;
	background: #35495e;
	box-shadow: -1px 1px 2px rgba(159, 159, 159, 0.2), 1px -1px 2px rgba(159, 159, 159, 0.2),
		-1px -1px 2px rgba(86, 75, 75, 0.9), 1px 1px 3px rgba(56, 49, 49, 0.9),
		inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(52, 32, 32, 0.5);
	cursor: pointer;
}

.overlay {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 6;
}

.text-kelas {
	font-weight: 500;
	font-size: 42px;
	line-height: 63px;
	color: #ffffff;
	text-transform: uppercase;
}

.text-paket-keahlian {
	font-size: 14px;
	line-height: 21px;
	color: #ffffff;
	display: inline-block;
}
</style>
