import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Original shadcn colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Enhanced Anniversary theme colors
				ivory: '#EAE2D6',
				gold: '#C8A97E',
				'dark-brown': '#5D4037',
				'warm-cream': '#F7F3ED',
				'soft-gold': '#D4A574',
				'deep-gold': '#B76E79',
				'blush-pink': '#FFE4E1',
				'rose-gold': '#E8B4B8',
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'dancing': ['Dancing Script', 'cursive'],
				'sans': ['Open Sans', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'card-flip': {
					'0%': {
						transform: 'rotateY(0deg)'
					},
					'100%': {
						transform: 'rotateY(180deg)'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pigeon-fly': {
					'0%': {
						transform: 'translateX(-100px) translateY(20px)',
						opacity: '0'
					},
					'50%': {
						transform: 'translateX(50px) translateY(-10px)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(200px) translateY(-30px)',
						opacity: '0'
					}
				},
				'seal-melt': {
					'0%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(0.8)',
						opacity: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'envelope-open': {
					'0%': {
						transform: 'rotateY(180deg) scale(1)'
					},
					'50%': {
						transform: 'rotateY(180deg) scale(1.1)'
					},
					'100%': {
						transform: 'rotateY(180deg) scale(0.9) translateY(-20px)',
						opacity: '0.3'
					}
				},
				'seal-crack': {
					'0%': {
						transform: 'scale(1)',
						filter: 'brightness(1)'
					},
					'50%': {
						transform: 'scale(1.1)',
						filter: 'brightness(0.8)'
					},
					'100%': {
						transform: 'scale(0.9)',
						filter: 'brightness(0.6)'
					}
				},
				'crack': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.8)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1.2)'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'card-flip': 'card-flip 0.8s ease-in-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'pigeon-fly': 'pigeon-fly 3s ease-in-out',
				'seal-melt': 'seal-melt 1s ease-in-out forwards',
				'float': 'float 3s ease-in-out infinite',
				'envelope-open': 'envelope-open 1.2s ease-in-out forwards',
				'seal-crack': 'seal-crack 0.8s ease-in-out forwards',
				'crack': 'crack 0.5s ease-out forwards',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
