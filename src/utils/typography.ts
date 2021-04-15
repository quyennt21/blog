import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.666,
  googleFonts: [
    {
      name: 'Be Vietnam',
      styles: ['900'],
    },
    {
      name: 'Be Vietnam',
      styles: ['400', '400i', '700'],
    },
  ],
  headerFontFamily: ['Be Vietnam', 'sans-serif'],
  bodyFontFamily: ['Be Vietnam', 'sans-serif'],
});

export default typography;
