/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
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
                "sans": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
                "display": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
            },
            animation: {
                "fade-up": "fadeUp 0.6s ease-out forwards",
                "fade-down": "fadeDown 0.6s ease-out forwards",
                "float": "float 3s ease-in-out infinite",
                "pulse-glow": "pulseGlow 2s ease-in-out infinite alternate",
                "shimmer": "shimmer 2s linear infinite",
                "meteor-effect": "meteor 5s linear infinite",
            },
            keyframes: {
                meteor: {
                  "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
                  "70%": { opacity: "1" },
                  "100%": {
                    transform: "rotate(215deg) translateX(-500px)",
                    opacity: "0",
                  },
                },
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeDown: {
                    "0%": { opacity: "0", transform: "translateY(-30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
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
                shimmer: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
