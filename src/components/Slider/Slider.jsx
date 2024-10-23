import { useState } from 'react';
import { SLIDER_TYPES } from 'constants';
import { TabBar, SliderContent } from 'components';

import styles from './Slider.module.css';

export const Slider = () => {
  const [activeSliderType, setActiveSliderType] = useState(
    SLIDER_TYPES.forOneDay,
  );

  const handleSliderSwitch = (sliderType) => {
    setActiveSliderType(sliderType);
  };

  return (
    <section className={styles.wrapper}>
      <TabBar
        activeSliderType={activeSliderType}
        handleSwitch={handleSliderSwitch}
      />
      <SliderContent activeSlider={activeSliderType} />
    </section>
  );
};
