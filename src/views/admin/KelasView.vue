<template>
	<TheHeader title="Halaman Kelas" subtitle="Menampilkan halaman kelas" />
	<CardHeader
		title="Total kelas saat ini"
		subtitle="Klik tombol di samping kiri untuk menambahkan kelas baru."
		:countNum="totalKelas"
		@add-click="handleAdd()"
	/>
	<div style="height: 48px"></div>
	<div class="container" :style="{ 'padding-left': '0px', 'padding-right': '32px' }">
		<div class="row">
			<div
				class="col-xs-6 col-md-4"
				style="padding-bottom: 24px"
				v-for="item in listKelas"
				:key="item._id"
			>
				<CardKelas
					:payload="item"
					:dropdown="true"
					@edit-click="handleEdit($event)"
					@remove-click="handleDelete($event)"
				/>
			</div>
		</div>
	</div>
	<ModalKelas
		v-if="modalKelas"
		:modalActive="modalKelas"
		:listJurusan="listJurusan"
		:prefix="prefix"
		:suffix="suffix"
		:payload="payload"
		@closeModal="closeModal(suffix)"
	/>
	<ModalHapus
		v-if="modalHapus"
		:modalActive="modalHapus"
		:prefix="'Hapus'"
		:suffix="'Kelas'"
		:payload="payload"
		@close-modal="closeModal"
	/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import TheHeader from '@/components/atoms/TheHeader.vue';
import CardHeader from '@/components/molecules/CardHeader.vue';
import CardKelas from '@/components/atoms/CardKelas.vue';
import ModalKelas from '@/components/molecules/ModalKelas.vue';
import ModalHapus from '@/components/molecules/ModalHapus.vue';

import { getAllJurusan } from '@/services/jurusan';
import { getAllKelas } from '@/services/kelas';

export default defineComponent({
	components: { TheHeader, CardHeader, CardKelas, ModalKelas, ModalHapus },
	setup() {
		const modalKelas = ref(false);
		const modalHapus = ref(false);

		return { modalKelas, modalHapus };
	},
	mounted() {
		// console.log(import.meta.env.VITE_APP_IMAGE_API);
		this.getListJurusan();
		this.getListKelas();
	},
	data() {
		return {
			prefix: '',
			suffix: 'Kelas',
			payload: {
				_id: '',
				tingkatan: '',
				tahunAjaran: '',
				abjad: '',
				keahlian: { singkatan: '', paketKeahlian: '', warna: '#c3c3c3' },
				keterangan: '',
				kode: '',
				status: 'Y',
			} as any,
			listJurusan: [],
			listKelas: [],
			totalKelas: 0,
		};
	},
	methods: {
		async getListJurusan() {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = (await getAllJurusan()) as any;
			this.listJurusan = response.data.data;
			// console.log(`listJurusan: `, response.data.data);
		},
		async getListKelas() {
			const response = (await getAllKelas()) as any;
			this.listKelas = response.data.data;
			this.totalKelas = response.data.total;
			// console.log(`listKelas: `, response.data.data);
		},
		handleAdd() {
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalKelas = !this.modalKelas;
			this.prefix = 'Tambah';
			this.modalKelas ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		handleEdit(e: Event) {
			console.log('edit', e);
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalKelas = !this.modalKelas;
			this.prefix = 'Edit';
			this.payload = e;
			this.modalKelas ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		handleDelete(e: Event) {
			console.log('delete', e);
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalHapus = !this.modalHapus;
			this.prefix = 'Hapus';
			this.suffix = 'Kelas';
			this.payload = e;
			this.modalHapus ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		closeModal(suffix: string) {
			if (suffix === 'Kelas') {
				this.modalKelas = false;
			}
			this.modalHapus = false;
			this.getListKelas();
		},
	},
});
</script>
