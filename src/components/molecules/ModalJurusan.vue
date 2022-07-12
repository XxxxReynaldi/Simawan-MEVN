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
										<label class="form-label label">Bidang Keahlian </label>
										<input
											class="form-control input"
											placeholder="Masukkan bidang keahlian"
											v-model="theModel.bidangKeahlian"
											:class="{
												'is-invalid': submitted && setError['bidangKeahlian'],
											}"
											required
										/>
										<div class="invalid-feedback" v-if="submitted && !!setError['bidangKeahlian']">
											{{ setError['bidangKeahlian']?.message }}
										</div>
									</div>
									<div class="mb-3">
										<label class="form-label label">Program Keahlian </label>
										<input
											class="form-control input"
											placeholder="Masukkan program keahlian"
											v-model="theModel.programKeahlian"
											required
											:class="{
												'is-invalid': submitted && setError['programKeahlian'],
											}"
										/>
										<div class="invalid-feedback" v-if="submitted && !!setError['programKeahlian']">
											{{ setError['programKeahlian']?.message }}
										</div>
									</div>
									<div class="mb-3">
										<label class="form-label label">Paket Keahlian</label>
										<input
											class="form-control input"
											placeholder="Masukkan paket keahlian"
											v-model="theModel.paketKeahlian"
											required
											:class="{
												'is-invalid': submitted && setError['paketKeahlian'],
											}"
										/>
										<div class="invalid-feedback" v-if="submitted && !!setError['paketKeahlian']">
											{{ setError['paketKeahlian']?.message }}
										</div>
									</div>
									<div class="mb-3">
										<label class="form-label label">Singkatan</label>
										<input
											placeholder="Masukkan singkatan"
											class="form-control input"
											v-model="theModel.singkatan"
											required
											:class="{
												'is-invalid': submitted && setError['singkatan'],
											}"
										/>
										<div class="invalid-feedback" v-if="submitted && !!setError['singkatan']">
											{{ setError['singkatan']?.message }}
										</div>
									</div>
									<div v-if="prefix === 'Tambah'" class="mb-3">
										<label class="form-label label">Kode</label>
										<input
											placeholder="Masukkan kode"
											class="form-control input"
											v-model="theModel.kode"
											required
											:class="{
												'is-invalid': submitted && setError['kode'],
											}"
										/>
										<div class="invalid-feedback" v-if="submitted && !!setError['kode']">
											{{ setError['kode']?.message }}
										</div>
									</div>
									<div class="mb-3">
										<label class="form-label" for="exampleColorInput">Warna</label>
										<input
											placeholder="Pilih Warna Jurusan"
											type="color"
											id="exampleColorInput"
											class="form-control form-control-color"
											v-model="theModel.warna"
										/>
									</div>
									<div class="mb-3">
										<label class="form-label label">
											Status Jurusan {{ theModel.status === 'Y' ? 'Aktif' : 'Tidak Aktif' }}
										</label>
										<div class="form-check">
											<input
												class="form-check-input"
												name="status"
												type="checkbox"
												v-model="theModel.status"
												:checked="theModel.status === 'Y' ? true : false"
												required
											/><label class="form-check-label">Aktif</label>
											<div class="invalid-feedback"></div>
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

import { createToast } from 'mosha-vue-toastify';

import 'mosha-vue-toastify/dist/style.css';
import { storeJurusan, updateJurusan } from '@/services/jurusan';

export default defineComponent({
	components: { ModalHeader },
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
			formData: {
				_id: '',
				bidangKeahlian: '',
				programKeahlian: '',
				paketKeahlian: '',
				singkatan: '',
				kode: '',
				warna: '#c3c3c3',
				status: 'Y',
			} as any,
			submitted: false,
			setError: {} as any,
		};
	},
	methods: {
		async handleSubmit() {
			this.submitted = true;

			if (this.theModel.status === true) {
				this.formData = { ...this.theModel, status: 'Y' };
			} else {
				this.formData = { ...this.theModel, status: 'N' };
			}

			if (this.prefix === 'Tambah') {
				const storeResponse = (await storeJurusan(this.formData)) as any;
				if (storeResponse.error) {
					createToast('Data Gagal Ditambahkan', { type: 'danger' });
					this.setError = storeResponse.fields;
				} else {
					createToast('Data Berhasil Ditambahkan', { type: 'success' });
					this.resetForm();
					this.closeModal();
				}
			} else if (this.prefix === 'Edit') {
				const updateResponse = (await updateJurusan(this.formData, this.payload._id)) as any;
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
				bidangKeahlian: '',
				programKeahlian: '',
				paketKeahlian: '',
				singkatan: '',
				kode: '',
				warna: '#c3c3c3',
				status: 'Y',
			};
		},
	},
});
</script>
