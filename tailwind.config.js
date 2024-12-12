const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: "2rem",
  		screens: {
  			"2xl": "1400px",
  		},
  	},
  	extend: {
  		colors: {
  			'aipgf-white': '#fff',
  			'aipgf-shark1': '#24292f',
  			'aipgf-science-blue': '#0969da',
  			'aipgf-geyser': '#d0d7de',
  			'grays-black': '#000',
  			'aipgf-shark': '#1f2328',
  			'aipgf-jungle-mist': '#bfdadc',
  			'aipgf-iron-50': 'rgba(209, 213, 218, 0.5)',
  			gainsboro: '#d9d9d9',
  			'aipgf-nevada': '#636c76',
  			'neutral-neutral-400': '#93949d',
  			'base-base-black': '#1c1c1e',
  			'aipgf-regent-gray': '#8c959f',
  			'aipgf-aqua-haze': '#f6f8fa',
  			'aipgf-manhattan': '#f2ce8f',
  			'aipgf-red-ribbon': '#e0023d',
  			gray: {
  				'100': '#878a8e',
  				'200': '#222'
  			},
  			black: '#151515',
  			'aipgf-nobel': '#b7b7b7',
  			'neutral-neutral-200': '#dadadd',
  			'gray-900': '#061c3d',
  			'communityintercomcom-blue-ribbon': '#0057ff',
  			'communityintercomcom-black-pearl': '#041527',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		spacing: {
  			'multiplers-05x': '8px'
  		},
  		fontFamily: {
  			'aipgf-manrope-semibold-1356': 'Manrope',
  			p: 'Space Grotesk',
  			'pt-serif': 'PT Serif',
  			inter: 'Inter',
  			menlo: 'Menlo',
  			sans: ["var(--font-sans)", ...fontFamily.sans],
  		},
  		borderRadius: {
  			'181xl': '200px',
  			'4xs': '9px',
  			'3xs': '10px',
  			'23xl': '42px',
  			'xl-4': '20.4px',
  			'12792xl-2': '12811.2px',
  			'6xl': '25px',
  			'29xl-4': '48.4px',
  			'2xs-8': '10.8px',
  			'3xs-1': '9.1px',
  			'366xl-1': '385.1px',
  			'4xs-1': '8.1px',
  			'smi-1': '12.1px',
  			'96xl-2': '115.2px',
  			'3xl-9': '22.9px',
  			'3xl-3': '22.3px',
  			'5xs-4': '7.4px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			"accordion-down": {
  				from: { height: 0 },
  				to: { height: "var(--radix-accordion-content-height)" },
  			},
  			"accordion-up": {
  				from: { height: "var(--radix-accordion-content-height)" },
  				to: { height: 0 },
  			},
  		},
  		animation: {
  			"accordion-down": "accordion-down 0.2s ease-out",
  			"accordion-up": "accordion-up 0.2s ease-out",
  		},
  	},
  	fontSize: {
  		'sm-6': '0.85rem',
  		'base-4': '0.963rem',
  		'base-7': '1.044rem',
  		lg: '1.125rem',
  		'5xl': '1.5rem',
  		lgi: '1.188rem',
  		base: '1rem',
  		'17xl': '2.25rem',
  		'3xl': '1.375rem',
  		'10xl': '1.813rem',
  		'27xl-3': '2.894rem',
  		'9xl': '1.75rem',
  		'18xl': '2.313rem',
  		xs: '0.75rem',
  		'sm-9': '0.869rem',
  		'7xl': '1.625rem',
  		'2xl': '1.313rem',
  		'41xl': '3.75rem',
  		'29xl': '3rem',
  		xl: '1.25rem',
  		'16xl-4': '2.213rem',
  		'4xl': '1.438rem',
  		'21xl': '2.5rem',
  		'13xl': '2rem',
  		'xs-6': '0.725rem',
  		sm: '0.875rem',
  		'sm-5': '0.844rem',
  		'base-1': '1.006rem',
  		'19xl': '2.375rem',
  		'11xl': '1.875rem',
  		'6xs-1': '0.381rem',
  		'4xs-1': '0.506rem',
  		'sm-2': '0.825rem',
  		'2xs-9': '0.681rem',
  		mini: '0.938rem',
  		inherit: 'inherit'
  	},
  	screens: {
  		mq1425: {
  			raw: 'screen and (max-width: 1425px)'
  		},
  		lg: {
  			max: '1200px'
  		},
  		mq825: {
  			raw: 'screen and (max-width: 825px)'
  		},
  		sm: {
  			raw: 'screen and (max-width: 450px)'
  		},
  		md: {
  			raw: 'screen and (min-width: 768px)'
  		}
  	}
  },
  corePlugins: {
    preflight: false,
  },
    plugins: [
      require('@tailwindcss/typography'),
      require("tailwindcss-animate")]
};
