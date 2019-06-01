<template>
	<Form>
		<FormItem label="开机自启动">
			<i-switch v-model="self_start" @on-change="onSelfStartChange"/>
		</FormItem>
	</Form>
</template>

<script>
const path = require('path');
const electron = require('electron');
const childProcess = require('child_process');
const selfStartKey = 'HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';

export default {
	name: "Setting",
	data() {
		return {
			self_start: false
		};
	},
	created() {
		childProcess.exec(`REG QUERY ${selfStartKey}`, (error, stdout) => {
			if (error) {
				console.error(error);
			} else {
				const list = stdout.split('\n').map(item => {
					return item.trim().split(' ', 2)[0];
				}).filter(item => item);
				this.self_start = list.indexOf("DevHelper") !== -1;
			}
		});
	},
	methods: {
		onSelfStartChange(isSwitch) {
			if (isSwitch) {
				const appPath = electron.remote.app.getPath('exe');
				console.log(`REG ADD ${selfStartKey} /v DevHelper /t REG_SZ /d ${appPath} /f`);
				childProcess.exec(`REG ADD ${selfStartKey} /v DevHelper /t REG_SZ /d ${appPath} /f`, function(error, stdout) {
					if (error) {
						sys.showToast({content: '设置失败！'});
						console.error(error.message);
						this.self_start = false;
					}
				});
			} else {
				childProcess.exec(`REG DELETE ${selfStartKey} /v DevHelper /f`, function(error, stdout) {
					if (error) {
						sys.showToast({content: '取消失败！'});
						console.error(error.message);
						this.self_start = true;
					}
				});
			}
		},
	}
}
</script>

<style scoped>
	Form {
		padding: 15px;
	}
</style>
