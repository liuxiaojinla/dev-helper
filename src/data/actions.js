const {clipboard} = require('electron');
export default [
	{
		title: '自动化部署',
		name: 'auto-deployment',
		icon: 'ios-code-working',
		page: 'auto-deployment',
		options: {
			actions: []
		}
	},
	{
		title: '网站套件',
		name: 'website-kit',
		icon: 'ios-power-outline',
		// page: 'website-kit',
		page: 'Action',
		options: {}
	},
	{
		title: '常用工具',
		name: 'util',
		icon: 'ios-bulb-outline',
		page: 'Action',
		options: {
			actions: [
				{
					title: 'Hosts文件',
					icon: 'ios-document',
					type: 'page',
					detail: {
						name: 'hosts',
					}
				},
				{
					title: '时间戳',
					icon: 'ios-time',
					type: 'page',
					detail: {
						name: 'time',
					},
					click() {
						clipboard.writeText(Math.floor(new Date().getTime() / 1000).toString());
						sys.showToast({content: '已复制！'});
					}
				},
				{
					title: '颜色转换器',
					icon: 'ios-color-palette',
					type: 'custom',
					detail: {
						name: 'weapp_transform',
					},

					click() {
						sys.showToast({content: '开发中...'});
					}
				},
				{
					title: 'TP5验证器',
					icon: 'ios-create',
					type: 'custom',
					detail: {
						name: 'tp5_validate',
					},

					click() {
						sys.showToast({content: '开发中...'});
					}
				},
				{
					title: '微信小程序转换',
					icon: 'ios-build',
					// type: 'page',
					type: 'custom',
					detail: {
						name: 'weapp_transform',
					},
					click() {
						sys.showToast({content: '开发中...'});
					}
				},
				{
					title: '物流查询',
					icon: 'ios-filing',
					type: 'page',
					detail: {
						name: 'logistics',
					}
				},
				{
					title: 'IntelliJ IDEA注册码',
					icon: 'ios-hammer',
					type: 'page',
					detail: {
						name: 'IntelliJIDEA',
					}
				},
				{
					title: '请求器',
					icon: 'ios-git-pull-request',
					type: 'page',
					detail: {
						name: 'request',
					}
				},
			]
		}
	},
	{
		title: '加密/解密',
		name: 'encrypt',
		icon: 'ios-swap',
		page: 'Action',
		options: {
			actions: [
				{
					title: 'URL加/解密',
					icon: 'ios-swap',
					type: 'page',
					detail: {
						name: 'encrypt.url',
					}
				},
				{
					title: 'Base64加/解密',
					icon: 'ios-swap',
					type: 'page',
					detail: {
						name: 'encrypt.base64',
					}
				},
				{
					title: 'MD5加密',
					icon: 'ios-swap',
					type: 'page',
					detail: {
						name: 'encrypt.md5',
					}
				},
				{
					title: 'SHA1加密',
					icon: 'ios-swap',
					type: 'page',
					detail: {
						name: 'encrypt.sha1',
					}
				},
			]
		}
	},
	{
		title: '文档/链接',
		name: 'document',
		icon: 'ios-link-outline',
		page: 'Action',
		options: {
			actions: [
				{
					title: 'TP5.1',
					icon: 'ios-paper',
					type: 'url',
					url: 'https://www.kancloud.cn/manual/thinkphp5_1/353946'
				},
				{
					title: '微信小程序',
					icon: 'ios-infinite',
					type: 'url',
					url: 'https://developers.weixin.qq.com/miniprogram/dev/api/'
				},
				{
					title: '支付宝小程序',
					icon: 'ios-link',
					type: 'url',
					url: 'https://docs.alipay.com/mini/developer/getting-started'
				},
				{
					title: 'Vue',
					icon: 'ios-link',
					type: 'url',
					url: 'https://cn.vuejs.org/v2/guide/'
				},
				{
					title: 'iView',
					icon: 'ios-paper-plane',
					type: 'url',
					url: 'https://www.iviewui.com/components/layout'
				},
				{
					title: 'Element-UI',
					icon: 'ios-link',
					type: 'url',
					url: 'http://element-cn.eleme.io/#/zh-CN/component/layout'
				},
				{
					title: 'Github',
					icon: 'logo-github',
					type: 'url',
					url: 'https://github.com/'
				},
				{
					title: 'ES6',
					icon: 'logo-javascript',
					type: 'url',
					url: 'http://es6.ruanyifeng.com'
				},
				{
					title: 'jQuery',
					icon: 'logo-javascript',
					type: 'url',
					url: 'http://jquery.cuishifeng.cn/'
				},
				{
					title: 'NodeJS',
					icon: 'logo-nodejs',
					type: 'url',
					url: 'http://nodejs.cn/api/'
				},
				{
					title: 'Electron',
					icon: 'ios-link',
					type: 'url',
					url: 'https://electronjs.org/'
				},
				{
					title: 'Iconfont',
					icon: 'ios-link',
					type: 'url',
					url: 'https://www.iconfont.cn'
				},
			]
		}
	},
]
