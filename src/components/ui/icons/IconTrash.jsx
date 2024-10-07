import styles from './styles.module.css';

export const IconTrash = ({className=''}) => {
  return (
    <svg className={`${styles.svg} ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <rect id="icons / 32 / delete" width="24.000000" height="24.000000" fill="#FFFFFF" fillOpacity="0"/>
      <g clipPath="url(#clip2_1128)">
        <path id="Vector" d="M3 6L5 6L21 6" stroke="#545454" strokeOpacity="1.000000" strokeWidth="2.000000" strokeLinejoin="round" strokeLinecap="round"/>
        <path id="Vector" d="M19 6L19 20C19 20.53 18.78 21.03 18.41 21.41C18.03 21.78 17.53 22 17 22L7 22C6.46 22 5.96 21.78 5.58 21.41C5.21 21.03 5 20.53 5 20L5 6M8 6L8 4C8 3.46 8.21 2.96 8.58 2.58C8.96 2.21 9.46 2 10 2L14 2C14.53 2 15.03 2.21 15.41 2.58C15.78 2.96 16 3.46 16 4L16 6" stroke="#545454" strokeOpacity="1.000000" strokeWidth="2.000000" strokeLinejoin="round"/>
      </g>
    </svg>

  );
};