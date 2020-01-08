<template>
	<Form label-position="top">
		<FormItem>
			<Input type="textarea" :rows="16" v-model="data" readonly="" ref="input" class="no-wrap"/>
		</FormItem>
		<FormItem class="form-footer">
			<Button type="primary">保存</Button>
			<Button type="success" @click="openFile">打开文件</Button>
		</FormItem>
	</Form>
</template>

<script>
const os = require('os');
const path = require('path');
const exec = require('child_process').exec;
const util = require('../../libs/util');
const fs = require('fs');
const nodeUtil = require('util');
const readFile = nodeUtil.promisify(fs.readFile);
const rootPath = path.parse(os.homedir()).root;
const hostsPath = path.join(rootPath, 'Windows\\System32\\drivers\\etc\\hosts');

export default {
	name: "Index",
	data() {
		return {
			data: ''
		};
	},
	created() {
		console.log(hostsPath);
		readFile(hostsPath, {
			encoding: 'utf8'
		}).then(res => {
			this.data = res;
		});
	},
	methods: {
		openFile() {
			exec(`notepad ${hostsPath}`, (err, res) => {
				console.log(err, res);
			});
		}
	}
}
</script>

<style scoped>
	Form {
		margin-top: 8px;
	}

	.form-footer Button:not(:first-child) {
		margin-left: 8px;
	}

	.no-wrap >>> textarea {
		word-wrap: normal;
		white-space: pre;
		padding-right: 15px;
	}
</style>
