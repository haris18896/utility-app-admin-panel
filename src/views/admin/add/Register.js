import React, { useEffect } from 'react'

import * as Yup from 'yup'
import validator from 'validator'
import classNames from 'classnames'
import Spinner from '../../common/Spinner'
import InputPasswordToggle from '@components/input-password-toggle'
import FormGroupElement from '../../common/FormGroupElement/FormGroupElement'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useSelector, useDispatch } from 'react-redux'
import { RESET_REGISTRATION_STATE } from '../../../redux/actions/ActionTypes/admin'
import { handleRegisterAdmin } from '../../../redux/actions/admin/registerAdmin/registerAdminActions'
import { Card, CardHeader, CardBody, CardTitle, Form, Row, Col, Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap'

function Register() {
  const dispatch = useDispatch()
  const { inProcess, success, msg, error } = useSelector(state => state.register)

  const registerAdminSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is a required field!')
      .min(3, 'Name must contain at least 3 characters')
      .test('name', 'Name must not contain numbers or special characters', value => {
        if (!value) {
          return true
        }
        return validator.isAlpha(value, 'en-US', { ignore: ' -' })
      }),
    email: Yup.string().email('Please enter a valid email address').required('Email is a required field!'),
    password: Yup.string()
      .required('Password is a required field!')
      .test('strong-password', 'Password must contain at least 8 characters, one number and one lowercase letter', value => {
        if (!value) {
          return true
        }
        return validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minNumbers: 1, minUppercase: 0, minSymbols: 0 })
      }),
    confirmPassword: Yup.string()
      .required('Confirm password is a required field!')
      .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    enableReinitialize: true,
    validationSchema: registerAdminSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const { name, email, password, confirmPassword } = values
        const data = {
          name,
          email: email.trim(),
          password: password.trim(),
          confirmPassword: confirmPassword.trim()
        }
        dispatch(handleRegisterAdmin(data))
      }
    }
  })

  useEffect(() => {
    if (success) {
      formik.resetForm()
    }
  }, [success])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_REGISTRATION_STATE })
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Admin</CardTitle>
      </CardHeader>

      {inProcess ? (
        <Spinner />
      ) : (
        <CardBody>
          <Form method='POST' onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroupElement
                  label='Name'
                  labelClassName='form-label'
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

                <FormGroup>
                  <Label className='form-label' htmlFor='password'>
                    Password
                  </Label>
                  <InputPasswordToggle
                    name='password'
                    id='password'
                    {...formik.getFieldProps('password')}
                    className={classNames({
                      'input-group-merge': true,
                      'is-invalid': formik.touched.password && formik.errors.password
                    })}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <FormFeedback>{formik.errors.password}</FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' htmlFor='confirmPassword'>
                    Confirm Password
                  </Label>
                  <InputPasswordToggle
                    name='confirmPassword'
                    id='confirmPassword'
                    {...formik.getFieldProps('confirmPassword')}
                    className={classNames({
                      'input-group-merge': true,
                      'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword
                    })}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <FormFeedback>{formik.errors.confirmPassword}</FormFeedback>
                  ) : null}
                </FormGroup>

                {success && <p className='text-success'>{msg}</p>}
                {error && (
                  <p className='text-danger'>
                    {error.errors && error.errors.length ? `${error.errors[0].param}: ${error.errors[0].msg}` : errs.msg}
                  </p>
                )}

                <Button.Ripple className='mr-1' color='primary' type='submit'>
                  Add
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default Register
