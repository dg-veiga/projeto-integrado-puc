import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { MainContext } from '../../contexts/Main';
import { api } from '../../services/api';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

export default function WeightRecord({id, showForm = 'true'}) {
  const [weight, setWeight] = useState('0.0');
  const [weightDate, setWeightDate] = useState('0.0');
  const [weightRecords, setWeightRecords] = useState([]);

  const { userInfo } = useContext(MainContext);
  const router = useRouter();

  function getWeightRecords({ id }) {
    async function _call() {
      const url = `weight/${id}/`;
      await api
        .get(url, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setWeightRecords([...response.data.weights].reverse());
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  function setNewWeightRecord({ id }) {
    async function _call() {
      const url = `create_weight/`;
      const data = { pet_id: id, weight: weight, date: weightDate };
      await api
        .post(url, data, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          router.reload();
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  const handleNewWeightRecord = () => {
    setNewWeightRecord(id);
  };

  const renderLineChart = (
    <LineChart
      width={600}
      height={300}
      data={weightRecords}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type='monotone' dataKey='weight' stroke='#8884d8' />
      <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
      <XAxis dataKey='date' />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  useEffect(() => {
    console.log('showForm', showForm);
    getWeightRecords(id);
  }, []);

  return (
    <>
      <div className={styles.weightChart}>{renderLineChart}</div>
      {showForm == 'false' ? (
        <></>
      ) : (
        <Form>
          <Row className={styles.weightInputForm}>
            <Col md={4}>
              <Form.Group className='mb-3'>
                <Form.Label>Data de pesagem</Form.Label>
                <Form.Control
                  placeholder='17/09/2021'
                  type='date'
                  value={weightDate}
                  onChange={(e) => setWeightDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className='mb-3'>
                <Form.Label>Peso (kg)</Form.Label>
                <Form.Control
                  placeholder='0.0'
                  type='number'
                  step='.01'
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Col className={styles.addWeightButton}>
            <Button
              onClick={handleNewWeightRecord}
              size='lg'
              variant='secondary'
            >
              Adicionar peso
            </Button>
          </Col>
        </Form>
      )}
    </>
  );
}
