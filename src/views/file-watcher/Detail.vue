<template>
	<Layout class="layout">
		<Content>
			<Table ref="selection" :columns="columns" :data="data">
			</Table>
		</Content>
		<Footer class="layout-footer">
			<Button @click="onExport">导出到桌面</Button>
		</Footer>
	</Layout>
</template>

<script>
import store from './store';
import util from './util';

const os = require('os');
const path = require('path');


export default {
	name: "FileWatcherDetail",
	data: function() {
		console.log(this.$route);
		return {
			data: store.getDetail(this.$route.params.id),
			columns: [
				{
					type: 'selection',
					width: 32,
					key: '_checked'
				},
				{
					type: 'index',
					width: 80
				},
				{
					title: '路径',
					key: 'path'
				},
			],
			tableHeight: 0
		};
	},
	mounted() {
		this.tableHeight = this.$el.getBoundingClientRect().height - 48;
	},
	methods: {
		onExport() {
			const exportRootDir = path.resolve(os.homedir(), 'Desktop', 'export' + util.dateFormat('yyyyMMddhhmmss'));
			const originalRootDir = store.getPath(this.$route.params.id);
			this.$refs.selection.getSelection().forEach(item => {
				let newPath = item.path.replace(originalRootDir + '\\', '');
				newPath = path.resolve(exportRootDir, newPath);
				console.debug(item.path, '->', newPath);
				util.copyFileSync(item.path, newPath);
			});
		}
	}
}
</script>

<style scoped>
	.layout {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}

	>>> .ivu-table-wrapper,
	>>> .ivu-table-wrapper .ivu-table,
	>>> .ivu-table-wrapper .ivu-table td {
		border: none;
	}

	.layout-footer {
		padding: 8px 16px;
	}
</style>
