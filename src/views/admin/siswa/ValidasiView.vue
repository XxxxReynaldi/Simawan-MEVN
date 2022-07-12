<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
	<TheHeader title="Halaman Validasi Siswa" subtitle="Menampilkan data user yang telah mendaftar" />
	<div style="height: 48px"></div>
	<div class="container" style="padding-left: 0px; padding-right: 32px">
		<div class="card card-validasi">
			<div class="card-body">
				<div class="container">
					<div class="row">
						<div class="col-md-12 my-auto">
							<div class="card-title h5">User terdaftar : {{ totalUser }}</div>
						</div>
					</div>
					<div style="height: 24px"></div>
					<div class="row">
						<div class="col">
							<div class="container container-validasi">
								<!-- <app-table-user></app-table-user> -->
								<!-- <DataTable :rows="listUser" striped sn>
									<template #thead-sn>
										<TableHead>No</TableHead>
									</template>

									<template #thead>
										<TableHead>Nama</TableHead>
										<TableHead>NISN</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Telp</TableHead>
										<TableHead />
										<TableHead />
									</template>

									<template #tbody-sn="{ sn }">
										<TableHead>{{ sn.toString().padStart(2, '0') }}</TableHead>
									</template>

									<template #tbody="{ row }">
										<TableBody>{{ row.namaLengkap }}</TableBody>
										<TableBody>{{ row.NISN }}</TableBody>
										<TableBody>{{ row.email }}</TableBody>
										<TableBody>{{ row.telp }}</TableBody>
										<TableBody>
											<button class="btn btn-success" @click="handleValidation(row)">
												<i class="fas fa-edit"></i>
											</button>
										</TableBody>
										<TableBody>
											<button class="btn btn-danger" @click="handleDelete(row)">
												<i class="fas fa-trash"></i>
											</button>
										</TableBody>
									</template>
								</DataTable> -->
								<table class="custom-table">
									<thead class="custom-thead custom-thead-row">
										<th class="custom-thead-col">No</th>
										<th class="custom-thead-col">NISN</th>
										<th class="custom-thead-col">Nama Lengkap</th>
										<th class="custom-thead-col">Email</th>
										<th class="custom-thead-col">Opsi</th>
									</thead>

									<tbody v-if="listUser.length != 0" class="custom-tbody">
										<tr v-for="(item, i) in listUser" :key="item._id" class="custom-tbody-row">
											<td class="custom-tbody-col1 custom-tbody-col2">
												<div class="tag">{{ i + 1 }}</div>
											</td>
											<td class="custom-tbody-col1 custom-tbody-col2">
												<div class="tag">{{ item.NISN }}</div>
											</td>
											<td class="custom-tbody-col1 custom-tbody-col2">
												<div class="tag">{{ item.namaLengkap }}</div>
											</td>
											<td class="custom-tbody-col1 custom-tbody-col2">
												<div class="tag">{{ item.email }}</div>
											</td>
											<td class="custom-tbody-col1 custom-tbody-col2">
												<button class="btn btn-success" @click="handleValidation(item)">
													<i class="fas fa-edit"></i>
												</button>
												<div style="width: 8px"></div>
												<button class="btn btn-danger" @click="handleDelete(item)">
													<i class="fas fa-trash"></i>
												</button>
											</td>
										</tr>
									</tbody>
									<tbody v-if="listUser?.length == 0">
										<tr>
											<td colspan="3" class="custom-tbody-col1 custom-tbody-col2">
												<div class="tag">Data Tidak Ada!</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div style="height: 48px"></div>
	<ModalValidasi
		v-if="modalValidasiUser"
		:modalActive="modalValidasiUser"
		:listKelas="listKelas"
		:prefix="prefix"
		:suffix="suffix"
		:payload="payload"
		@closeModal="closeModal(suffix)"
	/>
	<ModalHapus
		v-if="modalHapus"
		:modalActive="modalHapus"
		:prefix="'Hapus'"
		:suffix="'User'"
		:payload="payload"
		@close-modal="closeModal"
	/>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheHeader from '@/components/atoms/TheHeader.vue';
