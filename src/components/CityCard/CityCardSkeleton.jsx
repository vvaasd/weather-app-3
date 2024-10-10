import { cn } from 'utils';
import styles from './CityCard.module.css';

export const CityCardSkeleton = () => {
  return (
    <section className={styles.cityCard}>
      <div className={styles.dateTimeCity}>
        <div className={cn(styles.locationSkeleton, 'skeleton')} />
        <div className={cn(styles.dateSkeleton, 'skeleton')} />
        <div className={cn(styles.timeSkeleton, 'skeleton')} />
      </div>
      <div className={cn(styles.temperatureSkeleton, 'skeleton')} />
      <div className={cn(styles.weather, styles.skeleton)}>
        <div className={cn(styles.weatherTypeSkeleton, 'skeleton')} />
        <div className={cn(styles.temperatureFeelsSkeleton, 'skeleton')} />
      </div>
    </section>
  );
};
