import Icon from '../icon/Icon';
import styles from './Input.module.css';

function Input({ onSubmit, value, label = '', onClickClear, ...props }) {
  return (
    <form className={styles.block} onSubmit={onSubmit}>
      <input
        className={styles.input}
        placeholder={label}
        autoComplete="off"
        value={value}
        {...props}
      />
      {value && (
        <Icon
          className={styles.icon}
          onClick={onClickClear}
          size={24}
          path={'/images/icons/lens/clear.svg'}
        />
      )}
      {!value && (
        <Icon
          className={styles.icon}
          size={24}
          path={'/images/icons/lens/lens.svg'}
        />
      )}
    </form>
  );
}

export default Input;
