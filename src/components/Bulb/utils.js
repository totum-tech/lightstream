export const hueToRGB = hue => {
  return hue;
};

export const hexToRgb = hex => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

export const rgbToHue = ({r, g, b}) => {
  //Gamma correctie
  r = (r > 0.04045) ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : (r / 12.92);
  g = (g > 0.04045) ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : (g / 12.92);
  b = (b > 0.04045) ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : (b / 12.92);

  //Apply wide gamut conversion D65
  var X = r * 0.664511 + g * 0.154324 + b * 0.162028;
  var Y = r * 0.283881 + g * 0.668433 + b * 0.047685;
  var Z = r * 0.000088 + g * 0.072310 + b * 0.986039;

  var fx = X / (X + Y + Z);
  var fy = Y / (X + Y + Z);
  if (isNaN(fx)) {
    fx = 0.0;
  }
  if (isNaN(fy)) {
    fy = 0.0;
  }

  return [fx.toPrecision(4),fy.toPrecision(4)];
};
