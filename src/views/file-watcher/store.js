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
	getProjectList() {
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
	_saveProject() {
		const data = this.getProjectList().map(function(item) {
			return {
				title: item.title,
				path: item.path
			};
		});
		sys.setStorageObject('uploader.list', data);
	},
	// 添加数据
	addProject(item) {
		if (this.debug) console.log('新增监听目录', item);
		const index = this.getProjectList().push(item) - 1;
		this._saveProject();
		if (item.status) this.start(index);
	},
	// 删除数据
	deleteProject(index) {
		if (this.debug) console.log('删除监听目录', index);
		this.stop(index);
		this.getProjectList().splice(index, 1);
		this._saveProject();
	},
	// 开始任务
	start(index) {
		if (this.debug) console.log('启动监听目录', index);
		const item = this.getProjectList()[index];
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

			if (path.extname(filename).indexOf('___') !== -1) {
				return console.debug('临时文件，跳过...');
			}

			const findIndex = files.findIndex(file => file.path === filename);
			if (!fs.existsSync(filename)) {
				if (findIndex >= 0) files.indexOf(findIndex, 1);
				item.count = files.length;
				return console.warn('文件已丢失，删除记录');
			}

			const stats = fs.statSync(filename);
			console.debug(stats);

			if (stats.isDirectory()) {
				return console.debug('目录，跳过...');
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
		const item = this.getProjectList()[index];
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
		Object.getOwnPropertySymbols(watchers).forEach(watcherId => {
			if (!watchers.hasOwnProperty(watcherId)) return;

			const watcher = watchers[watcherId];
			watcher.watcher.close();
		});
	},
	// 根据watcherId获取路径
	getProjectPath(watcherId) {
		const item = this.getProjectList().find(item => item.watcherId === watcherId);
		if (item) return item.path;
		return null;
	},
	// 获取任务详情
	getProjectDetail(watcherId) {
		const watcher = watchers[watcherId];
		if (!watcher) return [];
		return watcher.files;
	},
	// 清空文件
	clearFile(watcherId, list) {
		const watcher = watchers[watcherId];
		if (!watcher) return [];
		if (list) {
			list.forEach(item => {
				const index = watchers.files.findIndex(oldItem => oldItem.path === item.path);
				if (index !== -1) watchers.files.splice(index, 1);
			});
		} else {
			watcher.files.splice(0, watchers.files.length - 1);
		}
		this._updateCount(watcherId, watcher.files.length);
		return watcher.files;
	},
	// 移除文件
	removeFile(watcherId, index) {
		const watcher = watchers[watcherId];
		if (!watcher) return [];
		watcher.files.splice(index, 1);
		this._updateCount(watcherId, watcher.files.length);
		return watcher.files;
	},
	// 更新变动数量
	_updateCount(watcherId, count) {
		const projectList = this.getProjectList();
		for (let i = 0; i < projectList.length; i++) {
			const item = projectList[i];
			if (item.watcherId === watcherId) {
				item.count = count;
			}
		}
	},
};
