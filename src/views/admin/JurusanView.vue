<template>
	<TheHeader title="Halaman Jurusan" subtitle="Menampilkan halaman jurusan" />
	<CardHeader
		title="Total jurusan saat ini"
		subtitle="Klik tombol di samping kiri untuk menambahkan jurusan baru."
		:countNum="totalJurusan"
		@add-click="handleAdd()"
	/>
	<div style="height: 48px"></div>

	<div class="container" :style="{ 'padding-left': '0px', 'padding-right': '32px' }">
		<div class="row">
			<div
				class="col-xs-6 col-md-4"
				style="padding-bottom: 24px"
				v-for="item in listJurusan"
				:key="item._id"
			>
				<CardJurusan
					:payload="item"
					@edit-click="handleEdit($event)"
					@remove-click="handleDelete($event)"
				/>
			</div>
		</div>
	</div>
	<ModalJurusan
		v-if="modalJurusan"
		:modalActive="modalJurusan"
		:prefix="prefix"
		:suffix="suffix"
		:payload="payload"
		@closeModal="closeModal(suffix)"
	/>
	<ModalHapus
		v-if="modalHapus"
		:modalActive="modalHapus"
		:prefix="'Hapus'"
		:suffix="'Jurusan'"
		:payload="payload"
		@close-modal="closeModal"
	/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheHeader from '@/components/atoms/TheHeader.vue';
import CardHeader from '@/components/molecules/CardHeader.vue';
import CardJurusan from '@/components/atoms/CardJurusan.vue';
import ModalJurusan from '@/components/molecules/ModalJurusan.vue';
import ModalHapus from '@/components/molecules/ModalHapus.vue';

import { getAllJurusan } from '@/services/jurusan';

export default defineComponent({
	components: { TheHeader, CardHeader, CardJurusan, ModalJurusan, ModalHapus },
	setup() {
		const modalJurusan = ref(false);
		const modalHapus = ref(false);

		// const closeModal = (suffix: string) => {
		// 	// modalActive.value = !modalActive.value;
		// 	if (suffix === 'Jurusan') {
		// 		modalJurusan.value = false;
		// 	}
		// 	modalHapus.value = false;
		// };
		// return { modalJurusan, modalHapus, closeModal };
		return { modalJurusan, modalHapus };
	},
	mounted() {
		this.getListJurusan();
	},
	data() {
		return {
			prefix: '',
			suffix: 'Jurusan',
			payload: {},
			listJurusan: [],
			totalJurusan: 0,
		};
	},
	methods: {
		async getListJurusan() {
			const response = (await getAllJurusan()) as any;
			this.listJurusan = response.data.data;
			this.totalJurusan = response.data.total;
			// console.log(`listJurusan: `, response.data.data);
		},
		handleAdd() {
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalJurusan = !this.modalJurusan;
			this.prefix = 'Tambah';
			this.modalJurusan ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		handleEdit(e: Event) {
			console.log('edit', e);
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalJurusan = !this.modalJurusan;
			this.prefix = 'Edit';
			this.payload = e;
			this.modalJurusan ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		handleDelete(e: Event) {
			console.log('delete', e);
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalHapus = !this.modalHapus;
			this.prefix = 'Hapus';
			this.suffix = 'Jurusan';
			this.payload = e;
			this.modalHapus ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		closeModal(suffix: string) {
			if (suffix === 'Jurusan') {
				this.modalJurusan = false;
			}
			this.modalHapus = false;
			this.getListJurusan();
		},
	},
});
</script>

<style>
.button-text {
	font-size: 0.8rem;
	text-transform: none;
}
</style>
