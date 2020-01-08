<template>
	<Sider class="app-aside" width="120" hide-trigger collapsible :collapsed-width="78">
		<div class="app-title">
			<Icon type="ios-bug" size="24" class="app-logo-icon"/>
			<span>开发小助手</span>
		</div>
		<Menu :active-name="0" theme="dark" width="auto" @on-select="onNavChange" class="nav">
			<MenuItem v-for="(group,index) in data" :key="group.name" :name="index">
				<span :class="iconClasses(group.icon)" class="app-aside-icon"/>
				<span style="font-size:13px;margin-left: 5px">{{group.title}}</span>
			</MenuItem>
		</Menu>
	</Sider>
</template>

<script>
import {ipcRenderer} from 'electron';
import MENU_LIST from "./data/aside";

const iconPrefixCls = 'ivu-icon';

export default {
	name: "AppAside",
	data() {
		return {
			data: MENU_LIST,
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
			const item = this.data[index];
			if ('app.update' === item.name) {
				ipcRenderer.send('app.update');
			} else {
				this.$router.replace({
					name: item.name
				});
			}
		}
	}
}
</script>

<style scoped>
	.app-aside {
		position: fixed;
		height: 100%;
		left: 0;
		overflow: auto;
	}

	.app-aside-icon {
		font-size: 20px;
		line-height: 13px;
		vertical-align: middle;
	}

	.app-title {
		color: white;
		padding: 10px 8px;
		line-height: 24px;

		-webkit-app-region: drag;
	}

	.app-logo-icon {
		color: #19be6b;
		vertical-align: bottom;
	}

	.app-aside .ivu-menu-vertical .ivu-menu-item {
		padding-left: 8px;
		padding-right: 8px;
	}
</style>
