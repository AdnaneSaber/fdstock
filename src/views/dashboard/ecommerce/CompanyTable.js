// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Table, Card, UncontrolledTooltip } from 'reactstrap'
import { Link } from 'react-router-dom'

// ** Icons Imports
import { Zap, HelpCircle, Tool, Info, Map, Package, Plus } from 'react-feather'
import axios from 'axios'
import { useEffect, useState } from 'react'

const CompanyTable = () => {
  // ** vars
  const [stats, setStats] = useState([])
  const fetchStats = () => {
    axios.get(process.env.REACT_APP_API, { params: { stats: true } }).then(res => setStats(res.data))
  }
  useEffect(() => {
    fetchStats()
  }, [])

  // const data = [
  //   {
  //     img: require('@src/assets/images/icons/toolbox.svg').default,
  //     name: 'Dixons',
  //     email: 'meguc@ruj.io',
  //     icon: <Monitor size={18} />,
  //     category: 'Technology',
  //     views: '23.4k',
  //     time: '24 hours',
  //     revenue: '891.2',
  //     sales: '68'
  //   },
  //   {
  //     img: require('@src/assets/images/icons/parachute.svg').default,
  //     name: 'Motels',
  //     email: 'vecav@hodzi.co.uk',
  //     icon: <Coffee size={18} />,
  //     category: 'Grocery',
  //     views: '78k',
  //     time: '2 days',
  //     revenue: '668.51',
  //     sales: '97',
  //     salesUp: true
  //   },
  //   {
  //     img: require('@src/assets/images/icons/brush.svg').default,
  //     name: 'Zipcar',
  //     email: 'davcilse@is.gov',
  //     icon: <Watch size={18} />,
  //     category: 'Fashion',
  //     views: '162',
  //     time: '5 days',
  //     revenue: '522.29',
  //     sales: '62',
  //     salesUp: true
  //   },
  //   {
  //     img: require('@src/assets/images/icons/star.svg').default,
  //     name: 'Owning',
  //     email: 'us@cuhil.gov',
  //     icon: <Monitor size={18} />,
  //     category: 'Technology',
  //     views: '214',
  //     time: '24 hour',
  //     revenue: '291.01',
  //     sales: '88',
  //     salesUp: true
  //   },
  //   {
  //     img: require('@src/assets/images/icons/book.svg').default,
  //     name: 'Cafés',
  //     email: 'pudais@jife.com',
  //     icon: <Coffee size={18} />,
  //     category: 'Grocery',
  //     views: '208',
  //     time: '1 week',
  //     revenue: '783.93',
  //     sales: '16'
  //   },
  //   {
  //     img: require('@src/assets/images/icons/rocket.svg').default,
  //     name: 'Kmart',
  //     email: 'bipri@cawiw.com',
  //     icon: <Watch size={18} />,
  //     category: 'Fashion',
  //     views: '990',
  //     time: '1 month',
  //     revenue: '780.05',
  //     sales: '78',
  //     salesUp: true
  //   },
  //   {
  //     img: require('@src/assets/images/icons/speaker.svg').default,
  //     name: 'Payers',
  //     email: 'luk@izug.io',
  //     icon: <Watch size={18} />,
  //     category: 'Fashion',
  //     views: '12.9k',
  //     time: '12 hours',
  //     revenue: '531.49',
  //     sales: '42',
  //     salesUp: true
  //   }
  // ]
  // const colorsArr = {
  //   Technology: 'light-primary',
  //   Grocery: 'light-success',
  //   Fashion: 'light-warning'
  // }
  const getIcon = (exifs) => {

    const icons = [
      {
        subtitle: 'Couverture',
        color: 'light-danger',
        icon: <Map size={16} />
      },
      {
        subtitle: 'Plomberie',
        color: 'light-info',
        icon: <Tool size={16} />
      },
      {
        subtitle: 'Énergie',
        color: 'light-success',
        icon: <Zap size={16} />
      },
      {
        subtitle: 'Déménagement',
        color: 'light-warning',
        icon: <Package size={16} />
      }
    ]
    let out = []
    icons.forEach(icon => {
      if (exifs.split(", ").indexOf(icon.subtitle.toLowerCase()) !== -1) {
        out = [icon.icon, icon.color]
      }
    })
    return out.length > 0 ? out : [<HelpCircle size={16} />, 'light-secondary']
  }
  const renderData = () => {
    if (stats.length > 0) {
      return stats.map(col => {
        const exifs = col.image.exif.toString().split(", ").slice(0, 4)
        const [icon, color] = getIcon(col.image.exif)

        return (
          stats.length > 0 ? <tr key={col.image.id}>
            <td>
              <div className='d-flex align-items-center'>
                <Link to={`/apps/gallery/image/${col.image.id}`}>
                  <h5 className='text-primary text-bold cursor-pointer'>#{col.image.id}</h5>
                </Link>

              </div>
            </td>
            <td>
              <div className='d-flex align-items-center'>
                <div className='avatar rounded'>
                  <div className='avatar-content'>
                    <img src={col.image.thumbnail} className="w-100 h-100" alt={col.image.name} />
                  </div>
                </div>
              </div>
            </td>
            <td className='text-nowrap'>
              <div className='d-flex align-items-center'>
                <Avatar className='me-1' color={color} icon={icon} />
                <span className="text-light-secondary">
                  {exifs.join(", ")}
                  <Info size={16} className='mx-1 text-muted cursor-pointer' id={`exif-${col.id}`} />
                  <UncontrolledTooltip placement='right' target={`exif-${col.id}`}>
                    {col.image.exif.replace(', ', '\n')}
                  </UncontrolledTooltip>
                </span>
              </div>
            </td>
            <td>{col.views}</td>
            <td>
              <div className='d-flex align-items-center'>
                <span className='fw-bolder me-1'>{col.downloads}</span>
              </div>
            </td>
          </tr> : <></>
        )

      })
    }
  }

  return (
    <Card className='card-company-table'>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Catégorie</th>
            <th>Vues</th>
            <th>Téléchargement</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default CompanyTable
