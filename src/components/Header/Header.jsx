import { Logo, WeatherSearch } from 'components';
import styles from './Header.module.css';
import { cn } from 'utils';

export const Header = (props) => {
  const { className, ...otherProps } = props;

  return (
    <header className={cn(styles.wrapper, className)} {...otherProps}>
      <Logo />
      <WeatherSearch />
    </header>
  );
};
