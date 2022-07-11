<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable no-case-declarations -->

<template>
	<div id="modal-validasi">
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
					<form @submit.prevent="handleSubmit()" novalidate>
						<div class="modal-body">
							<div class="container">
								<div class="row">
									<div class="col-md-5">
										<label class="form-label label">Kelas </label>
										<vSelect
											placeholder="Pilih kelas"
											name="kelas"
											:options="collection"
											v-model="formData.kelas"
											label="kelas"
											required
											:class="{
												'is-invalid': submitted && setError['kelas'],
											}"
										/>
										<div class="invalid-feedback" v-if="submitted && !!setError['kelas']">
											{{ setError['kelas']?.message }}
										</div>
										<div style="height: 16px"></div>
										<CardKelas :payload="formData.kelas === null ? cardKelas : formData.kelas" />
									</div>

									<div class="col-md-1"></div>
									<div class="col-md-6">
										<table class="table table-sm table-hover" style="font-size: small">
											<tbody>
												<tr>
													<td width="30%">Nama Lengkap</td>
													<td width="5%">:</td>
													<td>{{ theModel.namaLengkap }}</td>
												</tr>
												<tr>
													<td>NISN</td>
													<td>:</td>
													<td>{{ theModel.NISN }}</td>
												</tr>
												<tr>
													<td>Tempat Lahir / Tanggal Lahir</td>
													<td>:</td>
													<td>
														{{ theModel.tempatLahir }} /
														{{ dateFormat(theModel.tanggalLahir) }}
													</td>
												</tr>
												<tr>
													<td>Nama Ibu</td>
													<td>:</td>
													<td>{{ theModel.namaIbu }}</td>
												</tr>
												<tr>
													<td>Email</td>
													<td>:</td>
													<td>{{ theModel.email }}</td>
												</tr>
												<tr>
													<td>Telp</td>
													<td>:</td>
													<td>{{ theModel.telp }}</td>
												</tr>
											</tbody>
										</table>

										<div class="row">
											<div class="col-8">
												<div class="mb-3">
													<label class="form-label label">Kode</label>
													<div class="row">
														<div class="col-5">
															<input
																class="form-control input"
																:class="{
																	'is-invalid': submitted && setError['prefixNIS'],
																}"
																:value="formData.kelas === null ? '' : setPrefixNIS()"
																readonly
																required
															/>
															<div class="invalid-feedback" v-if="submitted && !!setError['prefixNIS']">
																{{ setError['prefixNIS']?.message }}
															</div>
														</div>
														<div class="col-7">
															<input
																placeholder="Masukkan NIS"
																type="number"
																class="form-control input"
																v-model="formData.NIS"
																:class="{
																	'is-invalid': submitted && setError['NIS'],
																}"
																required
															/>
															<div class="invalid-feedback" v-if="submitted && !!setError['NIS']">
																{{ setError['NIS']?.message }}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div style="width: 8px"></div>
											<div class="col-2">
												<div class="btn-position-center">
													<button type="button" class="btn btn-outline-dark" @click="handleNIS">Generate</button>
												</div>
											</div>
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
import { generateNIS, validation } from '@/services/validasiUser';

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
		listKelas: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['closeModal', 'update:payload', 'update:listKelas'],
	setup(props, { emit }) {
		const closeModal = () => {
			emit('closeModal');
		};

		const theModel = computed({
			// Use computed to wrap the object
			get: () => props.payload,
			set: (value: any) => emit('update:payload', value),
		});

		const modelKelas = computed({
			// Use computed to wrap the object
			get: () => props.listKelas,
			set: (value: any) => emit('update:listKelas', value),
		});

		return { closeModal, theModel, modelKelas };
	},
	mounted() {
		if (this.listKelas) {
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
	data() {
		return {
			collection: [] as any,
			cardKelas: {
				_id: '',
				tingkatan: '',
				tahunAjaran: '',
				abjad: '',
				keahlian: { singkatan: '', paketKeahlian: '', warna: '#c3c3c3' },
				keterangan: '',
				kode: '',
				status: 'Y',
			} as any,
			formData: {
				_id: '',
				kelas: null,
				prefixNIS: '',
				NIS: '',
			} as any,
			submitted: false,
			setError: {} as any,
		};
	},
	methods: {
		dateFormat(date: Date) {
			const dt = new Date(date);
			const options = { day: 'numeric', month: 'long', year: 'numeric' };
			return new Intl.DateTimeFormat('id', options as any).format(dt);
		},
		setPrefixNIS() {
			const kelas = this.formData.kelas;

			const { kode } = kelas;
			const prefixKode = kode.substr(0, 2);
			const infixKode = kode.substr(4);
			const prefixNIS = prefixKode + infixKode;

			return (this.formData.prefixNIS = prefixNIS);
		},
		async handleNIS() {
			this.submitted = true;
			const kelas = this.formData.kelas;
			if (kelas == null) {
				createToast('Data Gagal Disimpan', { type: 'danger' });
				return (this.setError = { tingkatan: { message: 'Kelas harus diisi' } });
			}

			const response = (await generateNIS({ kelas: this.formData.kelas })) as any;
			if (response.error) {
				createToast('Data Gagal Disimpan', { type: 'danger' });
			} else {
				createToast('NIS Berhasil Digenerate', { type: 'success' });
				this.formData.NIS = response.data.data;
			}
		},
		async handleSubmit() {
			this.submitted = true;

			console.log('this.formData', this.formData);
			if (!this.formData.kelas || this.formData.NIS === 0) {
				return createToast('Data Gagal Disimpan', { type: 'danger' });
			}
			const response = await validation(this.formData, this.payload._id);
			if (response.error) {
				createToast(response.message, { type: 'danger' });
			} else {
				createToast('Data Berhasil Divalidasi', { type: 'success' });
				this.resetForm();
				this.closeModal();
			}
		},
		resetForm() {
			this.theModel = {
				_id: '',
				kelas: '',
				prefixNIS: '',
				NIS: '',
			};
		},
	},
});
</script>

<style>
.label {
	font-weight: 500;
	font-size: 0.8rem;
}

.button-text {
	font-size: 0.8rem;
	text-transform: none;
}

.btn-position-center {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 0;
}
</style>
