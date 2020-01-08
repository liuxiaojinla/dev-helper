import {dialog, ipcMain} from "electron";

const child_process = require('child_process');

// 打开文件选择框
ipcMain.on('open-file-dialog', function(event, options) {
	dialog.showOpenDialog(options, function(files) {
		event.sender.send('open-file-dialog-result', files);
	})
});

// 执行子进程命令
const childProcessList = {};
ipcMain.on('child_process-exec', function(event, options) {
	childProcessList[options.__ID__] = child_process.exec(options.command, options.options, (error, stdout, stderr) => {
		delete childProcessList[options.__ID__];
		console.log(error, stdout, stderr);
		if (error) {
			event.sender.send('child_process-exec-result', {
				__ID__: options.__ID__,
				error: error.message
			});
			return;
		}

		event.sender.send('child_process-exec-result', {
			__ID__: options.__ID__,
			data: stdout ? stdout : stderr
		});
	});
});

// 关闭子进程
ipcMain.on('child_process-close', function(event, options) {
	const childProcess = childProcessList[options.id];
	if (childProcess) {
		childProcess.kill();
		delete childProcessList[options.id];
	}
});
