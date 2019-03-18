const fs = require('fs');
const path = require('path');

// 文件监听器的目录列表
const watchers = {};

export default {
	debug: true,
	state: {
		list: null
	},

	/**
	 * 获取列表
	 * @return []
	 */
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
	// 保存数据
	_save() {
		const data = this.getList().map(function(item) {
			return {
				title: item.title,
				path: item.path
			};
		});
		sys.setStorageObject('uploader.list', data);
	},
	// 添加数据
	add(item) {
		if (this.debug) console.log('新增监听目录', item);
		const index = this.getList().push(item) - 1;
		this._save();
		if (item.status) this.start(index);
	},
	// 删除数据
	delete(index) {
		if (this.debug) console.log('删除监听目录', index);
		this.stop(index);
		this.getList().splice(index, 1);
		this._save();
	},
	// 开始任务
	start(index) {
		if (this.debug) console.log('启动监听目录', index);
		const item = this.getList()[index];
		if (!item) return;
		item.status = 1;

		const watcherId = Symbol('watcher');
		item.watcherId = watcherId;

		const files = [];
		const watcher = fs.watch(item.path, {
			recursive: true,
		}, (eventType, filename) => {
			filename = path.resolve(item.path, filename);
			console.debug(eventType, filename);

			const findIndex = files.findIndex(file => file.path === filename);
			if (!fs.existsSync(filename)) {
				if (findIndex >= 0) files.indexOf(findIndex, 1);
				item.count = files.length;
				return console.warn('文件已丢失');
			}

			const stats = fs.statSync(filename);
			console.debug(stats);

			if (stats.isDirectory()) {
				return console.debug('跳过目录...');
			}

			if (findIndex === -1) {
				files.push({
					path: filename,
					_checked: true,
				});
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
	// 终止任务
	stop(index) {
		if (this.debug) console.log('终止监听目录', index);
		const item = this.getList()[index];
		if (!item) return;
		item.status = 0;
		item.count = 0;

		const watcher = watchers[item.watcherId];
		if (watcher) {
			watcher.watcher.close();
			delete watchers[item.watcherId];
			delete item.watcherId;
		}
	},
	// 销毁所有任务
	destroy() {
		for (const watcherId in watchers) {
			const watcher = watchers[watcherId];
			watcher.watcher.close();
		}
	},
	// 获取任务详情
	getDetail(watcherId) {
		const watcher = watchers[watcherId];
		if (!watcher) return [];
		return watcher.files;
	},
	// 根据watcherId获取路径
	getPath(watcherId) {
		const item = this.getList().find(item => item.watcherId === watcherId);
		if (item) return item.path;
		return null;
	}
};
