// ** Third Party Components
import classnames from 'classnames'
import { Zap, Map, Tool, Package } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'

const StatsCard = ({ cols }) => {
  const data = [
    {
      title: '',
      subtitle: 'Couverture',
      color: 'light-danger',
      icon: <Map size={24} />
    },
    {
      title: '',
      subtitle: 'Plomberie',
      color: 'light-info',
      icon: <Tool size={24} />
    },
    {
      title: '',
      subtitle: 'Énergie',
      color: 'light-success',
      icon: <Zap size={24} />
    },
    {
      title: '',
      subtitle: 'Déménagement',
      color: 'light-warning',
      icon: <Package size={24} />
    }
  ]
  const [stats, setStats] = useState({})
  useEffect(() => {
    let categories = ""
    categories += data.map(el => `${el.subtitle},`)
    categories = categories.substring(0, categories.length - 1)
    axios.get(process.env.REACT_APP_API, { params: { categories } }).then(res => setStats(res.data))
  }, [cols])

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{stats[item.subtitle]}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Statistiques d'images</CardTitle>
        <CardText className='card-text font-small-2 me-25 mb-0'>Just now</CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
