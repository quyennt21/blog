import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.666,
  googleFonts: [
    {
      name: 'Merriweather',
      styles: ['400', '400i', '600', '700', '900'],
    },
  ],
  headerFontFamily: ['Merriweather', 'Open Sans', 'sans-serif'],
  bodyFontFamily: ['Merriweather', 'Open Sans', 'sans-serif'],
});

export default typography;
