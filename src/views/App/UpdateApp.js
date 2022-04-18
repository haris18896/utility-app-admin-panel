import React, { Fragment, useEffect } from 'react'
import * as Yup from 'yup'
import classNames from 'classnames'
import Spinner from '../common/Spinner'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { handleFetchApp, handleUpdateApp, resetUpdateStates } from '../../redux/actions/App/UpdateAppAction'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import FormGroupElement from '../common/FormGroupElement/FormGroupElement'

function UpdateApp() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const { inProcess, appDate, error, success, msg } = useSelector(state => state.updateApp)

  const updateAppSchema = Yup.object().shape({
    name: Yup.string().required('Name is a required field!'),
    platform: Yup.string()
      .required('platform is a required field!')
      .matches(/^(android|ios)$/, 'platform must be either android or ios')
  })

  const formik = useFormik({
    initialValues: {
      name: appDate?.app?.name || '',
      platform: appDate?.app?.platform.join(',') || []
    },
    enableReinitialize: true,
    validationSchema: updateAppSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const { name, platform } = values
        const data = {
          name,
          platform: platform.split(',')
        }
        dispatch(handleUpdateApp(id, data))
      }
    }
  })

  useEffect(() => {
    if (success) {
      history.push('/list-apps')
    }
  }, [success])

  useEffect(() => {
    dispatch(handleFetchApp(id))
  }, [])

  useEffect(() => {
    return () => {
      dispatch(resetUpdateStates())
    }
  }, [success])

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>Update App</CardTitle>
        </CardHeader>
        {inProcess ? (
          <Spinner />
        ) : (
          <CardBody>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
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
                Update App
              </Button.Ripple>
            </Form>
          </CardBody>
        )}
      </Card>
    </Fragment>
  )
}

export default UpdateApp
