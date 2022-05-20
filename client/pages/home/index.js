import React, { useState, useEffect } from 'react';

import styles from './home.module.sass';

import { Table } from 'components';
import { request } from 'helpers';

const Home = () => {
  const [competition, setCompetition] = useState({});

  useEffect(() => {
    request.get('/api/competition').then((res) => {
      const competitionId = res.competitions[res.competitions.length - 1].id;

      request
        .get(`/api/competition/${competitionId}`)
        .then((res) => {
          setCompetition(res.competition);
        })
        .catch((err) => {});
    });
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Tävlingar</span>
      <div className={styles.current}>
        <p>Pågående tävling</p>
        {competition.name ? (
          <Table results data={competition} />
        ) : (
          <span className={styles.info}>Ingen pågende tävling</span>
        )}
      </div>
    </div>
  );
};

export default Home;
