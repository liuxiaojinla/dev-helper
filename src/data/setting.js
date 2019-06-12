const settingsStr = localStorage.getItem('settings') || "{}";
const settings = Object.assign({
	backgroundImage: '',
	color: '',
}, JSON.parse(settingsStr));

export default {
	get() {
		return settings;
	},
	getValue(key) {
		return settings[key];
	},
	set(newSettings) {
		Object.assign(settings, newSettings);
		localStorage.setItem('settings', JSON.stringify(newSettings));
	},
	setValue(key, value) {
		this.set({
			[key]: value
		});
	}
};
