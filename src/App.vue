<template>
	<Layout class="app-layout" id="app-layout" :style="appStyle">

		<AppAside/>

		<Layout :style="{marginLeft: '140px'}">
			<Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
			<Content :style="{padding: '0 16px 16px'}">
				<transition :name="transitionName" v-bind="transitionClass" mode="out-in">
					<keep-alive :exclude="$router.options.exclude" :max="10">
						<router-view/>
					</keep-alive>
				</transition>
			</Content>
		</Layout>

	</Layout>
</template>

<script>
import setting from './data/setting';
import {ipcRenderer} from 'electron';
import AppAside from "./AppAside";

export default {
	name: 'app',
	components: {AppAside},
	win: null,
	data() {
		const win = this.$options.win = sys.getCurrentWindow();
		return {
			isDebug: win.webContents.isDevToolsOpened(),
			isAlwaysOnTop: win.isAlwaysOnTop(),
			transitionName: '',
			title: '',
			isMaximize: false,
			isMaximizable: win.isMaximizable() || true,
			isMinimizable: win.isMinimizable(),
			isClosable: win.isClosable(),
			isDev: IS_DEV,
			isIn: true,

			backgroundImage: setting.getValue('backgroundImage'),
			foregroundColor: setting.getValue('color'),
		}
	},
	computed: {
		maxIcon() {
			return this.isMaximize ? 'ios-browsers-outline' : 'ios-square-outline';
		},
		transitionClass() {
			if (this.isIn) {
				return {
					enterActiveClass: "animated fadeIn",
					leaveActiveClass: "animated fadeOut"
				};
			} else {
				return {
					enterActiveClass: "",
					leaveActiveClass: "animated fadeOut"
				};
			}
		},
		appStyle() {
			const result = {
				'backgroundImage': `url(${this.backgroundImage})`,
			};
			if (this.foregroundColor) result.color = 'white';
			return result;
		}
	},
	mounted() {
		ipcRenderer.on('app.update', (_, type, res) => {
			console.log('app.update', type, res);
			if (type === 'update-available') {
				this.$Loading.start();
				this.$Notice.success({
					title: '已发现新版本!',
					desc: '正在下载，请稍后...'
				});
			} else if (type === 'update-not-available') {
				sys.showModal({
					icon: 'info',
					content: '当前版本已是最新！',
					showCancel: true,
				});
			} else if (type === 'download-progress') {
				this.$Loading.update(res.percent);
				// bytesPerSecond:141507
				// delta:156732
				// percent:2.553867696195353
				// total:39849950
				// transferred:1017715
			} else if (type === 'update-downloaded') {
				this.$Loading.finish();
				sys.showModal({
					title: "温馨提示",
					content: `'最新版本：${res.version}',现在是否马上更新？`,
					onOk: () => {
						ipcRenderer.send('updateNow');
					}
				});
			} else {
				sys.showModal({
					content: JSON.stringify(res),
					showCancel: false
				});
			}
		});
	},
	created() {
		this.$nextTick(this.updateTitle);
		const win = this.$options.win;
		win.on('maximize', () => this.isMaximize = true);
		win.on('unmaximize', () => this.isMaximize = false);

		this.isAlwaysOnTop = sys.getStorage('isAlwaysOnTop', false);
		win.setAlwaysOnTop(this.isAlwaysOnTop === 'true');
		this.isAlwaysOnTop = win.isAlwaysOnTop();

		// 监听背景图片被更新
		this.$on('update.background.image', (url) => this.backgroundImage = url);
		this.$on('update.color', (color) => this.foregroundColor = color);
	},
	methods: {
		isCanBack() {
			return this.$router.history.current.fullPath !== '/';
		},
		isCanForward() {
			return true;
		},
		onBack() {
			if (!this.isCanBack()) return;
			this.$router.go(-1);
		},
		onForward() {
			if (!this.isCanForward()) return;
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
			const toDepth = to.path.split('/').length;
			const fromDepth = from.path.split('/').length;
			this.transitionName = toDepth < fromDepth ? 'transition-out' : 'transition-in';
			this.isIn = toDepth >= fromDepth;
			this.$nextTick(this.updateTitle);
			console.log(location.href);
		}
	}
}
</script>

<!--<style>-->
<!--	.ivu-modal-mask {-->
<!--		height: calc(100vh - 10px);-->
<!--		margin: 5px;-->
<!--		border-radius: 5px;-->
<!--	}-->
<!--</style>-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.app-layout {
		position: relative;
		overflow: hidden;
		height: calc(100vh - 10px);
		margin: 5px;
		box-shadow: 0 0 5px #A0A0A0;
		transform: translate(0, 0);

		background-color: white !important;
		/*background: url("./assets/images/bg.jpg");*/
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: center center;
		background-size: cover;
	}

	.app-layout::before {
		content: '';
		filter: blur(5px);
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		/*z-index: -1;*/
		background: inherit;
		margin: -50px;
	}

	.app-layout-header {
		display: flex;
		z-index: 10;
		-webkit-app-region: drag;
	}

	.app-layout-header > .app-layout-header-left,
	.app-layout-header > .app-layout-header-center,
	.app-layout-header > .app-layout-header-right {
		padding: 0 5px;
		white-space: nowrap;
		overflow: hidden;
	}

	.app-layout-header > .app-layout-header-left {
		font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		font-size: 16px;
		line-height: 48px;
		text-overflow: ellipsis;
		flex: 0 0 140px;
	}

	.app-layout-header > .app-layout-header-center {
		/*width: 84px;*/
		flex-grow: 1;
	}

	.app-layout-header > .app-layout-header-right {
		/*width: 156px;*/
	}

	.app-layout-header > .app-layout-header-right > div {
		float: right;
	}

	.app-layout-header .app-layout-action-btn {
		display: inline-block;
		/*padding-left: 10px;*/
		/*padding-right: 10px;*/

		line-height: 48px;
		transition: all 0.1s;

		user-select: none;
		-webkit-app-region: no-drag;
	}

	.app-layout-header .app-layout-action-btn:not(.disabled):active {
		opacity: 0.8;
	}

	.app-layout-header .app-layout-action-btn.disabled {
		opacity: 0.6;
	}

	.app-layout-header > .app-layout-action-btn > .ivu-icon {
		vertical-align: middle;
	}

	.app-layout-header > .app-layout-action-btn:active {
		opacity: 0.3;
	}
</style>
