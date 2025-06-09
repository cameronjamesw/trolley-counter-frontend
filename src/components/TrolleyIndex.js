import React from 'react'
import { Container } from 'react-bootstrap'
import styles from '../styles/TrolleyIndex.module.css'

const TrolleyIndex = () => {
  return (
    <Container className={`mt-4 ${styles.Main}`}>
        <p className='p-3'>This is the trolley index</p>
    </Container>
  )
}

export default TrolleyIndex
