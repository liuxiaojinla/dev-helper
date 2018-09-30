const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
global.IS_DEV = process.argv.indexOf('dev', 2) !== -1;
global.IS_DEBUG = process.argv.indexOf('debug', 2) !== -1;

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1080,
		height: 560,
		minWidth: 480,
		minHeight: 560,
		show: false,
		titleBarStyle: 'hidden',
		transparent: true,
		frame: false,
		// maximizable: false,
		// minimizable: true,
		// closable: true,
		isShowMoreMenu: false,
		// backgroundColor: '#A0FFFFFF',
		backgroundColor: '#FFFFFF',

		webPreferences: {
			webSecurity: false,
			allowDisplayingInsecureContent: true,
			allowRunningInsecureContent: true,
			nodeIntegrationInWorker: true,
			scrollBounce: true,
		},
	});

	//优雅地显示窗口
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		IS_DEBUG && mainWindow.webContents.openDevTools();
	});

	//点击穿透 window
	// mainWindow.setIgnoreMouseEvents(true);

	if (IS_DEV) {
		//load resource
		mainWindow.loadURL('http://localhost:8080');
	} else {
		// 然后加载应用的 index.html。
		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file:',
			slashes: true
		}));
	}

	// Emitted when the window is closed.
	mainWindow.on('closed', () => mainWindow = null);
}

function startupEventHandle() {
	// 安装和更新时添加快捷方式，删除和卸载时删除快捷方式
	var handleStartupEvent = function() {
		if (process.platform !== 'win32') {
			return false
		}
		var squirrelCommand = process.argv[1]
		switch (squirrelCommand) {
			case '--squirrel-install':
			case '--squirrel-updated':
				install()
				return true
			case '--squirrel-uninstall':
				uninstall()
				app.quit()
				return true
			case '--squirrel-obsolete':
				app.quit()
				return true
		}

		// 安装
		function install() {
			var cp = require('child_process')
			var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe')
			var target = path.basename(process.execPath)
			var child = cp.spawn(updateDotExe, ['--createShortcut', target], {detached: true})
			child.on('close', function(code) {
				app.quit()
			})
		}

		// 卸载
		function uninstall() {
			var cp = require('child_process')
			var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe')
			var target = path.basename(process.execPath)
			var child = cp.spawn(updateDotExe, ['--removeShortcut', target], {detached: true})
			child.on('close', function(code) {
				app.quit()
			})
		}
	}

	handleStartupEvent();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
	startupEventHandle();
	createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
});
