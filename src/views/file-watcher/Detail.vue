<template>
	<Layout class="layout">
		<Content>
			<Table ref="selection" :columns="columns" :data="data" :height="tableHeight"
					@on-select-all="onSelectAll(true)"
					@on-select-all-cancel="onSelectAll(false)"
					@on-select="onSelect"
					@on-select-cancel="onSelect">
				<template v-slot:action="{row,index}">
					<Icon type="ios-trash-outline" style="color: #ed4014" size="24" @click="onDelete(index)"></Icon>
				</template>
			</Table>
		</Content>
		<Footer class="layout-footer">
			<Dropdown @on-click="onExport">
				<Button icon="ios-download-outline" @click="onExport('folder')" type="success">
					导出到桌面
					<Icon type="ios-arrow-up" @click.capture.stop=""></Icon>
				</Button>
				<DropdownMenu slot="list">
					<DropdownItem name="zip">
						<Icon type="ios-archive"/>
						压缩包
					</DropdownItem>
					<DropdownItem name="target" v-if="info && info.targetpath">
						<Icon type="ios-download-outline"/>
						目标目录
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>

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
const fs = require('fs');

export default {
	name: "FileWatcherDetail",
	data: function() {
		return {
			data: store.getFiles(this.$route.query.id),
			info: store.getProjectDetail(this.$route.query.id),
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
					title: '最后更新时间',
					key: 'last_time',
					width: 150,
					render: (h, params) => {
						return h('span', util.dateFormat('yyyy-MM-dd hh:mm:ss', new Date(params.row.last_time || 0)));
					}
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
		const handler = () => {
			this.tableHeight = this.$el.getBoundingClientRect().height - 48;
		};
		window.addEventListener('resize', handler);
		this.$once('hook:beforeDestroy', () => {
			window.removeEventListener('resize', handler);
		});
		handler();
	},
	created() {
		if (this.info.status !== 1) {
			sys.showModal({
				title: '温馨提示',
				content: '当前项目未开启目录监听，是否现在开启？',
				onOk: () => {
					store.startProject(this.info.id);
				}
			});
		}
	},
	methods: {
		// 清空文件
		onClear() {
			sys.showModal({
				title: '温馨提示',
				content: '你确定要清空文件吗？',
				onOk: () => {
					this.data = store.clearFile(this.$route.query.id);
				}
			});
		},

		// 删除文件
		onDelete(index) {
			this.data = store.removeFile(this.$route.query.id, index);
		},

		//导出文件
		onExport(name) {
			sys.showLoading();
			const rootDir = this.info.path;
			const exportRootDir = (() => {
				if (name === 'target') {
					name = 'file';
					return this.info.targetpath;
				} else {
					return path.resolve(os.homedir(), 'Desktop', 'export' + util.dateFormat('yyyyMMddhhmmss'));
				}
			})();

			const fileList = this.$refs.selection.getSelection();

			if (!fileList.length) {
				sys.showToast({content: '无文件选择！'});
				sys.hideLoading();
				return;
			}

			try {
				if (name === 'zip') {
					this.exportZip(fileList, rootDir, exportRootDir);
				} else {
					this.exportFolder(fileList, rootDir, exportRootDir);
				}

				sys.showModal({
					title: '温馨提示',
					content: '文件已导出完毕，是否清空文件？',
					onOk: () => {
						this.data = store.clearFile(this.$route.query.id, fileList);
					}
				});
			} catch (e) {
				sys.showToast({content: e.message});
				console.error(e);
			}

			sys.hideLoading();
		},

		// 导出文件夹
		exportFolder(fileList, rootDir, exportRootDir) {
			fileList.forEach(item => {
				let newPath = item.path.replace(rootDir + '\\', '');
				newPath = path.resolve(exportRootDir, newPath);
				console.debug(item.path, '->', newPath);
				util.copyFileSync(item.path, newPath);
			});
		},

		// 导出zip格式文件
		exportZip(fileList, rootDir, exportRootDir) {
			const zipArchiver = require('archiver')('zip', {
				store: true
			});
			const output = fs.createWriteStream(exportRootDir + '.zip');
			zipArchiver.on('error', function(err) {
				throw err;
			});
			zipArchiver.pipe(output);
			fileList.forEach(item => {
				let newPath = item.path.replace(rootDir + '\\', '');
				console.debug(item.path, '->', newPath);
				zipArchiver.append(fs.readFileSync(item.path), {name: newPath});
			});
			zipArchiver.finalize();
		},

		// 全选
		onSelectAll(flag) {
			this.data.forEach(item => {
				item._checked = flag;
			});
			store.saveWatcher(this.$route.query.id);
		},

		// 某行选择
		onSelect(selection) {
			this.data.forEach(item => {
				item._checked = selection.findIndex(item2 => item2.path === item.path) !== -1;
			});
			store.saveWatcher(this.$route.query.id);
		},
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
