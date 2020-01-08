<template>
	<Header class="app-header">
		<div class="app-header-left" @dblclick="onMax">
			<div class="app-header-action-btn" :class="{'disabled':!isCanBacked}">
				<Icon type="md-arrow-back" size="24" @click.capture.stop="onBack"/>
			</div>
			<!--			<div class="app-header-action-btn" :class="{'disabled':!isCanForward()}" @click.capture.stop="onForward">-->
			<!--				<Icon type="ios-arrow-forward" size="24"/>-->
			<!--			</div>-->
			<div class="app-header-action-btn" v-if="isDev" @click.capture.stop="onRefresh">
				<Icon type="md-refresh" size="24"/>
			</div>
			<span class="app-header-title">{{title}}</span>
		</div>
		<div class="app-header-right">
			<div class="app-header-action-btn" @click.capture.stop="onClose" v-show="isClosable">
				<Icon type="md-close" size="24"/>
			</div>
			<div class="app-header-action-btn" @click.capture.stop="onMax" v-show="isMaximizable">
				<Icon :type="maxIcon" size="19"/>
			</div>
			<div class="app-header-action-btn" @click.capture.stop="onMinni" v-show="isMinimizable">
				<Icon type="md-remove" size="24"/>
			</div>
			<Dropdown trigger="click" placement="bottom-end" :transfer="true" @on-click="onMoreMenuSelect" style="-webkit-app-region: no-drag">
				<div class="layout-action-btn">
					<Icon type="ios-more" size="24"/>
				</div>
				<DropdownMenu slot="list">
					<DropdownItem name="home">
						<Icon type="ios-home-outline" size="18"/>
						返回首页
					</DropdownItem>
					<DropdownItem name="debug">
						<Icon type="ios-bug-outline" size="18"/>
						{{isDebug?'关闭':'开启'}}调试模式
					</DropdownItem>
					<DropdownItem name="always-top">
						<Icon :type="isAlwaysOnTop?'ios-radio-button-on':'ios-radio-button-off'" size="18"/>
						{{isAlwaysOnTop?'取消':'设置'}}置顶
					</DropdownItem>
					<DropdownItem name="update">
						<Icon type="ios-cloud-download-outline" size="18"/>
						检查更新
					</DropdownItem>
					<DropdownItem name="setting">
						<Icon type="ios-cog-outline" size="18"/>
						设置
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	</Header>
</template>

<script>
import {ipcRenderer} from 'electron';

export default {
	name: "AppHeader",
	data() {
		const win = this.$options.win = sys.getCurrentWindow();
		return {
			title: '',

			isDev: IS_DEV,
			isDebug: win.webContents.isDevToolsOpened(),
			isAlwaysOnTop: win.isAlwaysOnTop(),

			isMaximize: false,
			isMaximizable: win.isMaximizable(),
			isMinimizable: win.isMinimizable(),
			isClosable: win.isClosable(),

			isCanBack: false
		}
	},
	computed: {
		maxIcon() {
			return this.isMaximize ? 'md-contract' : 'md-square-outline';
		},
		isCanBacked() {
			// console.log(this.$router)
			return this.$route.fullPath !== '/'; //  && this.isCanBack
		},
		isCanForward() {
			return true;
		},
	},
	created() {
		this.$nextTick(this.updateTitle);

		const win = this.$options.win;
		win.on('maximize', () => this.isMaximize = true);
		win.on('unmaximize', () => this.isMaximize = false);

		this.isAlwaysOnTop = sys.getStorage('isAlwaysOnTop', false);
		win.setAlwaysOnTop(this.isAlwaysOnTop === 'true');
		this.isAlwaysOnTop = win.isAlwaysOnTop();
	},
	methods: {
		onBack() {
			if (!this.isCanBacked) return;
			this.$router.go(-1);
		},
		onForward() {
			if (!this.isCanForward) return;
			this.$router.go(1);
		},
		onRefresh() {
			window.location.reload();
		},
		onMoreMenuSelect(name) {
			const win = this.$options.win;
			if ('debug' === name) {
				const isDebug = win.webContents.isDevToolsOpened();
				if (isDebug) {
					win.webContents.closeDevTools();
				} else {
					win.webContents.openDevTools();
				}
				this.isDebug = !isDebug;
			} else if ('home' === name) {
				this.$router.replace('/');
			} else if ('always-top' === name) {
				const isAlwaysOnTop = this.$options.win.isAlwaysOnTop();
				win.setAlwaysOnTop(!isAlwaysOnTop);
				this.isAlwaysOnTop = !isAlwaysOnTop;
			} else if ('setting' === name) {
				this.$router.push('/setting');
			} else if ('update' === name) {
				ipcRenderer.send('app.update');
			}
		},
		onMinni() {
			this.$options.win.minimize();
		},
		onMax() {
			const win = this.$options.win;
			this.isMaximize ? win.unmaximize() : win.maximize();
			this.isMaximize = !this.isMaximize;
		},
		onClose() {
			// this.$options.win.close();
			this.$options.win.hide();
		},
		updateTitle() {
			this.title = this.$route.meta.title;
		},
	},
	watch: {
		'$route'(to, from) {
			this.isCanBack = to.path !== '/';
			this.$nextTick(this.updateTitle);
		}
	}
}
</script>

<style scoped>
	.ivu-layout .ivu-layout-header.app-header {
		display: flex;
		z-index: 10;
		height: 44px;
		-webkit-app-region: drag;
	}

	.app-header > .app-header-left,
	.app-header > .app-header-right {
		padding: 9px 5px;
		line-height: 24px;
		white-space: nowrap;
		overflow: hidden;
	}

	.app-header > .app-header-left {
		font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		font-size: 16px;
		text-overflow: ellipsis;
		flex: 1 1 140px;
	}

	.app-header > .app-header-right {
		flex: 1 1 138px;
	}

	.app-header > .app-header-right > div {
		float: right;
	}

	.app-header-title {
		margin: 0 10px;
	}

	.app-header-action-btn {
		display: inline-block;

		transition: all 0.1s;

		user-select: none;
		-webkit-app-region: no-drag;
	}

	.app-header-action-btn .ivu-icon {
		line-height: 24px;
		vertical-align: bottom;
	}

	.app-header-action-btn:active {
		opacity: 0.8;
	}

	.app-header-action-btn.disabled {
		opacity: 0.2;
	}


</style>
