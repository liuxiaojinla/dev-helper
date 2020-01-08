<template>
	<Sider class="app-aside" width="140" hide-trigger collapsible :collapsed-width="78">
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
</style>
