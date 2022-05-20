import React, { useEffect, useState, useRef } from 'react';
import BigNumber from 'bignumber.js';

import styles from './cell.module.sass';

const calcRunning = (input, event) => {
  if (!input) return input;
  const a = {
    '100 meter': 25.4347, // 100 meter
    '400 meter': 1.53775, // 400 meter
    '1500 meter': 0.03768, // 1500 meter
    '110 meter häck': 5.74352, // 110 meter häck
  };

  const b = {
    '100 meter': 18.0, // 100 meter
    '400 meter': 82, // 400 meter
    '1500 meter': 480, // 1500 meter
    '110 meter häck': 28.5, // 110 meter häck
  };

  const c = {
    '100 meter': 1.81, // 100 meter
    '400 meter': 1.81, // 400 meter
    '1500 meter': 1.85, // 1500 meter
    '110 meter häck': 1.92, // 110 meter häck
  };

  return a[event] * Math.pow(Math.abs(b[event] - parseFloat(input)), c[event]);
};

const calcJumping = (input, event) => {
  if (!input) return input;
  event = event.toLowerCase();
  const a = {
    höjdhopp: 0.8465,
    stavhopp: 0.2797,
    längdhopp: 0.14354,
  };

  const b = {
    höjdhopp: 75.0,
    stavhopp: 100,
    längdhopp: 220,
  };

  const c = {
    höjdhopp: 1.42,
    stavhopp: 1.35,
    längdhopp: 1.4,
  };

  return a[event] * Math.pow(Math.abs(parseFloat(input) - b[event]), c[event]);
};

const calcThrowing = (input, event) => {
  if (!input) return input;
  event = event.toLowerCase();
  const a = {
    kulstötning: 51.39,
    diskus: 12.91,
    spjutkastning: 10.14,
  };

  const b = {
    kulstötning: 1.5,
    diskus: 4.0,
    spjutkastning: 7.0,
  };

  const c = {
    kulstötning: 1.05,
    diskus: 1.1,
    spjutkastning: 1.08,
  };

  console.log(a[event], parseFloat(input), b[event], c[event]);

  return a[event] * Math.pow(Math.abs(parseFloat(input) - b[event]), c[event]);
};

const running = ['100 meter', '400 meter', '1500 meter', '110 meter häck'];
const jumping = ['höjdhopp', 'stavhopp', 'längdhopp'];
const throwing = ['kulstötning', 'diskus', 'spjutkastning'];

const Cell = ({ editable, children, style, userId, index, event }) => {
  const [cellStyle, setCellStyle] = useState({});
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!editable) {
      setCellStyle({
        ...style,
        padding: '5px',
      });
    }

    if (children !== '-') setValue(children);
  }, []);

  const blur = () => {
    if (running.includes(event.toLowerCase()))
      return setValue(calcRunning(value, event));

    if (jumping.includes(event.toLowerCase()))
      return setValue(calcJumping(value, event));

    if (throwing.includes(event.toLowerCase()))
      return setValue(calcThrowing(value, event));
  };

  return (
    <div style={cellStyle} className={styles.cell}>
      {editable ? (
        <input
          type="number"
          value={value}
          name={event.toLowerCase()}
          userid={userId}
          onChange={(event) => setValue(event.target.value)}
          placeholder={`${children}`}
          onBlur={blur}
        />
      ) : (
        children
      )}
    </div>
  );
};

export { Cell };
