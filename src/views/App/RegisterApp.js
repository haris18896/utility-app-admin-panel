import React, { Fragment, useEffect } from 'react'
import * as Yup from 'yup'
import classNames from 'classnames'
import Spinner from '../common/Spinner'
import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'

import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { handleRegisterApp, resetAppState } from '../../redux/actions/App/RegisterAppAction'
import { useHistory } from 'react-router-dom'
import FormGroupElement from '../common/FormGroupElement/FormGroupElement'

function RegisterApp() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { inProcess, error, success, msg } = useSelector(state => state.registerApp)

  const registerAppSchema = Yup.object().shape({
    appId: Yup.string().required('App ID is a required field!'),
    name: Yup.string().required('Name is a required field!'),
    platform: Yup.string()
      .required('platform is a required field!')
      .matches(/^(android|ios)$/, 'platform must be either android or ios')
  })

  const formik = useFormik({
    initialValues: {
      appId: '',
      name: '',
      platform: []
    },
    enableReinitialize: true,
    validationSchema: registerAppSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const { appId, name, platform } = values
        const data = {
          appId,
          name,
          platform: platform.split(',')
        }
        dispatch(handleRegisterApp(data))
      }
    }
  })

  useEffect(() => {
    if (success) {
      history.push('/list-apps')
    }
  }, [success])

  useEffect(() => {
    return () => {
      dispatch(resetAppState())
    }
  }, [success])

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>Register App</CardTitle>
        </CardHeader>
        {inProcess ? (
          <Spinner />
        ) : (
          <CardBody>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                  <FormGroupElement
                    label='App ID'
                    labelClassName='form-label'
                    type='text'
                    inputName='appId'
                    placeholder='App ID'
                    {...formik.getFieldProps('appId')}
                    formikTouched={formik.touched.appId}
                    formikError={formik.errors.appId}
                  />

                  <FormGroupElement
                    label='Name'
                    labelClassName='form-label'
                    type='text'
                    inputName='name'
                    placeholder='App Name'
                    {...formik.getFieldProps('name')}
                    formikTouched={formik.touched.name}
                    formikError={formik.errors.name}
                  />

                  <FormGroupElement
                    label='Platform'
                    labelClassName='form-label'
                    type='text'
                    inputName='platform'
                    placeholder='Android or IOS'
                    {...formik.getFieldProps('platform')}
                    formikTouched={formik.touched.platform}
                    formikError={formik.errors.platform}
                  />
                </Col>
              </Row>

              {success && <p className='text-success'>{msg}</p>}
              {error && (
                <p className='text-danger'>
                  {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : error.msg}
                </p>
              )}

              <Button.Ripple color='primary' type='submit'>
                Add App
              </Button.Ripple>
            </Form>
          </CardBody>
        )}
      </Card>
    </Fragment>
  )
}

export default RegisterApp
