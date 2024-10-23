import { cn } from 'utils';
import { useResize } from 'hooks';
import { BREAKPOINTS } from 'constants';
import styles from './Logo.module.css';

const logoText = {
  desktop: { start: 'Weather', end: 'App' },
  tablet: { start: 'W', end: 'A' },
};

export const Logo = (props) => {
  const { className, ...otherProps } = props;

  const screenTypeSize = useResize();

  const { start, end } =
    screenTypeSize <= BREAKPOINTS.tablet ? logoText.tablet : logoText.desktop;

  return (
    <h1 className={styles.title}>
      <a
        href="/"
        rel="noreferrer"
        className={cn(styles.link, className)}
        {...otherProps}
      >
        <span className={styles.startText}>{start}</span>
        <span className={styles.endText}>{end}</span>
      </a>
    </h1>
  );
};
