<template>
	<form @submit.prevent="handleSubmit" class="cf" novalidate>
		<div class="mb-3">
			<label class="form-label label">Password Lama</label>
			<div class="input-group has-validation">
				<input
					placeholder="Masukkan password lama"
					name="oldPassword"
					class="form-control input"
					:type="passShow.oldPassword ? 'text' : 'password'"
					v-model="model.oldPassword"
					:class="{
						'is-invalid': submitted && setError['oldPassword'],
					}"
					required
				/>
				<span class="input-group-text" style="cursor: pointer" @click="onClickPass('oldPassword')">
					<i :class="passShow.oldPassword ? 'fa fa-eye-slash' : 'fa fa-eye'" aria-hidden="true"></i>
				</span>
				<div class="invalid-feedback" v-if="submitted && !!setError['oldPassword']">
					{{ setError['oldPassword']?.message }}
				</div>
			</div>
		</div>
		<div class="mb-3">
			<label class="form-label label">Password Baru</label>
			<div class="input-group has-validation">
				<input
					placeholder="Masukkan password baru"
					name="newPassword"
					class="form-control input"
					:type="passShow.newPassword ? 'text' : 'password'"
					v-model="model.newPassword"
					:class="{
						'is-invalid': submitted && setError['newPassword'],
					}"
					required
				/>
				<span class="input-group-text" style="cursor: pointer" @click="onClickPass('newPassword')">
					<i :class="passShow.newPassword ? 'fa fa-eye-slash' : 'fa fa-eye'" aria-hidden="true"></i>
				</span>
				<div class="invalid-feedback" v-if="submitted && !!setError['newPassword']">
					{{ setError['newPassword']?.message }}
				</div>
			</div>
		</div>
		<div class="mb-3">
			<label class="form-label label">Konfirmasi Password</label>
			<div class="input-group has-validation">
				<input
					placeholder="Masukkan password baru"
					name="confirmPass"
					class="form-control input"
					:type="passShow.confirmPass ? 'text' : 'password'"
					v-model="model.confirmPass"
					:class="{
						'is-invalid': submitted && setError['confirmPass'],
					}"
					required
				/>
				<span class="input-group-text" style="cursor: pointer" @click="onClickPass('confirmPass')">
					<i :class="passShow.confirmPass ? 'fa fa-eye-slash' : 'fa fa-eye'" aria-hidden="true"></i>
				</span>
				<div class="invalid-feedback" v-if="submitted && !!setError['confirmPass']">
					{{ setError['confirmPass']?.message }}
				</div>
			</div>
		</div>
		<button type="submit" class="mt-4 float-end btn btn-primary button-text">Simpan</button>
	</form>
</template>
<script lang="ts">
import { updatePassword } from '@/services/user';
import { defineComponent } from 'vue';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

export type PassShowProps = 'oldPassword' | 'newPassword' | 'confirmPass';
export default defineComponent({
	props: {
		payload: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['payload'],
	data() {
		return {
			model: {
				oldPassword: '',
				newPassword: '',
				confirmPass: '',
			} as any,
			passShow: {
				oldPassword: false,
				newPassword: false,
				confirmPass: false,
			},
			submitted: false,
			setError: {} as any,
		};
	},
	methods: {
		onClickPass(data: PassShowProps) {
			// eslint-disable-next-line no-prototype-builtins
			const update = this.passShow.hasOwnProperty(data);
			if (update) {
				this.passShow[data] = !this.passShow[data];
			}
			// (prev: any) => ({ ...prev, [name]: !passwordShow[name] })
		},
		async handleSubmit() {
			this.submitted = true;
			const response = (await updatePassword(this.model, this.payload._id)) as any;
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
