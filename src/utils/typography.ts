import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '17px',
  baseLineHeight: 1.666,
  googleFonts: [
    {
      name: 'Open Sans',
      styles: ['400', '400i', '600', '900'],
    },
  ],
  headerFontFamily: ['Open Sans', 'sans-serif'],
  bodyFontFamily: ['Open Sans', 'sans-serif'],
});

export default typography;
