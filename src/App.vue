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
			transitionName: '',

			isDev: IS_DEV,
			isIn: true,

			backgroundImage: setting.getValue('backgroundImage'),
			foregroundColor: setting.getValue('color'),
		}
	},
	computed: {
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

		// 监听背景图片被更新
		this.$on('update.background.image', (url) => this.backgroundImage = url);
		this.$on('update.color', (color) => this.foregroundColor = color);
	},
	methods: {
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
</style>
