'use strict';
import {app, Menu, protocol, Tray} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
// plugins
import "./plugins/electron/ipc";
import "./plugins/electron/updater/index"
import * as window from "./plugins/electron/window/index"

const path = require('path');
const fs = require('fs');
const isDevelopment = process.env.NODE_ENV !== 'production';
// const isDevelopment = false;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], {secure: true});

function assert(message) {
	if (isDevelopment) return;
	message = typeof message === "string" ? message : String(message);
	// dialog.showMessageBox(null, {
	// 	title: 'hello world',
	// 	message: message,
	// });

	const writePath = path.join(path.dirname(__dirname), '00.txt');
	fs.writeFileSync(writePath, message, {flag: 'a'});
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const getWindow = (function() {
	let win;
	return function() {
		if (win) return win;

		// Create the browser window.
		win = window.newWindow({
			width: isDevelopment ? 1080 : 420,
			height: isDevelopment ? 560 : 560,

			frame: isDevelopment,
			skipTaskbar: !isDevelopment,
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
})();

// 创建单实例
(function() {
	if (isDevelopment) return;

	const lock = app.requestSingleInstanceLock();
	if (!lock) {
		app.quit();
	} else {
		app.on('second-instance', (event, commandLine, workingDirectory) => {
			// 当运行第二个实例时,将会聚焦到myWindow这个窗口
			const win = getWindow();
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		// await installVueDevtools()
	}

	assert('ready1');
	const win = getWindow();
	assert('ready2');
	const iconPath = isDevelopment ? path.resolve(__dirname, '../public/icon.png') : path.join(__dirname, 'icon.png');
	assert('ready3');
	const tray = new Tray(iconPath);
	assert('ready4');
	const contextMenu = Menu.buildFromTemplate([
		{
			label: '退出',
			click: () => {
				win.close();
			}
		},
	]);
	assert('ready5');
	tray.setToolTip('开发小助手');
	tray.setContextMenu(contextMenu);
	assert('ready6');
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
	assert('ready7');
	win.show();
});

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
