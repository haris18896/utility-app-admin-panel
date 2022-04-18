import React, { Fragment, useState, useEffect } from 'react'
import * as Yup from 'yup'
import classNames from 'classnames'
import Spinner from '../common/Spinner'
import FormGroupElement from '../common/FormGroupElement/FormGroupElement'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { handleGetPromotionList } from '../../redux/actions/promotion/GetPromotionsListAction'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { handleUpdatePromotion, resetUpdateStates } from '../../redux/actions/promotion/UpdatePromotionAction'

function UpdatePromotion() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']
  const { inProcess, updatePromotion, error } = useSelector(state => state.updatePromotion)
  const { page, limit, promotionListInProcess, promotionListData } = useSelector(state => state.promotionList)

  useEffect(() => {
    dispatch(handleGetPromotionList(page, limit, '', '', '', '', id))
  }, [])

  const updatePromotionSchema = Yup.object().shape({
    label: Yup.string()
      .required('Label is a required field!')
      .min(2, 'Label must be greater that 2!')
      .max(30, 'Label must be less than 30 characters!'),
    adFormat: Yup.string()
      .required('adFormat is a required field!')
      .matches(/^(banner|interstitial|native)$/, 'Interval must be either banner, interstitial, native!'),
    screenId: Yup.array()
      .of(Yup.string().required('Screen ID is a required field!').max(30, 'Screen ID must be less than 30 characters!'))
      .nullable(),
    frequency: Yup.number()
      .required('Frequency is a required field!')
      .min(1, 'Frequency must be greater than 0!')
      .max(100, 'Frequency must be less than 100!'),
    delay: Yup.object().shape({
      value: Yup.number()
        .required('Value is a required field!')
        .min(1, 'Value must be greater than 0!')
        .max(60, 'Value must be less than 60!'),

      interval: Yup.string()
        .required('Interval is a required field!')
        .matches(/^(second|minute|hour)$/, 'Interval must be either second, minute, hour!')
    }),
    expiryTime: Yup.date()
      .required('Expiry Time is a required field!')
      .min(new Date(), 'Expiry Time must be greater than current time!'),
    title: Yup.string().max(80, 'Title must be less than 80 characters!'),
    body: Yup.string().max(250, 'Body must be less than 250 characters!'),
    url: Yup.string().url('URL must be a valid URL!'),
    btnText: Yup.string().max(30, 'Button Text should be less than 30 characters!')
  })

  const formik = useFormik({
    initialValues: {
      label: promotionListData?.promotions[0]?.label || '',
      adFormat: promotionListData?.promotions[0]?.adFormat || '',
      screenId: promotionListData?.promotions[0]?.screenIds.join(', ') || '',
      frequency: promotionListData?.promotions[0]?.frequency || '',
      delay: {
        value: promotionListData?.promotions[0]?.delay.value || '',
        interval: promotionListData?.promotions[0]?.delay.interval || ''
      },
      expiryTime: '',
      title: promotionListData?.promotions[0]?.title || '',
      body: promotionListData?.promotions[0]?.body || '',
      url: promotionListData?.promotions[0]?.url || '',
      btnText: promotionListData?.promotions[0]?.btnText || ''
    },
    enableReinitialize: true,
    validationSchema: updatePromotionSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          label: values.label,
          adFormat: values.adFormat,
          screenIds: values.screenId.split(',').map(item => item.trim()),
          frequency: values.frequency,
          delay: {
            value: values.delay.value,
            interval: values.delay.interval
          },
          expiryTime: values.expiryTime,
          title: values.title,
          body: values.body,
          url: values.url,
          btnText: values.btnText
        }

        dispatch(handleUpdatePromotion(id, data))
      }
    }
  })

  useEffect(() => {
    if (updatePromotion?.success) {
      history.push('/list-promotions')
    }
  }, [updatePromotion?.success])

  useEffect(() => {
    return () => {
      dispatch(resetUpdateStates())
    }
  }, [])

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>Add Promotion</CardTitle>
        </CardHeader>

        {/* Loading */}
        {inProcess || promotionListInProcess ? (
          <Spinner />
        ) : promotionListData?.promotions.length ? (
          <CardBody>
            <Form method='post' encType='multipart/form-data' onSubmit={formik.handleSubmit}>
              <Row>
                <Col sm={12} md={4} lg={6} className='mb-3 mb-md-0'>
                  <FormGroupElement
                    label='label'
                    labelClassName='form-label'
                    type='text'
                    inputName='label'
                    {...formik.getFieldProps('label')}
                    formikTouched={formik.touched.label}
                    formikError={formik.errors.label}
                  />

                  <FormGroupElement
                    label='Ad Format'
                    labelClassName='form-label'
                    type='select'
                    inputName='adFormat'
                    placeholder='adFormat'
                    {...formik.getFieldProps('adFormat')}
                    formikTouched={formik.touched.adFormat}
                    formikError={formik.errors.adFormat}
                  >
                    <option value=''>Choose...</option>
                    <option value='banner'>Banner</option>
                    <option value='interstitial'>Interstitial</option>
                    <option value='native'>Native</option>
                  </FormGroupElement>

                  <FormGroupElement
                    label='Screen ID'
                    labelClassName='form-label'
                    type='text'
                    inputName='screenId'
                    placeholder='Enter Screen ID'
                    {...formik.getFieldProps('screenId')}
                    formikTouched={formik.touched.screenId}
                    formikError={formik.errors.screenId}
                  />

                  <FormGroupElement
                    label='Frequency'
                    labelClassName='form-label'
                    type='number'
                    inputName='frequency'
                    placeholder='Frequency'
                    {...formik.getFieldProps('frequency')}
                    formikTouched={formik.touched.frequency}
                    formikError={formik.errors.frequency}
                  />

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
                </Col>

                <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                  <FormGroupElement
                    label='URL'
                    labelClassName='form-label'
                    type='url'
                    inputName='url'
                    placeholder='url'
                    {...formik.getFieldProps('url')}
                    formikTouched={formik.touched.url}
                    formikError={formik.errors.url}
                  />

                  <FormGroup>
                    <Label for='delay.value' className='form-label'>
                      Delay
                    </Label>
                    <Col className='d-flex'>
                      <div className='d-flex flex-column flex-grow-1'>
                        <Input
                          type='number'
                          name='delay.value'
                          id='delay.value'
                          placeholder='Delay Value'
                          style={{ marginRight: '7px' }}
                          {...formik.getFieldProps('delay.value')}
                          className={classNames({ 'is-invalid': formik.touched.delay?.value && formik.errors.delay?.value })}
                        />
                        {formik.touched.delay?.value && formik.errors.delay?.value ? (
                          <FormFeedback>{formik.errors.delay?.value}</FormFeedback>
                        ) : null}
                      </div>
                      <div className='d-flex flex-column' style={{ minWidth: '120px', maxWidth: '250px' }}>
                        <Input
                          type='select'
                          name='delay.interval'
                          id='delay.interval'
                          placeholder='Interval'
                          style={{ marginLeft: '7px' }}
                          {...formik.getFieldProps('delay.interval')}
                          className={classNames({
                            'is-invalid': formik.touched.delay?.interval && formik.errors.delay?.interval
                          })}
                        >
                          <option value=''>Choose...</option>
                          <option value='second'>Seconds</option>
                          <option value='minute'>Minutes</option>
                          <option value='hour'>Hours</option>
                        </Input>
                        {formik.touched.delay?.interval && formik.errors.delay?.interval ? (
                          <FormFeedback>{formik.errors.delay?.interval}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </FormGroup>

                  <FormGroupElement
                    label='Expiry Time'
                    labelClassName='form-label'
                    type='date'
                    inputName='expiryTime'
                    placeholder='expiryTime'
                    {...formik.getFieldProps('expiryTime')}
                    formikTouched={formik.touched.expiryTime}
                    formikError={formik.errors.expiryTime}
                  />

                  <FormGroupElement
                    label='Button Text'
                    labelClassName='form-label'
                    type='text'
                    inputName='btnText'
                    placeholder='Button Name'
                    {...formik.getFieldProps('btnText')}
                    formikTouched={formik.touched.btnText}
                    formikError={formik.errors.btnText}
                  />
                </Col>

                <FormGroupElement
                  label='Description'
                  labelClassName='form-label'
                  type='textarea'
                  inputName='body'
                  placeholder='Description'
                  {...formik.getFieldProps('body')}
                  formikTouched={formik.touched.body}
                  formikError={formik.errors.body}
                />
              </Row>

              {updatePromotion?.success && <p className='text-success'>{updatePromotion?.msg}</p>}
              {error && (
                <p className='text-danger'>
                  {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : error.msg}
                </p>
              )}

              <Button type='submit' color='primary'>
                Add Promotion
              </Button>
            </Form>
          </CardBody>
        ) : (
          <CardBody>
            <CardTitle tag='h4'>No Record Found!</CardTitle>
          </CardBody>
        )}
      </Card>
    </Fragment>
  )
}

export default UpdatePromotion
