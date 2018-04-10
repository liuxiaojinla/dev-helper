<template>
	<div class="codemirror">
		<codemirror v-model="code" :options="cmOptions" class="editor"/>
	</div>
</template>

<script>
	import 'codemirror/mode/javascript/javascript.js';

	export default {
		name: "Index",
		data() {
			return {
				code: '',
				cmOptions: {
					tabSize: 4,
					mode: {
						name: 'javascript',
						json: true
					},
					theme: 'dracula',
					indentUnit: 4,  // 缩进单位，默认2
					smartIndent: true,  // 是否智能缩进
					showCursorWhenSelecting: true,
					line: true,
					lineNumbers: true,// 是否显示行号
				}
			};
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.codemirror {
	}

	.editor {
		height: calc(100vh - 48px);
		position: relative;
		background-color: white;
	}
</style>