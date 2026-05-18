import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ExampleContext = createContext(null);

export function ExampleProvider({ children }) {
  const [title, setTitle] = useState('Example Page');
  const [visitCount, setVisitCount] = useState(0);

  const incrementVisitCount = useCallback(
    () => setVisitCount((current) => current + 1),
    []
  );

  const value = useMemo(
    () => ({
      title,
      visitCount,
      setTitle,
      incrementVisitCount,
    }),
    [title, visitCount, incrementVisitCount]
  );

  return <ExampleContext.Provider value={value}>{children}</ExampleContext.Provider>;
}

export function useExampleContext() {
  const context = useContext(ExampleContext);

  if (!context) {
    throw new Error('useExampleContext must be used within ExampleProvider');
  }

  return context;
}
