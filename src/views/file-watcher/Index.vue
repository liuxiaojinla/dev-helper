<template>
	<Layout class="layout">
		<Content>
			<Table :columns="columns" :data="data" :height="tableHeight">
				<template v-slot:status="{row,index}">
					<Icon type="ios-square" style="color: #ed4014" size="24" @click="onToggle(row)" v-if="row.status"></Icon>
					<Icon type="ios-play" style="color: #19be6b" size="24" @click="onToggle(row)" v-else></Icon>
				</template>

				<template v-slot:targetpath="{row,index}">
					<Icon type="ios-folder" @click="onSelectPath(row,'target_path')" size="18" style="margin-right: 8px"/>
					<span>{{row.targetpath}}</span>
				</template>

				<template v-slot:count="{row,index}">
					<span style="color: #19be6b">{{row.count}}</span>
				</template>

				<template v-slot:action="{row,index}">
					<Icon type="ios-trash-outline" style="color: #ed4014" size="24" @click="onDelete(row)"></Icon>
					<router-link tag="Icon" class="ivu-icon-ios-eye" style="font-size: 24px"
							:to="{name:'filewatcher.detail',query:{id:row.id}}"></router-link>
				</template>
			</Table>
		</Content>
		<Footer class="layout-footer">
			<Button :to="{name:'filewatcher.add'}" icon="ios-add" type="primary">新增</Button>
		</Footer>
	</Layout>
</template>

<script>
import store from './store';

export default {
	name: "FileWatcher",
	$store: store,
	data: function() {
		return {
			data: store.getProjectList(),
			columns: [
				// {
				// 	type: 'selection'
				// },
				{
					title: '名称',
					key: 'title'
				},
				{
					title: '路径',
					key: 'path'
				},
				{
					title: '目标路径',
					slot: 'targetpath'
				},
				{
					title: '状态',
					slot: 'status',
					width: 100,
				},
				{
					title: '改动数量',
					slot: 'count',
					width: 100,
				},
				{
					title: '操作',
					slot: 'action',
					width: 100,
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
		const win = sys.getCurrentWindow();
		if (win.getSize()[0] < 640) {
			win.setSize(640, 480, true);
		}
	},
	destroyed() {
		// if (IS_DEV) store.destroy();
	},
	methods: {
		onToggle(row) {
			if (row.status) {
				store.stopProject(row.id);
			} else {
				store.startProject(row.id);
			}
		},
		onDelete: function(row) {
			sys.showModal({
				icon: 'confirm',
				title: '温馨提示',
				content: '你确定要删除这个监听目录吗？',
				onOk: () => {
					store.deleteProject(row.id);
				}
			});
		},
		onSelectPath(row) {
			sys.openFileSelectDialog({
				properties: ['openDirectory']
			}).then((files) => {
				store.setProjectTargetPath(row.id, files[0]);
			});
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
