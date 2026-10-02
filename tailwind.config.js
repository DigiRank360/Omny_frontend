export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { navy: { 950: '#040a1c', 900: '#07112b', 800: '#0b1a3d' }, brand: { 50: '#eef7fc', 100: '#dceefa', 200: '#b9deef', DEFAULT: '#1176b8', dark: '#0b5f96', light: '#2689c9' } },
    fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'] },
  } },
  plugins: [],
};
