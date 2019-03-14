<template>
	<Layout class="layout">
		<Header class="layout-header-bar">
			<div class="layout-header-left">
				<div class="layout-action-btn">
					<Icon type="ios-arrow-round-back" size="24" @click.native="onBack"/>
				</div>
				<div class="layout-action-btn">
					<Icon type="ios-refresh" size="24" @click.native="onRefresh"></Icon>
				</div>
			</div>
			<div class="layout-header-center" @dblclick="onMax">
				{{title}}
			</div>
			<div class="layout-header-right">
				<div class="layout-action-btn">
					<Icon type="ios-close" size="24" @click.native="onClose" v-show="isClosable"></Icon>
				</div>
				<div class="layout-action-btn">
					<Icon :type="maxIcon" size="16" @click.native="onMax" v-show="isMaximizable"></Icon>
				</div>
				<div class="layout-action-btn">
					<Icon type="ios-remove" size="24" @click.native="onMinni" v-show="isMinimizable"></Icon>
				</div>
				<Dropdown trigger="click" placement="bottom-end" :transfer="true" @on-click="onMenuSelect">
					<div class="layout-action-btn">
						<Icon type="ios-more" size="24"></Icon>
					</div>
					<DropdownMenu slot="list">
						<DropdownItem name="debug">
							<Icon type="bug" size="20"></Icon>
							{{isDebug?'关闭':'开启'}}调试模式
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</Header>
		<Content class="layout-content">
			<transition :name="transitionName" mode="out-in">
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
			isMaximizable: win.isMaximizable(),
			isMinimizable: win.isMinimizable(),
			isClosable: win.isClosable(),
		}
	},
	computed: {
		maxIcon() {
			return this.isMaximize ? 'ios-browsers-outline' : 'ios-square-outline';
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
			sys.navigateBack();
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
			} else {
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
			this.transitionName = toDepth < fromDepth ? 'zoom' : 'fade';
			this.$nextTick(this.updateTitle);
		}
	}
}
</script>

<style>
	body, html {
		/*background-color: transparent;*/
	}

	.layout {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		position: relative;
		overflow: hidden;
		height: calc(100vh - 10px);
		margin: 5px;
		box-shadow: 0 0 5px #2c3e50;
		border-radius: 5px;

		background-color: white !important;
	}

	.layout-header-bar {
		display: flex;
	}

	.layout-header-left,
	.layout-header-center,
	.layout-header-right {
		padding: 0 5px;
		white-space: nowrap;
		overflow: hidden;
	}

	.layout-header-left {
		/*width: 84px;*/
	}

	.layout-header-center {
		text-overflow: ellipsis;
		font-size: 18px;
		line-height: 48px;
		-webkit-app-region: drag;
		flex-grow: 1;
	}

	.layout-header-right {
		/*width: 156px;*/
	}

	.layout-header-right > div {
		float: right;
	}

	.layout-action-btn {
		display: inline-block;
		padding-left: 10px;
		padding-right: 10px;

		line-height: 48px;
		transition: all 0.1s;

		user-select: none;
		-webkit-user-select: none;
	}

	.layout-action-btn > .ivu-icon {
		vertical-align: middle;
	}

	.layout-action-btn:active {
		opacity: 0.3;
	}

	.layout-content {
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;
		/*background-color: white;*/
	}
</style>
