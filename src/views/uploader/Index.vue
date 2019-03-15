<template>
	<Layout>
		<Content>
			<Table stripe :columns="columns" :data="data"></Table>
		</Content>
		<Footer>
			<router-link :to="{name:'uploader.add'}" tag="Button">新增</router-link>
			<!--<Button @click="onDelete()">删除</Button>-->
		</Footer>
	</Layout>
</template>

<script>
import store from './store';

console.log(store.getList())
export default {
	name: "Uploader",
	$store: store,
	data: function() {
		return {
			data: store.getList(),
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
					key: 'status',
					render: (h, ctx) => {
						return h('Button', {
							on: {
								click: () => {
									if (ctx.row.status) {
										store.stop(ctx.index);
									} else {
										store.start(ctx.index);
									}
								}
							}
						}, ctx.row.status ? '停止' : '启动');
					}
				},
				{
					title: '改动数量',
					key: 'count'
				},
				{
					title: '操作',
					render: (h, ctx) => {
						return h('Button', {
							on: {
								click: () => {
									sys.showModal({
										icon: 'confirm',
										title: '温馨提示',
										content: '你确定要删除这个监听目录吗？',
										onOk: () => {
											store.delete(ctx.index);
										}
									});
								}
							}
						}, '删除');
					}
				}
			],
		};
	}
}
</script>

<style scoped>

</style>
