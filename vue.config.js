module.exports = {
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				"appId": "com.duoguan.dev",
				"copyright": "BD",
				"productName": "dev-helper"
			},
			mainProcessWatch: ['src/ipc.js'],
		}
	}
};
