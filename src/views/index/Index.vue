<template>
	<Row type="flex">
		<Col :xs="6" :sm="8" :md="6" :lg="4" class="nav">
			<Menu :active-name="0" width="auto" @on-select="onNavChange" class="nav">
				<MenuItem v-for="(group,index) in data" :key="group.name" :name="index">
					<span :class="iconClasses(group.icon)" style="font-size: 28px"></span>
					<span style="font-size:13px;margin-left: 5px">{{group.title}}</span>
				</MenuItem>
			</Menu>
		</Col>
		<Col :xs="18" :sm="16" :md="18" :lg="20" class="content">
			<keep-alive :exclude="$router.options.exclude" :max="10">
				<component :is="data[componentIndex].page" v-bind="data[componentIndex].options"></component>
			</keep-alive>
		</Col>
	</Row>
</template>

<script>
import {ipcRenderer} from 'electron';
import ACTION_LIST from '../../data/actions';
import AutoDeployment from '../auto-deployment/Index';
import WebsiteKit from '../website-kit/Index';
import Action from './Action';
import ActionGroup from './ActionGroup';

const iconPrefixCls = 'ivu-icon';

export default {
	name: 'Home',
	components: {
		AutoDeployment,
		WebsiteKit,
		Action,
		ActionGroup
	},
	data() {
		return {
			data: ACTION_LIST,
			componentIndex: 0
		};
	},
	methods: {
		iconClasses(type) {
			return [
				iconPrefixCls,
				{
					[`${iconPrefixCls}-${type}`]: type !== '',
				}
			];
		},
		onNavChange(index) {
			if ('app.update' === this.data[index].name) {
				ipcRenderer.send('app.update');
			} else {
				this.componentIndex = index;
			}
		}
	}
}
</script>

<style scoped>
	.home {
		user-select: none;
	}

	.nav {
		height: calc(100vh - 58px);
		background-color: transparent;
	}

	.nav .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.content {
		transform: translate(0, 0);
		overflow-y: auto;
		max-height: calc(100vh - 58px);
	}
</style>
