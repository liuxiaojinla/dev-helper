import util from '../../libs/util';

const path = require('path');

// 生成唯一id
const uniqueId = util.uniqueIdor('wt_');

/**
 * 获取项目列表
 */
const getProjectList = (function() {
	let list = null;
	return () => {
		if (list === null) {
			list = sys.getStorageObject('weapp_transform.list', []).map(function(item) {
				item.status = 0;
				return item;
			});
		}
		return list;
	}
})();

/**
 * 获取项目详情
 * @param projectId
 * @return {*}
 */
function getProjectDetail(projectId) {
	return getProjectList().find(item => item.id === projectId);
}

/**
 * 保存数据
 */
function saveProject() {
	const data = getProjectList().map(function(item) {
		return item;
	});
	sys.setStorageObject('weapp_transform.list', data);
}

/**
 * 添加项目
 * @param {*} item
 */
function addProject(item) {
	item.id = uniqueId();
	console.log('新增项目', item);

	getProjectList().push(item);
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
	console.log('删除项目,projectId:', projectId);
	stopProject(projectId);

	const index = getProjectList().findIndex(item => item.id === projectId);
	getProjectList().splice(index, 1);
	saveProject();
}

/**
 * 开始任务
 * @param {string} projectId
 */
function startProject(projectId) {
	const project = getProjectDetail(projectId);
	console.log('启动项目', projectId, project);
	if (!project) return;

	project.status = 1;
	sys.childProcessExec({
		command: 'npm ls weapp-transform1 -g --depath 0'
	}).then(res => {
		console.log(res)
	});
}

/**
 * 终止任务
 * @param {string} projectId
 */
function stopProject(projectId) {
	const project = getProjectDetail(projectId);
	console.log('终止项目', projectId, project);
	if (!project) return;

	project.status = 0;
	saveProject();
}

export default {
	debug: true,
	state: {},
	getProjectList,
	addProject,
	deleteProject,
	startProject,
	stopProject,
};
