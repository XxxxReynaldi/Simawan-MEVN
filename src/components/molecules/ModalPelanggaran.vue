<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable no-case-declarations -->

<template>
	<div id="modal-jurusan">
		<div
			ref="modal"
			class="modal fade"
			:class="{ show: modalActive, 'd-block': modalActive }"
			tabindex="-1"
			role="dialog"
		>
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<ModalHeader @close="closeModal" :prefix="prefix" :suffix="suffix" />
					<form @submit.prevent="handleSubmit()" novalidate>
						<div class="modal-body">
							<div class="container">
								<div class="row">
									<div class="mb-3">
										<label class="form-label label">Jenis Pelanggaran </label>
										<input
											class="form-control input"
											placeholder="Masukkan jenis pelanggaran"
											v-model="theModel.jenisPelanggaran"
											:class="{
												'is-invalid': submitted && setError['jenisPelanggaran'],
											}"
											required
										/>
										<div class="invalid-feedback" v-if="submitted && !!setError['jenisPelanggaran']">
											{{ setError['jenisPelanggaran']?.message }}
										</div>
									</div>
									<div class="mb-3">
										<label class="form-label label">Kategori </label>
										<vSelect
											placeholder="Pilih kategori"
											name="kategori"
											v-model="theModel.kategori"
											:options="kategori"
											:reduce="(item:any) => item.value"
											label="label"
											required
											:class="{
												'is-invalid': submitted && setError['kategori'],
											}"
										/>
										<div class="invalid-feedback" v-if="submitted && !!setError['kategori']">
											{{ setError['kategori']?.message }}
										</div>
									</div>
									<div class="mb-3">
										<label class="form-label label">Jumlah Poin </label>
										<input
											type="number"
											class="form-control input"
											placeholder="Masukkan jumlah poin"
											v-model.number="theModel.jumlahPoin"
											:class="{
												'is-invalid': submitted && setError['jumlahPoin'],
											}"
											required
										/>
										<div class="invalid-feedback" v-if="submitted && !!setError['jumlahPoin']">
											{{ setError['jumlahPoin']?.message }}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-outline-dark button-text" @click="closeModal">
								<i class="fa-solid fa-xmark"></i> Batal
							</button>
							<button
								type="submit"
								class="btn button-text"
								:class="prefix === 'Tambah' ? 'btn-primary ' : 'btn-success'"
							>
								<i class="fa-solid fa-check"></i> Simpan
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div v-if="modalActive" class="modal-backdrop fade show"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import ModalHeader from '../atoms/ModalHeader.vue';

import vSelect from 'vue-select';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

import { storePelanggaran, updatePelanggaran } from '@/services/pelanggaran';

export default defineComponent({
	components: { ModalHeader, vSelect },
	props: {
		modalActive: { type: Boolean, default: false },
		prefix: { type: String },
		suffix: { type: String },
		payload: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['closeModal', 'update:payload'],
	setup(props, { emit }) {
		const closeModal = () => {
			emit('closeModal');
		};

		const theModel = computed({
			// Use computed to wrap the object
			get: () => props.payload,
			set: (value: any) => emit('update:payload', value),
		});

		return { closeModal, theModel };
	},
	data() {
		return {
			kategori: [
				{ value: 'kelakuan', label: 'Kelakuan' },
				{ value: 'kerajinan', label: 'Kerajinan' },
				{ value: 'kerapian', label: 'Kerapian' },
			],
			formData: {
				_id: '',
				jenisPelanggaran: '',
				kategori: '',
				jumlahPoin: 0,
			} as any,
			submitted: false,
			setError: {} as any,
		};
	},
	methods: {
		async handleSubmit() {
			this.submitted = true;
			const kategori = this.theModel.kategori;
			let kategoriSelected = '';
			// eslint-disable-next-line no-prototype-builtins
			if (kategori.hasOwnProperty('value')) {
				kategoriSelected = kategori.value;
			} else {
				kategoriSelected = kategori;
			}

			this.formData = { ...this.theModel, kategori: kategoriSelected };

			if (this.prefix === 'Tambah') {
				const storeResponse = (await storePelanggaran(this.formData)) as any;
				if (storeResponse.error) {
					createToast('Data Gagal Ditambahkan', { type: 'danger' });
					this.setError = storeResponse.fields;
				} else {
					createToast('Data Berhasil Ditambahkan', { type: 'success' });
					this.resetForm();
					this.closeModal();
				}
			} else if (this.prefix === 'Edit') {
				const updateResponse = (await updatePelanggaran(this.formData, this.payload._id)) as any;
				if (updateResponse.error) {
					createToast('Data Gagal Disimpan', { type: 'danger' });
					this.setError = updateResponse.fields;
				} else {
					createToast('Data Berhasil Disimpan', { type: 'success' });
					this.resetForm();
					this.closeModal();
				}
			}
		},
		resetForm() {
			this.theModel = {
				_id: '',
				jenisPelanggaran: '',
				kategori: '',
				jumlahPoin: 0,
			};
		},
	},
});
</script>
