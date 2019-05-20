<template>
	<Form ref="form" :model="form" :rules="rules" :label-width="80">
		<FormItem prop="title" label="项目名称">
			<Input type="text" v-model="form.title" placeholder="请输入项目名称"/>
		</FormItem>

		<FormItem prop="path" label="监听目录">
			<Input type="text" v-model="form.path" placeholder="请选择路径" icon="ios-folder-outline" @on-click="onSelectPath('path')" readonly/>
		</FormItem>

		<FormItem prop="target_path" label="目标目录">
			<Input type="text" v-model="form.targetpath" placeholder="请选择路径" icon="ios-folder-outline" @on-click="onSelectPath('targetpath')" readonly/>
		</FormItem>

		<FormItem prop="target_path" label="上传执行命令">
			<Input type="text" v-model="form.uploader_cmd" placeholder="上传执行命令" icon="ios-folder-outline" @on-click="onSelectPath('uploader_cmd','openFile',filterFile)" readonly/>
		</FormItem>

		<FormItem label="立即监听">
			<RadioGroup v-model="form.status">
				<Radio :label="1">开启</Radio>
				<Radio :label="0">不开启</Radio>
			</RadioGroup>
		</FormItem>

		<FormItem>
			<Button icon="ios-folder" type="primary" @click="onSubmit">保存</Button>
		</FormItem>
	</Form>
</template>

<script>
import store from './store';

export default {
	name: "AutoDeploymentAdd",
	data: function() {
		return {
			filterFile: [
				{name: '可执行文件', extensions: ['exe', 'bat']},
			],
			form: {
				title: '',
				path: '',
				targetpath: '',
				uploader_cmd: '',
				status: 0,
			},
			rules: {
				title: [
					{required: true, message: '项目名称不能为空', trigger: 'blur'}
				],
				path: [
					{required: true, message: '请选择一个监听目录'}
				],
			}
		};
	},
	created() {
	},
	methods: {
		onSelectPath(name, type = 'openDirectory', filters = '') {
			sys.openFileSelectDialog({
				properties: [type],
				filters: filters
			}).then((files) => {
				console.log(files);
				this.form[name] = files[0];
			});
		},
		onSubmit() {
			this.$refs.form.validate((valid) => {
				if (!valid) {
					// sys.showToast({	icon: 'error',content: '新增失败' });
					return;
				}

				store.addProject(Object.assign({
					count: 0,
				}, this.form));
				this.$router.go(-1);
			})
		}
	}
}
</script>

<style scoped>
	Form {
		padding: 15px;
	}
</style>
