<template>
	<Row type="flex">
		<Col :xs="6" :sm="8" :md="6" :lg="4" class="nav">
			<Menu :active-name="0" width="auto" @on-select="onNavChange" class="nav">
				<MenuItem v-for="(group,index) in data" :key="group.name" :name="index">
					<span :class="iconClasses(group.icon)" style="font-size: 18px"></span>
					{{group.title}}
				</MenuItem>
			</Menu>
		</Col>
		<Col :xs="18" :sm="16" :md="18" :lg="20" class="content">
			<keep-alive :exclude="$router.options.exclude" :max="10">
				<component :is="data[componentIndex].page" v-bind="data[componentIndex].options"></component>
			</keep-alive>
		</Col>
	</Row>

</template>
<!--<Collapse class="home" :value="Object.keys(data)" simple>-->
<!--	<Panel v-for="group in data" :key="group.title">-->
<!--		<span :class="iconClasses(group.icon)" style="font-size: 18px"></span>-->
<!--		{{group.title}}-->

<!--	</Panel>-->
<!--</Collapse>-->
<script>
import ACTION_LIST from '../../data/actions';
import FileWatcher from '../file-watcher/Index';
import Action from './Action';

const iconPrefixCls = 'ivu-icon';

export default {
	name: 'Home',
	components: {
		FileWatcher,
		Action
	},
	data() {
		return {
			data: ACTION_LIST,
			componentIndex: 0
		};
	},
	methods: {
		iconClasses(type) {
			return [
				iconPrefixCls,
				{
					[`${iconPrefixCls}-${type}`]: type !== '',
				}
			];
		},
		onNavChange(index) {
			this.componentIndex = index;
		}
	}
}
</script>

<style scoped>
	.home {
		user-select: none;
	}

	.nav {
		height: calc(100vh - 58px);
	}

	.content {
		transform: translate(0, 0);
	}


</style>
