export const calculateLuminance = (color: string) => {
  // Convert color to RGB
  const rgb = color.substring(1); // Remove the leading #
  const r = parseInt(rgb.substring(0, 2), 16) / 255;
  const g = parseInt(rgb.substring(2, 4), 16) / 255;
  const b = parseInt(rgb.substring(4, 6), 16) / 255;

  // Calculate the relative luminance using the formula
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance;
};

export const getTextColor = (luminance: number) => {
  // Check if the background color is light or dark
  if (luminance > 0.5) {
    return '#000000'; // Use black text color for light backgrounds
  } else {
    return '#ffffff'; // Use white text color for dark backgrounds
  }
};

export const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getProfileCircleText = (fullname: string) => {
  const nameArray = fullname.split(' ');
  const [firstname, lastname] = nameArray;

  return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
};
