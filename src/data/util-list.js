const {clipboard} = require('electron');
export default [
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
