/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import XLSX from 'xlsx'
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'
import { X, DownloadCloud, UploadCloud, Check } from 'react-feather'
// ** Custom Components
import Avatar from '@components/avatar'
import ExtensionsHeader from '@components/extensions-header'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Progress, CardTitle, Input, Label, Container } from 'reactstrap'

import Spinner from '@components/spinner/Loading-spinner'
// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss'
import axios from 'axios'
import { percentage } from '@utils'
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png']

const Loader = () => {
    return (
        <Container>
            <Spinner />
            <CardText className='mb-0 mt-1 text-primary'>Chargement...</CardText>
        </Container>
    )
}
const ErrorToast = () => {
    const Extensions = () => (
        ALLOWED_EXTENSIONS.map((e, index) => (
            (index !== ALLOWED_EXTENSIONS.length - 1) ? <Fragment key={index + 1}>{' '} <span className='fw-bolder' > {e}</span ></Fragment> : <Fragment key={index + 1}> {'& '}<span className='fw-bolder'>{e}</span></Fragment>)
        )
    )
    return (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='danger' icon={<X size={12} />} />
                    <h6 className='toast-title'>Error!</h6>
                </div>
                <small className='text-muted'>a second ago</small>
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>
                    👋 Les {ALLOWED_EXTENSIONS.length} formats supporté sont {<Extensions />} Files!.
                </span>
            </div>
        </Fragment >)
}

const Upload = () => {
    // ** States
    const [overDrag, setOverDrag] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("")
    const [error, setError] = useState(false)
    const [progress, setProgress] = useState(0)

    const { getRootProps, getInputProps } = useDropzone({
        multiple: true,
        onDragEnter: () => {
            setOverDrag(true)
        },
        onDragLeave: () => {
            setOverDrag(false)
        },
        onDrop: async (results) => {
            setLoading(true)
            const data = new FormData()
            for (let i = 0; i < results.length; i++) {
                data.append(`file${i}`, results[i])
            }
            data.append("file", results)
            data.append("uploadImage", true)
            data.append("exif", query)
            let allow = true
            results.forEach(result => {
                (ALLOWED_EXTENSIONS.indexOf(result.name.split('.')[result.name.split('.').length - 1]) !== -1) ? (allow = true) : (allow = false)
            })
            if (allow) {
                const res = await axios.post(`${process.env.REACT_APP_API}images/upload/`, data, {
                    onUploadProgress: (e) => {
                        setProgress(percentage(e.loaded, e.total, 0))
                    }
                })
                console.log(res.data)
                if (res.status === 200) {
                    setOverDrag(false)
                    setSuccess(true)
                    setTimeout(() => {
                        setSuccess(false)
                    }, 2000)
                } else {
                    allow = false
                }
                setOverDrag(false)
                setLoading(false)
            }
            if (!allow) {
                setLoading(false)
                setOverDrag(false)
                setError(true)
                toast.error(<ErrorToast />, {
                    icon: true,
                    autoClose: 3000,
                    closeButton: false,
                    icon: false
                })

                setTimeout(() => {
                    setError(false)
                }, 2000)
            }
        }
    })


    return (
        <Container fluid>
            <ExtensionsHeader
                title='Upload'
                subTitle='Upload des images à Futur Lean Digital en glissant.'
            />
            <Row className='import-component'>
                <Col sm='12'>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col sm='12'>
                                    <Input type="text" onChange={e => setQuery(e.target.value)} name="query" placeholder="Keyword for image search separated by comas..." />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col sm='12'>
                                    <div {...getRootProps({ className: 'dropzone' })} style={{ borderColor: success ? '#28c76f' : '#ea5556', borderStyle: overDrag ? 'solid' : success ? 'solid' : 'dashed', backgroundColor: overDrag || error ? '#ea555621' : success ? '#28c76f21' : 'unset' }}>
                                        <input {...getInputProps()} />
                                        <div className='d-flex align-items-center justify-content-center flex-column w-100'>
                                            {loading ? <Progress striped animated className='progress-bar-danger progressbarcustom' value={progress}>{progress}%</Progress> : <>
                                                {error ? <X size={64} /> : overDrag ? <UploadCloud size={64} /> : success ? <Check size={64} /> : <DownloadCloud size={64} />}
                                                <h5>{success ? 'Image enregistré avec succès' : "Glissez l'image ici ou cliquez sur choisir"}</h5>
                                                {!success ? <p className='text-secondary'>
                                                    Glissez l'image ici ou cliquez sur
                                                    {' '}
                                                    <a href='/' onClick={e => e.preventDefault()}>
                                                        choisir
                                                    </a>{' '}
                                                    pour sélection d'après votre appareil.
                                                </p> : ""}
                                            </>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Upload
