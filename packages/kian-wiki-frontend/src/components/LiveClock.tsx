'use client'; // Add this directive to mark the file as a client component

import { useEffect, useState } from 'react';

const LiveClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString(),
  );

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>Current time: {currentTime}</p>
    </div>
  );
};

export default LiveClock;
