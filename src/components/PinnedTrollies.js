import React from 'react'
import { Col } from 'react-bootstrap'
import styles from "../styles/PinnedTrollies.module.css"

const PinnedTrollies = () => {
  return (
    <Col 
    xs={10}
    md={5}  
    className={`my-4 text-white ${styles.Main}`}>
        <h1>Pinned Trollies</h1>
    </Col>
  )
}

export default PinnedTrollies
