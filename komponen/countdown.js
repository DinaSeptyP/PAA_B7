import React, { useState, useEffect } from 'react';

const Countdown = ({ deadline }) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const targetDate = new Date(deadline).getTime();
      const distance = targetDate - now;

      // Calculate remaining time in days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the countdown state
      setCountdown({ days, hours, minutes, seconds });

      // Clear the interval when the countdown reaches zero
      if (distance <= 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div>
      <p>Countdown: {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</p>
    </div>
  );
};

export default Countdown;
