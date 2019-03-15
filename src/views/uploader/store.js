export default {
	debug: true,
	state: {
		list: null
	},
	getList() {
		if (this.state.list === null) {
			this.state.list = sys.getStorageObject('uploader.list', []);
		}
		return this.state.list;
	},
	add(item) {
		if (this.debug) console.log('新增监听目录', item);
		this.getList().push(item);
		sys.setStorageObject('uploader.list', this.getList());
	},
	delete(index) {
		if (this.debug) console.log('删除监听目录', index);
		this.stop(index);
		this.getList().splice(index, 1);
		sys.setStorageObject('uploader.list', this.getList());
	},
	start(index) {
		if (this.debug) console.log('启动监听目录', index);
		const item = this.getList()[index];
		if (!item) return;
		item.status = 1;

		// todo
	},
	stop(index){
		if (this.debug) console.log('终止监听目录', index);
		const item = this.getList()[index];
		if (!item) return;
		item.status = 0;

		//todo
	}
};
