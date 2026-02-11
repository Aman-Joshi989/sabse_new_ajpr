/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
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
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                "accent-start": "#3b82f6",
                "accent-end": "#a855f7",
                "status-green": "#22c55e",
                "background-light": "#f8fafc",
                "background-dark": "#0f172a",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontFamily: {
                "display": ["var(--font-manrope)", "sans-serif"],
            },
            animation: {
                "fade-up": "fadeUp 0.6s ease-out forwards",
                "fade-down": "fadeDown 0.6s ease-out forwards",
                "fade-left": "fadeLeft 0.6s ease-out forwards",
                "fade-right": "fadeRight 0.6s ease-out forwards",
                "scale-in": "scaleIn 0.5s ease-out forwards",
                "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
                "float": "float 3s ease-in-out infinite",
                "pulse-glow": "pulseGlow 2s ease-in-out infinite alternate",
                "slide-up": "slideUp 0.8s ease-out forwards",
                "gradient-shift": "gradientShift 3s ease-in-out infinite",
                "typing": "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
                "morphing": "morphing 8s ease-in-out infinite",
                "particle-float": "particleFloat 6s ease-in-out infinite",
                "reveal": "reveal 0.8s ease-out forwards",
                "shimmer": "shimmer 2s linear infinite",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeDown: {
                    "0%": { opacity: "0", transform: "translateY(-30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeLeft: {
                    "0%": { opacity: "0", transform: "translateX(-30px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                fadeRight: {
                    "0%": { opacity: "0", transform: "translateX(30px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.9)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                bounceGentle: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                    "33%": { transform: "translateY(-10px) rotate(1deg)" },
                    "66%": { transform: "translateY(5px) rotate(-1deg)" },
                },
                pulseGlow: {
                    "0%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
                    "100%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(100px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                gradientShift: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                typing: {
                    "from": { width: "0" },
                    "to": { width: "100%" },
                },
                "blink-caret": {
                    "from, to": { borderColor: "transparent" },
                    "50%": { borderColor: "rgb(59, 130, 246)" },
                },
                morphing: {
                    "0%, 100%": { borderRadius: "20px" },
                    "25%": { borderRadius: "50px 20px" },
                    "50%": { borderRadius: "20px 50px" },
                    "75%": { borderRadius: "50px" },
                },
                particleFloat: {
                    "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
                    "25%": { transform: "translateY(-20px) translateX(10px)" },
                    "50%": { transform: "translateY(-10px) translateX(-5px)" },
                    "75%": { transform: "translateY(-30px) translateX(15px)" },
                },
                reveal: {
                    "0%": { clipPath: "circle(0% at 50% 50%)" },
                    "100%": { clipPath: "circle(100% at 50% 50%)" },
                },
                shimmer: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
            },
        },
    },
    plugins: [],
}
