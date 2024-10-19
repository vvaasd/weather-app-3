import { useState } from 'react';
import { Logo, WeatherSearch, Switch } from 'components';
import { cn } from 'utils';
import styles from './Header.module.css';

export const Header = (props) => {
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const { className, ...otherProps } = props;

  return (
    <header className={cn(styles.wrapper, className)} {...otherProps}>
      <Logo />
      <div className={styles.rightContent}>
        <div className={styles.weatherSearchWrapper}>
          <WeatherSearch
            className={cn(styles.weatherSearch, {
              [styles.wide]: isSearchDropdownOpen,
            })}
            isDropdownOpen={isSearchDropdownOpen}
            setIsDropdownOpen={setIsSearchDropdownOpen}
          />
        </div>
        <Switch
          className={cn({
            [styles.hidden]: isSearchDropdownOpen,
          })}
        />
      </div>
    </header>
  );
};
