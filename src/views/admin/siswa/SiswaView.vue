<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
	<TheHeader title="Halaman Siswa" subtitle="Menampilkan halaman siswa" />
	<CardHeader
		title="Total siswa saat ini"
		subtitle="Klik tombol di samping kiri untuk menambahkan siswa baru."
		:countNum="4"
		@add-click="handleAdd()"
	/>
	<div style="height: 48px"></div>
	<h5>Cari kelas menggunakan filter berikut :</h5>
	<div style="height: 12px"></div>
	<form novalidate @submit.prevent="filterSiswa">
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
					placeholder="Pilih kelas"
					name="kelas"
					:options="collection"
					v-model="theModel.kelas"
					label="kelas"
					required
					:class="{
						'is-invalid': submitted && setError['kelas'],
					}"
				/>
				<div class="invalid-feedback" v-if="submitted && !!setError['kelas']">
					{{ setError['kelas']?.message }}
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
				class="col-xs-6 col-md-3"
				:style="{ 'padding-top': '12px', 'padding-bottom': '12px' }"
				v-for="item in listSiswa"
				:key="item.NIS"
			>
				<CardSiswa
					:payload="item"
					@edit-click="handleEdit($event)"
					@remove-click="handleDelete($event)"
				/>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import TheHeader from '@/components/atoms/TheHeader.vue';
import CardHeader from '@/components/molecules/CardHeader.vue';
import CardSiswa from '@/components/atoms/CardSiswa.vue';
import vSelect from 'vue-select';

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

import { getAllSiswa, getSiswaByFilter } from '@/services/siswa';
import { getAllKelas } from '@/services/kelas';

export default defineComponent({
	components: { TheHeader, CardHeader, CardSiswa, vSelect },
	props: {
		modelValue: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const theModel = computed({
			// Use computed to wrap the object
			get: () => props.modelValue,
			set: (value: any) => emit('update:modelValue', value),
		});

		return { theModel };
	},
	mounted() {
		this.getListKelas();
		this.getListSiswa();
	},
	data() {
		return {
			collection: [] as any,
			submitted: false,
			setError: {} as any,
			listSiswa: [] as any,
			listKelas: [] as any,
			totalSiswa: 0,
		};
	},
	methods: {
		async getListKelas() {
			const response = (await getAllKelas()) as any;
			this.listKelas = response.data.data;
			if (this.listKelas.length !== 0) {
				type Kelas = {
					tingkatan: string;
					keahlian: any;
					abjad: string;
				};
				this.listKelas.map((item: any) => {
					const { tingkatan, keahlian, abjad }: Kelas = item;
					const option = {
						...item,
						kelas: `${tingkatan}-${keahlian.singkatan}-${abjad.toUpperCase()}`,
					};
					this.collection.push(option);
				});
			}
		},
		async getListSiswa() {
			const response = (await getAllSiswa()) as any;
			this.listSiswa = response.data.data;
			this.totalSiswa = response.data.total;
		},
		handleAdd() {
			this.$router.push('/admin/siswa/validasi');
		},
		async filterSiswa() {
			this.submitted = true;
			const tahunAjaran = this.theModel.tahunAjaran;
			const kelas = this.theModel.kelas;

			if (tahunAjaran == '') {
				this.setError = { tahunAjaran: { message: 'Tahun Ajaran harus diisi' } };
				return;
			}
			if (kelas == null) {
				this.setError = { kelas: { message: 'Kelas harus diisi' } };
				return;
			}

			// Set Kode Kelas
			let valueKelas = '';
			// eslint-disable-next-line no-prototype-builtins
			if (kelas.hasOwnProperty('_id')) {
				valueKelas = kelas._id;
			}

			const response = (await getSiswaByFilter(tahunAjaran, valueKelas)) as any;

			const dataSiswa = response.data.data;
			const { total } = response.data;
			this.listSiswa = dataSiswa;
			if (response.error || total === 0) {
				createToast('Data tidak ditemukan!', { type: 'danger' });
			} else {
				createToast(`${total} Data berhasil ditemukan!`, { type: 'success' });
			}
		},
		handleEdit(e: Event) {
			// console.log('edit', e);
		},
		handleDelete(e: Event) {
			// console.log('delete', e);
		},
	},
});
</script>
<style></style>
