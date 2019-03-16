<template>
	<Row class="home">
		<Col span="4" v-for="item in data" @click.native="onHandle(item)">
			<p>
				<Icon :type="item.icon" size="48"/>
			</p>
			<p class="action-title">{{item.title}}</p>
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
		padding: 8px;
		cursor: pointer;
		text-align: center;
	}

	.action-title {
		font-size: 12px;
	}
</style>
