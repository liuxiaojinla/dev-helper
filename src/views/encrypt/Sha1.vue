<template>
	<Form>
		<FormItem label="数据">
			<Input type="textarea" :rows="4" v-model="encode.text" placeholder="请输入..." @click.native="onSelectionAll"/>
		</FormItem>
		<FormItem>
			<Button type="primary" @click="onEncode(0)">加密</Button>
		</FormItem>
		<FormItem label="结果">
			<Input type="textarea" :rows="4" v-model="encode.result" readonly/>
		</FormItem>
	</Form>
</template>

<script>
const sha1 = require('js-sha1');

export default {
	name: "Sha1",
	data() {
		return {
			encode: {
				text: '',
				result: ''
			}

		};
	},
	methods: {
		onEncode(type) {
			try {
				this.encode.result = sha1(this.encode.text);
			} catch (e) {
				sys.showToast({content: e.message, icon: 'error'});
			}
		},
		onSelectionAll($event) {
			$event.path[0].select();
		}
	}
}
</script>

<style scoped>
	Form {
		padding: 15px;
	}
</style>
