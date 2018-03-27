import Canvas2Image from 'canvas2image';
import html2canvas from 'html2canvas';

export default {
	/**
	 * 选择图片
	 * @param {{multiple?:boolean,success?:Function,fail?:Function,complete?:Function}} options
	 */
	chooseImage(options = {}) {
		//todo 选择图片未实现
	},

	/**
	 * 预览图片
	 * @param {{current:string,urls:Array<string>,success?:Function,fail?:Function,complete?:Function}} options
	 */
	previewImage(options = {}) {
		//todo 预览图片未实现
	},

	/**
	 * 获取图片信息
	 * @param {{urls:string,success?:Function,fail?:Function,complete?:Function}} options
	 */
	getImageInfo(options = {}) {
		const image = new Image();
		image.onload = () => {
			try {
				options.success && options.success(image);
			} catch (err) {
				console.error(err);
			}
			options.complete && options.complete(image);
		};
		image.onabort = image.onerror = (error) => {
			try {
				options.fail && options.fail(error);
			} catch (err) {
				console.error(err);
			}
			options.complete && options.complete(error);
		};
	},

	/**
	 * 画布转图片
	 * @param {{canvas:Element,success?:Function,fail?:Function,complete?:Function}} options
	 * @returns {*}
	 */
	canvas2Image(options) {
		return Canvas2Image.convertToImage(options.canvas, options.width, options.height, options.type || "png");
	},

	/**
	 * html转canvas
	 * @param {{el:Element,success?:Function,fail?:Function,complete?:Function}} options
	 */
	html2Canvas(options) {
		//todo , {
		// scale: options.scale,
		// 	canvas: options.canvas,
		// 	width: options.width,
		// 	height: options.height
		// }
		html2canvas(options.el).then((canvas) => {
			try {
				options.success && options.success.call(null, canvas);
			} catch (err) {
				console.error(err);
			}
			options.complete && options.complete.call(null, canvas);
		}).catch((err) => {
			try {
				options.fail && options.fail.call(null, err);
			} catch (err) {
				console.error(err);
			}
			options.complete && options.complete.call(null, err);
		});
	}
};
