import React, { useEffect, useState, useContext } from 'react';

import { request } from 'helpers';

import styles from './admin.module.sass';

import { Dropdown, DropdownItem, Table } from 'components';
import { PromptContext } from 'contexts';

export async function getServerSideProps({ req }) {
  const result = await new Promise((resolve) => {
    request
      .get('/api/admin/check', {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      .then((res) => {
        resolve({
          redirect: false,
        });
      })
      .catch((err) => {
        resolve({
          redirect: true,
        });
      });
  });

  if (result.redirect) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }

  return {
    props: {},
  };
}

const Admin = () => {
  const setPrompt = useContext(PromptContext);

  const [competition, setCompetition] = useState({
    participants: [],
    name: '',
  });
  const [containerStyle, setContainerStyle] = useState();
  const [btnStyle, setBtnStyle] = useState({});
  const [showCompetitionForm, setShowCompetitionForm] = useState(false);
  const [showParticipantForm, setShowParticipantForm] = useState(false);
  const [competitionName, setCompetitionName] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [participantNumber, setParticipantNumber] = useState('');

  useEffect(() => {
    request
      .get('/api/competition')
      .then((res) => {
        request
          .get(
            `/api/competition/${
              res.competitions[res.competitions.length - 1].id
            }`,
          )
          .then((_res) => {
            setCompetition(_res.competition);
          });
      })
      .catch((err) => {
        setCompetition({
          participants: [],
          name: '',
        });
      });
  }, []);

  useEffect(() => {
    if (
      (competition && Object.keys(competition).length === 0) ||
      (competition && !competition.participants[0])
    ) {
      setBtnStyle({
        width: '200px',
        height: '200px',
      });

      setContainerStyle({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      });
    } else {
      setBtnStyle({
        position: 'absolute',
        width: '100px',
        height: '80px',
        left: '20px',
        bottom: '20px',
      });
    }
  }, [competition]);

  const toggleCompetitionForm = () => {
    setShowCompetitionForm(!showCompetitionForm);
  };

  const toggleParticipantForm = () => {
    setShowParticipantForm(!showParticipantForm);
  };

  const createCompetitionSubmit = (event) => {
    event.preventDefault();
    const inputs = event.target.getElementsByTagName('input');

    const values = {
      timestamp: +new Date(),
    };

    for (const input of inputs) {
      values[input.name] = input.value;
    }

    request
      .post('/api/competition/create', values)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addParticipant = (event) => {
    event.preventDefault();
    const inputs = event.target.getElementsByTagName('input');

    const values = {};

    for (const input of inputs) {
      values[input.name] = input.value;
    }

    request.post(`/api/participants/${competition.id}`, values).then((res) => {
      window.location.reload();
    });
  };

  const submitResults = (event) => {
    event.preventDefault();
    const inputs = event.target.getElementsByTagName('input');
    const values = [];
    const userIds = [];
    for (const input of inputs) {
      const userId = input.getAttribute('userid');
      if (!userIds.includes(userId)) userIds.push(userId);
      if (input.value)
        values.push({
          userId: userId,
          value: input.value,
          event: input.name,
        });
    }

    request
      .post('/api/competition/results', {
        values,
        userIds,
        competitionId: competition.id,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container} style={containerStyle}>
      {competition.name ? (
        <button
          onClick={toggleParticipantForm}
          className={styles.button}
          style={btnStyle}
        >
          L??gg till deltagare
        </button>
      ) : (
        <button
          onClick={toggleCompetitionForm}
          className={styles.button}
          style={btnStyle}
        >
          Skapa t??vling
        </button>
      )}
      {showCompetitionForm ? (
        <div className={styles.popupBackground}>
          <div className={styles.formPopup}>
            <span onClick={toggleCompetitionForm} className={styles.close}>
              St??ng
            </span>
            <span className={styles.title}>Skapa en t??vling</span>
            <form onSubmit={createCompetitionSubmit}>
              <input
                className={styles.input}
                placeholder="T??vlingens namn"
                value={competitionName}
                onChange={(event) => setCompetitionName(event.target.value)}
                name="name"
              />
              <Dropdown name="sex" title="V??lj t??vlingstyp">
                <DropdownItem value="male">Herrar</DropdownItem>
                <DropdownItem value="female">Damer</DropdownItem>
              </Dropdown>

              <button className={styles.submit} type="submit">
                Skapa t??vling
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}

      {showParticipantForm ? (
        <div className={styles.popupBackground}>
          <div className={styles.formPopup}>
            <span onClick={toggleParticipantForm} className={styles.close}>
              St??ng
            </span>
            <span className={styles.title}>L??gg till deltagare</span>
            <form onSubmit={addParticipant}>
              <input
                className={styles.input}
                placeholder="Deltagrens namn"
                value={participantName}
                onChange={(event) => setParticipantName(event.target.value)}
                name="name"
              />

              <input
                className={styles.input}
                placeholder="Deltagrens nummer"
                value={participantNumber}
                onChange={(event) => setParticipantNumber(event.target.value)}
                name="number"
                type="number"
              />

              <button className={styles.submit} type="submit">
                L??gg till deltagare
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
      {competition.participants[0] ? (
        <div className={styles.tableContainer}>
          <form onSubmit={submitResults}>
            <Table editable data={competition} />
            <button type="submit" className={styles.submitResults}>
              Publicera
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Admin;
