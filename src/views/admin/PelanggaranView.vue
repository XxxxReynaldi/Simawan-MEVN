<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
	<TheHeader title="Halaman Pelanggaran" subtitle="Menampilkan halaman pelanggaran" />
	<CardHeader
		title="Total jenis pelanggaran saat ini"
		subtitle="Klik tombol di samping kiri untuk menambahkan pelanggaran baru."
		:countNum="4"
		@add-click="handleAdd()"
	/>
	<div style="height: 28px"></div>
	<div class="container" style="padding: 0px 32px 32px 0px">
		<div class="card card-pelanggaran">
			<div class="card-body">
				<div class="container">
					<div class="row">
						<div class="col-md-12 my-auto">
							<div class="card-title">
								Jenis pelanggaran beserta poin yang tidak boleh dilakukan sebagai siswa
							</div>
						</div>
					</div>
					<div style="height: 24px"></div>
					<div class="row">
						<div class="col">
							<TheTabNav
								:tabs="['Kelakuan', 'Kerajinan', 'Kerapian']"
								:selected="selectedTab"
								@selected="setSelected"
							>
								<TheTab :isSelected="selectedTab === 'Kelakuan'">
									<div class="container container-tab">
										<TablePelanggaran
											:payload="listKelakuan"
											@edit-click="handleEdit($event)"
											@remove-click="handleDelete($event)"
										/>
									</div>
								</TheTab>
								<TheTab :isSelected="selectedTab === 'Kerajinan'">
									<div class="container container-tab">
										<TablePelanggaran
											:payload="listKerajinan"
											@edit-click="handleEdit($event)"
											@remove-click="handleDelete($event)"
										/>
									</div>
								</TheTab>
								<TheTab :isSelected="selectedTab === 'Kerapian'">
									<div class="container container-tab">
										<TablePelanggaran
											:payload="listKerapian"
											@edit-click="handleEdit($event)"
											@remove-click="handleDelete($event)"
										/>
									</div>
								</TheTab>
							</TheTabNav>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<ModalPelanggaran
		v-if="modalPelanggaran"
		:modalActive="modalPelanggaran"
		:prefix="prefix"
		:suffix="suffix"
		:payload="payload"
		@closeModal="closeModal(suffix)"
	/>
	<ModalHapus
		v-if="modalHapus"
		:modalActive="modalHapus"
		:prefix="'Hapus'"
		:suffix="'Pelanggaran'"
		:payload="payload"
		@close-modal="closeModal"
	/>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheHeader from '@/components/atoms/TheHeader.vue';
import CardHeader from '@/components/molecules/CardHeader.vue';
import TheTabNav from '@/components/organisms/TheTabNav.vue';
import TheTab from '@/components/organisms/TheTab.vue';
import TablePelanggaran from '@/components/molecules/TablePelanggaran.vue';
import ModalPelanggaran from '@/components/molecules/ModalPelanggaran.vue';
import ModalHapus from '@/components/molecules/ModalHapus.vue';

import { getAllPelanggaran } from '@/services/pelanggaran';

export default defineComponent({
	components: {
		TheHeader,
		CardHeader,
		TheTab,
		TheTabNav,
		TablePelanggaran,
		ModalPelanggaran,
		ModalHapus,
	},
	setup() {
		const modalPelanggaran = ref(false);
		const modalHapus = ref(false);

		return { modalPelanggaran, modalHapus };
	},
	mounted() {
		this.getListPelanggaran();
	},
	data() {
		return {
			prefix: '',
			suffix: 'Pelanggaran',
			selectedTab: 'Kelakuan',
			payload: {},
			listPelanggaran: [],
			listKelakuan: [],
			listKerajinan: [],
			listKerapian: [],
			totalPelanggaran: 0,
		};
	},
	methods: {
		async getListPelanggaran() {
			const response = (await getAllPelanggaran()) as any;
			this.listPelanggaran = response.data.data;
			this.totalPelanggaran = response.data.total;
			this.setCollection(this.listPelanggaran);
		},
		setCollection(dataPelanggaran: any) {
			const kelakuan = this.filterKategori(dataPelanggaran, 'kelakuan');
			const kerajinan = this.filterKategori(dataPelanggaran, 'kerajinan');
			const kerapian = this.filterKategori(dataPelanggaran, 'kerapian');

			this.listKelakuan = kelakuan;
			this.listKerajinan = kerajinan;
			this.listKerapian = kerapian;
		},
		filterKategori(data: any, selectKategori: string) {
			return data.filter((item: any) => item.kategori === selectKategori);
		},
		setSelected(tab: any) {
			this.selectedTab = tab;
		},
		handleAdd() {
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalPelanggaran = !this.modalPelanggaran;
			this.prefix = 'Tambah';
			this.modalPelanggaran ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		handleEdit(payload: any) {
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalPelanggaran = !this.modalPelanggaran;
			this.prefix = 'Edit';
			this.payload = payload;
			this.modalPelanggaran ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		handleDelete(payload: any) {
			const body = document.querySelector('div .body') as HTMLElement;
			this.modalHapus = !this.modalHapus;
			this.prefix = 'Hapus';
			this.suffix = 'Pelanggaran';
			this.payload = payload;
			this.modalHapus ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		},
		closeModal(suffix: string) {
			if (suffix === 'Pelanggaran') {
				this.modalPelanggaran = false;
			}
			this.modalHapus = false;
			this.getListPelanggaran();
		},
	},
});
</script>
<style>
.card-pelanggaran {
	padding: 12px;
	border: 0;
	border-radius: 0.5rem;
	background: #fff;
	box-shadow: -5px 5px 10px rgba(179, 179, 179, 0.2), 5px -5px 10px rgba(179, 179, 179, 0.2),
		-5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(179, 179, 179, 0.9),
		inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(179, 179, 179, 0.5);
}

.container-tab {
	padding: 1.75rem;
	background: #fafafa;
	box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(217, 217, 217, 0.5),
		inset -5px 5px 10px rgba(217, 217, 217, 0.2), inset 5px -5px 10px rgba(217, 217, 217, 0.2),
		inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px 5px 13px rgba(217, 217, 217, 0.9);
}
</style>
