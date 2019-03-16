<template>
	<Row class="home">
		<Col span="4" v-for="item in data" @click.native="onHandle(item)">
			{{item.title}}
		</Col>
	</Row>
</template>

<script>
import ACTION_LIST from '../data/actions';

export default {
	name: 'home',
	data() {
		return {
			data: ACTION_LIST
		};
	},
	methods: {
		onHandle: function(item) {
			if (item.type === 'page') {
				this.$router.push(item.detail);
			}
		}
	}
}
</script>

<style scoped>
	.home {
		user-select: none;
	}

	.home >>> .ivu-col {
		cursor: pointer;
	}
</style>
