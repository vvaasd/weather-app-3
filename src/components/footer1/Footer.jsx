import { cn } from 'utils';
import styles from './Footer.module.css';

export const Footer = (props) => {
  const { className, ...otherProps } = props;

  return (
    <footer className={cn(styles.wrapper, { className })} {...otherProps}>
      <p className={styles.text}>
        Проект выполнен в рамках стажировки&nbsp;
        <a
          className={styles.link}
          href="https://preax.ru"
          target="_blank"
          rel="noreferrer"
        >
          PREAX
        </a>
      </p>
    </footer>
  );
};
