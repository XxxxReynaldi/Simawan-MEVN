<template>
	<div class="content">
		<div class="inside-content">
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
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { DataTable, TableHeadCell, TableBodyCell } from '@jobinsjp/vue3-datatable';
import '@jobinsjp/vue3-datatable/dist/style.css';

export default defineComponent({
	// components: { DataTable, TableHeadCell, TableBodyCell },
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
<style>
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
