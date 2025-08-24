import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { QuizResult, RankingContextType } from '../types';

const RankingContext = createContext<RankingContextType | undefined>(undefined);

interface RankingProviderProps {
  children: ReactNode;
}

export const RankingProvider: React.FC<RankingProviderProps> = ({ children }) => {
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults);
        const resultsWithDates = parsedResults.map((result: any) => ({
          ...result,
          date: new Date(result.date)
        }));
        setResults(resultsWithDates);
      } catch (error) {
        console.error('Erro ao carregar resultados do localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quizResults', JSON.stringify(results));
  }, [results]);

  const addResult = (resultData: Omit<QuizResult, 'id' | 'date'>) => {
    const newResult: QuizResult = {
      ...resultData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date()
    };

    setResults(prevResults => [...prevResults, newResult]);
  };

  const clearResults = () => {
    setResults([]);
    localStorage.removeItem('quizResults');
  };

  return (
    <RankingContext.Provider value={{
      currentUserName,
      setCurrentUserName,
      results,
      addResult,
      clearResults
    }}>
      {children}
    </RankingContext.Provider>
  );
};

export const useRanking = (): RankingContextType => {
  const context = useContext(RankingContext);
  if (context === undefined) {
    throw new Error('useRanking deve ser usado dentro de um RankingProvider');
  }
  return context;
};