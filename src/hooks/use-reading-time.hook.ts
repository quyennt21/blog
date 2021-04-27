import { useState, useEffect } from 'react';

interface ReadingTimeHooksProps {
  target: string;
  wordPerMin: number;
}

const useReadingTime = (props: ReadingTimeHooksProps) => {
  const [readingTime, setReadingTime] = useState(1);
  const [wordsCount, setWordsCount] = useState(1);

  return { readingTime, wordsCount };
};

export default useReadingTime;
