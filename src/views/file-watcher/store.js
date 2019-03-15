const fs = require('fs');
const path = require('path');

// 文件监听器的目录列表
const watchers = {};

export default {
	debug: true,
	state: {
		list: null
	},
	getList() {
		if (this.state.list === null) {
			this.state.list = sys.getStorageObject('uploader.list', []).map(function(item) {
				item.status = 0;
				item.count = 0;
				return item;
			});
		}
		return this.state.list;
	},
	_save() {
		const data = this.getList().map(function(item) {
			return {
				title: item.title,
				path: item.path
			};
		});
		sys.setStorageObject('uploader.list', data);
	},
	add(item) {
		if (this.debug) console.log('新增监听目录', item);
		this.getList().push(item);
		this._save();
	},
	delete(index) {
		if (this.debug) console.log('删除监听目录', index);
		this.stop(index);
		this.getList().splice(index, 1);
		this._save();
	},
	start(index) {
		if (this.debug) console.log('启动监听目录', index);
		const item = this.getList()[index];
		if (!item) return;
		item.status = 1;
		item.watcherId = watcherId;

		const watcherId = Symbol('watcher');
		const files = [];
		const watcher = fs.watch(item.path, {
			recursive: true,
		}, (eventType, filename) => {
			filename = path.resolve(item.path, filename);
			console.log(eventType, filename);

			const findIndex = files.indexOf(filename);
			if (!fs.existsSync(filename)) {
				if (findIndex >= 0) files.indexOf(findIndex, 1);
				item.count = files.length;
				return console.warn('文件已丢失');
			}

			const stats = fs.statSync(filename);
			console.log(stats);

			if (stats.isDirectory()) {
				return console.debug('跳过目录...');
			}

			if (findIndex === -1) {
				files.push(filename);
				item.count = files.length;
			}
		});
		watcher.on('error', (e) => {
			sys.showModal({
				icon: 'warning',
				content: e.message
			});
			this.stop(index);
		});
		watcher.on('close', () => {
			this.stop(index);
		});
		watchers[watcherId] = {
			files: files,
			watcher: watcher,
		};
	},
	stop(index) {
		if (this.debug) console.log('终止监听目录', index);
		const item = this.getList()[index];
		if (!item) return;
		item.status = 0;

		const watcher = watchers[item.watcherId];
		if (watcher) {
			watcher.watcher.close();
			delete watchers[item.watcherId];
			delete item.watcherId;
		}
	},
	destroy() {
		for (const watcher of watchers) {
			watcher.watcher.close();
		}
	}
};
