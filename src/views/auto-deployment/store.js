import Vue from 'vue';
import util from '../../libs/util';

const fs = require('fs');
const path = require('path');

// 文件监听器的目录列表
const watchers = {};

// 生成唯一id
const uniqueId = util.uniqueIdor('fw_');


/**
 * 获取watcher实例
 * @param projectId
 * @return {*}
 */
function makeWatcher(projectId) {
	if (!watchers.hasOwnProperty(projectId)) {
		watchers[projectId] = sys.getStorage('filewatch.watcher.' + projectId, {
			files: []
		});
		watchers[projectId].files = watchers[projectId].files.map(item => {
			if (!item.last_time) item.last_time = 0;
			return item;
		});
	}
	return watchers[projectId];
}

/**
 * 保存文件watcher
 * @param {string} projectId
 */
function saveWatcher(projectId) {
	sys.setStorage('filewatch.watcher.' + projectId, {
		files: watchers[projectId].files
	});
}

/**
 * 删除watcher
 * @param {string} projectId
 */
function deleteWatcher(projectId) {
	if (!watchers[projectId]) return;
	sys.removeStorage('filewatch.watcher.' + projectId);
}

/**
 * 获取项目列表
 */
const getProjectList = (function() {
	let list = null;
	return () => {
		if (list === null) {
			list = sys.getStorage('filewatch.list', []).map(function(item) {
				item.status = 0;
				if (!item.targetpath) item.targetpath = '';
				return item;
			});
		}
		return list;
	}
})();

/**
 * 获取项目详情
 * @param projectId
 * @param isUpdateToFirst
 * @return {*}
 */
function getProjectDetail(projectId, isUpdateToFirst = false) {
	const list = getProjectList();
	const index = list.findIndex(item => item.id === projectId);
	const item = list[index];
	if (isUpdateToFirst && index !== -1 && index !== 0) {
		list.splice(index, 1);
		list.unshift(item);
		saveProject();
	}
	return item;
}

/**
 * 获取项目地址
 * @param {string} projectId
 * @return string|null
 * @deprecated
 */
function getProjectPath(projectId) {
	const project = getProjectDetail(projectId);
	if (project) return project.path;
	return null;
}

/**
 * 保存数据
 */
function saveProject() {
	const data = getProjectList().map(function(item) {
		return item;
	});
	sys.setStorage('filewatch.list', data);
}

/**
 * 添加项目
 * @param {*} item
 */
function addProject(item) {
	item.id = uniqueId();
	getProjectList().push(item);

	console.log('新增监听目录', item);

	saveProject();

	if (item.status) {
		startProject(item.id);
	}
}

/**
 * 删除项目
 * @param {string} projectId
 */
function deleteProject(projectId) {
	console.log('删除监听目录,projectId:', projectId);
	stopProject(projectId);

	const index = getProjectList().findIndex(item => item.id === projectId);
	getProjectList().splice(index, 1);
	saveProject();

	deleteWatcher(projectId);
}

/**
 * 更新变动数量
 * @param {string} projectId
 * @param {number} count
 */
function updateProjectCount(projectId, count) {
	const project = getProjectDetail(projectId);
	if (project) project.count = count;
	saveProject();
}

/**
 * 设置项目新的属性值
 * @param {string} projectId
 * @param {string} key
 * @param {*} value
 */
function setProjectAttribute(projectId, key, value) {
	const project = getProjectDetail(projectId);
	console.log('设置项目新的属性值', projectId, project, key, value);
	if (!project) return;
	Vue.set(project,key,value);
	saveProject();
}

/**
 * 开始任务
 * @param {string} projectId
 */
function startProject(projectId) {
	const project = getProjectDetail(projectId);
	console.log('启动监听目录', projectId, project);
	if (!project) return;

	const watcher = makeWatcher(projectId);
	project.status = 1;
	watcher.watcher = fs.watch(project.path, {
		recursive: true,
	}, (eventType, filename) => {
		if (filename.indexOf('.idea\\') === 0
			|| filename.indexOf('.svn\\') === 0
			|| filename.indexOf('.git\\') === 0) {
			return console.debug('ide配置文件，跳过...');
		}

		filename = path.resolve(project.path, filename);
		console.debug(eventType, filename);

		if (path.extname(filename).indexOf('___') !== -1) {
			return console.debug('临时文件，跳过...');
		}

		const files = watcher.files;
		const findIndex = files.findIndex(file => file.path === filename);
		if (!fs.existsSync(filename)) {
			if (findIndex >= 0) files.indexOf(findIndex, 1);
			project.count = files.length;
			saveProject();
			return console.warn('文件已丢失，删除记录');
		}

		const stats = fs.statSync(filename);
		console.debug(stats);
		if (stats.isDirectory()) {
			return console.debug('目录，跳过...');
		}

		if (findIndex === -1) {
			files.unshift({
				path: filename,
				last_time: new Date().getTime(),
				_checked: true,
			});
			project.count = files.length;
			saveProject();
		} else {
			files[findIndex].last_time = new Date().getTime();
		}
		saveWatcher(projectId);
	});
	watcher.watcher.on('error', (e) => {
		sys.showModal({
			icon: 'warning',
			content: e.message
		});
		stopProject(projectId);
	});
}

/**
 * 终止任务
 * @param {string} projectId
 */
function stopProject(projectId) {
	const project = getProjectDetail(projectId);
	console.log('终止监听目录', projectId, project);
	if (!project) return;

	project.status = 0;

	const watcher = watchers[projectId];
	if (watcher) watcher.watcher.close();

	saveWatcher(projectId);
	saveProject();

	delete watchers[projectId];
}

/**
 * 销毁所有任务
 */
function destroy() {
	Object.getOwnPropertyNames(watchers).forEach(watcherId => {
		if (!watchers.hasOwnProperty(watcherId)) return;
		const watcher = watchers[watcherId];
		watcher.watcher.close();
	});
}

/**
 * 获取任务文件列表
 * @param {string} projectId
 */
function getFiles(projectId) {
	const watcher = makeWatcher(projectId);
	return watcher.files;
}

/**
 * 清空文件
 * @param {string} projectId
 * @param {[]} [list]
 * @return {[]}
 */
function clearFile(projectId, list) {
	const watcher = watchers[projectId];
	if (!watcher) return [];

	const result = [];
	if (list) {
		list.forEach(item => {
			const index = watcher.files.findIndex(oldItem => oldItem.path === item.path);
			if (index === -1) result.push(item);
		});
	}
	watcher.files = result;
	updateProjectCount(projectId, watcher.files.length);
	saveWatcher(projectId);
	return watcher.files;
}

/**
 * 移除文件
 * @param {string} projectId
 * @param {number} index
 * @return {[]}
 */
function removeFile(projectId, index) {
	const watcher = watchers[projectId];
	console.log(watcher);
	if (!watcher) return [];

	watcher.files.splice(index, 1);
	updateProjectCount(projectId, watcher.files.length);
	saveWatcher(projectId);

	return watcher.files;
}

export default {
	debug: true,
	state: {},
	getProjectList,
	getProjectDetail,
	addProject,
	deleteProject,
	setProjectAttribute,
	getProjectPath,
	startProject,
	stopProject,
	destroy,
	getFiles,
	clearFile,
	removeFile,
	saveWatcher,
};
