import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '17px',
  baseLineHeight: 1.666,
  googleFonts: [
    {
      name: 'Be Vietnam',
      styles: ['400', '400i', '700', '900'],
    },
  ],
  headerFontFamily: ['Be Vietnam', 'sans-serif'],
  bodyFontFamily: ['Be Vietnam', 'sans-serif'],
});

export default typography;
