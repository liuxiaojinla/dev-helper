<template>
	<Layout class="app-layout" id="app-layout">
		<Header class="app-layout-header">
			<div class="app-layout-header-left">
				<div class="app-layout-action-btn">
					<Icon type="ios-arrow-round-back" size="24" @click.native="onBack"/>
				</div>
				<div class="app-layout-action-btn" v-if="isDev">
					<Icon type="ios-refresh" size="24" @click.native="onRefresh"></Icon>
				</div>
			</div>
			<div class="app-layout-header-center" @dblclick="onMax">
				<Icon type="ios-bug" size="24" style="color: #19be6b"/>
				{{title}}
			</div>
			<div class="app-layout-header-right">
				<div class="app-layout-action-btn">
					<Icon type="ios-close" size="24" @click.native="onClose" v-show="isClosable"></Icon>
				</div>
				<div class="app-layout-action-btn">
					<Icon :type="maxIcon" size="16" @click.native="onMax" v-show="isMaximizable" style="width: 24px;height: 24px;text-align: center;line-height: 24px"></Icon>
				</div>
				<div class="app-layout-action-btn">
					<Icon type="ios-remove" size="24" @click.native="onMinni" v-show="isMinimizable"></Icon>
				</div>
				<Dropdown trigger="click" placement="bottom-end" :transfer="true" @on-click="onMenuSelect">
					<div class="layout-action-btn">
						<Icon type="ios-more" size="24"></Icon>
					</div>
					<DropdownMenu slot="list">
						<DropdownItem name="home">
							<Icon type="ios-home-outline" size="20"></Icon>
							返回首页
						</DropdownItem>
						<DropdownItem name="debug">
							<Icon type="ios-bug-outline" size="20"></Icon>
							{{isDebug?'关闭':'开启'}}调试模式
						</DropdownItem>
						<DropdownItem name="always-top">
							<Icon :type="isAlwaysOnTop?'ios-radio-button-on':'ios-radio-button-off'" size="20"/>
							{{isAlwaysOnTop?'取消':'设置'}}置顶
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</Header>
		<Content class="app-layout-content">
			<transition :name="transitionName"
					v-bind="transitionClass"
					mode="out-in">
				<!--				<keep-alive exclude="$router.exclude">-->
				<router-view/>
				<!--				</keep-alive>-->
			</transition>
		</Content>
	</Layout>
</template>

<script>
export default {
	name: 'app',
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
		}
	},
	computed: {
		maxIcon() {
			return this.isMaximize ? 'ios-browsers-outline' : 'ios-square-outline';
		},
		transitionClass() {
			if (this.isIn) {
				return {
					enterActiveClass: "animated fadeInUp",
					leaveActiveClass: "animated slideOutLeft"
				};
			} else {
				return {
					enterActiveClass: "animated fadeInDown",
					leaveActiveClass: "animated bounceOutDown"
				};
			}
		}
	},
	mounted() {
		require('particles.js');
		particlesJS('app-layout', {
			particles: {
				number: {
					value: 50
				},
				color: {
					value: ["#b61924", "#009688", "#5FB878", "#393D49", "#1E9FFF", "#FFB800"]
				},
				opacity: {
					value: 0.75,
					random: true,
					anim: {
						enable: true,
						speed: 1,
						opacity_min: 0,
						sync: false
					}
				},
				size: {
					value: 5,
					random: true,
					anim: {
						enable: true,
						speed: 3,
						size_min: 0.3,
						sync: false
					}
				},
				line_linked: {
					enable: false
				},
				move: {
					speed: 1,
					random: true
				},
				shape: {
					type: ["circle", "edge", "polygon", "star"]
				}
			},
			interactivity: {
				detect_on: "canvas",
				modes: {
					bubble: {
						distance: 250,
						size: 20,
						duration: 2,
						opacity: 0,
						speed: 3
					}
				}
			},
			retina_detect: true
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
	},
	methods: {
		onBack() {
			this.$router.go(-1);
		},
		onRefresh() {
			window.location.reload();
		},
		onMenuSelect(name) {
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
			console.log(location.href)
		}
	}
}
</script>

<style>
	.particles-js-canvas-el {
		position: fixed;
		left: 0;
		top: 0;
		pointer-events: none;
		z-index: 99999999;
	}

	.ivu-modal-mask {
		height: calc(100vh - 10px);
		margin: 5px;
		border-radius: 5px;
	}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	body, html {
		/*background-color: transparent;*/
	}

	.app-layout {
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		position: relative;
		overflow: hidden;
		height: calc(100vh - 10px);
		margin: 5px;
		box-shadow: 0 0 5px #A0A0A0;
		border-radius: 5px;

		background-color: white !important;
	}

	.app-layout-header {
		display: flex;
		z-index: 10;
	}

	.app-layout-header > .app-layout-header-left,
	.app-layout-header > .app-layout-header-center,
	.app-layout-header > .app-layout-header-right {
		padding: 0 5px;
		white-space: nowrap;
		overflow: hidden;
	}

	.app-layout-header > .app-layout-header-left {
		/*width: 84px;*/
	}

	.app-layout-header > .app-layout-header-center {
		font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		font-size: 16px;
		line-height: 48px;
		text-overflow: ellipsis;
		-webkit-app-region: drag;
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
		-webkit-user-select: none;
	}

	.app-layout-header > .app-layout-action-btn > .ivu-icon {
		vertical-align: middle;
	}

	.app-layout-header > .app-layout-action-btn:active {
		opacity: 0.3;
	}

	.app-layout-content {
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;
		transform: translate(0, 0);
		/*background-color: white;*/
	}
</style>
