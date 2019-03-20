<template>
	<Layout class="app-layout">
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
					<Icon :type="maxIcon" size="16" @click.native="onMax" v-show="isMaximizable"></Icon>
				</div>
				<div class="app-layout-action-btn">
					<Icon type="ios-remove" size="24" @click.native="onMinni" v-show="isMinimizable"></Icon>
				</div>
				<Dropdown trigger="click" placement="bottom-end" :transfer="true" @on-click="onMenuSelect">
					<div class="layout-action-btn">
						<Icon type="ios-more" size="24"></Icon>
					</div>
					<DropdownMenu slot="list">
						<DropdownItem name="debug">
							<Icon type="ios-bug-outline" size="20"></Icon>
							{{isDebug?'关闭':'开启'}}调试模式
						</DropdownItem>
						<DropdownItem name="home">
							<Icon type="ios-home-outline" size="20"></Icon>
							返回首页
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</Header>
		<Content class="app-layout-content">
			<transition :name="transitionName"
					v-bind="transitionClass"
					mode="out-in">
				<router-view/>
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
			transitionName: '',
			title: '',
			isMaximize: false,
			isMaximizable: win.isMaximizable() || true,
			isMinimizable: win.isMinimizable(),
			isClosable: win.isClosable(),
			isDev: IS_DEV,
			isIn: true
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
	created() {
		this.$nextTick(this.updateTitle);
		const win = this.$options.win;
		win.on('maximize', () => this.isMaximize = true);
		win.on('unmaximize', () => this.isMaximize = false);
	},
	methods: {
		onBack() {
			this.$router.go(-1);
		},
		onRefresh() {
			window.location.reload();
		},
		onMenuSelect(name) {
			if ('debug' === name) {
				const win = this.$options.win;
				const isDebug = win.webContents.isDevToolsOpened();
				if (isDebug) {
					win.webContents.closeDevTools();
				} else {
					win.webContents.openDevTools();
				}
				this.isDebug = !isDebug;
			} else if ('home' === name) {
				this.$router.replace('/');
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
			this.$options.win.close();
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
