<template>
	<Row type="flex" class="home">
		<Col class="nav">
			<Menu :active-name="0" width="auto" @on-select="onNavChange" class="nav">
				<MenuItem v-for="(group,index) in data" :key="group.name" :name="index">
					<span :class="iconClasses(group.icon)" style="font-size: 28px"></span>
					<span style="font-size:13px;margin-left: 5px">{{group.title}}</span>
				</MenuItem>
			</Menu>
		</Col>
		<Col class="content">
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
import Setting from './Setting';

const iconPrefixCls = 'ivu-icon';

export default {
	name: 'Home',
	components: {
		AutoDeployment,
		WebsiteKit,
		Action,
		ActionGroup,
		Setting
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
		flex-wrap: nowrap;
	}

	.nav {
		height: calc(100vh - 58px);
		background-color: transparent;
		flex: 0 0 138px;
	}

	.nav .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.nav .ivu-menu-vertical .ivu-menu-item {
		padding: 15px;
	}

	.content {
		transform: translate(0, 0);
		overflow-y: auto;
		height: calc(100vh - 58px);
		overflow-x: hidden;
		flex: 1 1 auto;
	}
</style>
