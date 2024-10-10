import { cn } from 'utils';
import styles from './Logo.module.css';

export const Logo = (props) => {
  const { className, ...otherProps } = props;

  return (
    <a
      href="/"
      rel="noreferrer"
      className={cn(styles.link, className)}
      {...otherProps}
    >
      <img className={styles.logo} alt="WeatherApp" />
    </a>
  );
};
