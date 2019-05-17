<template>
<!--	<Row type="flex">-->
<!--		<Col :xs="6" :sm="8" :md="6" :lg="4" class="nav">-->
<!--			<Menu active-name="group[0].name" width="auto">-->
<!--				<MenuItem v-for="group in data" :key="group.name" :name="group.name">-->
<!--					<span :class="iconClasses(group.icon)" style="font-size: 18px"></span>-->
<!--					{{group.title}}-->
<!--				</MenuItem>-->
<!--			</Menu>-->
<!--		</Col>-->
<!--		<Col :xs="18" :sm="16" :md="18" :lg="20" class="content">-->
<!--			-->
<!--		</Col>-->
<!--	</Row>-->
	<Collapse class="home" :value="Object.keys(data)" simple>
		<Panel v-for="group in data" :key="group.title">
			<span :class="iconClasses(group.icon)" style="font-size: 18px"></span>
			{{group.title}}
			<Row slot="content">
				<Col :xs="8" :sm="6" :md="4" :lg="2" v-for="item in group.child" @click.native="onHandle(item)" :key="item.title">
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
			} else if (item.type === 'custom') {
				item.click();
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
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
</style>
