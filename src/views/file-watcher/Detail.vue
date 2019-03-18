<template>
	<Layout class="layout">
		<Content>
			<Table ref="selection" :columns="columns" :data="data">
				<template v-slot:action="{row,index}">
					<Icon type="ios-trash-outline" style="color: #ed4014" size="24" @click="onDelete(index)"></Icon>
				</template>
			</Table>
		</Content>
		<Footer class="layout-footer">
			<Button icon="ios-download-outline" @click="onExport" type="success">
				导出到桌面
			</Button>
			<Button icon="ios-trash-outline" @click="onClear" type="error" style="margin-left: 16px">
				清空
			</Button>
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
		return {
			data: store.getProjectDetail(this.$route.params.id),
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
				{
					title: '操作',
					slot: 'action',
					width: 80,
				}
			],
			tableHeight: 0
		};
	},
	mounted() {
		this.tableHeight = this.$el.getBoundingClientRect().height - 48;
	},
	methods: {
		// 清空文件
		onClear() {
			sys.showModal({
				title: '温馨提示',
				content: '你确定要清空文件吗？',
				onOk: () => {
					this.data = store.clearFile(this.$route.params.id);
				}
			});
		},

		// 删除文件
		onDelete(index) {
			store.removeFile(this.$route.params.id, index);
		},

		//导出文件
		onExport() {
			const exportRootDir = path.resolve(os.homedir(), 'Desktop', 'export' + util.dateFormat('yyyyMMddhhmmss'));
			const originalRootDir = store.getProjectPath(this.$route.params.id);
			const fileList = this.$refs.selection.getSelection();
			fileList.forEach(item => {
				let newPath = item.path.replace(originalRootDir + '\\', '');
				newPath = path.resolve(exportRootDir, newPath);
				console.debug(item.path, '->', newPath);
				util.copyFileSync(item.path, newPath);
			});

			sys.showModal({
				title: '温馨提示',
				content: '文件已导出完毕，是否清空文件？',
				onOk: () => {
					this.data = store.clearFile(this.$route.params.id, fileList);
				}
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
