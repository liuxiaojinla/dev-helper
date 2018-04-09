var grunt = require('grunt');

// 配置
grunt.config.init({
	pkg: grunt.file.readJSON('package.json'), // 这里会去获取版本号
	'create-windows-installer': {
		x64: {
			authors: '北斗 <657306123@qq@qq.com>', // 作者
			projectUrl: '',
			appDirectory: './packager/electron-win32-x64', // 要打包的输入目录
			outputDirectory: './package_dir', // grunt打包后的输出目录
			exe: 'electron.exe', // 生成的exe文件
			description: 'My Superb Vue Project For Electron',
			setupIcon: './app/hots.ico', // 图标
			noMsi: true // 是否生成.msi
		}
	}
});

// 加载任务
grunt.loadNpmTasks('grunt-electron-installer');

// 设置为默认
grunt.registerTask('default', ['create-windows-installer']);