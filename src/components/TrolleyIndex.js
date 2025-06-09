import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import styles from '../styles/TrolleyIndex.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const TrolleyIndex = () => {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const buttonStyle = {
    backgroundColor: isHovered ? '#006400' : '#2d843d',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };
  
  return (
    <Row>
    <Container 
    style={buttonStyle}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    className={`d-flex col-2 col-lg-1 mt-4 ${styles.Main} ${styles.IconBox}`}>
      <FontAwesomeIcon className={styles.Icon} icon={faCartShopping} />
    </Container>
    <Container className={`col-8 col-lg-8 mt-4 ${styles.Main}`}>
        <p className='p-3'>Trolley Index</p>
    </Container>
    </Row>
  )
}

export default TrolleyIndex
