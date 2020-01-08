<template>
	<Header class="app-header">
		<div class="app-header-left" @dblclick="onMax">
			<Icon type="ios-bug" size="24" style="color: #19be6b"/>
			{{title}}
		</div>
		<div class="app-header-center" @dblclick="onMax">
			<div class="app-header-action-btn" :class="{'disabled':!isCanBack}">
				<Icon type="ios-arrow-back" size="24" @click.capture.stop="onBack"/>
			</div>
			<div class="app-header-action-btn" :class="{'disabled':!isCanForward}" @click.capture.stop="onForward">
				<Icon type="ios-arrow-forward" size="24"/>
			</div>
			<div class="app-header-action-btn" v-if="isDev" @click.capture.stop="onRefresh">
				<Icon type="md-refresh" size="24"/>
			</div>
		</div>
		<div class="app-header-right">
			<div class="app-header-action-btn" @click.capture.stop="onClose">
				<Icon type="ios-close" size="24" v-show="isClosable"/>
			</div>
			<div class="app-header-action-btn" @click.capture.stop="onMax">
				<Icon :type="maxIcon" size="16" v-show="isMaximizable" style="width: 24px;height: 24px;text-align: center;line-height: 24px"/>
			</div>
			<div class="app-header-action-btn" @click.capture.stop="onMinni">
				<Icon type="ios-remove" size="24" v-show="isMinimizable"/>
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
export default {
	name: "AppHeader",
	data() {
		const win = this.$options.win = sys.getCurrentWindow();
		return {
			isDebug: win.webContents.isDevToolsOpened(),
			isAlwaysOnTop: win.isAlwaysOnTop(),

			title: '',
			isMaximize: false,
			isMaximizable: win.isMaximizable() || true,
			isMinimizable: win.isMinimizable(),
			isClosable: win.isClosable(),
		}
	},
	computed: {
		maxIcon() {
			return this.isMaximize ? 'ios-browsers-outline' : 'ios-square-outline';
		},
		isCanBack() {
			return this.$router.history.current.fullPath !== '/';
		},
		isCanForward() {
			return true;
		},
	},
	created() {
		const win = this.$options.win;
		win.on('maximize', () => this.isMaximize = true);
		win.on('unmaximize', () => this.isMaximize = false);

		this.isAlwaysOnTop = sys.getStorage('isAlwaysOnTop', false);
		win.setAlwaysOnTop(this.isAlwaysOnTop === 'true');
		this.isAlwaysOnTop = win.isAlwaysOnTop();
	},
	methods: {
		onBack() {
			if (!this.isCanBack) return;
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
	}
}
</script>

<style scoped>
	.app-header {
		display: flex;
		z-index: 10;
		-webkit-app-region: drag;
	}

	.app-header > .app-header-left,
	.app-header > .app-header-center,
	.app-header > .app-header-right {
		padding: 0 5px;
		white-space: nowrap;
		overflow: hidden;
	}

	.app-header > .app-header-left {
		font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		font-size: 16px;
		line-height: 48px;
		text-overflow: ellipsis;
		flex: 0 0 140px;
	}

	.app-header > .app-header-center {
		/*width: 84px;*/
		flex-grow: 1;
	}

	.app-header > .app-header-right {
		/*width: 156px;*/
	}

	.app-header > .app-header-right > div {
		float: right;
	}

	.app-header .app-header-action-btn {
		display: inline-block;
		/*padding-left: 10px;*/
		/*padding-right: 10px;*/

		line-height: 48px;
		transition: all 0.1s;

		user-select: none;
		-webkit-app-region: no-drag;
	}

	.app-header .app-header-action-btn:not(.disabled):active {
		opacity: 0.8;
	}

	.app-header .app-header-action-btn.disabled {
		opacity: 0.6;
	}

	.app-header > .app-header-action-btn > .ivu-icon {
		vertical-align: middle;
	}

	.app-header > .app-header-action-btn:active {
		opacity: 0.3;
	}
</style>
