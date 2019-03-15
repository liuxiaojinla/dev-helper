'use strict';
import {app, BrowserWindow, protocol} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import "./ipc";

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
const getWindow = function() {
	if (win) return win;

	// Create the browser window.
	win = new BrowserWindow({
		width: 1080,
		height: 480,
		minWidth: 480,
		minHeight: 480,
		show: false,
		titleBarStyle: 'hidden',
		transparent: true,
		frame: isDevelopment,
		hasShadow: true,
		// maximizable: false,
		// minimizable: true,
		// closable: true,
		isShowMoreMenu: false,
		backgroundColor: '#00FFFFFF',
		// backgroundColor: '#FFFFFF',

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
	})
};

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], {secure: true});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	getWindow()
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		// await installVueDevtools()
	}
	getWindow()
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', data => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}
