<template>
	<Form>
		<FormItem>
			<Input type="textarea" :rows="12" v-model="data" readonly="" ref="input"/>
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
		readFile(hostsPath, {encoding: 'utf8'}).then(res => {
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
		padding: 16px;
	}

	.form-footer Button:not(:first-child) {
		margin-left: 16px;
	}
</style>
