import React from 'react';
const { useState, useEffect } = React;

const EventTimer = ({ left, date, startDate }) => {
  const dateS = Date.parse(date);
  const [finishTime] = useState(dateS);
  const [[diffDays, diffH, diffM, diffS], setDiff] = useState([0, 0, 0, 0]);
  const [tick, setTick] = useState(false);
  useEffect(() => {
    const diff = (finishTime - new Date()) / 1000;

    if (diff < 0) return; // время вышло
    setDiff([
      Math.floor(diff / 86400),
      Math.floor((diff / 3600) % 24),
      Math.floor((diff / 60) % 60),
      Math.floor(diff % 60),
    ]);
  }, [tick, finishTime]);
  const a = new Date() - startDate;
  const b = finishTime - startDate;
  useEffect(() => {
    const math = Math.round(100 * (a / b));

    left(math);
  }, [tick]);

  useEffect(() => {
    const timerID = setInterval(() => setTick(!tick), 1000);
    return () => clearInterval(timerID);
  }, [tick]);

  return (
    <p>{`${diffDays} days ${diffH.toString().padStart(2, '0')}:${diffM
      .toString()
      .padStart(2, '0')}:${diffS.toString().padStart(2, '0')}`}</p>
  );
};

export default EventTimer;
