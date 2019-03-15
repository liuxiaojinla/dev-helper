import {dialog, ipcMain} from "electron";

// 打开文件选择框
ipcMain.on('open-file-dialog', function(event, options) {
	dialog.showOpenDialog(options, function(files) {
		event.sender.send('open-file-dialog-result', files);
	})
});
