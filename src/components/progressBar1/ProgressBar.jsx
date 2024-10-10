import styles from './ProgressBar.module.css';

export const ProgressBar = (props) => {
  const { current, type, ...otherProps } = props;

  const validCurrent = Math.max(Math.min(current, 97), 2);

  return (
    <div className={styles.wrapper} {...otherProps}>
      <div
        className={styles.barTumbler}
        style={{ '--progress-position': `${validCurrent}%` }}
      ></div>
      <div
        className={styles.barStripe}
        style={{
          background:
            type === 'normal'
              ? getComputedStyle(document.documentElement).getPropertyValue(
                  '--card-bar-bg-white',
                )
              : `radial-gradient(
                50% 9453.13% at 50% 50%,
                rgba(84, 84, 84, 0.4) 0%,
                rgba(138, 138, 138, 0.4) 45.12%,
                var(--light-filled-200) 100%,
                rgba(218, 218, 218, 0.4) 100%
              )`,
          '--progress-position': `${validCurrent}%`,
        }}
      ></div>
    </div>
  );
};
