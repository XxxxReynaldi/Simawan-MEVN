<template>
	<!-- <DataTable :rows="payload" striped sn>
		<template #thead-sn>
			<TableHeadCell>No</TableHeadCell>
		</template>

		<template #thead>
			<TableHeadCell>Jenis Pelanggaran</TableHeadCell>
			<TableHeadCell>Jumlah Poin</TableHeadCell>
			<TableHeadCell colspan="2">Opsi</TableHeadCell>
		</template>

		<template #tbody-sn="{ sn }">
			<TableHeadCell>{{ sn.toString().padStart(2, '0') }}</TableHeadCell>
		</template>

		<template #tbody="{ row }">
			<TableBodyCell>{{ row.jenisPelanggaran }}</TableBodyCell>
			<TableBodyCell>{{ row.jumlahPoin }}</TableBodyCell>
			<TableBodyCell>
				<button class="btn btn-success" @click="editClicked(row)">
					<i class="fas fa-edit"></i>
				</button>
			</TableBodyCell>
			<TableBodyCell>
				<button class="btn btn-danger" @click="removeClicked(row)">
					<i class="fas fa-trash"></i>
				</button>
			</TableBodyCell>
		</template>
	</DataTable> -->
	<table class="custom-table">
		<thead class="custom-thead custom-thead-row">
			<th class="custom-thead-col">No</th>
			<th class="custom-thead-col">Jenis Pelanggaran</th>
			<th class="custom-thead-col">Poin</th>
			<th class="custom-thead-col">Opsi</th>
		</thead>
		<tbody class="custom-tbody" v-if="payload.length != 0">
			<tr class="custom-tbody-row" v-for="(item, i) of payload" :key="item._id">
				<td class="custom-tbody-col1 custom-tbody-col2">
					<div class="tag">{{ i + 1 }}</div>
				</td>
				<td class="custom-tbody-col1 custom-tbody-col2">
					<div class="tag">{{ item.jenisPelanggaran }}</div>
				</td>
				<td class="custom-tbody-col1 custom-tbody-col2">
					<div class="tag">{{ item.jumlahPoin }}</div>
				</td>
				<td class="custom-tbody-col1 custom-tbody-col2">
					<button class="btn btn-success" @click="editClicked(item)">
						<i class="fas fa-edit"></i>
					</button>
					<div style="width: 8px"></div>
					<button class="btn btn-danger" @click="removeClicked(item)">
						<i class="fas fa-trash"></i>
					</button>
				</td>
			</tr>
		</tbody>
		<tbody v-if="payload?.length == 0">
			<tr>
				<td colspan="3" class="custom-tbody-col1 custom-tbody-col2">
					<div class="tag">Data Tidak Ada!</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DataTable, TableHeadCell, TableBodyCell } from '@jobinsjp/vue3-datatable';
import '@jobinsjp/vue3-datatable/dist/style.css';

export default defineComponent({
	components: { DataTable, TableHeadCell, TableBodyCell },
	props: {
		payload: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['edit-click', 'remove-click'],
	methods: {
		editClicked(payload: any) {
			this.$emit('edit-click', payload);
		},
		removeClicked(payload: any) {
			this.$emit('remove-click', payload);
		},
	},
});
</script>
