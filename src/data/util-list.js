const {clipboard} = require('electron');
export default [
	{
		title: 'Hosts文件',
		icon: 'ios-document',
		detail: {
			name: 'util.hosts',
		}
	},
	{
		title: '时间戳',
		icon: 'ios-time',
		detail: {
			name: 'util.time',
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
			name: 'util.weapp_transform',
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
			name: 'util.tp5_validate',
		},

		click() {
			sys.showToast({content: '开发中...'});
		}
	},
	{
		title: '微信小程序转换',
		icon: 'ios-build',
		type: 'custom',
		detail: {
			name: 'util.weapp_transform',
		},
		click() {
			sys.showToast({content: '开发中...'});
		}
	},
	{
		title: '物流查询',
		icon: 'ios-filing',
		detail: {
			name: 'util.logistics',
		}
	},
	{
		title: 'IntelliJ IDEA注册码',
		icon: 'ios-hammer',
		detail: {
			name: 'util.IntelliJIDEA',
		}
	},
	{
		title: '请求器',
		icon: 'ios-git-pull-request',
		detail: {
			name: 'util.request',
		}
	},
]
