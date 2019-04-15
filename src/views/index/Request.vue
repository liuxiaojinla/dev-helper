<template>
	<Form>
		<FormItem label="请求地址">
			<Input type="text" v-model="form.url" search enter-button="Send" placeholder="请输入请求地址" @on-search="onSubmit"/>
		</FormItem>
		<FormItem label="其他配置">
			<div class="form-mini-block">
				<span>总次数</span>
				<InputNumber type="number" v-model="form.total_count" :min="1"/>
			</div>
			<div class="form-mini-block">
				<span>线程数</span>
				<InputNumber type="number" v-model="form.thread_count" :min="0"/>
			</div>
		</FormItem>
		<FormItem label="状态" v-show="isRequesting">
			<div class="form-mini-block">当前执行次数：<span style="color: orangered">{{currentIndex}}</span></div>
			<div class="form-mini-block">当前执行线程数：<span style="color: orangered">{{currentExecCount}}</span></div>
		</FormItem>
	</Form>
</template>

<script>
let currentRequest = null;

class Request {

	constructor(config) {
		this.config = JSON.parse(JSON.stringify(config));
		this.currentIndex = 0;
		this.currentExecCount = 0;
		this.updateCallback = null;
		this.completeCallback = null;
	}

	send() {
		const update = (data) => {
			if (!this.updateCallback) return;
			this.updateCallback(data);
		};
		const complete = () => {
			if (!this.completeCallback) return;
			this.completeCallback();
		};
		const handle = () => {
			if (this.currentIndex >= this.config.total_count) {
				complete();
				return;
			}
			if (this.config.thread_count > 0 && this.currentExecCount >= this.config.thread_count) return;

			this.currentIndex++;
			this.currentExecCount++;
			update({
				currentIndex: this.currentIndex,
				currentExecCount: this.currentExecCount,
			});

			fetch(this.config.url).then(response => {
				console.debug(response);
				this.currentExecCount--;
				update({currentExecCount: this.currentExecCount});
				handle();
			}, () => {
				this.currentExecCount--;
				update({currentExecCount: this.currentExecCount});
				handle();
			});
			setTimeout(() => handle(), 0);
		};
		handle();
	}
}

export default {
	name: "Request",
	data() {
		return {
			form: {
				url: 'https://www.baidu.com/',
				total_count: 1,
				thread_count: 10,
			},
			isRequesting: false,
			currentIndex: 0,
			currentExecCount: 0,
		};
	},
	methods: {
		onSubmit() {
			this.isRequesting = true;
			currentRequest = new Request(this.form);
			currentRequest.updateCallback = (data) => {
				Object.assign(this, data);
			};
			currentRequest.completeCallback = () => {
				setTimeout(() => {
					this.isRequesting = false;
				}, 1000);
			};
			currentRequest.send();
		}
	}
}
</script>

<style scoped>
	Form {
		padding: 15px;
	}

	.form-mini-block {
		display: inline-block;
		width: auto;
		margin-right: 16px;
	}

	.form-mini-block:first-child {
		clear: both;
	}

	.form-mini-block > span:first-child {
		margin-right: 6px;
	}
</style>
