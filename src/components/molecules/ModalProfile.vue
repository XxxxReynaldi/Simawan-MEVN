<template>
	<div id="modal-img-profile">
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
					<form @submit.prevent="handleSubmit" novalidate>
						<div class="modal-body">
							<div class="container">
								<div class="row">
									<div class="mb-2">
										<div class="image-upload text-center">
											<label for="foto">
												<div class="position-relative my-auto mx-auto">
													<div class="profile-div blur">
														<img
															:src="defaultPreview"
															alt="Upload image"
															class="upload-img"
															width="300"
															height="300"
														/>
													</div>
												</div>
											</label>
											<input
												id="foto"
												type="file"
												name="foto"
												accept=".jpg,.jpeg,.png,.svg"
												@input="handleEdit($event)"
												:style="{ display: 'none' }"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="modal-footer justify-content-between">
							<button type="button" class="btn btn-outline-dark button-text" @click="closeModal">
								<i class="fa-solid fa-xmark"></i> Close
							</button>
							<button
								v-if="payload.foto !== 'default.jpg'"
								class="btn btn-danger button-text"
								@click="handleDelete()"
							>
								<i className="fa-solid fa-trash"></i> Hapus
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

	<ModalHapus
		v-if="modalHapus"
		:modalActive="modalHapus"
		:prefix="'Hapus'"
		:suffix="'Foto User'"
		:payload="modalHapusFoto.payload"
		@close-modal="closeModalHapus"
	/>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import ModalHeader from '../atoms/ModalHeader.vue';
import ModalHapus from './ModalHapus.vue';

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

import { updatePhoto } from '@/services/user';

const IMG_PATH = '/src/assets';
const IMAGE_API_URL = import.meta.env.VITE_APP_IMAGE_API;

export default defineComponent({
	components: { ModalHeader, ModalHapus },
	props: {
		modalActive: { type: Boolean, default: false },
		prefix: { type: String },
		suffix: { type: String },
		payload: {
			type: Object,
			default: null,
			// default: () => ({}),
		},
	},
	emits: ['closeModal', 'update:payload'],
	setup(props, { emit }) {
		const modalHapus = ref(false);

		const closeModal = () => {
			emit('closeModal');
		};

		const theModel = computed({
			// Use computed to wrap the object
			get: () => props.payload,
			set: (value: any) => emit('update:payload', value),
		});

		return { closeModal, theModel, modalHapus };
	},
	mounted() {
		if (this.payload) {
			this.getImage();
		}
	},
	data() {
		return {
			formData: { _id: '', foto: '' },
			modalHapusFoto: { prefix: '', suffix: '', payload: {} },
			defaultPreview: `${IMG_PATH}/img/default.jpg`,
			preview: null,
		};
	},
	methods: {
		getImage() {
			this.defaultPreview = `${IMAGE_API_URL}/user/${this.payload.foto}`;
		},
		handleEdit(e: Event) {
			const input = e.target as any;
			const reader = new FileReader();
			if (input.files) {
				reader.onload = () => {
					this.defaultPreview = reader.result as string;
				};
				this.defaultPreview = input.files[0];
				this.formData.foto = input.files[0];
				reader.readAsDataURL(input.files[0]);
			}
		},
		handleDelete() {
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalHapus = !this.modalHapus;

			this.modalHapusFoto.payload = this.payload;
			this.modalHapus ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		async handleSubmit() {
			const data: FormData = new FormData();
			data.append('foto', this.formData.foto);

			const response = await updatePhoto(data, this.payload._id);
			if (response.error) {
				createToast('Data Gagal Disimpan', { type: 'danger' });
			} else {
				createToast('Data Berhasil Disimpan', { type: 'success' });
				this.closeModal();
			}
		},
		closeModalHapus() {
			this.modalHapus = false;
		},
	},
});
</script>
