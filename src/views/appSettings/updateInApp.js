import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, Row } from 'reactstrap'
import FormGroupElement from '../common/FormGroupElement/FormGroupElement'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { handleFetchAppSettings, handleInAppUpdateSettings, resetUpdateAppSettings } from '../../redux/actions/appSettings'
import Spinner from '../common/Spinner'

function updateInApp() {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const { inProcess, fetchAppSettings, inAppUpdate, error } = useSelector(state => state.appSettings)

  useEffect(() => {
    dispatch(handleFetchAppSettings(id, 'inAppUpdate'))
  }, [])

  const updateInAppSchema = Yup.object().shape({
    android: Yup.object().shape({
      minVersion: Yup.string().required('Min version is a required field!'),
      showUpdate: Yup.boolean().required('Show update is a required field!'),
      forceUpdate: Yup.boolean().required('Force update is a required field!')
    }),
    ios: Yup.object().shape({
      minVersion: Yup.string().required('Min version is a required field!'),
      showUpdate: Yup.boolean().required('Show update is a required field!'),
      forceUpdate: Yup.boolean().required('Force update is a required field!')
    })
  })

  const formik = useFormik({
    initialValues: {
      android: {
        minVersion: fetchAppSettings?.inAppUpdate?.android?.minVersion || '',
        showUpdate: fetchAppSettings?.inAppUpdate?.android?.showUpdate || false,
        forceUpdate: fetchAppSettings?.inAppUpdate?.android?.forceUpdate || false
      },
      ios: {
        minVersion: fetchAppSettings?.inAppUpdate?.ios?.minVersion || '',
        showUpdate: fetchAppSettings?.inAppUpdate?.ios?.showUpdate || false,
        forceUpdate: fetchAppSettings?.inAppUpdate?.ios?.forceUpdate || false
      }
    },
    enableReinitialize: true,
    validationSchema: updateInAppSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          android: {
            minVersion: values.android.minVersion.trim(),
            showUpdate: values.android.showUpdate,
            forceUpdate: values.android.forceUpdate
          },
          ios: {
            minVersion: values.ios.minVersion.trim(),
            showUpdate: values.ios.showUpdate,
            forceUpdate: values.ios.forceUpdate
          }
        }
        dispatch(handleInAppUpdateSettings(id, data))
      }
    }
  })

  useEffect(() => {
    if (inAppUpdate?.success) {
      dispatch(resetUpdateAppSettings())
      history.push('/list-apps')
    }
  }, [inAppUpdate?.success])

  useEffect(() => {
    return () => {
      dispatch(resetUpdateAppSettings())
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>In App Update Settings</CardTitle>
      </CardHeader>
      {inProcess ? (
        <Spinner />
      ) : (
        <CardBody>
          <Form method='PUT' onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12} md={6} className='mb-3 mb-md-0'>
                <CardTitle className='text-primary'>Android</CardTitle>
                <FormGroupElement
                  label='Min Version'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='android.minVersion'
                  {...formik.getFieldProps('android.minVersion')}
                  formikTouched={formik.touched.android?.minVersion}
                  formikError={formik.errors.android?.minVersion}
                />

                <FormGroupElement
                  label='Show Update'
                  inputType='select'
                  labelClassName='form-label'
                  inputName='android.showUpdate'
                  {...formik.getFieldProps('android.showUpdate')}
                  formikTouched={formik.touched.android?.showUpdate}
                  formikError={formik.errors.android?.showUpdate}
                >
                  <option value={false}>False</option>
                  <option value={true}>True</option>
                </FormGroupElement>

                <FormGroupElement
                  label='Force Update'
                  inputType='select'
                  labelClassName='form-label'
                  inputName='android.forceUpdate'
                  {...formik.getFieldProps('android.forceUpdate')}
                  formikTouched={formik.touched.android?.forceUpdate}
                  formikError={formik.errors.android?.forceUpdate}
                >
                  <option value={false}>False</option>
                  <option value={true}>True</option>
                </FormGroupElement>
              </Col>

              <Col sm={12} md={6} className='mb-3 mb-md-0'>
                <CardTitle className='text-primary'>IOS</CardTitle>
                <FormGroupElement
                  label='Min Version'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='ios.minVersion'
                  {...formik.getFieldProps('ios.minVersion')}
                  formikTouched={formik.touched.ios?.minVersion}
                  formikError={formik.errors.ios?.minVersion}
                />

                <FormGroupElement
                  label='Show Update'
                  inputType='select'
                  labelClassName='form-label'
                  inputName='ios.showUpdate'
                  {...formik.getFieldProps('ios.showUpdate')}
                  formikTouched={formik.touched.ios?.showUpdate}
                  formikError={formik.errors.ios?.showUpdate}
                >
                  <option value={false}>False</option>
                  <option value={true}>True</option>
                </FormGroupElement>

                <FormGroupElement
                  label='Force Update'
                  inputType='select'
                  labelClassName='form-label'
                  inputName='ios.forceUpdate'
                  {...formik.getFieldProps('ios.forceUpdate')}
                  formikTouched={formik.touched.ios?.forceUpdate}
                  formikError={formik.errors.ios?.forceUpdate}
                >
                  <option value={false}>False</option>
                  <option value={true}>True</option>
                </FormGroupElement>
              </Col>
            </Row>
            {error && (
              <p className='text-danger'>
                {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : error.msg}
              </p>
            )}

            <Button.Ripple color='primary' type='submit'>
              Update In App
            </Button.Ripple>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default updateInApp
