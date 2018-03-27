import iView, {Message, Modal, Notice, Spin} from 'iview'

/**
 *
 * @param options
 * @returns {{show, remove, component}}
 */
function getModalInstance(options = {}) {
	return Modal.newInstance(Object.assign({
		closable: false,
		maskClosable: false,
		footerHide: true,
	}, options));
}

let isShowLoading = false;

export default {

	/**
	 * 显示loading
	 */
	showLoading(options = {}) {
		isShowLoading = true;
		Spin.show(options);
	},

	/**
	 * 隐藏loading
	 */
	hideLoading() {
		if (isShowLoading) {
			isShowLoading = false;
			setTimeout(Spin.hide, 100);
		}
	},

	/**
	 * toast
	 * @param {*} options
	 * @param {Function} [callback]
	 */
	showToast(options = {}, callback) {
		options = typeof options === 'string' ? {content: options, onClose: callback} : options;
		Message.message(options.icon || 'info', Object.assign({
			duration: 1,
		}, options));
	},

	/**
	 * 显示通知
	 * @param {*} options
	 */
	showNotification(options = {}) {
		if ('info' === options.type) Notice.info(options);
		else if ('success' === options.type) Notice.success(options);
		else if ('warning' === options.type) Notice.warning(options);
		else if ('error' === options.type) Notice.error(options);
		else Notice.open(options);
	},

	/**
	 * 显示模态框
	 * @param {*} options
	 */
	showModal(options = {}) {
		options = Object.assign({
			showCancel: true,
			onRemove: () => {
			}
		}, options);
		switch (options.icon) {
			case 'info':
				options.showCancel = false;
				break;
			case 'success':
				options.showCancel = false;
				break;
			case 'warning':
				options.showCancel = false;
				break;
			case 'error':
				options.showCancel = false;
				break;
			case 'confirm':
				options.icon = 'confirm';
				break;
		}

		const instance = getModalInstance(options.modal || {});
		options.className && instance.component.$el.classList.add(options.className);
		instance.show(options);
		return instance;
	},

	/**
	 * 提示框
	 * @param {*} options
	 */
	alert(options) {
		options.icon = 'info';
		return this.showModal(options);
	},

	/**
	 * 确认框
	 * @param {*} options
	 */
	confirm(options) {
		options.icon = 'confirm';
		return this.showModal(options);
	},

	/**
	 * 输入框
	 * @param {*} options
	 */
	prompt(options = {}) {
		const inputOptions = {
				value: options.type === 'number' ? (options.value || 0) : (options.value || ""),
				autofocus: true,
				placeholder: options.placeholder,
				type: options.type || "text",
				maxlength: options.maxlength,
				icon: options.icon,
				rows: options.rows,
				autosize: options.autosize,
				number: options.number,
				autocomplete: options.autocomplete,
				elementId: options.elementId,
				spellcheck: options.spellcheck,
				max: options.max,
				min: options.min,
				step: options.step,
				editable: options.editable,
				style: options.inputStyle,
			},
			inputType = options.type === 'number' ? 'InputNumber' : (options.type === 'select' ? 'Select' : 'Input');

		options.modal = options.modal || {};
		options.loading = options.require;
		options.modal.render = (h) => {
			//select option list
			const selectItems = inputType === 'Select' ? options.items.map((item, index) => {
				return h('Option', {props: {value: index}}, item)
			}) : [];

			return h('Form', {
				props: {labelPosition: 'left'},
			}, [
				h('p', {
					style: {
						// fontSize: '16px',
						marginTop: '10px',
						marginBottom: '10px',
					},
					domProps: {
						innerHTML: options.content
					}
				}),
				h('FormItem', {
					props: {
						label: options.label,
						labelWidth: options.labelWidth ? options.labelWidth : (options.label ? 80 : 0)
					},
					style: {
						marginBottom: '10px',
					}
				}, [
					h(inputType, {
						props: inputOptions,
						style: inputType === 'InputNumber' ? Object.assign(inputOptions.style || {}, {width: '100%'}) : inputOptions.style,
						on: {
							input: (val) => inputOptions.value = val,
						}
					}, selectItems),
				]),
			]);
		};

		const oldOnOk = options.onOk;
		options.onOk = () => {
			if (options.require) {
				if (inputOptions.value === undefined || inputOptions.value === null || inputOptions.value === '') {
					instance.component.$parent.buttonLoading = false;
					const defaultMsg = inputType === 'Select' ? '请选择' : '请输入';
					this.showToast({
						content: options.emptyTip || defaultMsg,
						icon: 'error'
					});
					return;
				}
			}

			if (options.require) instance.remove();
			oldOnOk && oldOnOk(inputOptions.value);
		};
		const instance = this.confirm(options);
		return instance;
	},


	/**
	 * ​显示操作菜单
	 * @param {{title:String,content:String,onOk:Function,onCancel:Function}} options
	 */
	showActionSheet(options) {
		//todo ​显示操作菜单未实现
		// options.render = (h) => {
		// 	const items = options.items.map((item, index) => {
		// 		return h('Option', {value: index}, item)
		// 	});
		// 	items.unshift(h('Option', {value: ''}, '请选择'));
		//
		// 	return h('Select', {
		// 		props: {value: options.value},
		// 		on: {
		// 			change() {
		// 				options.success && options.success(value);
		// 			}
		// 		}
		// 	}, items);
		// };
		// return this.confirm(options);
	},

	/**
	 * 显示导航条加载动画
	 */
	showNavigateLoading() {
		iView.LoadingBar.start();
	},

	/**
	 * 隐藏导航条加载动画
	 */
	hideNavigateLoading() {
		iView.LoadingBar.finish();
	},
}
