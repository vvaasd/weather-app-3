import darkClearSky from './darkClearSky.jpg';
import lightClearSky from './lightClearSky.jpg';

import darkFewClouds from './darkFewClouds.jpg';
import lightFewClouds from './lightFewClouds.jpg';

import darkScatteredClouds from './darkScatteredClouds.jpg';
import lightScatteredClouds from './lightScatteredClouds.jpg';

import darkBrokenClouds from './darkBrokenClouds.jpg';
import lightBrokenClouds from './lightBrokenClouds.jpg';

import darkShowerRain from './darkShowerRain.jpg';
import lightShowerRain from './lightShowerRain.jpg';

import darkRain from './darkRain.jpg';
import lightRain from './lightRain.jpg';

import darkThunderStorm from './darkThunderStorm.jpg';
import lightThunderStorm from './lightThunderStorm.jpg';

import darkSnow from './darkSnow.jpg';
import lightSnow from './lightSnow.jpg';

import darkMist from './darkMist.jpg';
import lightMist from './lightMist.jpg';

import empty from './empty.png';

export const background = {
  '01': { dark: darkClearSky, light: lightClearSky },
  '02': { dark: darkFewClouds, light: lightFewClouds },
  '03': { dark: darkScatteredClouds, light: lightScatteredClouds },
  '04': { dark: darkBrokenClouds, light: lightBrokenClouds },
  '09': { dark: darkShowerRain, light: lightShowerRain },
  10: { dark: darkRain, light: lightRain },
  11: { dark: darkThunderStorm, light: lightThunderStorm },
  13: { dark: darkSnow, light: lightSnow },
  50: { dark: darkMist, light: lightMist },
  empty,
};
