<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
	<TheHeader title="Halaman Siswa" subtitle="Menampilkan halaman siswa" />
	<CardHeader
		title="Total siswa saat ini"
		subtitle="Klik tombol di samping kiri untuk menambahkan siswa baru."
		:countNum="4"
		@add-click="handleAdd()"
	/>
	<div style="height: 48px"></div>

	<div class="container" :style="{ 'padding-left': '0px', 'padding-right': '32px' }">
		<div class="row">
			<div
				class="col-xs-6 col-md-3"
				:style="{ 'padding-top': '12px', 'padding-bottom': '12px' }"
				v-for="item in listSiswa"
				:key="item.NIS"
			>
				<CardSiswa
					:payload="item"
					@edit-click="handleEdit($event)"
					@remove-click="handleDelete($event)"
				/>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from '@/components/atoms/TheHeader.vue';
import CardHeader from '@/components/molecules/CardHeader.vue';
import CardSiswa from '@/components/atoms/CardSiswa.vue';

import { getAllSiswa } from '@/services/siswa';

export default defineComponent({
	components: { TheHeader, CardHeader, CardSiswa },
	mounted() {
		this.getListSiswa();
	},
	data() {
		return {
			listSiswa: [] as any,
			totalSiswa: 0,
		};
	},
	methods: {
		async getListSiswa() {
			const response = (await getAllSiswa()) as any;
			this.listSiswa = response.data.data;
			this.totalSiswa = response.data.total;
		},
		handleAdd() {
			this.$router.push('/admin/siswa/validasi');
		},
		handleEdit(e: Event) {
			// console.log('edit', e);
		},
		handleDelete(e: Event) {
			// console.log('delete', e);
		},
	},
});
</script>
<style></style>
