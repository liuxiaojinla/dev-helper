export default  {
	particles: {
		number: {
			value: 50
		},
		color: {
			value: ["#b61924", "#009688", "#5FB878", "#393D49", "#1E9FFF", "#FFB800"]
		},
		opacity: {
			value: 0.75,
			random: true,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0,
				sync: false
			}
		},
		size: {
			value: 5,
			random: true,
			anim: {
				enable: true,
				speed: 3,
				size_min: 0.3,
				sync: false
			}
		},
		line_linked: {
			enable: false
		},
		move: {
			speed: 1,
			random: true
		},
		shape: {
			type: ["circle", "edge", "polygon", "star"]
		}
	},
	interactivity: {
		detect_on: "canvas",
		modes: {
			bubble: {
				distance: 250,
				size: 20,
				duration: 2,
				opacity: 0,
				speed: 3
			}
		}
	},
	retina_detect: true
};
