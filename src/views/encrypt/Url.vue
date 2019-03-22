<template>
	<Tabs value="decode">
		<TabPane label="解码" name="decode">
			<Form>
				<FormItem label="URL">
					<Input type="textarea" :rows="4" v-model="decode.text" placeholder="arg1=%25%27&arg2=%20%22" @click.native="onSelectionAll"/>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="onDecode(0)">完整URL解码</Button>
					<Button type="primary" @click="onDecode(1)" style="margin-left: 16px">部分字符串解码</Button>
				</FormItem>
				<FormItem label="结果">
					<Input type="textarea" :rows="4" v-model="decode.result" readonly/>
				</FormItem>
			</Form>
		</TabPane>
		<TabPane label="加密" name="encode">
			<Form>
				<FormItem label="URL">
					<Input type="textarea" :rows="4" v-model="encode.text" placeholder="arg1=123&arg2=456" @click.native="onSelectionAll"/>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="onEncode(0)">完整URL编码</Button>
					<Button type="primary" @click="onEncode(1)" style="margin-left: 16px">部分字符串编码</Button>
				</FormItem>
				<FormItem label="结果">
					<Input type="textarea" :rows="4" v-model="encode.result" readonly/>
				</FormItem>
			</Form>
		</TabPane>
	</Tabs>
</template>

<script>
export default {
	name: "Url",
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
				if (type) {
					this.decode.result = decodeURIComponent(this.decode.text);
				} else {
					this.decode.result = decodeURI(this.decode.text);
				}
			} catch (e) {
				sys.showToast({content: e.message, icon: 'error'});
			}
		},
		onEncode(type) {
			try {
				if (type) {
					this.encode.result = encodeURIComponent(this.encode.text);
				} else {
					this.encode.result = encodeURI(this.encode.text);
				}
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
