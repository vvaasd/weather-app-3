import { useContext } from 'react';
import { BlurContext } from '../../contexts/blur-context';
import styles from './Footer.module.css';

function Footer() {
  const {isBlur} = useContext(BlurContext);
  return (
    <footer className={`${styles.wrapper} ${isBlur ? 'blur': ''}`}>
      <p>
        {'Проект выполнен в рамках стажировки '}
        <a href='https://preax.ru' target='_blank' rel='noreferrer'>
          {'PREAX'}
        </a>
      </p>
    </footer>
  );
}

export default Footer;
