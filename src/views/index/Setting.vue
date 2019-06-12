<template>
	<Form :label-width="80">
		<FormItem label="开机自启动">
			<i-switch v-model="self_start" @on-change="onSelfStartChange"/>
		</FormItem>
		<FormItem label="设置背景图">
			<Input type="url" v-model="form.backgroundImage"/>
		</FormItem>
		<FormItem label="字体颜色">
			<RadioGroup v-model="form.color">
				<Radio label="light">亮色</Radio>
				<Radio label="">暗色</Radio>
			</RadioGroup>
		</FormItem>
	</Form>
</template>

<script>
import setting from '../../data/setting';

const path = require('path');
const electron = require('electron');
const childProcess = require('child_process');
const selfStartKey = 'HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';

export default {
	name: "Setting",
	data() {
		return {
			self_start: false,
			form: {}
		};
	},
	created() {
		this.form = setting.get();
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
	},
	watch: {
		form: {
			deep: true,
			handler: function(newValue) {
				setting.set(newValue);
			}
		},
		'form.backgroundImage': function(newValue) {
			this.$root.$children[0].$emit('update.background.image', newValue);
		},
		'form.color': function(newValue) {
			console.log(newValue,this.$root);
			this.$root.$children[0].$emit('update.color', newValue);
		}
	}
}
</script>

<style scoped>
	Form {
		padding: 15px;
	}
</style>
