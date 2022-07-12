<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable no-case-declarations -->

<template>
	<div id="modal-hapus">
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
							<div class="container text-center">
								Apa anda yakin ingin menghapus data {{ suffix }} <br />

								<h5 style="display: 'inline-block'">
									<span class="badge rounded-pill bg-danger"> {{ label }} </span>
								</h5>
								?
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-outline-dark button-text" @click="closeModal">
								<i class="fa-solid fa-xmark"></i> Batal
							</button>
							<button type="submit" class="btn btn-danger button-text">
								<i class="fa-solid fa-trash"></i> Hapus
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
import { destroyJurusan } from '@/services/jurusan';
import { destroyKelas } from '@/services/kelas';
import { removePhoto } from '@/services/user';
import { destroyUser } from '@/services/validasiUser';
import { destroyPelanggaran } from '@/services/pelanggaran';

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
	mounted() {
		if (this.suffix === 'Jurusan') {
			this.label = this.payload.paketKeahlian;
		} else if (this.suffix === 'Kelas') {
			const { tingkatan, keahlian, abjad } = this.payload;
			const { singkatan } = keahlian;
			this.label = `${tingkatan}-${singkatan}-${abjad}`;
		} else if (this.suffix === 'Foto User') {
			const { foto } = this.payload;
			this.label = `${foto}`;
		} else if (this.suffix === 'User') {
			const { namaLengkap } = this.payload;
			this.label = `${namaLengkap}`;
		} else if (this.suffix === 'Pelanggaran') {
			const { jenisPelanggaran } = this.payload;
			this.label = `${jenisPelanggaran}`;
		}
	},
	data() {
		return {
			label: '',
		};
	},
	methods: {
		async handleSubmit() {
			if (this.suffix === 'Jurusan') {
				const deleteJurusan = (await destroyJurusan(this.payload._id)) as any;
				if (deleteJurusan.error) {
					createToast('Data Gagal Dihapus', { type: 'danger' });
				} else {
					createToast('Data Berhasil Dihapus', { type: 'success' });
					this.closeModal();
				}
			} else if (this.suffix === 'Kelas') {
				const deleteKelas = (await destroyKelas(this.payload._id)) as any;
				if (deleteKelas.error) {
					createToast('Data Gagal Dihapus', { type: 'danger' });
				} else {
					createToast('Data Berhasil Dihapus', { type: 'success' });
					this.closeModal();
				}
			} else if (this.suffix === 'Foto User') {
				const deleteFoto = (await removePhoto(this.payload._id)) as any;
				if (deleteFoto.error) {
					createToast('Data Gagal Dihapus', { type: 'danger' });
				} else {
					createToast('Data Berhasil Dihapus', { type: 'success' });
					this.closeModal();
				}
			} else if (this.suffix === 'User') {
				const deleteUser = (await destroyUser(this.payload._id)) as any;
				if (deleteUser.error) {
					createToast('Data Gagal Dihapus', { type: 'danger' });
				} else {
					createToast('Data Berhasil Dihapus', { type: 'success' });
					this.closeModal();
				}
			} else if (this.suffix === 'Pelanggaran') {
				const deletePelanggaran = (await destroyPelanggaran(this.payload._id)) as any;
				if (deletePelanggaran.error) {
					createToast('Data Gagal Dihapus', { type: 'danger' });
				} else {
					createToast('Data Berhasil Dihapus', { type: 'success' });
					this.closeModal();
				}
			}
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
