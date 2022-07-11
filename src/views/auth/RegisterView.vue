<template>
	<div class="container">
		<div class="row justify-content-md-center">
			<div class="col-md-10">
				<div class="card">
					<div>
						<div class="card-body">
							<h3 class="card-title title">Sign Up</h3>
							<div style="height: 30px"></div>
							<form @submit.prevent="onSubmit">
								<div class="container">
									<div class="row">
										<div class="col-xl-6">
											<div class="mb-3">
												<label class="form-label label">Nama Lengkap </label>
												<input
													type="text"
													class="form-control input"
													placeholder="Masukkan nama lengkap"
													v-model="formData.namaLengkap"
													:class="{
														'is-invalid': submitted && setError['namaLengkap'],
													}"
												/>
											</div>
											<div class="invalid-feedback" v-if="submitted && !!setError['namaLengkap']">
												{{ setError['namaLengkap']?.message }}
											</div>
											<div class="mb-3">
												<label class="form-label label">NISN </label>
												<input
													type="text"
													class="form-control input"
													placeholder="Masukkan NISN"
													v-model="formData.NISN"
													:class="{
														'is-invalid': submitted && setError['NISN'],
													}"
												/>
												<div class="invalid-feedback" v-if="submitted && !!setError['NISN']">
													{{ setError['NISN']?.message }}
												</div>
											</div>
											<div class="mb-3">
												<label class="form-label label">Tempat Lahir / Tanggal Lahir </label>
												<div class="row">
													<div class="col-7">
														<input
															type="text"
															class="form-control input"
															placeholder="Masukkan tempat lahir"
															v-model="formData.tempatLahir"
															:class="{
																'is-invalid': submitted && setError['tempatLahir'],
															}"
														/>
														<div class="invalid-feedback" v-if="submitted && !!setError['tempatLahir']">
															{{ setError['tempatLahir']?.message }}
														</div>
													</div>
													<div class="col-5">
														<input
															type="date"
															class="form-control input"
															placeholder="Masukkan tanggal lahir"
															v-model="formData.tanggalLahir"
															:class="{
																'is-invalid': submitted && setError['tanggalLahir'],
															}"
														/>
														<div class="invalid-feedback" v-if="submitted && !!setError['tanggalLahir']">
															{{ setError['tanggalLahir']?.message }}
														</div>
													</div>
												</div>
											</div>
											<div class="mb-3">
												<label class="form-label label">Nama Ibu </label>
												<input
													type="text"
													class="form-control input"
													placeholder="Masukkan nama ibu"
													v-model="formData.namaIbu"
													:class="{
														'is-invalid': submitted && setError['namaIbu'],
													}"
												/>
												<div class="invalid-feedback" v-if="submitted && !!setError['namaIbu']">
													{{ setError['namaIbu']?.message }}
												</div>
											</div>
										</div>
										<div class="col-xl-6">
											<div class="mb-3">
												<label class="form-label label">Email</label>
												<input
													type="email"
													class="form-control input"
													placeholder="Masukkan email"
													v-model="formData.email"
													:class="{
														'is-invalid': submitted && setError['email'],
													}"
												/>
												<div class="invalid-feedback" v-if="submitted && !!setError['email']">
													{{ setError['email']?.message }}
												</div>
											</div>
											<div class="mb-3">
												<label class="form-label label">Password</label>
												<input
													type="password"
													class="form-control input"
													placeholder="Masukkan password"
													v-model="formData.password"
													:class="{
														'is-invalid': submitted && setError['password'],
													}"
												/>
												<div class="invalid-feedback" v-if="submitted && !!setError['password']">
													{{ setError['password']?.message }}
												</div>
											</div>
											<div class="mb-3">
												<label class="form-label label">Telp</label>
												<input
													class="form-control input"
													placeholder="Masukkan telp"
													v-model="formData.telp"
													:class="{
														'is-invalid': submitted && setError['telp'],
													}"
												/>
												<div class="invalid-feedback" v-if="submitted && !!setError['telp']">
													{{ setError['telp']?.message }}
												</div>
											</div>
										</div>
									</div>
								</div>

								<div style="height: 30px"></div>
								<button type="submit" class="btn btn-primary">Submit</button>
								<div style="height: 20px"></div>
								<p class="rp-text-info" style="text-align: center">
									Sudah punya akun?
									<RouterLink to="/auth/login">Login Disini</RouterLink>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createToast } from 'mosha-vue-toastify';

import 'mosha-vue-toastify/dist/style.css';
import { setSignUp } from '@/services/auth';
import type { RegisterTypes } from '@/services/Data-types';

export default defineComponent({
	data() {
		return {
			formData: {
				namaLengkap: '',
				NISN: '',
				tempatLahir: '',
				tanggalLahir: new Date(),
				namaIbu: '',
				email: '',
				password: '',
				telp: '',
				foto: 'default.jpg',
			} as RegisterTypes,
			submitted: false,
			setError: {} as any,
		};
	},
	methods: {
		async onSubmit() {
			this.submitted = true;
			const response = (await setSignUp(this.formData)) as any;
			if (response.error) {
				// toast.error(response.message);
				createToast(response.message, { type: 'danger' });
				this.setError = response.fields;
			} else {
				createToast('Pendaftaran Berhasil', { type: 'success' });
				this.$router.push('/auth/login');
			}
		},
	},
});
</script>

<style scoped>
.card {
	margin-top: 50px;
	background-color: rgba(255, 255, 255, 0.13);
	border-radius: 10px;
	backdrop-filter: blur(10px);
	border: 2px solid rgba(255, 255, 255, 0.1);
	box-shadow: -5px 5px 10px rgba(176, 176, 176, 0.2), 5px -5px 10px rgba(176, 176, 176, 0.2),
		-5px -5px 10px rgba(216, 216, 216, 0.9), 5px 5px 13px rgba(176, 176, 176, 0.9),
		inset 1px 1px 2px rgba(216, 216, 216, 0.3), inset -1px -1px 2px rgba(176, 176, 176, 0.5);
	padding: 20px 20px;
	letter-spacing: 0.5px;
	outline: none;
	border: none;
}

.card-header .ch {
	background-color: #fff;
	/* border-bottom: 1px solid rgba(0,0,0,.125); */
}

.title {
	color: #7b1fa2;
	text-align: center;
	font-weight: 500;
}

.label {
	font-weight: 500;
	font-size: 0.8rem;
}

.input {
	display: block;
	background-color: #f8f8f8;
	border-radius: 5px;
	font-size: 14px;
	font-weight: 300;
}

.input:focus {
	color: #212529;
	background-color: #fff;
	border-color: #86b7fe;
	outline: 0;
	box-shadow: 0 0 0 0.25rem rgb(109 100 215 / 50%);
	/* border: 2px solid #bd0707;
	background-color: rgba(224, 200, 200, 25%);
	box-shadow: 0 0 10px 5px rgb(247, 161, 161); */
}

.rp-text-info {
	font-size: 14px;
	margin: 0;
}

.btn {
	width: 100%;
	font-size: 1rem;
}
</style>
