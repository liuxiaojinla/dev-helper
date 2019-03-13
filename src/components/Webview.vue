<template>
	<div>
		<iframe :src="src" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
	</div>
</template>

<script>
export default {
	name: "Webview",
	props: {
		src: {
			type: String,
			default: ''
		}
	},
	mounted() {
		const iframe = this.$el.getElementsByTagName('iframe')[0];
		iframe.onload = function() {
			// iframe.contentWindow.parent = iframe.contentWindow;
			// Object.defineProperty(iframe.contentWindow, 'top', {
			// });
		};
		iframe.onerror = function(err) {
			console.error(err);
		};
	}
}
</script>

<style scoped>
	iframe {
		display: block;
		position: absolute;
		border: 0;
		width: 100%;
		min-height: 100%;
	}
</style>
