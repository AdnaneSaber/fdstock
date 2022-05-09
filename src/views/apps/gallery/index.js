/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react'
import { HelpCircle, Check, Link2, Download, Maximize, Maximize2 } from 'react-feather'

import Avatar from '@components/avatar'
import { Row, Col, CardLink, CardBody, Card, UncontrolledTooltip, CardImg, FormText, Input, Badge } from 'reactstrap'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

// ** Utils
import { kFormatter } from '@utils'
import { toast } from 'react-toastify'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'

const imageperpage = 60

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
const GalleryApp = () => {
    // ** State
    const [copied, setCopied] = useState(false)
    const [images, setImages] = useState([])
    const [query, setQuery] = useState("")
    const [count, setCount] = useState(0)
    const [limitstart, setLimitstart] = useState(0)
    const [orderby, setOrderby] = useState("downloads")
    // ** Functions
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

    const fetchResult = (gallery = true) => {
        axios.get(process.env.REACT_APP_API, { params: { gallery, limitstart, limitend: imageperpage, q: query, orderby } }).then(response => {
            setImages(response.data)
        })
        axios.get(process.env.REACT_APP_API, { params: { count: true, gallery: true, q: query } }).then(response => setCount(response.data.count))
    }

    const addDownload = (adddownload) => {
        const data = new FormData()
        data.append("adddownload", adddownload)
        axios.post(process.env.REACT_APP_API, data).then(() => {
            fetchResult()
        })
    }

    const downloadImage = async ({ compressed, name, id }) => {
        try {
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
        } catch (TypeError) {
            console.error("Issue saving the image !")
        }
    }
    // ** Effect
    useEffect(() => {
        fetchResult()
        setOrderby("downloads")
    }, [limitstart])
    useEffect(() => {
        fetchResult()
        setLimitstart(0)
    }, [query])
    return (
        <Fragment>
            <Row>
                <Col md="12">
                    <Input value={query} placeholder="Cherchez par mot clé" onChange={e => setQuery(e.target.value)} />
                    <FormText className='text-muted'>Pour multiple mot clé, veuillez les séparer par des virgules.</FormText>
                </Col>
            </Row>
            <Row className='match-height'>
                {images.map(image => <Col md='3' sm="6" xs="12" lg='4' className='' key={image.id}>
                    <div className='d-flex align-items-center justify-content-between pe-2'>
                        <h6 className='my-2 text-muted'>{`${image.exif.split(", ").slice(0, 4).join(", ")}...`}</h6>
                        {image.exif.split(", ").length > 4 ? <><HelpCircle size={16} className="text-muted" id={`gallery${image.id}`} />
                            <UncontrolledTooltip target={`gallery${image.id}`} placement='left'>
                                {image.exif}
                            </UncontrolledTooltip></> : ""}

                    </div>
                    <Card>
                        <CardImg top src={image.thumbnail} height={300} style={{ objectFit: "cover" }} alt='Card cap' />
                        <CardBody color={copied ? 'success' : 'primary'} className='d-flex align-items-center w-100 justify-content-between'>
                            <div>
                                <CardLink href='/' onClick={e => {
                                    e.preventDefault()
                                    downloadImage(image)
                                }}>
                                    <div className='align-middle d-inline-flex gap-1 align-items-center'>
                                        <span>{kFormatter(image.downloads) || 0}</span>
                                        <Download size={21} id={`gallery-download-${image.id}`} />
                                    </div>
                                    <UncontrolledTooltip target={`gallery-download-${image.id}`}>
                                        Télécharger
                                    </UncontrolledTooltip>
                                </CardLink>
                                <CardLink href='/' to={`/apps/gallery/image/${image.id}`} tag={Link} id={`gallery-maximize-${image.id}`}>
                                    <Maximize2 size={18} />
                                    <UncontrolledTooltip target={`gallery-maximize-${image.id}`}>
                                        Afficher
                                    </UncontrolledTooltip>
                                </CardLink>
                            </div>
                            {/* <CardLink className='ml-auto'> */}
                            <CopyToClipboard onCopy={onCopy} text={image.id}>
                                <CardLink href='/' className={copied ? 'text-success' : ''} onClick={e => e.preventDefault()} id={`gallery-link-${image.id}`}>
                                    <Link2 size={18} />
                                    <UncontrolledTooltip target={`gallery-link-${image.id}`}>
                                        {copied ? 'Copié !' : 'Copier lien !'}
                                    </UncontrolledTooltip>
                                </CardLink>
                            </CopyToClipboard>
                            {/* </CardLink> */}
                        </CardBody>
                    </Card>
                </Col>
                )
                }
            </Row>
            {images.length > imageperpage && <Row className='mt-3'>
                <Card>
                    <CardBody>
                        <ReactPaginate
                            nextLabel=''
                            pageCount={Math.ceil(count / imageperpage)}
                            breakLabel='...'
                            previousLabel=''
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={2}
                            activeClassName='active'
                            onPageChange={({ selected }) => {
                                setLimitstart(selected * imageperpage)
                            }}
                            pageClassName='page-item'
                            breakClassName='page-item'
                            pageLinkClassName='page-link'
                            nextLinkClassName='page-link'
                            breakLinkClassName='page-link'
                            previousLinkClassName='page-link'
                            nextClassName='page-item next-item'
                            previousClassName='page-item prev-item'
                            containerClassName='pagination react-paginate justify-content-center'
                        />
                    </CardBody>
                </Card>
            </Row>}
        </Fragment >
    )
}
export default GalleryApp