<template>
	<Layout class="layout">
		<Content>
			<Table :columns="columns" :data="data" :height="tableHeight">
				<template v-slot:status="{row,index}">
					<Icon type="ios-square" style="color: #ed4014" size="24" @click="onToggle(row,index)" v-if="row.status"></Icon>
					<Icon type="ios-play" style="color: #19be6b" size="24" @click="onToggle(row,index)" v-else></Icon>
				</template>

				<template v-slot:count="{row,index}">
					<span style="color: #19be6b">{{row.count}}</span>
				</template>

				<template v-slot:action="{row,index}">
					<Icon type="ios-trash-outline" style="color: #ed4014" size="24" @click="onDelete(index)"></Icon>
					<router-link tag="Icon" class="ivu-icon-ios-eye" style="font-size: 24px"
							:to="{name:'filewatcher.detail',params:{id:row.watcherId}}" v-show="row.status"></router-link>
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
		this.tableHeight = this.$el.getBoundingClientRect().height - 48;
	},
	destroyed() {
		// if (IS_DEV) store.destroy();
	},
	methods: {
		onToggle(row, index) {
			if (row.status) {
				store.stop(index);
			} else {
				store.start(index);
			}
		},
		onDelete: function(index) {
			sys.showModal({
				icon: 'confirm',
				title: '温馨提示',
				content: '你确定要删除这个监听目录吗？',
				onOk: () => {
					store.deleteProject(index);
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
