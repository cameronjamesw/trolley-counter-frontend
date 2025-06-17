import React from 'react'
import { Col } from 'react-bootstrap'
import styles from "../styles/RecentTrollies.module.css"

const RecentTrollies = () => {
  return (
    <Col 
    xs={10}
    md={5} 
    className={`mt-4 text-white ${styles.Main}`}>
        <h1>
            Recent Trollies
        </h1>
    </Col>
  )
}

export default RecentTrollies
