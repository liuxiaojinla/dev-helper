// 打开文件选择框
import {dialog, ipcMain} from "electron";

ipcMain.on('open-file-dialog', function(event, options) {
	dialog.showOpenDialog(options, function(files) {
		event.sender.send('open-file-dialog-result', files);
	})
});
