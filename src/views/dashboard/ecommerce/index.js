// ** React Imports
import { useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
import CompanyTable from './CompanyTable'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/charts/recharts.scss'
import SimplePieChart from '../../charts/recharts/PieChart'
import SupportTracker from '../../ui-elements/cards/analytics/SupportTracker'

const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  const donut = {
    series1: '#ffe700',
    series2: '#00d4bd',
    series3: '#826bf8',
    series4: '#2b9bf4',
    series5: '#FFA1A1'
  }
  // ** vars
  const trackBgColor = '#e9ecef'

  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='4' md='6' xs='12'>
          <CardMedal />
        </Col>
        <Col xl='8' md='6' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xs='12'>
          <CompanyTable />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col md='6' xs='12'>
          <SimplePieChart series1={donut.series1} series2={donut.series2} series3={donut.series3} series5={donut.series5} />
        </Col>
        <Col md='6' xs='12'>
          <SupportTracker primary={"#ea5455"} danger={"#ea5455"} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col md='6' xs='12'>
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col>
        <Col md='6' xs='12'>
          <GoalOverview success={colors.success.main} />
        </Col>
      </Row>
    </div>
  )
}

export default EcommerceDashboard
