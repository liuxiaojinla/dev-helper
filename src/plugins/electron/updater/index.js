import {autoUpdater} from "electron-updater";
import {app, ipcMain} from "electron";

const feedUrl = `http://xx5.51daoteng.com/win32`; // 更新包位置

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
app.on('ready', () => {
	// 自动更新
	// const checkForUpdates = initCheckForUpdates();

	// 循环检查新版本
	// if (!isDevelopment) {
	// 	setInterval(checkForUpdates, 60 * 1000);
	// 	setTimeout(checkForUpdates, 3000);
	// }

	// 主进程监听渲染进程传来的信息
	// ipcMain.on('app.update', checkForUpdates);
});
