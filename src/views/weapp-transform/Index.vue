<template>
	<Layout class="layout">
		<Content>
			<Table :columns="columns" :data="data" :height="tableHeight">
				<template v-slot:status="{row,index}">
					<Icon type="ios-square" style="color: #ed4014" size="24" @click="onToggle(row)" v-if="row.status"></Icon>
					<Icon type="ios-play" style="color: #19be6b" size="24" @click="onToggle(row)" v-else></Icon>
				</template>

				<template v-slot:action="{row,index}">
					<Icon type="ios-trash-outline" style="color: #ed4014" size="24" @click="onDelete(index)"></Icon>
				</template>
			</Table>
		</Content>
		<Footer class="layout-footer">
			<Button :to="{name:'weapp_transform.add'}" icon="ios-add" type="primary">新增</Button>
		</Footer>
	</Layout>
</template>

<script>
import store from './store';

export default {
	name: "WeappTransform",
	data() {
		return {
			data: store.getProjectList(),
			columns: [
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
	methods: {
		onToggle(row) {
			if (row.status) {
				store.stopProject(row.id);
			} else {
				store.startProject(row.id);
			}
		},
		onDelete: function(index) {
			sys.showModal({
				icon: 'confirm',
				title: '温馨提示',
				content: '你确定要删除这个项目吗？',
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
