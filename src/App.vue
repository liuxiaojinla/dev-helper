<template>
	<Layout class="layout">
		<Header class="layout-header-bar">
			<div class="layout-header-left">
				<Icon type="ios-arrow-left" size="24" class="layout-action-btn" @click.native="onBack"></Icon>
				<Icon type="ios-reload" size="24" class="layout-action-btn" @click.native="onRefresh"></Icon>
			</div>
			<div class="layout-header-center">
				{{title}}
			</div>
			<div class="layout-header-right">
				<Dropdown trigger="click" placement="bottom-end" :transfer="true" @on-click="onMenuSelect">
					<Icon type="ios-more" size="24" class="layout-action-btn"></Icon>
					<DropdownMenu slot="list">
						<DropdownItem name="debug">
							<Icon type="bug" size="20"></Icon>
							{{isDebug?'关闭':'开启'}}调试模式
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Icon type="ios-minus-empty" size="24" class="layout-action-btn" @click.native="onMinni"></Icon>
				<Icon :type="maxIcon" size="20" class="layout-action-btn" @click.native="onMax"></Icon>
				<Icon type="ios-close-empty" size="28" class="layout-action-btn" @click.native="onClose"></Icon>
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
	const win = sys.getCurrentWindow();
	export default {
		name: 'App',
		data() {
			return {
				transitionName: '',
				title: '',

				isDebug: win.isDevToolsOpened(),
				isMaximize: false
			}
		},
		computed: {
			maxIcon() {
				return this.isMaximize ? 'ios-browsers' : 'ios-browsers-outline';
			}
		},
		created() {
			this.$nextTick(this.updateTitle);
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
					this.isDebug = !win.webContents.isDevToolsOpened();
					win.webContents.toggleDevTools();
				} else {
				}
			},
			onMinni() {
				win.minimize();
			},
			onMax() {
				this.isMaximize ? win.restore() : win.maximize();
				this.isMaximize = !this.isMaximize;
			},
			onClose() {
				win.close();
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
	.layout {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		position: relative;
		overflow: hidden;
		height: 100vh;
	}

	.layout-header-bar {
		display: table;
		table-layout: fixed;
		width: 100%;
		border-collapse: collapse;
		border: 0;
		line-height: 48px;
		height: 48px;
		user-select: none;
		-webkit-user-select: none;
	}

	.layout-header-left,
	.layout-header-center,
	.layout-header-right {
		display: table-cell;
		border: 0;
		vertical-align: middle;
		padding: 0 5px;
		/*white-space: nowrap;*/
		overflow: hidden;
	}

	.layout-header-left {
		width: 84px;
	}

	.layout-header-center {
		-webkit-app-region: drag;
		text-overflow: ellipsis;
		font-size: 18px;
		line-height: 24px;
	}

	.layout-header-right {
		width: 156px;
	}

	.layout-action-btn {
		padding-left: 10px;
		padding-right: 10px;
		vertical-align: middle;
	}

	.layout-action-btn:active {
		opacity: 0.8;
	}

	.layout-content {
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
