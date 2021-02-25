import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number; 
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge; 
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void; 
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode; //Recebe qualquer elemento react
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrenteExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission(); // API do Browser para pedir permissão
    //Para enviar notificação para o usuário
  }, []);


  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play(); // Toca áudio no navegador

    // Enviando notificação para o usuário
    // https://developer.mozilla.org/pt-BR/docs/Web/API/Notification lista de métodos

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrenteExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }
    
  return (
    <ChallengesContext.Provider value={{ 
      level, 
      levelUp, 
      currentExperience, 
      challengesCompleted,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge 
    }}>
      {children}
    </ChallengesContext.Provider>
  );
}