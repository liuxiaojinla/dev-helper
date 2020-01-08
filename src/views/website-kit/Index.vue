<template>
	<Row class="website-kit">
		<Col :xs="8" :sm="8" :md="6" :lg="3" v-for="item in actions" @click.native="onHandle(item)" :key="item.title">
			<p class="icon-wrapper">
				<Icon :custom="item.icon" size="72"/>
			</p>
			<p class="action-title">{{item.title}}</p>
			<p class="action-title">
				<i-switch v-model="item.status"></i-switch>
			</p>
		</Col>
	</Row>
</template>

<script>
export default {
	name: "WebsiteKit",
	data() {
		return {
			actions: [
				{
					name: 'apache',
					title: 'Apache',
					icon: 'dev-icon icon-apache',
					status: 0
				},
				{
					name: 'mysql',
					title: 'MySQL',
					icon: 'dev-icon icon-mysql',
					status: 0
				},
				{
					name: 'php',
					title: 'PHP',
					icon: 'dev-icon icon-php',
					status: 0
				},
			]
		};
	},
	methods: {
		onHandle(action) {

		}
	}
}
</script>

<style scoped>
	.website-kit {
		margin: 16px;
	}

	.website-kit >>> .ivu-col {
		padding: 8px;
		cursor: pointer;
		text-align: center;
	}

	.action-title {
		font-size: 12px;
		margin-top: 8px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.icon-wrapper {
		position: relative;
		color: darkcyan;
	}

	.icon-wrapper span.tips {
		position: absolute;
		right: 0;
		top: 0;
		color: #18b566;
	}

	.icon-wrapper::after {
		clear: both;
	}
</style>
