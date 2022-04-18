import React, { useEffect } from 'react'
import * as Yup from 'yup'
import FormGroupElement from '../common/FormGroupElement/FormGroupElement'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { handleFetchAppSettings, handleUpdateAdSettings, resetUpdateAppSettings } from '../../redux/actions/appSettings'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, Row } from 'reactstrap'
import Spinner from '../common/Spinner'

function updateAd() {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const { inProcess, fetchAppSettings, error, Ad } = useSelector(state => state.appSettings)

  useEffect(() => {
    dispatch(handleFetchAppSettings(id, 'ad'))
  }, [])

  const updateAdSchema = Yup.object().shape({
    android: Yup.object().shape({
      adMob: Yup.object().shape({
        isActive: Yup.boolean().required('isActive is a required field!'),
        appId: Yup.string().required('App ID is a required field!'),
        appOpenId: Yup.string().required('App Open ID is a required field!'),
        bannerId: Yup.string().required('Banner ID is a required field!'),
        interstitialId: Yup.string().required('Interstitial ID is a required field!'),
        rewardedId: Yup.string().required('Rewarded ID is a required field!'),
        rewardedInterstitialId: Yup.string().required('Rewarded Interstitial ID is a required field!'),
        nativeId: Yup.string().required('Native ID is a required field!')
      })
    }),
    ios: Yup.object().shape({
      adMob: Yup.object().shape({
        isActive: Yup.boolean().required('isActive is a required field!'),
        appId: Yup.string().required('App ID is a required field!'),
        appOpenId: Yup.string().required('App Open ID is a required field!'),
        bannerId: Yup.string().required('Banner ID is a required field!'),
        interstitialId: Yup.string().required('Interstitial ID is a required field!'),
        rewardedId: Yup.string().required('Rewarded ID is a required field!'),
        rewardedInterstitialId: Yup.string().required('Rewarded Interstitial ID is a required field!'),
        nativeId: Yup.string().required('Native ID is a required field!')
      })
    })
  })

  const formik = useFormik({
    initialValues: {
      android: {
        adMob: {
          isActive: fetchAppSettings?.ad?.android?.adMob?.isActive || false,
          appId: fetchAppSettings?.ad?.android?.adMob?.appId || '',
          appOpenId: fetchAppSettings?.ad?.android?.adMob?.appOpenId || '',
          bannerId: fetchAppSettings?.ad?.android?.adMob?.bannerId || '',
          interstitialId: fetchAppSettings?.ad?.android?.adMob?.interstitialId || '',
          rewardedId: fetchAppSettings?.ad?.android?.adMob?.rewardedId || '',
          rewardedInterstitialId: fetchAppSettings?.ad?.android?.adMob?.rewardedInterstitialId || '',
          nativeId: fetchAppSettings?.ad?.android?.adMob?.nativeId || ''
        }
      },
      ios: {
        adMob: {
          isActive: fetchAppSettings?.ad?.ios?.adMob?.isActive || false,
          appId: fetchAppSettings?.ad?.ios?.adMob?.appId || '',
          appOpenId: fetchAppSettings?.ad?.ios?.adMob?.appOpenId || '',
          bannerId: fetchAppSettings?.ad?.ios?.adMob?.bannerId || '',
          interstitialId: fetchAppSettings?.ad?.ios?.adMob?.interstitialId || '',
          rewardedId: fetchAppSettings?.ad?.ios?.adMob?.rewardedId || '',
          rewardedInterstitialId: fetchAppSettings?.ad?.ios?.adMob?.rewardedInterstitialId || '',
          nativeId: fetchAppSettings?.ad?.ios?.adMob?.nativeId || ''
        }
      }
    },
    enableReinitialize: true,
    validationSchema: updateAdSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          android: {
            adMob: {
              isActive: values.android.adMob.isActive,
              appId: values.android.adMob.appId,
              appOpenId: values.android.adMob.appOpenId,
              bannerId: values.android.adMob.bannerId,
              interstitialId: values.android.adMob.interstitialId,
              rewardedId: values.android.adMob.rewardedId,
              rewardedInterstitialId: values.android.adMob.rewardedInterstitialId,
              nativeId: values.android.adMob.nativeId
            }
          },
          ios: {
            adMob: {
              isActive: values.ios.adMob.isActive,
              appId: values.ios.adMob.appId,
              appOpenId: values.ios.adMob.appOpenId,
              bannerId: values.ios.adMob.bannerId,
              interstitialId: values.ios.adMob.interstitialId,
              rewardedId: values.ios.adMob.rewardedId,
              rewardedInterstitialId: values.ios.adMob.rewardedInterstitialId,
              nativeId: values.ios.adMob.nativeId
            }
          }
        }
        dispatch(handleUpdateAdSettings(id, data))
      }
    }
  })

  useEffect(() => {
    if (Ad?.success) {
      dispatch(resetUpdateAppSettings())
      history.push('/list-apps')
    }
  }, [Ad?.success])

  useEffect(() => {
    return () => {
      dispatch(resetUpdateAppSettings())
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Update Ad Settings</CardTitle>
      </CardHeader>
      {inProcess ? (
        <Spinner />
      ) : (
        <CardBody>
          <Form method='PUT' onSubmit={formik.handleSubmit} className='mt-2'>
            <Row>
              <Col sm={12} md={6} className='mb-3 mb-md-0'>
                <CardTitle className='text-primary'>AdMob (Android)</CardTitle>
                <FormGroupElement
                  label='Active'
                  inputType='select'
                  labelClassName='form-label'
                  inputName='android.adMob.isActive'
                  {...formik.getFieldProps('android.adMob.isActive')}
                  formikTouched={formik.touched.android?.adMob?.isActive}
                  formikError={formik.errors.android?.adMob?.isActive}
                >
                  <option value='false'>False</option>
                  <option value='true'>True</option>
                </FormGroupElement>

                <FormGroupElement
                  label='App ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='android.adMob.appId'
                  {...formik.getFieldProps('android.adMob.appId')}
                  formikTouched={formik.touched.android?.adMob?.appId}
                  formikError={formik.errors.android?.adMob?.appId}
                />

                <FormGroupElement
                  label='App Open ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='android.adMob.appOpenId'
                  {...formik.getFieldProps('android.adMob.appOpenId')}
                  formikTouched={formik.touched.android?.adMob?.appOpenId}
                  formikError={formik.errors.android?.adMob?.appOpenId}
                />

                <FormGroupElement
                  label='Banner ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='android.adMob.bannerId'
                  {...formik.getFieldProps('android.adMob.bannerId')}
                  formikTouched={formik.touched.android?.adMob?.bannerId}
                  formikError={formik.errors.android?.adMob?.bannerId}
                />

                <FormGroupElement
                  label='Interstitial ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='android.adMob.interstitialId'
                  {...formik.getFieldProps('android.adMob.interstitialId')}
                  formikTouched={formik.touched.android?.adMob?.interstitialId}
                  formikError={formik.errors.android?.adMob?.interstitialId}
                />

                <FormGroupElement
                  label='Rewarded ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='android.adMob.rewardedId'
                  {...formik.getFieldProps('android.adMob.rewardedId')}
                  formikTouched={formik.touched.android?.adMob?.rewardedId}
                  formikError={formik.errors.android?.adMob?.rewardedId}
                />

                <FormGroupElement
                  label='Rewarded Interstitial ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='android.adMob.rewardedInterstitialId'
                  {...formik.getFieldProps('android.adMob.rewardedInterstitialId')}
                  formikTouched={formik.touched.android?.adMob?.rewardedInterstitialId}
                  formikError={formik.errors.android?.adMob?.rewardedInterstitialId}
                />

                <FormGroupElement
                  label='Native ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='android.adMob.nativeId'
                  {...formik.getFieldProps('android.adMob.nativeId')}
                  formikTouched={formik.touched.android?.adMob?.nativeId}
                  formikError={formik.errors.android?.adMob?.nativeId}
                />
              </Col>

              <Col sm={12} md={6} className='mb-3 mb-md-0'>
                <CardTitle className='text-primary'>AdMob (IOS)</CardTitle>
                <FormGroupElement
                  label='Active'
                  inputType='select'
                  labelClassName='form-label'
                  inputName='ios.adMob.isActive'
                  {...formik.getFieldProps('ios.adMob.isActive')}
                  formikTouched={formik.touched.ios?.adMob?.isActive}
                  formikError={formik.errors.ios?.adMob?.isActive}
                >
                  <option value='false'>False</option>
                  <option value='true'>True</option>
                </FormGroupElement>

                <FormGroupElement
                  label='App ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='ios.adMob.appId'
                  {...formik.getFieldProps('ios.adMob.appId')}
                  formikTouched={formik.touched.ios?.adMob?.appId}
                  formikError={formik.errors.ios?.adMob?.appId}
                />

                <FormGroupElement
                  label='App Open ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='ios.adMob.appOpenId'
                  {...formik.getFieldProps('ios.adMob.appOpenId')}
                  formikTouched={formik.touched.ios?.adMob?.appOpenId}
                  formikError={formik.errors.ios?.adMob?.appOpenId}
                />

                <FormGroupElement
                  label='Banner ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='ios.adMob.bannerId'
                  {...formik.getFieldProps('ios.adMob.bannerId')}
                  formikTouched={formik.touched.ios?.adMob?.bannerId}
                  formikError={formik.errors.ios?.adMob?.bannerId}
                />

                <FormGroupElement
                  label='Interstitial ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='ios.adMob.interstitialId'
                  {...formik.getFieldProps('ios.adMob.interstitialId')}
                  formikTouched={formik.touched.ios?.adMob?.interstitialId}
                  formikError={formik.errors.ios?.adMob?.interstitialId}
                />

                <FormGroupElement
                  label='Rewarded ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='ios.adMob.rewardedId'
                  {...formik.getFieldProps('ios.adMob.rewardedId')}
                  formikTouched={formik.touched.ios?.adMob?.rewardedId}
                  formikError={formik.errors.ios?.adMob?.rewardedId}
                />

                <FormGroupElement
                  label='Rewarded Interstitial ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='ios.adMob.rewardedInterstitialId'
                  {...formik.getFieldProps('ios.adMob.rewardedInterstitialId')}
                  formikTouched={formik.touched.ios?.adMob?.rewardedInterstitialId}
                  formikError={formik.errors.ios?.adMob?.rewardedInterstitialId}
                />

                <FormGroupElement
                  label='Native ID'
                  inputType='text'
                  labelClassName='form-label'
                  inputName='ios.adMob.nativeId'
                  {...formik.getFieldProps('ios.adMob.nativeId')}
                  formikTouched={formik.touched.ios?.adMob?.nativeId}
                  formikError={formik.errors.ios?.adMob?.nativeId}
                />
              </Col>
            </Row>
            {error && (
              <p className='text-danger'>
                {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : error.msg}
              </p>
            )}

            <Button.Ripple color='primary' type='submit'>
              Update Ad
            </Button.Ripple>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default updateAd
