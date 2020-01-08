<template>
	<Collapse :value="$props.actions.map((it,index)=>index)" class="action-group">
		<Panel v-for="(item,index) in $props.actions" hide-arrow :key="index" class="group-item">
			{{item.title}}
			<Action v-bind="{actions:item.children}" slot="content" style="margin: 0"/>
		</Panel>
	</Collapse>
</template>

<script>
import Action from './Action';

export default {
	components: {
		Action
	},
	props: {
		actions: Array,
		type: {
			type: String,
			default: 'link'
		}
	},
}
</script>

<style scoped>
	.action-group {
		margin-left: -8px;
		margin-right: -8px;
	}

	.group-item >>> .ivu-collapse-content {
		padding: 0;
	}

	.group-item >>> .ivu-collapse-content-box {
		padding: 0;
	}
</style>
