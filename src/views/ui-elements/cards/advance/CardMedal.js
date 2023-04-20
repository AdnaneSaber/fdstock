// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from 'reactstrap'
import axios from 'axios'
// ** Images
import medal from '@src/assets/images/illustration/badge.svg'
import { useState, useEffect } from 'react'

import { kFormatter } from '@utils'
const CardMedal = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_COUNT).then(res => res.data && setCount(res.data.count))
  }, [count])

  return (
    <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>Bienvenue à FD Stock 🎉</h5>
        <CardText className='font-small-3'>Banque d'image Futur digital</CardText>
        <h3 className='mb-75 mt-3 pt-50'>
          <a href='/' onClick={e => e.preventDefault()}>
            +{kFormatter(count)} <small className='text-muted'>images</small>
          </a>
        </h3>
        <img className='congratulation-medal' src={medal} width={222} alt='Medal Pic' />
      </CardBody>
    </Card>
  )
}

export default CardMedal
