import { ProgressBar, Icon } from 'components';
import { IMAGE_NAMES, PROGRESS_BAR_TYPES } from 'constants';
import { cn } from 'utils';
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
      <h3 className={styles.title}>{title}</h3>
      <Icon
        className={cn(styles.icon)}
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
            type={
              gradientPb
                ? PROGRESS_BAR_TYPES.gradient
                : PROGRESS_BAR_TYPES.normal
            }
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
              <span className={styles.intervalValue}>{min}%</span>
              <span className={styles.intervalValue}>{max}%</span>
            </>
          ) : (
            description
          )}
        </div>
      </div>
    </article>
  );
};
