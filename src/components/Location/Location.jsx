import { useContext } from 'react';
import { cn } from 'utils';
import { IMAGE_NAMES } from 'constants';
import { Icon, Button } from 'components';
import { WeatherContext } from 'context';
import styles from './Location.module.css';

export const Location = (props) => {
  const { className, onClick = () => {}, ...otherProps } = props;

  const { geolocate, isGeolocationLoading } = useContext(WeatherContext);

  return (
    <Button
      className={cn(styles.btn, className, {
        [styles.loading]: isGeolocationLoading,
      })}
      onClick={() => {
        geolocate();
        onClick();
      }}
      noBackground
      {...otherProps}
    >
      <Icon name={IMAGE_NAMES.location} className={styles.icon} />
    </Button>
  );
};
