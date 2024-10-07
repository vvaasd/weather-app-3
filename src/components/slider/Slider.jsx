import { useContext, useState } from 'react';
import { SLIDER_TYPES } from '../../constants/SLIDER_TYPES';
import { getOneDaySliderData } from '../../utils/getOneDaySliderData';
import { getFiveDaysSliderData } from '../../utils/getFiveDaysSliderData';
import TabBar from '../tabBar/TabBar';
import Tab from '../tab/Tab';
import styles from './Slider.module.css';
import { BlurContext } from '../../contexts/blur-context';
import { WeatherContext } from '../../contexts/weather-context';

function Slider() {
  const [activeSliderType, setActiveSliderType] = useState(
    SLIDER_TYPES.forOneDay
  );
  const { isBlur } = useContext(BlurContext);
  const { forecastList } = useContext(WeatherContext);

  const handleSliderSwitch = (sliderType) => {
    setActiveSliderType(sliderType);
  };

  const oneDaySliderData = getOneDaySliderData(forecastList);
  const fiveDaysSliderData = getFiveDaysSliderData(forecastList);

  return (
    <section className={`${styles.slider} ${isBlur ? 'blur' : ''}`}>
      <TabBar
        activeSliderType={activeSliderType}
        handleSwitch={handleSliderSwitch}
      />
      <Tab
        sliderData={
          activeSliderType === SLIDER_TYPES.forOneDay
            ? oneDaySliderData
            : fiveDaysSliderData
        }
      />
    </section>
  );
}

export default Slider;
