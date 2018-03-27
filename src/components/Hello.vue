<template>
	<div class="hello">
		<Button type="primary" @click="loadData">Ajax</Button>
		{{data}}
	</div>
</template>

<script>
	export default {
		name: 'Hello',
		data() {
			return {
				data: []
			}
		},
		created() {
		},
		methods: {
			loadData() {
				sys.request.post('https://www.sojson.com/open/api/weather/json.shtml?city=%E5%8C%97%E4%BA%AC', {}, (data) => {
					console.log(data);
					this.data = data;
				});
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello {
	}
</style>
