export default {
	particles: {
		number: {
			value: 50
		},
		color: {
			value: ["#b61924", "#009688", "#5FB878", "#393D49", "#1E9FFF", "#FFB800"]
		},
		opacity: {
			value: 0.9,
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
		shape: {
			type: ["circle", "polygon"]
		},
		move: {
			speed: 1,
			random: true,
			bounce: true,
			attract: {
				enable: true,
				rotateX: 3000,
				rotateY: 1500,
			},
		}
	},
	interactivity: {
		detect_on: "window",
		events: {
			onhover: {
				enable: true,
				mode: "bubble"
			},
			onclick: {
				enable: true,
				// mode: "push",
				mode: "repulse"
			},
			resize: true
		},
		modes: {
			bubble: {
				distance: 50,
				size: 20,
				duration: 2,
				opacity: 0.3,
			},
			repulse: {
				distance: 150
			},
			push: {
				particles_nb: 10
			}
		}
	},
	retina_detect: true
};
