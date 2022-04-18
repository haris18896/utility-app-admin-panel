import React, { useEffect } from 'react'
import * as Yup from 'yup'
import validator from 'validator'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { handleFetchAdminById, handleUpdateAdmin, resetUpdateAdmin } from '../../../redux/actions/admin/fetchAndUpdateAdmin'
import Spinner from '../../common/Spinner'
import classNames from 'classnames'
import FormGroupElement from '../../common/FormGroupElement/FormGroupElement'

const UpdateAdmin = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const history = useHistory()
  const { fetchAdminInProcess, updateAdminInProcess, fetchAdminById, updateAdmin, success, error } = useSelector(
    state => state.adminUpdate
  )

  useEffect(() => {
    dispatch(handleFetchAdminById(id))
  }, [])

  const updateAdminSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is a required field!')
      .min(3, 'Name must contain at least 3 characters')
      .test('name', 'Name must not contain numbers or special characters', value => {
        if (!value) {
          return true
        }
        return validator.isAlpha(value, 'en-US', { ignore: ' -' })
      }),
    email: Yup.string().email('Please enter a valid email address').required('Email is a required field!')
  })

  const formik = useFormik({
    initialValues: {
      name: fetchAdminById?.profile?.name || '',
      email: fetchAdminById?.profile?.email || ''
    },
    enableReinitialize: true,
    validationSchema: updateAdminSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          name: values.name,
          email: values.email
        }
        dispatch(handleUpdateAdmin(id, data))
      }
    }
  })

  useEffect(() => {
    if (success) {
      // formik.resetForm()
      history.push('/admins')
    }
  }, [success])

  useEffect(() => {
    return () => {
      dispatch(resetUpdateAdmin())
    }
  }, [success])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Admin</CardTitle>
      </CardHeader>

      {fetchAdminInProcess || updateAdminInProcess ? (
        <Spinner />
      ) : (
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroupElement
                  label='Name'
                  labelClassName='form-label'
                  autoFocus={true}
                  type='text'
                  inputName='name'
                  placeholder='Abdullah'
                  {...formik.getFieldProps('name')}
                  formikTouched={formik.touched.name}
                  formikError={formik.errors.name}
                />

                <FormGroupElement
                  label='Email'
                  labelClassName='form-label'
                  type='email'
                  inputName='email'
                  placeholder='abdullah@example.com'
                  {...formik.getFieldProps('email')}
                  formikTouched={formik.touched.email}
                  formikError={formik.errors.email}
                />

                {success && <p className='text-success'>Admin has been successfully updated!</p>}
                {error && (
                  <p className='text-danger'>
                    {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : error.msg}
                  </p>
                )}

                <Button.Ripple
                  className='mr-1'
                  color='primary'
                  // color={currentSkin === 'light' ? 'primary' : 'secondary'}
                  type='submit'
                >
                  Update Admin
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default UpdateAdmin
