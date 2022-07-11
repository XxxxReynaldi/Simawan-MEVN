<template>
	<DataTable :rows="payload" striped sn>
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
	</DataTable>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
	DataTable,
	TableBody,
	TableHead,
	TableHeadCell,
	TableBodyCell,
} from '@jobinsjp/vue3-datatable';
import '@jobinsjp/vue3-datatable/dist/style.css';

export default defineComponent({
	components: { DataTable, TableBody, TableHead, TableHeadCell, TableBodyCell },
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
