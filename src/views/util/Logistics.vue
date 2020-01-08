<template>
	<Form ref="form" :model="form" :rules="rules" label-position="top">
		<FormItem prop="order_sn" label="订单号">
			<Input type="text" v-model="form.order_sn" placeholder="请输入订单号"/>
		</FormItem>

		<FormItem label="快递公司">
			<Select v-model="form.type" style="width:200px">
				<Option v-for="(item,key) in logistics" :value="key" :key="key">{{ item }}</Option>
			</Select>
		</FormItem>

		<FormItem>
			<Button icon="ios-search" type="primary" @click="onSubmit">查询</Button>
		</FormItem>

		<p v-if="data">
			状态：{{state[data.state]}}
		</p>

		<Timeline v-if="data">
			<TimelineItem v-for="(item,index) in data.data" :key="index">
				<Icon type="ios-checkmark-circle" size="18" slot="dot" v-if="index===0"/>
				<Icon type="ios-radio-button-on" size="18" slot="dot" v-if="index===data.data.length-1"/>
				<p class="time">{{item.time}}</p>
				<p class="content">{{item.context}}</p>
			</TimelineItem>
		</Timeline>
	</Form>
</template>

<script>
export default {
	name: "Logistics",
	data() {
		return {
			data: null,
			form: {
				type: 'shentong',
				order_sn: '',
			},
			rules: {
				order_sn: [
					{required: true, message: '订单号不能为空', trigger: 'blur'}
				],
			},
			logistics: {
				"shentong": '申通',
				"ems": 'EMS',
				"shunfeng": '顺丰',
				"yuantong": '圆通',
				"zhongtong": '中通',
				"yunda": '韵达',
				"tiantian": '天天',
				"huitongkuaidi": '汇通',
				"quanfengkuaidi": '全峰',
				"debangwuliu": '德邦',
				"zhaijisong": '宅急送',
			},
			state: {
				'0': '在途中',
				'1': '已揽收',
				'2': '疑难',
				'3': '已签收',
				'4': '退签',
				'5': '同城派送中',
				'6': '退回',
				'7': '转单',
			}
		};
	},
	methods: {
		onSubmit() {
			this.$refs.form.validate((valid) => {
				if (!valid) {
					return;
				}
				// 200536444393
				const url = `http://www.kuaidi100.com/query?type=${this.form.type}&postid=${this.form.order_sn}`;
				fetch(url).then(response => {
					if (response.status !== 200) {
						throw new Error("请求失败：" + response.statusText);
					}

					const data = response.json();
					if (data.status === '200') {
						throw new Error(data.message);
					}

					return data;
				}).then(res => {
					this.data = res;
					console.log(res)
				}, err => {
					sys.showToast({content: err.message});
				});
			})
		},
	}
}
</script>

<style scoped>
	Form {
		margin-top: 8px;
	}

	.time {
		font-size: 14px;
		font-weight: bold;
	}

	.content {
		padding-left: 5px;
	}
</style>
