import styles from './Tab.module.css';
import Icon from '../icon/Icon';
import { Button } from '../button/Button'
import { useState, useRef, useEffect } from 'react';
import { useElementWidth } from '../../hooks';
import { cn } from '../../utils'

function Tab({ sliderData }) {
  const [translateX, setTranslateX] = useState(0)
  const [step, setStep] = useState(0)
  const sliderRef = useRef(null)
  const sliderContentRef = useRef(null)
  const cardRef = useRef(null)

  const sliderWidth = useElementWidth(sliderRef)
  const sliderContentWidth = useElementWidth(sliderContentRef)
  const endTranslate = sliderWidth - sliderContentWidth;
  const accuracy = 10//карточки могут отличаться на пару пикселей друг от друга, это значение есть погрешность для нормального свайпа последней карточки

  const translateToStart = () => {
    setTranslateX(0)
  }

  const getStep = () => {
    translateToStart()
    const cards = document.querySelectorAll(`.${styles.dayCard}`)
    setStep(cards[0].clientWidth)
  }

  const translateLeft = () => {
    setTranslateX(prev => prev + step >= 0 ? 0 : prev + step)
  }

  const translateRight = () => {
    setTranslateX(prev => prev <= endTranslate + step + accuracy ? endTranslate : prev - step)
  }

  useEffect(() => {
    window.addEventListener('resize', getStep)
    return () => {
      window.removeEventListener('resize', getStep);
    }
  }, [])

  useEffect(() => {
    getStep()
  }, [sliderData])

  return (
    <>
      <div className={styles.sliderContent}>
        <Button
          disabled={translateX === 0}
          onClick={translateLeft}>
          <Icon path="/images/icons/chevron.svg" />
        </Button>
        <div
          className={cn(styles.sliderWindow, {
            [styles.sliderShadowRight]: endTranslate <= translateX,
            [styles.sliderShadowAll]: translateX < 0,
            [styles.sliderShadowLeft]: translateX === endTranslate
          })}
          ref={sliderRef}
        >
          <ul
            className={styles.cards}
            style={{ transform: `translateX(${translateX}px)` }}
            ref={sliderContentRef}
          >
            {sliderData.map((cardData, i) => (
              <li key={i} className={styles.dayCard} ref={cardRef}>
                <div className={styles.cardContent}>
                  <span className={styles.time}>{cardData.time}</span>
                  <Icon
                    path={`/images/icons/weatherType/${cardData.imgName}.svg`}
                    size={32}
                  />
                  <span className={styles.temp}>{cardData.tempStr}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Button
          disabled={translateX <= endTranslate}
          onClick={translateRight}>
          <Icon path="/images/icons/chevron.svg" />
        </Button>
      </div>
    </>
  );
}

export default Tab;
