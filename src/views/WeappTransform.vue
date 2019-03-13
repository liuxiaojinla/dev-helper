<template>
	<Row class="home">
		<Col span="8" @click.native="onAdd()">
			<Icon type="ios-add" size="48"/>
		</Col>
		<Col span="8" v-for="(item,index) in data">
			{{item.path}}
			<i-button @click.native="onHandle(item)">监控</i-button>
			<i-button @click.native="onDelete(index)">删除</i-button>
		</Col>
	</Row>
</template>

<script>
export default {
	name: "WeappTransform",
	data() {
		return {
			data: []
		};
	},
	methods: {
		onAdd() {
			sys.openFileSelectDialog({
				properties: ['openDirectory']
			}).then((files) => {
				const item = {
					path: files[0]
				};
				this.data.unshift(item);
				this.saveData();
			});
		},
		onDelete(index) {
			this.data.splice(index, 1);
			this.saveData();
		},
		onHandle(item) {

		},
		saveData() {
			sys.setStorage('weapp-transform-project-list', this.data);
		}
	}
}
</script>

<style scoped>

</style>
