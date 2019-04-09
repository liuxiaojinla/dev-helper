<template>
	<Form>
		<FormItem label="开机自启动">
			<i-switch v-model="self_start" @on-change="onSelfStartChange"/>
		</FormItem>
	</Form>
</template>

<script>
const regedit = require('regedit');
const selfStartKey = '\\HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';

export default {
	name: "Setting",
	data() {
		return {
			self_start: false
		};
	},
	created() {
		regedit.list(selfStartKey, function(err, result) {
			console.log(result);
		})
	},
	methods: {
		onSelfStartChange(isSwitch) {
			if (isSwitch) {
				console.log({
					[selfStartKey]: {
						'dev-helper': {
							value: app.getPath('exe'),
							type: 'REG_SZ'
						}
					}
				})
				regedit.putValue({
					[selfStartKey]: {
						'dev-helper': {
							value: "C:\\Windows",
							type: 'REG_SZ'
						}
					}
				}, function(err) {
					console.error(err);
				})
			} else {

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
