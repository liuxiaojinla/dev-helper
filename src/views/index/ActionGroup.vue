<template functional>
	<Collapse :value="props.actions.map((it,index)=>index)">
		<Panel v-for="(item,index) in props.actions" hide-arrow :key="index" class="group-item">
			{{item.title}}
			<Action v-bind="{actions:item.children}" slot="content" style="margin: 0"></Action>
		</Panel>
	</Collapse>
</template>

<script>
import Action from './Action';

export default {
	components: {
		Action
	}
}
</script>

<style scoped>
	.group-item >>> .ivu-collapse-content {
		padding: 0;
	}

	.group-item >>> .ivu-collapse-content-box {
		padding: 0;
	}
</style>
