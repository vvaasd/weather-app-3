import { CloseSvg } from './CloseSvg';
import { LogoSvg } from './LogoSvg';
import { LogoSmallSvg } from './LogoSmallSvg';
import { SearchSvg } from './SearchSvg';
import { ArrowLeftSvg } from './ArrowLeftSvg';
import { TrashBinSvg } from './TrashBinSvg';
import { HeartSvg } from './HeartSvg';
import { DaySvg } from './DaySvg';
import { NightSvg } from './NightSvg';
import { LocationSvg } from './LocationSvg';

// cards svg
import { HumiditySvg } from './Cards/HumiditySvg';
import { PressureSvg } from './Cards/PressureSvg';
import { SunriseSvg } from './Cards/SunriseSvg';
import { SunsetSvg } from './Cards/SunsetSvg';
import { WindSvg } from './Cards/WindSvg';
import { VisibilitySvg } from './Cards/VisibilitySvg';

import { IMAGE_NAMES } from 'constants';

export const svgComponents = {
  [IMAGE_NAMES.close]: CloseSvg,
  [IMAGE_NAMES.logo]: LogoSvg,
  [IMAGE_NAMES.logoSmall]: LogoSmallSvg,
  [IMAGE_NAMES.search]: SearchSvg,
  [IMAGE_NAMES.arrowLeft]: ArrowLeftSvg,
  [IMAGE_NAMES.trashBin]: TrashBinSvg,
  [IMAGE_NAMES.heart]: HeartSvg,
  [IMAGE_NAMES.day]: DaySvg,
  [IMAGE_NAMES.night]: NightSvg,
  [IMAGE_NAMES.location]: LocationSvg,

  [IMAGE_NAMES.humidity]: HumiditySvg,
  [IMAGE_NAMES.pressure]: PressureSvg,
  [IMAGE_NAMES.sunrise]: SunriseSvg,
  [IMAGE_NAMES.sunset]: SunsetSvg,
  [IMAGE_NAMES.wind]: WindSvg,
  [IMAGE_NAMES.visibility]: VisibilitySvg,
};
