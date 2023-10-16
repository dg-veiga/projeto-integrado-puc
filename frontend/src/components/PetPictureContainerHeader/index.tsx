import React, { useContext, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import styles from './styles.module.css';
import { MainContext } from '../../contexts/Main';
import { api } from '../../services/api';


export default function PetPictureContainerHeader({petId}) {
  const { userInfo } = useContext(MainContext);

  const [petPicture, setPetPicture] = useState('');

  function getPetPicture() {
    async function _call() {
      const url = `pet/${petId}/`;
      await api
        .get(url, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          setPetPicture(response.data.picture);
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  useEffect(() => {
    if (!petId) {
      return;
    } else {
      getPetPicture()
    }
  }, []);

  return (
    <Row md={12} className={styles.petPictureRow}>
      <img src={petPicture} alt='' className={styles.petPicture} />
    </Row>
  );
}
