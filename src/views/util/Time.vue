<template>
	<div class="time">
		<Row :gutter="16" class="">
			<Col :span="12" class="col">
				<Input search enter-button="复制" v-model="currentTime" @on-search="onCopy('currentTime')" readonly>
					<span slot="prepend">当前时间戳</span>
				</Input>
			</Col>
			<Col :span="12" class="col">
				<Input search enter-button="复制" v-model="datetime" @on-search="onTransform" clearable>
					<span slot="prepend">日期转时间戳</span>
				</Input>
			</Col>

			<Col :span="12" class="col">
				<Input search enter-button="复制" v-model="todayStartTime" @on-search="onCopy('todayStartTime')" readonly>
					<span slot="prepend">今天开始时间戳</span>
				</Input>
			</Col>
			<Col :span="12" class="col">
				<Input search enter-button="复制" v-model="todayEndTime" @on-search="onCopy('todayEndTime')" readonly>
					<span slot="prepend">今天结束时间戳</span>
				</Input>
			</Col>

			<Col :span="12" class="col">
				<Input search enter-button="复制" v-model="yesterdayStartTime" @on-search="onCopy('yesterdayStartTime')" readonly>
					<span slot="prepend">昨天开始时间戳</span>
				</Input>
			</Col>
			<Col :span="12" class="col">
				<Input search enter-button="复制" v-model="yesterdayEndTime" @on-search="onCopy('yesterdayEndTime')" readonly>
					<span slot="prepend">昨天结束时间戳</span>
				</Input>
			</Col>
		</Row>
	</div>
</template>

<script>
const {clipboard} = require('electron');
const moment = require('moment');

export default {
	name: "Time",
	data() {
		return {
			currentTime: Math.floor(new Date().getTime() / 1000),
			todayStartTime: Math.floor(function() {
				const time = new Date();
				time.setHours(0);
				time.setMinutes(0);
				time.setSeconds(0);
				time.setMilliseconds(0);
				return time.getTime() / 1000;
			}()),
			todayEndTime: Math.floor(function() {
				const time = new Date();
				time.setHours(23);
				time.setMinutes(59);
				time.setSeconds(59);
				time.setMilliseconds(0);
				return time.getTime() / 1000;
			}()),
			yesterdayStartTime: Math.floor(function() {
				const time = new Date();
				time.setHours(0);
				time.setMinutes(0);
				time.setSeconds(0);
				time.setMilliseconds(0);
				return (time.getTime() - 86400000) / 1000;
			}()),
			yesterdayEndTime: Math.floor(function() {
				const time = new Date();
				time.setHours(23);
				time.setMinutes(59);
				time.setSeconds(59);
				time.setMilliseconds(0);
				return (time.getTime() - 86400000) / 1000;
			}()),
			datetime: '',
		};
	},
	created() {
		const timerId = setInterval(() => {
			this.currentTime = Math.floor(new Date().getTime() / 1000);
		}, 1000);
		this.$once('hook:beforeDestroy', () => {
			clearInterval(timerId);
		});
	},
	methods: {
		onCopy(key) {
			clipboard.writeText(this[key].toString());
			sys.showToast({content: '已复制！'});
		},
		onTransform() {
			const date = moment(this.datetime, 'YYYY-MM-DD HH:mm:ss');
			clipboard.writeText(date.unix().toString());
			sys.showToast({content: '已复制！'});
		},
	}
}
</script>

<style scoped>
	.time {
		margin: 16px;
		max-width: 560px;
	}

	.col {
		margin-bottom: 16px;
	}
</style>