import ModalValidasi from '@/components/molecules/ModalValidasi.vue';
import ModalHapus from '@/components/molecules/ModalHapus.vue';
import { DataTable, TableBody, TableHead } from '@jobinsjp/vue3-datatable';

import '@jobinsjp/vue3-datatable/dist/style.css';

import { getAllValidation } from '@/services/validasiUser';
import { getAllKelas } from '@/services/kelas';

export default defineComponent({
	components: { TheHeader, DataTable, TableBody, TableHead, ModalValidasi, ModalHapus },
	setup() {
		const modalValidasiUser = ref(false);
		const modalHapus = ref(false);
		return { modalValidasiUser, modalHapus };
	},
	mounted() {
		this.getListUser();
		this.getListKelas();
	},
	data() {
		return {
			listKelas: [] as any,
			listUser: [] as any,
			totalUser: 0,
			prefix: '',
			suffix: 'User',
			payload: {},
		};
	},
	methods: {
		async getListKelas() {
			const response = (await getAllKelas()) as any;
			this.listKelas = response.data.data;
		},
		async getListUser() {
			const response = (await getAllValidation({ validasi: 'pending' })) as any;
			this.listUser = response.data.data;
			this.totalUser = response.data.total;
		},
		handleValidation(payload: any) {
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalValidasiUser = !this.modalValidasiUser;
			this.prefix = 'Validasi';
			this.payload = payload;
			this.modalValidasiUser ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		handleDelete(payload: any) {
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalHapus = !this.modalHapus;
			this.prefix = 'Hapus';
			this.suffix = 'User';
			this.payload = payload;
			this.modalHapus ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		closeModal(suffix: string) {
			if (suffix === 'User') {
				this.modalValidasiUser = false;
			}
			this.modalHapus = false;
			this.getListUser();
		},
	},
});
</script>
<style>
.card-validasi {
	padding: 12px;
	border: 0;
	border-radius: 0.5rem;
	background: #fff;
	box-shadow: -5px 5px 10px rgba(179, 179, 179, 0.2), 5px -5px 10px rgba(179, 179, 179, 0.2),
		-5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(179, 179, 179, 0.9),
		inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(179, 179, 179, 0.5);
}

.container-validasi {
	padding: 1.75rem;
	background: #fafafa;
	box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(217, 217, 217, 0.5),
		inset -5px 5px 10px rgba(217, 217, 217, 0.2), inset 5px -5px 10px rgba(217, 217, 217, 0.2),
		inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px 5px 13px rgba(217, 217, 217, 0.9);
}

.content {
	position: relative;
	width: 100%;
	border-radius: inherit;
	overflow-x: auto;
	overflow-y: hidden;
	min-height: 0;
}

.inside-content {
	position: relative;
	width: 100%;
	display: table;
}

.custom-table {
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	color: rgba(0, 0, 0, 0.87);
	background-color: #ffffff;
}

.custom-thead {
	display: flex;
	width: 100%;
	color: rgba(0, 0, 0, 0.87);
	font-size: 12px;
	font-weight: 500;
}

.custom-thead-row {
	display: flex;
	-webkit-box-align: stretch;
	align-items: stretch;
	width: 100%;
	background-color: #ffffff;
	min-height: 52px;
}

.custom-thead-col {
	-webkit-box-flex: 1;
	flex-grow: 1;
	flex-shrink: 0;
	flex-basis: 0;
	max-width: 100%;
	min-width: 100px;
	padding: 16px;
}

.custom-tbody {
	display: flex;
	flex-direction: column;
}

.custom-tbody-row {
	display: flex;
	-webkit-box-align: stretch;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	font-size: 13px;
	font-weight: 400;
	color: rgba(0, 0, 0, 0.87);
	background-color: #ffffff;
	min-height: 48px;
}

.custom-tbody-col1 {
	-webkit-box-flex: 1;
	flex-grow: 1;
	flex-shrink: 0;
	flex-basis: 0;
	max-width: 100%;
	min-width: 100px;
}

.custom-tbody-col2 {
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	padding-left: 16px;
	padding-right: 16px;
	word-break: break-word;
}
</style>
