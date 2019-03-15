<template>
	<Layout>
		<Content>
			<Table ref="selection" stripe :columns="columns" :data="data">
			</Table>
		</Content>
		<Footer>
			<Button @click="onExport">导出到桌面</Button>
		</Footer>
	</Layout>
</template>

<script>
import store from './store';

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
					key:'_checked'
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
		};
	},
	methods: {
		onExport() {
			console.log(this.$refs.selection.getSelection())
		}
	}
}
</script>

<style scoped>

</style>
