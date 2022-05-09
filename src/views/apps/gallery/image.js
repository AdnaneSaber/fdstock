/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useState, useEffect, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '@components/breadcrumbs'
import classnames from 'classnames'
import {
    Share2,
    GitHub,
    Gitlab,
    Twitter,
    Bookmark,
    Facebook,
    Linkedin,
    CornerUpLeft,
    MessageSquare,
    Download,
    Eye,
    Link2,
    Check
} from 'react-feather'

// ** Utils
import { kFormatter, formatDate, isToday } from '@utils'

import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Form,
    Badge,
    Input,
    Label,
    Button,
    CardImg,
    CardBody,
    CardText,
    CardTitle,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
const ImagePage = () => {
    // ** State
    const [copied, setCopied] = useState(false)
    const [image, setImage] = useState(null)
    const paramsURL = useParams()
    const fetchImage = () => {
        axios.get(process.env.REACT_APP_API, { params: { image: paramsURL.id, gallery: true } }).then((res) => {
            setImage(res.data)
        })
    }
    const addView = (addview) => {
        const data = new FormData()
        data.append("addview", addview)
        axios.post(process.env.REACT_APP_API, data).then(() => {
            fetchImage()
        })
    }
    
    const addDownload = (adddownload) => {
        const data = new FormData()
        data.append("adddownload", adddownload)
        axios.post(process.env.REACT_APP_API, data).then(() => {
            fetchImage()
        })
    }

    const downloadImage = async ({ compressed, name, id }) => {
        const a = document.createElement("a")
        a.style.display = "none"
        const response = await fetch(compressed)
        const blob = await response.blob()
        a.href = URL.createObjectURL(blob)
        a.download = name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        addDownload(id)
    }
    const onCopy = () => {
        setCopied(true)
        toast.success(<ToastSuccess />, {
            icon: false,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false
        })
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }
    useEffect(() => {
        addView(paramsURL.id)
        fetchImage()
    }, [])
    return (
        image ? <Fragment>

            <Breadcrumbs
                home={<Link to={'/apps/gallery/'}>Galerie</Link>}
                breadCrumbTitle='Détail image'
                breadCrumbParent='Image'
                breadCrumbActive={image.name}
            />
            <Row>
                <Col sm='12'>
                    <Card className='mb-3'>
                        <CardImg src={image.compressed} className='img-fluid' top />
                        <CardBody>
                            <CardTitle tag='h4'>{image.name}</CardTitle>
                            <div className='d-flex'>
                                <div>
                                    <small className='text-muted me-25'>Ajouté {isToday(new Date(image.date_creation)) ? "" : "le"} </small>
                                    <small className='text-muted'>{isToday(new Date(image.date_creation)) ? "Aujourd'hui" : formatDate(image.date_creation)}</small>
                                </div>
                            </div>
                            <hr className='my-2' />
                            {!!image.exif && <><CardTitle>Mots clés</CardTitle>
                                <p>{image.exif}</p>
                                <hr className='my-2' /></>
                            }
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <div className='d-flex align-items-center me-1'>
                                        <a className='me-50' href='/' onClick={e => e.preventDefault()}>
                                            <Eye size={21} className='text-body align-middle' />
                                        </a>
                                        <a href='/' onClick={e => e.preventDefault()}>
                                            <div className='text-body align-middle'>{kFormatter(image.views)}</div>
                                        </a>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <a className='me-50' href='/' onClick={e => {
                                            e.preventDefault()
                                            downloadImage(image)
                                        }}>
                                            <Download size={21} className='text-body align-middle' />
                                        </a>
                                        <a href='/' onClick={e => e.preventDefault()}>
                                            <div className='text-body align-middle'>{kFormatter(image.downloads)}</div>
                                        </a>
                                    </div>
                                </div>
                                <CopyToClipboard onCopy={onCopy} text={image.compressed}>
                                    <Link2 size={24} className={`cursor-pointer me-1 ${copied ? 'text-success' : ''}`} />
                                </CopyToClipboard>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment> : ""
    )
}

const ToastSuccess = () => (
    <Fragment>
        <div className='toastify-header pb-0'>
            <div className='title-wrapper'>
                <Avatar size='sm' color='success' icon={<Check />} />
                <h6 className='toast-title'>Copied To Clipboard !</h6>
            </div>
        </div>
    </Fragment>
)
export default ImagePage