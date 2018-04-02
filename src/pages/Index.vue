<template>
	<div class="index">
		<Tabs>
			<TabPane label="本地应用" name="local">
				<row v-if="localApps.length">
				</row>
				<h1 class="tips" v-else>
					<Icon type="sad-outline"></Icon>
					本地暂无应用
				</h1>
			</TabPane>
			<TabPane label="服务器" name="server">
				<row>
					<i-col span="24" class="spin-container">
						<Spin size="large" fix></Spin>
					</i-col>
				</row>
			</TabPane>
		</Tabs>

	</div>
</template>

<script>

	export default {
		name: "Index",
		data() {
			return {
				localApps: []
			};
		},

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.index {
	}

	.tips {
		text-align: center;
		margin-top: 15%;
		color: #777;
		text-shadow: 1px 1px 3px #000;
		font-size: 48px;
	}
</style>