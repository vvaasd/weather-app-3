import { ProgressBar, Icon } from 'components';
import { cn } from 'utils';
import { IMAGE_NAMES } from 'constants';
import styles from './Card.module.css';

export const Card = (props) => {
  const {
    title,
    iconName,
    value,
    hasProgressBar,
    pbValue,
    units,
    min,
    max,
    gradientPb,
    description,
    imgRotationDeg,
    className,
    ...otherProps
  } = props;

  return (
    <article className={styles.card} {...otherProps}>
      <h2 className={styles.title}>{title}</h2>
      <Icon
        className={styles.icon}
        name={IMAGE_NAMES[iconName]}
        style={{
          transform: imgRotationDeg && `rotate(${imgRotationDeg}deg`,
        }}
      />
      <span className={styles.value}>
        {value}
        {units ? ' ' + units : ''}
      </span>
      <div className={styles.bottom}>
        {hasProgressBar && (
          <ProgressBar
            current={pbValue}
            type={gradientPb ? 'gradient' : 'normal'}
          />
        )}
        <div
          className={cn(
            styles.info,
            typeof min === 'number' &&
              typeof max === 'number' &&
              styles.interval,
          )}
        >
          {typeof min === 'number' && typeof max === 'number' ? (
            <>
              <span>0%</span>
              <span>100%</span>
            </>
          ) : (
            description
          )}
        </div>
      </div>
    </article>
  );
};
