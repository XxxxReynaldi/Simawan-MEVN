<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div>
						<div class="card-body">
							<h3 class="card-title title">Sign In</h3>
							<div style="height: 30px"></div>
							<form @submit.prevent="onSubmit">
								<div class="mb-3">
									<label class="form-label label">Email </label>
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
								<!-- <p class="rp-text-info" style="text-align: right">
									<a href="#">lupa password?</a>
								</p> -->
								<div style="height: 30px"></div>
								<button type="submit" class="btn btn-primary">Submit</button>
								<div style="height: 20px"></div>
								<p class="rp-text-info" style="text-align: center">
									Belum punya akun?
									<RouterLink to="/auth/register">Buat akun disini</RouterLink>
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
import { defineComponent } from 'vue';
import Cookies from 'js-cookie';

import { createToast } from 'mosha-vue-toastify';
import { setSignIn } from '@/services/auth';

// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css';

export default defineComponent({
	data() {
		return {
			formData: {
				email: '',
				password: '',
			},
			submitted: false,
			setError: {} as any,
		};
	},
	methods: {
		async onSubmit() {
			this.submitted = true;
			const response = (await setSignIn(this.formData)) as any;
			if (response.error) {
				createToast(response.message, { type: 'danger' });
				this.setError = response.fields;
			} else {
				createToast('Login Berhasil', { type: 'success' });
				const { token } = response.data;
				const tokenBase64 = btoa(token);
				Cookies.set('token', tokenBase64, { expires: 1 });
				this.$router.push('/admin/kelas');
			}
		},
	},
});
</script>

<style scoped>
.card {
	height: 520px;
	width: 400px;
	background-color: rgba(255, 255, 255, 0.13);
	position: absolute;
	top: 50%;
	left: 50%;
	border-radius: 10px;
	transform: translate(-50%, -50%);
	/* margin-right: -50%; */
	backdrop-filter: blur(10px);
	border: 2px solid rgba(255, 255, 255, 0.1);
	box-shadow: -5px 5px 10px rgba(176, 176, 176, 0.2), 5px -5px 10px rgba(176, 176, 176, 0.2),
		-5px -5px 10px rgba(216, 216, 216, 0.9), 5px 5px 13px rgba(176, 176, 176, 0.9),
		inset 1px 1px 2px rgba(216, 216, 216, 0.3), inset -1px -1px 2px rgba(176, 176, 176, 0.5);
	padding: 50px 35px;
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
	height: 50px;
	width: 100%;
	background-color: #f8f8f8;
	border-radius: 5px;
	font-size: 14px;
	font-weight: 300;
}

.rp-text-info {
	font-size: 14px;
	margin: 0;
}

.btn {
	width: 100%;
	display: inline-block;
	position: relative;
	padding: 10px 0;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	vertical-align: middle;
	font-weight: 500;
	font-size: 18px;
	letter-spacing: 2px;
	color: #fff;
	background-color: #3f50e3;
	border-radius: 10px;
	box-shadow: -2px -2px 8px rgba(255, 255, 255, 1), -2px -2px 12px rgba(255, 255, 255, 0.5),
		inset 2px 2px 4px rgba(255, 255, 255, 0.1), 2px 2px 8px rgba(0, 0, 0, 1);
	/* box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #fff; */
}

.btn:hover {
	color: #fff;
	box-shadow: 1px 1px 2px rgba(82, 104, 255, 0.3), -1px -1px 2px rgba(44, 56, 159, 0.5),
		inset -5px 5px 10px rgba(44, 56, 159, 0.2), inset 5px -5px 10px rgba(44, 56, 159, 0.2),
		inset -5px -5px 10px rgba(82, 104, 255, 0.9), inset 5px 5px 13px rgba(44, 56, 159, 0.9);
}
</style>
