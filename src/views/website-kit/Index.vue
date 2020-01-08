<template>
	<List class="website-kit">
		<ListItem v-for="item in actions" @click.native="onHandle(item)" :key="item.name">
			<ListItemMeta :title="item.title" :description="item.desc">
				<Icon :custom="item.icon" size="32" slot="avatar"/>
			</ListItemMeta>

			<template slot="action">
				<li>
					<i-switch v-model="item.status"/>
				</li>
			</template>
		</ListItem>
	</List>
</template>

<script>
export default {
	name: "WebsiteKit",
	data() {
		return {
			actions: [
				{
					name: 'apache',
					title: 'Apache',
					desc: '',
					icon: 'dev-icon icon-apache',
					status: 0
				},
				{
					name: 'mysql',
					title: 'MySQL',
					desc: '',
					icon: 'dev-icon icon-mysql',
					status: 0
				},
				{
					name: 'php',
					title: 'PHP',
					desc: '',
					icon: 'dev-icon icon-php',
					status: 0
				},
			]
		};
	},
	methods: {
		onHandle(action) {

		}
	}
}
</script>

<style scoped>
	.website-kit {
	}

</style>
