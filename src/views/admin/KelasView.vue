<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
	<TheHeader title="Halaman Kelas" subtitle="Menampilkan halaman kelas" />
	<CardHeader
		title="Total kelas saat ini"
		subtitle="Klik tombol di samping kiri untuk menambahkan kelas baru."
		:countNum="totalKelas"
		@add-click="handleAdd()"
	/>
	<div style="height: 48px"></div>
	<h5>Cari kelas menggunakan filter berikut :</h5>
	<div style="height: 12px"></div>
	<form novalidate @submit.prevent="filterKelas">
		<div class="row" :style="{ 'margin-right': '0px' }">
			<div class="col-md-4">
				<input
					placeholder="Masukkan Tahun Ajaran"
					type="number"
					name="tahunAjaran"
					class="form-control input"
					v-model="theModel.tahunAjaran"
					required
					:class="{
						'is-invalid': submitted && setError['tahunAjaran'],
					}"
				/>
				<div class="invalid-feedback" v-if="submitted && !!setError['tahunAjaran']">
					{{ setError['tahunAjaran']?.message }}
				</div>
			</div>
			<div class="col-md-4">
				<vSelect
					placeholder="Pilih tingkatan"
					name="tingkatan"
					v-model="theModel.tingkatan"
					:options="tingkatan"
					:reduce="(item:any) => item.value"
					label="label"
					required
					:class="{
						'is-invalid': submitted && setError['tingkatan'],
					}"
				/>
				<div class="invalid-feedback" v-if="submitted && !!setError['tingkatan']">
					{{ setError['tingkatan']?.message }}
				</div>
			</div>
			<div class="col-md-2">
				<button class="btn button-text btn-primary" type="submit">Cari</button>
			</div>
		</div>
	</form>
	<div style="height: 24px"></div>
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
import { defineComponent, ref, computed } from 'vue';

import TheHeader from '@/components/atoms/TheHeader.vue';
import CardHeader from '@/components/molecules/CardHeader.vue';
import CardKelas from '@/components/atoms/CardKelas.vue';
import ModalKelas from '@/components/molecules/ModalKelas.vue';
import ModalHapus from '@/components/molecules/ModalHapus.vue';
import vSelect from 'vue-select';

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

import { getAllJurusan } from '@/services/jurusan';
import { getAllKelas, getKelasByFilter } from '@/services/kelas';

export default defineComponent({
	components: { TheHeader, CardHeader, CardKelas, ModalKelas, ModalHapus, vSelect },
	props: {
		modelValue: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const modalKelas = ref(false);
		const modalHapus = ref(false);

		const theModel = computed({
			// Use computed to wrap the object
			get: () => props.modelValue,
			set: (value: any) => emit('update:modelValue', value),
		});

		return { modalKelas, theModel, modalHapus };
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
			tingkatan: [
				{ value: 'X', label: 'X', kode: '10' },
				{ value: 'XI', label: 'XI', kode: '11' },
				{ value: 'XII', label: 'XII', kode: '12' },
			],
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
			submitted: false,
			setError: {} as any,
			listJurusan: [] as any,
			listKelas: [] as any,
			totalKelas: 0,
		};
	},
	methods: {
		async getListJurusan() {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = (await getAllJurusan()) as any;
			this.listJurusan = response.data.data;
		},
		async getListKelas() {
			const response = (await getAllKelas()) as any;
			this.listKelas = response.data.data;
			this.totalKelas = response.data.total;
		},
		async filterKelas() {
			this.submitted = true;
			const tahunAjaran = this.theModel.tahunAjaran;
			const tingkatan = this.theModel.tingkatan;

			if (tahunAjaran == undefined || tingkatan == null) {
				createToast('Semua data wajib diisi!', { type: 'danger' });
				this.setError = { tingkatan: { message: 'Tingkatan harus diisi' } };
				this.setError = { tahunAjaran: { message: 'Tahun ajaran harus diisi' } };
				return;
			}

			// Set Kode Tingkatan
			let valueTingkatan = '';
			// eslint-disable-next-line no-prototype-builtins
			if (tingkatan.hasOwnProperty('value')) {
				valueTingkatan = tingkatan.value;
			}
			const findTingkatan = this.tingkatan.find((option: any) => option.value == tingkatan);
			// eslint-disable-next-line no-prototype-builtins
			if (findTingkatan?.hasOwnProperty('value')) {
				valueTingkatan = findTingkatan.value;
			}

			const response = (await getKelasByFilter(tahunAjaran, valueTingkatan)) as any;

			const dataKelas = response.data.data;
			const { total } = response.data;
			this.listKelas = dataKelas;
			if (response.error || total === 0) {
				createToast('Data tidak ditemukan!', { type: 'danger' });
			} else {
				createToast(`${total} Data berhasil ditemukan!`, { type: 'success' });
			}
		},
		handleAdd() {
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalKelas = !this.modalKelas;
			this.prefix = 'Tambah';
			this.modalKelas ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		handleEdit(e: Event) {
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalKelas = !this.modalKelas;
			this.prefix = 'Edit';
			this.payload = e;
			this.modalKelas ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		handleDelete(e: Event) {
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
