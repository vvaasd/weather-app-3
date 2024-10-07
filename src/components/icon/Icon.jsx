import styles from './Icon.module.css';

function Icon({ path, size = 24, ...props }) {
  return (
    <img
      src={path}
      alt={path.split('/').slice(-1)[0].split('.')[0]}
      data-size={size.toString()}
      className={styles.icon}
      {...props}
    />
  );
}

export default Icon;
