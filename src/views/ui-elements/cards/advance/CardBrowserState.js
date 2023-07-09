// ** Third Party Components
import axios from 'axios'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { HelpCircle } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  UncontrolledTooltip
} from 'reactstrap'

const CardBrowserState = ({ colors, trackBgColor }) => {
  const [browsers, setBrowsers] = useState(null)
  const statesArr = [
    {
      avatar: require('@src/assets/images/icons/google-chrome.png').default,
      title: 'Google Chrome',
      value: '54.4%',
      chart: {
        type: 'radialBar',
        series: [54.4],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.primary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/icons/mozila-firefox.png').default,
      title: 'Mozilla Firefox',
      value: '6.1%',
      chart: {
        type: 'radialBar',
        series: [6.1],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.warning.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/icons/apple-safari.png').default,
      title: 'Apple Safari',
      value: '14.6%',
      chart: {
        type: 'radialBar',
        series: [14.6],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.secondary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/icons/internet-explorer.png').default,
      title: 'Internet Explorer',
      value: '4.2%',
      chart: {
        type: 'radialBar',
        series: [4.2],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.info.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/icons/opera.png').default,
      title: 'Opera',
      value: '8.4%',
      chart: {
        type: 'radialBar',
        series: [8.4],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.danger.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/icons/edge.png').default,
      title: 'Microsoft Edge',
      value: '10.4%',
      chart: {
        type: 'radialBar',
        series: [10.4],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.success.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: <HelpCircle size={24} className="rounded me-1" />,
      title: 'Unknown',
      value: '10.4%',
      chart: {
        type: 'radialBar',
        series: [10.4],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.success.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    }
  ]
  const fetchBrowsers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/browserstats/`)
    if (res.data !== null) {

      setBrowsers(statesArr.map(browser => {
        const convertedData = {}
        for (const key in res.data) {
          const { key: browserName, value } = res.data[key]
          convertedData[browserName] = value
        }
        return {
          ...browser,
          value: `${res.data.filter(e => e.key === browser.title)[0].value * 100}%`,
          chart: {
            ...browser.chart,
            series: [convertedData[browser.title] * 100]
          }
        }
      }))
    }
  }
  useEffect(() => {
    fetchBrowsers()
  }, [])

  const renderStates = () => {
    if (browsers !== null) {
      return browsers.map(state => {
        return (
          <div key={state.title} className='browser-states'>
            <div className='d-flex'>
              {
                typeof state.avatar === "string" ? <img className='rounded me-1' src={state.avatar} height='30' alt={state.title} /> : state.avatar
              }

              <h6 className='align-self-center mb-0'>{state.title}</h6>
            </div>
            <div className='d-flex align-items-center'>
              <div className='fw-bold text-body-heading me-1'>{`${parseFloat(state.value).toFixed(1).toString()}%`}</div>
              <Chart
                options={state.chart.options}
                series={state.chart.series}
                type={state.chart.type}
                height={state.chart.height}
                width={state.chart.width}
              />
            </div>
          </div>
        )
      })
    }
  }

  return (
    <Card className='card-browser-states'>
      <CardHeader className='mb-2'>
        <div>
          <CardTitle tag='h4'>Statistiques du navigateur</CardTitle>
        </div>
        <HelpCircle size={18} className='cursor-pointer text-muted' id="helpBrowser" />
        <UncontrolledTooltip target="helpBrowser" placement="left">
          Navigateur des visiteurs de la galerie répartie par navigateur
        </UncontrolledTooltip>
      </CardHeader>
      <CardBody>{renderStates()}</CardBody>
    </Card>
  )
}
export default CardBrowserState
