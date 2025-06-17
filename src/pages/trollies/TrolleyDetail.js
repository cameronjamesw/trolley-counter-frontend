import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';

const TrolleyDetail = () => {
    const [trolley, setTrolley] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchTrolley = async () => {
            try {
                const { data } = await axiosReq.get(`/api/trolleys/${id}/`);
                console.log(data);
                setTrolley(data);
            } catch (err) {
                console.log(err?.response.data);
            };
        };

        fetchTrolley();
    }, [])
  return (
    <Container>
        <h1>
            Trolley Detail Window!
        </h1>
        <p>Trolley Number: {trolley.id}</p>
        <p>Creator: {trolley.creator}</p>
        <p>Totes: {trolley.totes_count}</p>
        <p>Front Labels Count: {trolley.front_label_count}</p>
        <p>Back Labels Count: {trolley.back_label_count}</p>
        <p>Missing Front Labels: {trolley.missing_front_labels}</p>
    </Container>
  )
}

export default TrolleyDetail
