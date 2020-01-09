import {BrowserWindow} from "electron";

export default function(options) {
	return new BrowserWindow(Object.assign({
		width: 420,
		height: 560,

		minWidth: 420,
		minHeight: 560,
		show: false,
		titleBarStyle: 'hidden',
		transparent: true,
		frame: false,
		minimizable: true,
		maximizable: false,
		closable: true,
		hasShadow: true,
		isShowMoreMenu: false,
		backgroundColor: '#00FFFFFF',
		// backgroundColor: '#FFFFFF',
		skipTaskbar: true,

		webPreferences: {
			webSecurity: false,
			allowDisplayingInsecureContent: true,
			allowRunningInsecureContent: true,
			nodeIntegrationInWorker: true,
			scrollBounce: true,
		},
	}, options));
}
