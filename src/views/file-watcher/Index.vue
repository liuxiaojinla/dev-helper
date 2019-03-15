<template>
	<Layout>
		<Content>
			<Table stripe :columns="columns" :data="data">
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
							:to="{name:'uploader.detail',params:{id:row.watcherId}}" v-show="row.status"></router-link>
				</template>
			</Table>
		</Content>
		<Footer>
			<router-link :to="{name:'uploader.add'}" tag="Button">新增</router-link>
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
					slot: 'status',

				},
				{
					title: '改动数量',
					slot: 'count'
				},
				{
					title: '操作',
					slot: 'action'
				}
			],
		};
	},
	destroyed() {
		store.destroy();
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
					store.delete(index);
				}
			});
		}
	}
}
</script>

<style scoped>

</style>
