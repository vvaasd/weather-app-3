import { forwardRef, useState } from 'react';
import { Icon, Location } from 'components';
import { IMAGE_NAMES } from 'constants';
import { cn } from 'utils';
import styles from './Input.module.css';

const Input = (props, ref) => {
  const {
    onSubmit = () => {},
    value,
    onClear,
    onFocus = () => {},
    onBlur = () => {},
    onClickGeolocation,
    ...otherProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleBtnClick = () => {
    if (value) {
      onClear();
    }
  };

  return (
    <form
      className={cn(styles.wrapper, {
        [styles.highlighted]: isFocused,
      })}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        ref={ref}
        value={value}
        autoComplete="off"
        className={styles.input}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => {
          onBlur();
          setIsFocused(false);
        }}
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
      <Location onClick={onClickGeolocation} />
    </form>
  );
};

export default forwardRef(Input);
