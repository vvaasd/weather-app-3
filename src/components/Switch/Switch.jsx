import { THEMES, IMAGE_NAMES } from 'constants';
import { Icon } from 'components';
import { ThemeContext } from 'context';
import { useContext } from 'react';
import { cn } from 'utils';
import styles from './Switch.module.css';

export const Switch = (props) => {
  const { className, ...otherProps } = props;

  const { theme, onToggleTheme } = useContext(ThemeContext);

  const isLight = theme === THEMES.light;
  const isDark = theme === THEMES.dark;

  return (
    <div className={cn(styles.wrapper, className)} {...otherProps}>
      <button
        type="button"
        onClick={onToggleTheme}
        className={cn(styles.btn, 'btn-reset', { [styles.selected]: isLight })}
      >
        <Icon
          name={IMAGE_NAMES.day}
          className={cn(styles.icon, styles.dayIcon)}
        />
      </button>
      <button
        type="button"
        onClick={onToggleTheme}
        className={cn(styles.btn, 'btn-reset', { [styles.selected]: isDark })}
      >
        <Icon
          name={IMAGE_NAMES.night}
          className={cn(styles.icon, styles.nightIcon)}
        />
      </button>
    </div>
  );
};
