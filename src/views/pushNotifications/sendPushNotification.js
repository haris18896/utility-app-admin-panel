import React, { useEffect } from 'react'
import * as Yup from 'yup'
import FormData from 'form-data'
import Spinner from '../common/Spinner'
import FormGroupElement from '../common/FormGroupElement/FormGroupElement'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { PreviewImage } from '../common/PreviewImage/PreviewImage'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Row } from 'reactstrap'
import { handleSendPushNotification, resetPushNotification } from '../../redux/actions/notifications/pushNotificationAction'

function sendPushNotification() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

  const { inProcess, sent, error } = useSelector(state => state.sendNotification)

  const sendNotificationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(30, 'Title must be less than 30 characters'),
    body: Yup.string().required('Body is required').max(100, 'Body must be less than 100 characters'),
    priority: Yup.string()
      .required('Priority is required')
      .matches(/^(normal|high)$/, 'Priority must be normal or high'),
    ttl: Yup.number().positive('TTL must be positive').required('TTL is required').max(1296000, 'TTL must be less than 1296000'),
    image: Yup.mixed()
      .required('Image is a required field!')
      .test('fileSize', 'File size is too large!', value => {
        if (value) {
          return value.size < 1 * 1024 * 1024
        }
        return true
      })
      .test('fileFormat', 'File format is not supported!', value => {
        if (value) {
          return SUPPORTED_FORMATS.includes(value.type)
        }
        return true
      })
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      priority: 'normal',
      ttl: '',
      image: ''
    },
    enableReinitialize: true,
    validationSchema: sendNotificationSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('body', values.body)
        formData.append('priority', values.priority)
        formData.append('ttl', values.ttl)
        formData.append('image', values.image)

        dispatch(handleSendPushNotification(id, formData))
      }
    }
  })

  useEffect(() => {
    if (sent?.success) {
      history.push('/list-notifications')
    }
  }, [sent?.success])

  useEffect(() => {
    return () => {
      dispatch(resetPushNotification())
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Push Notification</CardTitle>
      </CardHeader>
      {inProcess ? (
        <Spinner />
      ) : (
        <CardBody>
          <Form method='post' encType='multipart/form-data' onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12} md={4} lg={6} className='mb-3 mb-md-0'>
                <FormGroupElement
                  label='Title'
                  labelClassName='form-label'
                  type='text'
                  inputName='title'
                  placeholder='title'
                  {...formik.getFieldProps('title')}
                  formikTouched={formik.touched.title}
                  formikError={formik.errors.title}
                />

                <FormGroupElement
                  label='Body'
                  labelClassName='form-label'
                  type='textarea'
                  inputName='body'
                  placeholder='body'
                  {...formik.getFieldProps('body')}
                  formikTouched={formik.touched.body}
                  formikError={formik.errors.body}
                />
              </Col>
              <Col sm={12} md={4} lg={6} className='mb-3 mb-md-0'>
                <FormGroupElement
                  label='Priority'
                  labelClassName='form-label'
                  type='select'
                  inputName='priority'
                  placeholder='priority'
                  {...formik.getFieldProps('priority')}
                  formikTouched={formik.touched.priority}
                  formikError={formik.errors.priority}
                >
                  <option value='normal'>Normal</option>
                  <option value='high'>High</option>
                </FormGroupElement>

                <FormGroupElement
                  label='TTL'
                  labelClassName='form-label'
                  type='number'
                  inputName='ttl'
                  placeholder='0 - 1296000'
                  {...formik.getFieldProps('ttl')}
                  formikTouched={formik.touched.ttl}
                  formikError={formik.errors.ttl}
                />
              </Col>
            </Row>

            <FormGroup>
              <Row className='d-flex align-items-center'>
                <Col sm={12} md={8} lg={6} className='mt-1'>
                  <FormGroupElement
                    label='Image'
                    labelClassName='form-label'
                    type='file'
                    inputName='image'
                    placeholder='Description'
                    onChange={event => formik.setFieldValue('image', event.target.files[0])}
                    accept='image/jpg, image/jpeg, image/png'
                    formikTouched={formik.touched.image}
                    formikError={formik.errors.image}
                  />
                </Col>
                <PreviewImage file={formik.values.image} />
              </Row>

              {sent?.success && <p className='text-success'>{sent?.msg}</p>}
              {error && (
                <p className='text-danger'>
                  {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : error.msg}
                </p>
              )}

              <Button type='submit' color='primary'>
                Send Notification
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default sendPushNotification
