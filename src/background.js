'use strict';
import {app, BrowserWindow, ipcMain, Menu, protocol, Tray} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import {autoUpdater} from 'electron-updater'
import "./ipc";

const path = require('path');

const feedUrl = `http://xx5.51daoteng.com/win32`; // 更新包位置
const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
const getWindow = function() {
	if (win) return win;

	// Create the browser window.
	win = new BrowserWindow({
		// width: 320,
		// height: 500,
		width: isDevelopment ? 1080 : 570,
		height: isDevelopment ? 560 : 480,

		minWidth: 570,
		minHeight: 520,
		show: false,
		titleBarStyle: 'hidden',
		transparent: true,
		frame: isDevelopment,
		minimizable: true,
		maximizable: true,
		closable: true,
		hasShadow: true,
		isShowMoreMenu: false,
		backgroundColor: '#00FFFFFF',
		// backgroundColor: '#FFFFFF',
		skipTaskbar: !isDevelopment,

		webPreferences: {
			webSecurity: false,
			allowDisplayingInsecureContent: true,
			allowRunningInsecureContent: true,
			nodeIntegrationInWorker: true,
			scrollBounce: true,
		},
	});

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
		if (!process.env.IS_TEST) win.webContents.openDevTools();
	} else {
		createProtocol('app');
		// Load the index.html when not in development
		win.loadURL('app://./index.html');
	}

	win.show();

	win.on('closed', () => {
		win = null
	});
	return win;
};

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], {secure: true});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	getWindow();
});

// 创建单实例
(function() {
	if (isDevelopment) return;
	const lock = app.requestSingleInstanceLock();
	if (!lock) {
		app.quit();
	} else {
		app.on('second-instance', (event, commandLine, workingDirectory) => {
			// 当运行第二个实例时,将会聚焦到myWindow这个窗口
			if (win) {
				if (win.isMinimized()) {
					win.restore();
					win.show();
				}
				win.focus();
			}
		});
	}
})();

// 初始化检查自动更新
const initCheckForUpdates = function() {
	// 主进程主动发送消息给渲染进程函数
	function sendUpdateMessage(event, result) {
		console.log(event, result);
		getWindow().webContents.send('app.update', event, result);
	}

	// 配置安装包远端服务器
	autoUpdater.setFeedURL(feedUrl);
	// 下面是自动更新的整个生命周期所发生的事件
	autoUpdater.on('error', function(event, error) {
		sendUpdateMessage('error', {event, error});
	});
	// // 检查是否有更新
	// autoUpdater.on('checking-for-update', function(message) {
	// 	sendUpdateMessage('checking-for-update', message);
	// });
	// 有新版本更新
	autoUpdater.on('update-available', function(event) {
		sendUpdateMessage('update-available', event);
	});
	// 无新版本
	autoUpdater.on('update-not-available', function(message) {
		sendUpdateMessage('update-not-available', message);
	});
	// 更新下载进度事件
	autoUpdater.on('download-progress', function(progress) {
		sendUpdateMessage('download-progress', progress);
	});
	// 更新下载完成事件
	autoUpdater.on('update-downloaded', function(event, result) {
		sendUpdateMessage('update-downloaded', event);
		ipcMain.on('updateNow', (e, arg) => {
			autoUpdater.quitAndInstall();
		});
	});

	return () => {
		console.log("event", "检查更新...");
		//执行自动更新检查
		autoUpdater.checkForUpdates();
	};
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		// await installVueDevtools()
	}

	const win = getWindow();
	const iconPath = isDevelopment ? path.resolve(__dirname, '../public/icon.png') : path.join(__dirname, 'icon.png');
	const tray = new Tray(iconPath);
	const contextMenu = Menu.buildFromTemplate([
		{
			label: '退出',
			click: () => {
				win.close();
			}
		},
	]);
	tray.setToolTip('开发小助手');
	tray.setContextMenu(contextMenu);
	tray.on('click', () => {
		// win.isVisible() ? win.hide() : win.show();
		// win.restore();
		win.show();
	});
	win.on('show', () => {
		tray.setHighlightMode('always')
	});
	win.on('hide', () => {
		tray.setHighlightMode('never')
	});

	// 自动更新
	const checkForUpdates = initCheckForUpdates();


	// 循环检查新版本
	// if (!isDevelopment) {
	// 	setInterval(checkForUpdates, 60 * 1000);
	// 	setTimeout(checkForUpdates, 3000);
	// }

	// 主进程监听渲染进程传来的信息
	ipcMain.on('app.update', checkForUpdates);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', data => {
			if (data === 'graceful-exit') {
				app.quit();
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit();
		});
	}
}
