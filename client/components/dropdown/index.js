import React, { useRef, useState, useEffect } from 'react';

import styles from './dropdown.module.sass';

import { DropdownItem } from './dropdownItem';

const Dropdown = ({ title, children, name }) => {
  const [toggled, setToggled] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [selected, setSelected] = useState('');

  const toggleDropdown = (event) => {
    event.preventDefault();

    setToggled(!toggled);

    if (!toggled) {
      setDropdownStyle({
        borderBottom: '1px solid #000',
      });
    } else {
      setDropdownStyle({});
    }
  };

  useEffect(() => {
    if (selected !== '') toggleDropdown(event);
  }, [selected]);

  return (
    <div className={styles.container}>
      <input
        value={selected}
        name={name}
        className={styles.input}
        onChange={() => {}}
      />
      <button
        onClick={toggleDropdown}
        className={styles.dropdownButton}
        style={dropdownStyle}
      >
        {selected === '' ? title : selected}
        <span className={styles.arrow}>&#62; </span>
      </button>
      {toggled ? (
        <div className={styles.options}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              setSelected: setSelected,
            });
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export { Dropdown, DropdownItem };
