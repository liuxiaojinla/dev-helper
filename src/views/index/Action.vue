<template>
	<Row class="action">
		<Col :xs="8" :sm="6" :md="4" :lg="2" v-for="item in actions" @click.native="onHandle(item)" :key="item.title">
			<p>
				<Icon :type="item.icon" size="32"/>
			</p>
			<p class="action-title">{{item.title}}</p>
		</Col>
	</Row>
</template>

<script>
import {shell} from 'electron';

export default {
	name: "Action",
	props: {
		actions: Array,
		type: {
			type: String,
			default: 'link'
		}
	},
	computed: {},
	methods: {
		onHandle: function(item) {
			if (item.type === 'page') {
				this.$router.push(item.detail);
			} else if (item.type === 'url') {
				shell.openExternal(item.url);
			} else if (item.type === 'custom') {
				item.click();
			}
		},

	}
}
</script>

<style scoped>
	.action {
		margin: 16px;
	}

	.action >>> .ivu-col {
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
</style>
