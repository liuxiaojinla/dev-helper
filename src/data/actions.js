const {clipboard} = require('electron');
export default [
	{
		title: '自动化部署',
		name: 'auto-deployment',
		icon: 'md-code-working',
		page: 'auto-deployment',
		options: {
			actions: []
		}
	},
	{
		title: '网站套件',
		name: 'website-kit',
		icon: 'md-power',
		page: 'website-kit',
		// page: 'Action',
		options: {}
	},
	{
		title: '常用工具',
		name: 'util',
		icon: 'ios-bulb',
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
		icon: 'md-swap',
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
		icon: 'md-link',
		page: 'ActionGroup',
		options: {
			actions: [
				{
					title: 'PHP',
					children: [
						{
							title: 'TP5.1',
							icon: 'ios-paper',
							type: 'url',
							url: 'https://www.kancloud.cn/manual/thinkphp5_1/353946'
						},
						{
							title: 'TP5.0',
							icon: 'ios-paper',
							type: 'url',
							url: 'https://www.kancloud.cn/manual/thinkphp5/118003'
						},
						{
							title: 'TP3.2',
							icon: 'ios-paper',
							type: 'url',
							url: 'https://www.kancloud.cn/manual/thinkphp/1678'
						},
						{
							title: 'TP5资源汇总',
							icon: 'ios-paper',
							type: 'url',
							url: 'https://blog.thinkphp.cn/913360'
						},
						{
							title: 'Laravel',
							icon: 'ios-paper',
							type: 'url',
							url: 'https://www.golaravel.com/'
						},
						{
							title: 'Swoole',
							icon: 'ios-paper',
							type: 'url',
							url: 'https://www.swoole.com/'
						},
					]
				},
				{
					title: '小程序',
					children: [
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
					]
				},
				{
					title: 'Javascript',
					children: [
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
							title: 'Vue',
							icon: 'ios-paper',
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
							icon: 'ios-paper',
							type: 'url',
							url: 'http://element-cn.eleme.io/#/zh-CN/component/layout'
						},
						{
							title: 'Electron',
							icon: 'ios-paper',
							type: 'url',
							url: 'https://electronjs.org/'
						},
						{
							title: 'Layui',
							icon: 'ios-paper',
							type: 'url',
							url: 'https://www.layui.com/'
						},
						{
							title: 'Amazeui',
							icon: 'ios-paper',
							type: 'url',
							url: 'http://amazeui.org/css/'
						},
						{
							title: 'AdminLte',
							icon: 'ios-link',
							type: 'url',
							url: 'http://www.bootstrapstage.com/admin-lte/'
						},
						{
							title: 'Echarts',
							icon: 'ios-paper',
							type: 'url',
							url: 'https://echarts.baidu.com/echarts2/doc/example.html'
						},
					]
				},
				{
					title: '字体图标',
					children: [
						{
							title: 'Iconfont',
							icon: 'ios-link',
							type: 'url',
							url: 'https://www.iconfont.cn'
						},
						{
							title: 'Fontawesome',
							icon: 'ios-link',
							type: 'url',
							url: 'http://fontawesome.dashgame.com/'
						},
						{
							title: 'Ionicons',
							icon: 'ios-link',
							type: 'url',
							url: 'https://ionicons.com/'
						},
					]
				},
				{
					title: '其他',
					children: [
						{
							title: 'NodeJS',
							icon: 'logo-nodejs',
							type: 'url',
							url: 'http://nodejs.cn/api/'
						},
						{
							title: 'Github',
							icon: 'logo-github',
							type: 'url',
							url: 'https://github.com/'
						},
						{
							title: 'BootCDN',
							icon: 'ios-link',
							type: 'url',
							url: 'https://www.bootcdn.cn/'
						},
					]
				}
			],
		}
	},
	{
		name: 'app.update',
		title: '检查版本',
		icon: 'ios-cloud-download'
	}
]
