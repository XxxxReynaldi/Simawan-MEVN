<template>
	<form @submit.prevent="handleSubmit" class="cf" novalidate>
		<div class="mb-3">
			<label class="form-label label">Email</label>
			<input
				placeholder="Masukkan email"
				type="email"
				class="form-control input"
				v-model="theModel.email"
				:class="{
					'is-invalid': submitted && setError['email'],
				}"
				required
			/>
			<div class="invalid-feedback" v-if="submitted && !!setError['email']">
				{{ setError['email']?.message }}
			</div>
		</div>
		<div class="mb-3">
			<label class="form-label label">Nama Lengkap</label>
			<input
				placeholder="Masukkan nama lengkap"
				class="form-control input"
				v-model="theModel.namaLengkap"
				:class="{
					'is-invalid': submitted && setError['namaLengkap'],
				}"
				required
			/>
			<div class="invalid-feedback" v-if="submitted && !!setError['namaLengkap']">
				{{ setError['namaLengkap']?.message }}
			</div>
		</div>
		<button type="submit" class="mt-4 float-end btn btn-primary button-text">Simpan</button>
	</form>
</template>
<script lang="ts">
import { updateProfile } from '@/services/user';
import { defineComponent, computed } from 'vue';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

export default defineComponent({
	props: {
		payload: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['update:payload'],
	mounted() {
		if (this.payload) {
			// console.log('formProfile', this.payload);
		}
	},
	setup(props, { emit }) {
		const theModel = computed({
			// Use computed to wrap the object
			get: () => props.payload,
			set: (value: any) => emit('update:payload', value),
		});

		return { theModel };
	},
	data() {
		return {
			formData: {
				_id: '',
				namaLengkap: '',
				email: '',
			} as any,
			submitted: false,
			setError: {} as any,
		};
	},
	methods: {
		async handleSubmit() {
			this.submitted = true;
			this.formData = { ...this.theModel };
			const response = (await updateProfile(this.formData, this.payload._id)) as any;

			if (response.error) {
				createToast('Data Gagal Ditambahkan', { type: 'danger' });
				this.setError = response.fields;
			} else {
				createToast('Data Berhasil Disimpan', { type: 'success' });
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
