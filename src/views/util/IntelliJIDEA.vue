<template>
	<Form label-position="top">
		<div class="tips">
			请复制您的注册码
			(请加“0.0.0.0 account.jetbrains.com”及““0.0.0.0 www.jetbrains.com””到hosts中屏蔽联网)
		</div>
		<FormItem label="数据">
			<Input type="textarea" :rows="12" v-model="data" readonly="" ref="input"/>
		</FormItem>
		<FormItem>
			<Button type="primary" @click="onGet">获取</Button>
		</FormItem>
	</Form>
</template>

<script>
export default {
	name: "IntelliJIDEA",
	data() {
		return {
			data: ''
		};
	},
	methods: {
		onGet() {
			const url = `http://idea.lanyus.com/getkey?userName=lan+yu`;
			fetch(url).then(response => {
				if (response.status !== 200) {
					throw new Error("请求失败：" + response.statusText);
				}
				return response.text();
			}).then(res => {
				this.data = res;
				this.$nextTick(() => {
					this.$refs.input.$el.firstChild.select();
				});
			}, err => {
				sys.showToast({content: err.message});
			});
		}
	}
}
</script>

<style scoped>
	.tips {
		padding: 8px 0 8px 8px;
		line-height: 1.6;
		font-weight: bold;
		font-size: 16px;
		border-left: 5px seagreen solid;
		border-bottom-left-radius: 5px;
		border-top-left-radius: 5px;
		background-color: rgba(155, 205, 155, 0.3);
	}

	Form {
		margin-top: 8px;
	}
</style>
