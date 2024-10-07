import CardList from '../cardList/CardList';
import CityCard from '../cityCard/CityCard';
import { useContext } from 'react';
import { BlurContext } from '../../contexts/blur-context';
import styles from './Main.module.css';

function Main() {
  const {isBlur} = useContext(BlurContext);

  return (
    <main className={`${styles.wrapper} ${isBlur?'blur':''}`}>
      <CityCard />
      <CardList />
    </main>
  );
}

export default Main;
