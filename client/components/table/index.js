import React, { useEffect, useState } from 'react';

import { request } from 'helpers';

import { Column } from './column';
import { Cell } from './cell';
import { Header } from './header';

import styles from './table.module.sass';

const maleOrder = [
  '100 meter',
  'Längdhopp',
  'Kulstötning',
  'Höjdhopp',
  '400 meter',
  '110 meter häck',
  'diskus',
  'Stavhopp',
  'Spjutkastning',
  '1500 meter',
];

const femaleOrder = [
  '100 meter',
  'Diskus',
  'Stavhopp',
  'Spjutkastning',
  '400 meter',
  '110 meter häck',
  'Längdhopp',
  'Kulstötning',
  'Höjdhopp',
  '1500 meter',
];

const Table = ({ children, data, editable, results }) => {
  const compileTable = () => {
    const elems = [];

    if (!data) {
      throw new Error('Need data for table');
    }

    // TODO: Refactor code
    if (data.sex === 'male') {
      const cells = [<Header>Grenar</Header>];
      let index = 0;
      for (const competition of maleOrder) {
        cells.push(
          <Cell
            key={index}
            style={index % 2 === 1 ? { backgroundColor: 'lightGrey' } : {}}
          >
            {competition}
          </Cell>,
        );
        index++;
      }

      if (results)
        cells.push(<Cell style={{ fontWeight: 'bold' }}>Antal poäng</Cell>);

      elems.push(<Column key={index + 10}>{cells}</Column>);
    } else {
      const cells = [<Header key={'header'}>Grenar</Header>];
      let index = 0;
      for (const competition of femaleOrder) {
        cells.push(
          <Cell
            key={index}
            style={index % 2 === 1 ? { backgroundColor: 'lightGrey' } : {}}
          >
            {competition}
          </Cell>,
        );
        index++;
      }

      if (results)
        cells.push(<Cell style={{ fontWeight: 'bold' }}>Antal poäng</Cell>);

      elems.push(<Column key={index + 10}>{cells}</Column>);
    }

    for (const key in data) {
      const value = data[key];
      if (Array.isArray(value)) {
        for (const participant of value) {
          const cells = [];
          // console.log(participant);
          cells.push(
            <Header
              key={participant.id}
            >{`${participant.name} - #${participant.number}`}</Header>,
          );
          let index = 0;

          let totalScore = 0;

          if (!participant.events) participant.events = [];
          for (const event of participant.events) {
            cells.push(
              <Cell
                editable={editable}
                key={index}
                style={index % 2 === 1 ? { backgroundColor: 'lightGrey' } : {}}
                userId={participant.id}
                index={index}
                event={
                  data.sex === 'male' ? maleOrder[index] : femaleOrder[index]
                }
              >
                {event.result}
              </Cell>,
            );

            totalScore += parseFloat(event.result);

            index++;
          }

          for (const i in Array.apply(
            null,
            Array(10 - participant.events.length),
          )) {
            // console.log(i);
            cells.push(
              <Cell
                editable={editable}
                key={index}
                style={index % 2 === 1 ? { backgroundColor: 'lightGrey' } : {}}
                userId={participant.id}
                index={index}
                event={
                  data.sex === 'male' ? maleOrder[index] : femaleOrder[index]
                }
              >
                -
              </Cell>,
            );
            index++;
          }

          if (results)
            cells.push(
              <Cell style={{ fontWeight: 'bold' }}>{totalScore}</Cell>,
            );

          elems.push(<Column key={participant.id}>{cells}</Column>);
        }
      }
    }
    return elems;
  };

  return <div className={styles.container}>{compileTable()}</div>;
};

export { Table };

export * from './cell';
export * from './column';
