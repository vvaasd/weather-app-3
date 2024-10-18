import { Icon } from 'components';
import { cn } from 'utils';
import { IMAGE_NAMES } from 'constants';
import styles from './Input.module.css';

export const Input = (props) => {
  const { onSubmit, value, onClear = () => {}, ...otherProps } = props;

  const handleBtnClick = () => {
    if (value) {
      onClear();
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <input
        value={value}
        autoComplete="off"
        className={styles.input}
        {...otherProps}
      />
      <button
        type="button"
        className={cn(styles.btn, 'btn-reset')}
        onClick={handleBtnClick}
      >
        <Icon
          name={value ? IMAGE_NAMES.close : IMAGE_NAMES.search}
          className={cn(styles.icon, { [styles.close]: value })}
        />
      </button>
    </form>
  );
};
