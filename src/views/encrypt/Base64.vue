<template>
	<Tabs value="decode">
		<TabPane label="解码" name="decode">
			<Form>
				<FormItem label="数据">
					<Input type="textarea" :rows="4" v-model="decode.text" placeholder="请输入..." @click.native="onSelectionAll"/>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="onDecode(0)">解码</Button>
				</FormItem>
				<FormItem label="结果">
					<Input type="textarea" :rows="4" v-model="decode.result" readonly/>
				</FormItem>
			</Form>
		</TabPane>
		<TabPane label="加密" name="encode">
			<Form>
				<FormItem label="数据">
					<Input type="textarea" :rows="4" v-model="encode.text" placeholder="请输入..." @click.native="onSelectionAll"/>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="onEncode(0)">编码</Button>
				</FormItem>
				<FormItem label="结果">
					<Input type="textarea" :rows="4" v-model="encode.result" readonly/>
				</FormItem>
			</Form>
		</TabPane>
	</Tabs>
</template>

<script>
function utf8_to_b64(str) {
	return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
	return decodeURIComponent(escape(window.atob(str)));
}

export default {
	name: "Base64",
	data() {
		return {
			decode: {
				text: '',
				result: ''
			},
			encode: {
				text: '',
				result: ''
			}

		};
	},
	methods: {
		onDecode(type) {
			try {
				this.decode.result = b64_to_utf8(this.decode.text);
			} catch (e) {
				sys.showToast({content: e.message, icon: 'error'});
			}
		},
		onEncode(type) {
			try {
				this.encode.result = utf8_to_b64(this.encode.text);
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

</style>
