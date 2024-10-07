import ProgressBar from '../progressBar/ProgressBar';
import Icon from '../icon/Icon';
import styles from './Card.module.css';

function Card({ item }) {
  return (
    <li className={styles.wrapper}>
      <div className={styles.values}>
        <h4>{item.title}</h4>
        <Icon path={item.icon} size={32} id={item.id}/>
        <p className={styles.value}>{item.value}</p>
      </div>

      {item.barPosition && (
        <div className={styles.barContainer}>
          <ProgressBar current={item.barPosition} type={item.id === 2 ? 'gradient' : 'normal'} />

          {item.description && (
            <div className={styles.description}>{item.description}</div>
          )}
          {item.descriptions && (
            <div className={styles.cardDescriptionContainer}>
              {item.descriptions.map((desc, index) => (
                <p key={index} className={styles.cardDescription}>
                  {desc}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {item.info && <p className={styles.cardInfo}>{item.info}</p>}
    </li>
  );
}

export default Card;
