<template>
	<div id="modal-kelas">
		<div
			ref="modal"
			class="modal fade"
			:class="{ show: modalActive, 'd-block': modalActive }"
			tabindex="-1"
			role="dialog"
		>
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div class="modal-content">
					<ModalHeader @close="closeModal" :prefix="prefix" :suffix="suffix" />
					<form @submit.prevent="handleSubmit" novalidate>
						<div class="modal-body">
							<div class="container">
								<div class="row">
									<div class="col-md-6">
										<div class="card-center">
											<div class="col pt-4">
												<CardKelas :payload="payload" />
											</div>
										</div>
									</div>
									<div class="col-md-6">
										<div class="mb-3">
											<label class="form-label label">Tingkatan </label>
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
										<div class="mb-3">
											<label class="form-label label">Keahlian </label>
											<vSelect
												placeholder="pilih Keahlian"
												name="keahlian"
												:options="listJurusan"
												v-model="theModel.keahlian"
												label="paketKeahlian"
												required
												:class="{
													'is-invalid': submitted && setError['keahlian'],
												}"
											/>
											<div class="invalid-feedback" v-if="submitted && !!setError['keahlian']">
												{{ setError['keahlian']?.message }}
											</div>
										</div>
										<div class="mb-3">
											<label class="form-label label">Abjad</label>
											<input
												placeholder="Masukkan Abjad"
												name="abjad"
												class="form-control input"
												v-model="theModel.abjad"
												id="abjad"
												required
												:class="{
													'is-invalid': submitted && setError['abjad'],
												}"
											/>
											<div class="invalid-feedback" v-if="submitted && !!setError['abjad']">
												{{ setError['abjad']?.message }}
											</div>
										</div>
										<div class="mb-3">
											<label class="form-label label">Tahun Ajaran</label>
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
									</div>
									<div class="mb-3">
										<label class="form-label label">Keterangan</label>
										<textarea
											placeholder="Tulis bila perlu"
											name="keterangan"
											class="form-control input"
											v-model="theModel.keterangan"
											required
										></textarea>
									</div>
									<div class="row">
										<div class="col-10">
											<div class="mb-3">
												<label class="form-label label">Kode</label>
												<input
													placeholder="Masukkan Kode"
													type="number"
													name="kode"
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
										</div>
										<div class="col-2">
											<div class="btn-position-center">
												<button
													type="button"
													class="btn btn-outline-dark button-text"
													@click="handleGenerateKode()"
												>
													Generate
												</button>
											</div>
										</div>
									</div>
									<div class="mb-3">
										<label class="form-label label">
											Status Kelas {{ theModel.status === 'Y' ? 'Aktif' : 'Tidak Aktif' }}
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
import CardKelas from '../atoms/CardKelas.vue';
import vSelect from 'vue-select';

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import { storeKelas, updateKelas } from '@/services/kelas';

export default defineComponent({
	components: { ModalHeader, CardKelas, vSelect },
	props: {
		modalActive: { type: Boolean, default: false },
		prefix: { type: String },
		suffix: { type: String },
		payload: {
			type: Object,
			default: () => ({}),
		},
		listJurusan: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['closeModal', 'update:payload', 'update:listJurusan'],
	setup(props, { emit }) {
		const closeModal = () => {
			emit('closeModal');
		};

		const theModel = computed({
			// Use computed to wrap the object
			get: () => props.payload,
			set: (value: any) => emit('update:payload', value),
		});

		const modelJurusan = computed({
			// Use computed to wrap the object
			get: () => props.listJurusan,
			set: (value: any) => emit('update:listJurusan', value),
		});

		return { closeModal, theModel, modelJurusan };
	},
	data() {
		return {
			tingkatan: [
				{ value: 'X', label: 'X', kode: '10' },
				{ value: 'XI', label: 'XI', kode: '11' },
				{ value: 'XII', label: 'XII', kode: '12' },
			],
			formData: {
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
		};
	},
	methods: {
		setSelected(item: any) {
			this.theModel = { ...this.theModel, item };
			console.log('this.theModel', this.theModel);
			return item.paketKeahlian;
		},
		handleGenerateKode() {
			this.submitted = true;
			const tingkatan = this.theModel.tingkatan;
			const keahlian = this.theModel.keahlian;

			if (tingkatan == null) {
				this.setError = { tingkatan: { message: 'Tingkatan harus diisi' } };
				return;
			}

			if (keahlian.kode == '') {
				this.setError = { keahlian: { message: 'Keahlian harus diisi' } };
				return;
			}

			// Set Kode Tingkatan
			let kodeTingkatan = '';
			// eslint-disable-next-line no-prototype-builtins
			if (tingkatan.hasOwnProperty('value')) {
				kodeTingkatan = tingkatan.kode;
			}
			const findTingkatan = this.tingkatan.find((option: any) => option.value == tingkatan);
			// eslint-disable-next-line no-prototype-builtins
			if (findTingkatan?.hasOwnProperty('value')) {
				kodeTingkatan = findTingkatan.kode;
			}

			// Set Kode Keahlian
			const kodeKeahlian = this.theModel.keahlian.kode;

			// Set Kode TahunAjaran
			const tahunAjaran = this.theModel.tahunAjaran;
			const kodeTahunAjaran = tahunAjaran.toString().substr(-2);

			// Set Kode Kelas
			this.theModel.kode = kodeTahunAjaran + kodeTingkatan + kodeKeahlian;
		},
		async handleSubmit() {
			this.submitted = true;

			const tingkatan = this.theModel.tingkatan;
			const keahlian = this.theModel.keahlian;

			if (this.theModel.status === true) {
				this.formData = { ...this.theModel, status: 'Y' };
			} else {
				this.formData = { ...this.theModel, status: 'N' };
			}
			console.log('e submit', this.formData);

			let kodeTingkatan = '';
			// eslint-disable-next-line no-prototype-builtins
			if (tingkatan.hasOwnProperty('value')) {
				kodeTingkatan = tingkatan.value;
			} else {
				kodeTingkatan = tingkatan;
			}

			this.formData = { ...this.formData, keahlian: keahlian._id, tingkatan: kodeTingkatan };
			if (this.prefix === 'Tambah') {
				const storeResponse = (await storeKelas(this.formData)) as any;
				console.log(`storeRes`, storeResponse);
				if (storeResponse.error) {
					createToast('Data Gagal Ditambahkan', { type: 'danger' });
					this.setError = storeResponse.fields;
				} else {
					createToast('Data Berhasil Ditambahkan', { type: 'success' });
					this.resetForm();
					this.closeModal();
				}
			} else if (this.prefix === 'Edit') {
				const updateResponse = (await updateKelas(this.formData, this.payload._id)) as any;
				// console.log('updateResponse', updateResponse);
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
				tingkatan: '',
				tahunAjaran: '',
				abjad: '',
				keahlian: { singkatan: '', paketKeahlian: '', warna: '#c3c3c3' },
				keterangan: '',
				kode: '',
				status: 'Y',
			};
		},
	},
});
</script>

<style>
.button-text {
	font-size: 0.8rem;
	text-transform: none;
}

.card-center {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.btn-position-center {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 0;
}

#abjad {
	text-transform: uppercase;
}
</style>
