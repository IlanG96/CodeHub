/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				blue: "#FFA41C",
				blackish: "#030229",
				bg: "#1D1C27",
				redsh: "#F43C73",
				textish: "#989FB1",
				grayish: "#BFB8B8",
				redish: "#CC2229",
				purpleish: "#605bff80",
				"dark-layer-1": "rgb(40,40,40)",
				"dark-layer-2": "rgb(26,26,26)",
				"dark-label-2": "rgba(239, 241, 246, 0.75)",
				"dark-divider-border-2": "rgb(61, 61, 61)",
				"dark-fill-2": "hsla(0,0%,100%,.14)",
				"dark-fill-3": "hsla(0,0%,100%,.1)",
				"dark-gray-6": "rgb(138, 138, 138)",
				"dark-gray-7": "rgb(179, 179, 179)",
				"gray-8": "rgb(38, 38, 38)",
				"dark-gray-8": "rgb(219, 219, 219)",
				"brand-orange": "rgb(255 161 22)",
				"brand-orange-s": "rgb(193, 122, 15)",
				"dark-yellow": "rgb(255 192 30)",
				"dark-pink": "rgb(255 55 95)",
				olive: "rgb(0, 184, 163)",
				"dark-green-s": "rgb(44 187 93)",
				"dark-blue-s": "rgb(10 132 255)",
			},
			fontFamily: {
				sans: ["Poppins"],
				Montserrat: ["Montserrat"],
			  },
			  fontSize: {
				smd: "12px",
				smm: "10px",
				mlg: "16px",
			  },
			  borderRadius: {
				smd: "10px",
				mlg: "16px",
			  },
			  screens: {
				xs: "320px",
				xmd: "560px",
				sm: "600px",
				lg: "1100px",
			  },
			  spacing: {
				stick: "calc(100vw - 100%)",
			  },
			  keyframes: {
				"fade-in": {
				  "0%": { opacity: 0 },
				  "100%": { opacity: 1 },
				},
				"fade-out": {
				  "0%": { opacity: 1 },
				  "100%": { opacity: 0 },
				},
				"slide-x-in": {
				  "0%": { transform: "translateX(-200%)" },
				  "100%": { transform: "translateX(-50%)" },
				},
				"slide-x-out": {
				  "0%": { transform: "translateX(-50%)" },
				  "100%": { transform: "translateX(-200%)" },
				},
				"slide-in": {
				  "0%": { transform: "translate(-200%, -50%)" },
				  "100%": { transform: "translate(-50%,-50%)" },
				},
				"slide-out": {
				  "0%": { transform: "translate(-50%,-50%)" },
				  "100%": { transform: "translate(-200%, -50%)" },
				},
			  },
			  animation: {
				"fade-out": "fade-out 1s ease-out",
				"fade-in": "fade-in 1s ease-out",
				"slide-in": "slide-in 0.3s ease-out",
				"slide-out": "slide-out 0.3s ease-out",
				"slide-x-in": "slide-x-in 0.3s ease-out",
				"slide-x-out": "slide-x-out 0.3s ease-out",
			  },
		},
	},
	plugins: [],
};
