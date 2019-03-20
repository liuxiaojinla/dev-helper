<template>
	<Collapse class="home" :value="Object.keys(data)" simple>
		<Panel v-for="group in data">
			<span :class="iconClasses(group.icon)" style="font-size: 18px"></span>
			{{group.title}}
			<Row slot="content">
				<Col span="4" v-for="item in group.child" @click.native="onHandle(item)">
					<p>
						<Icon :type="item.icon" size="32"/>
					</p>
					<p class="action-title">{{item.title}}</p>
				</Col>
			</Row>
		</Panel>
	</Collapse>
</template>

<script>
import ACTION_LIST from '../../data/actions';
import {shell} from 'electron';

const iconPrefixCls = 'ivu-icon';
export default {
	name: 'Home',
	data() {
		return {
			data: ACTION_LIST
		};
	},
	computed: {},
	methods: {
		onHandle: function(item) {
			if (item.type === 'page') {
				this.$router.push(item.detail);
			} else if (item.type === 'url') {
				shell.openExternal(item.url);
			}
		},
		iconClasses(type) {
			return [
				iconPrefixCls,
				{
					[`${iconPrefixCls}-${type}`]: type !== '',
				}
			];
		},
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
		margin-top: 8px;
	}
</style>
