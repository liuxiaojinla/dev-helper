<template>
	<Layout class="layout">
		<Content class="content">
			<Row v-show="data.length">
				<Col :sm="12" :md="6" :lg="4" v-for="(item,index) in data" :key="index">
					<Card>
						<p slot="title">{{item.title}}</p>

						<div class="card-body">
							<Icon type="ios-folder" @click="onSelectPath(row,'target_path')" size="18" style="margin-right: 8px"/>
							<span>{{row.targetpath}}</span>
						</div>

						<Row class="action">
							<Col>
								<span style="color: #19be6b">{{item.count}}</span>
							</Col>
							<Col>
								<Icon type="ios-trash-outline" style="color: #ed4014" size="24" @click="onDelete(item)"></Icon>
							</Col>
							<Col>
								<Icon type="ios-square" style="color: #ed4014" size="24" @click="onToggle(row)" v-if="row.status"></Icon>
								<Icon type="ios-play" style="color: #19be6b" size="24" @click="onToggle(row)" v-else></Icon>
							</Col>
							<Col>
								<router-link tag="Icon" class="ivu-icon-ios-eye" style="font-size: 24px"
										:to="{name:'filewatcher.detail',query:{id:item.id}}"></router-link>
							</Col>
						</Row>

					</Card>
				</Col>
			</Row>
			<div class="empty-tips" v-show="!data.length">
				暂没有创建任何项目！
			</div>
		</Content>
		<Footer class="layout-footer">
			<Button :to="{name:'filewatcher.add'}" icon="ios-add" type="primary">新增</Button>
		</Footer>
	</Layout>
</template>

<script>
import store from './store';
import Col from "iview/src";

export default {
	name: "FileWatcher",
	components: {Col},
	$store: store,
	data: function() {
		return {
			data: store.getProjectList(),
		};
	},
	mounted() {
	},
	created() {
		// const win = sys.getCurrentWindow();
		// if (win.getSize()[0] < 640) {
		// 	win.setSize(640, 480, true);
		// }
	},
	destroyed() {
		// if (IS_DEV) store.destroy();
	},
	methods: {
		onToggle(row) {
			if (row.status) {
				store.stopProject(row.id);
			} else {
				store.startProject(row.id);
			}
		},
		onDelete: function(row) {
			sys.showModal({
				icon: 'confirm',
				title: '温馨提示',
				content: '你确定要删除这个监听目录吗？',
				onOk: () => {
					store.deleteProject(row.id);
				}
			});
		},
		onSelectPath(row) {
			sys.openFileSelectDialog({
				properties: ['openDirectory']
			}).then((files) => {
				store.setProjectTargetPath(row.id, files[0]);
			});
		},
	}
}
</script>

<style scoped>
	.layout {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}

	.content {
		padding: 16px;
	}

	.layout-footer {
		padding: 8px 16px;
	}

	.empty-tips {
		color: #808695;
		font-size: 24px;
		text-align: center;
		margin-top: 15%;
		font-weight: bold;
	}
</style>
