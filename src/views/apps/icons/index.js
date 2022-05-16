/* eslint-disable implicit-arrow-linebreak */
import { Fragment, useEffect, useState } from 'react'
import { IconNames } from './assets'
import { renderToString } from 'react-dom/server'
import { Icon, Icons as Icos } from 'react-fontawesome-list'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Row, Col, Card, Input, CardBody, InputGroup, InputGroupText, UncontrolledTooltip } from 'reactstrap'
const Icons = () => {
    const [allicons, setAllicons] = useState([])
    useEffect(() => {
        setAllicons([...new Set(IconNames)])
    }, [IconNames])


    return (
        <Fragment>
            <h1>Naviguez nos {allicons.length} icones</h1>
            <hr className='mx-1' />
            <Icos />
            <Row className='d-flex flex-wrap' id='icons-container'>
                {allicons.map((X, index) =>
                    // <div key={index}>
                    //     <CopyToClipboard text={renderToString(<Icon name={X.iconName} prefix={'fas'} size={3} />).toString()}>
                    //         <span id={`ic-${index}`}>
                    //             <Icon name={X.iconName} prefix={'fas'} size={3} />
                    //         </span>
                    //     </CopyToClipboard>
                    //     <UncontrolledTooltip placement='top' target={`ic-${index}`}>
                    //         test
                    //     </UncontrolledTooltip>
                    // </div>

                    <Col md={2} key={index}>
                        <CopyToClipboard text={renderToString(<Icon name={X.iconName} prefix={'fas'} />).toString()}>
                            <Card
                                id={`ic-${index}`}
                                className={'icon-card cursor-pointer text-center mb-2 mx-50'}>
                                <CardBody>
                                    <div className='icon-wrapper'>
                                        <Icon name={'algolia'} prefix={'fa'} size={2} />
                                    </div>
                                    <p className='icon-name text-truncate mb-0 mt-1'>{X.iconName}</p>
                                </CardBody>
                            </Card>
                        </CopyToClipboard>
                        <UncontrolledTooltip placement='top' target={`ic-${index}`}>
                            {X.iconName}
                        </UncontrolledTooltip>
                    </Col>
                )}
            </Row>
        </Fragment>
    )
}

export default Icons