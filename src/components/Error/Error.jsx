import { Button } from 'components';
import { cn } from 'utils';
import styles from './Error.module.css';

export const Error = (props) => {
  const {
    message = 'Упс! Произошла ошибка',
    subMessage = 'Проверьте настройки и повторите попытку.',
    btnContent = 'Повторить попытку',
    onClick = () => {
      window.location.reload();
    },
    isLarge,
    isLight,
    className,
    ...otherProps
  } = props;

  return (
    <div
      className={cn(styles.wrapper, className, { [styles.large]: isLarge })}
      {...otherProps}
    >
      {(message || subMessage) && (
        <div className={cn(styles.header, { [styles.large]: isLarge })}>
          {message && (
            <p className={cn(styles.message, { [styles.light]: isLight })}>
              {message}
            </p>
          )}
          {subMessage && (
            <p className={cn(styles.subMessage, { [styles.light]: isLight })}>
              {subMessage}
            </p>
          )}
        </div>
      )}
      {btnContent && (
        <div>
          <Button onClick={onClick} className={styles.btn}>
            {btnContent}
          </Button>
        </div>
      )}
    </div>
  );
};
