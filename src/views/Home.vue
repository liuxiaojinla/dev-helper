<template>
	<Row class="home">
		<Col span="4" v-for="item in data" @click.native="onHandle(item)">
			{{item.title}}
		</Col>
	</Row>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {
			data: [
				{
					title: '微信小程序转换',
					type: 'page',
					detail: {
						name: 'weapp_trsanform',
					}
				},
				{
					title: '关于',
					type: 'page',
					detail: {
						name: 'about',
					}
				}
			]
		};
	},
	methods: {
		onHandle: function(item) {
			if (item.type === 'web') {
				this.$router.push({
					name: 'webview',
					params: item.detail
				});
			} else if (item.type === 'page') {
				this.$router.push(item.detail);
			}
		}
	}
}
</script>
