<template>
	<div class="overlay" v-if="show === true" @click="setShow(false)"></div>
	<div class="card card-siswa">
		<div class="card-body">
			<div class="text-center">
				<span class="picture-student">
					<span class="cover">
						<img src="@/assets/img/default.jpg" alt="Picture of student" width="200" height="200" />
					</span>
				</span>
			</div>
			<h6 class="mt-2">{{ payload.namaLengkap }}</h6>
			<p class="text-muted" :style="{ 'font-size': '14px' }">NIS : {{ payload.NIS }}</p>

			<div :style="{ position: 'absolute', bottom: '16px' }" class="justify-content-between">
				<div :class="`btn-group dropdown ${show ? 'open' : ''}`">
					<p style="font-size: 14px">
						<!-- max 55 karakter  -->
						<!-- Jalan Pertamanan IV Kepuharjo Karangploso  -->
						<span
							class="badge badge-kelas"
							:style="{
								background: payload.kelas.keahlian.warna ? payload.kelas.keahlian.warna : '#a9a9a9e',
							}"
						>
							{{ payload.kelas.tingkatan }}-{{ payload.kelas.keahlian.singkatan }}-{{
								payload.kelas.abjad.toUpperCase()
							}}
						</span>
					</p>
					<a class="btn" @click="setShow(show ? false : true)" :style="{ 'z-index': 4, left: '60px' }">
						<i class="fa-solid fa-angle-down"></i>
					</a>
					<ul class="dropdown-menu dropdown-menu-right" :style="{ opacity: 1, left: '48px' }">
						<li>
							<a @click.prevent="editClicked(payload)" @mouseup.prevent="setShow(false)"> Edit </a>
						</li>
						<li>
							<a @click.prevent="removeClicked(payload._id)" @mouseup.prevent="setShow(false)"> Hapus </a>
						</li>
					</ul>
				</div>
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
		removeClicked(id: string) {
			this.$emit('remove-click', id);
		},
	},
});
</script>
<style>
.card-siswa {
	max-height: 405px;
	height: 370px;
	padding: 8px;
	border: 0;
	border-radius: 30px;
	background: linear-gradient(135deg, #e8e8e8 0%, #ffffff 100%);
	box-shadow: -5px 5px 10px rgba(146, 146, 146, 0.2), 5px -5px 10px rgba(146, 146, 146, 0.2),
		-5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(146, 146, 146, 0.9),
		inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(146, 146, 146, 0.5);
}

.badge-kelas {
	background: #a9a9a9e6;
	font-size: 1rem;
	box-sizing: border-box;
	box-shadow: -1px 1px 2px rgba(71, 21, 208, 0.2), 1px -1px 2px rgba(71, 21, 208, 0.2),
		-1px -1px 2px rgba(255, 255, 244, 0.9), 1px 1px 3px rgba(222, 226, 230, 0.9),
		inset 1px 1px 2px rgba(255, 255, 244, 0.3), inset -1px -1px 2px rgba(108, 117, 125, 0.5);
	border-radius: 5px;
	border: 0px;
}

.picture-student {
	box-sizing: border-box;
	display: inline-block;
	overflow: hidden;
	width: initial;
	height: initial;
	background: none;
	opacity: 1;
	border: 0px;
	margin: 0px;
	padding: 0px;
	position: relative;
	max-width: 100%;
}

.picture-student .cover {
	box-sizing: border-box;
	display: block;
	width: initial;
	height: initial;
	background: none;
	opacity: 1;
	border: 0px;
	margin: 0px;
	padding: 0px;
	max-width: 100%;
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
