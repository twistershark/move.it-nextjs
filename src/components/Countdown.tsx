import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';



export function Countdown() {

  const { 
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown 
  } = useContext(CountdownContext)
  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); // Verify if there are 2 digits and split them
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split(''); // add 0 if there aren't 2 digits

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <div className={styles.hasFinishedContainer}>
            <button 
            disabled
            className={styles.countdownButton}
            >
              Ciclo encerrado
              <img style={{ marginLeft: 16 }} src="icons/check_circle.svg" alt="Completado"/>

            </button>
          <div className={styles.hasFinishedbar} />
        </div>
        
      ) : (
        <>
          { isActive ? (
            <button 
            onClick={resetCountdown} 
            type="button" 
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
            onClick={startCountdown} 
            type="button" 
            className={styles.countdownButton}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}