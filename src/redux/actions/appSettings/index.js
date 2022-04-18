import useJwt from '@src/auth/jwt/useJwt'
import {
  GET_SETTINGS_FAILURE,
  GET_SETTINGS_INITIATE,
  GET_SETTINGS_SUCCESS,
  IN_APP_UPDATE_SETTINGS_FAILURE,
  IN_APP_UPDATE_SETTINGS_INITIATE,
  IN_APP_UPDATE_SETTINGS_SUCCESS,
  RESET_UPDATE_AD_SETTINGS,
  UPDATE_AD_SETTINGS_FAILURE,
  UPDATE_AD_SETTINGS_INITIATE,
  UPDATE_AD_SETTINGS_SUCCESS
} from '../ActionTypes/appSettings'

export const resetUpdateAppSettings = () => ({ type: RESET_UPDATE_AD_SETTINGS })
export const getAppSettingsInitiated = () => ({ type: GET_SETTINGS_INITIATE })
export const getAppSettingsSuccess = data => ({ type: GET_SETTINGS_SUCCESS, payload: data })
export const getAppSettingsFailed = error => ({ type: GET_SETTINGS_FAILURE, payload: error })
export const updateAdSettingsInitiated = () => ({ type: UPDATE_AD_SETTINGS_INITIATE })
export const updateAdSettingsSuccess = data => ({ type: UPDATE_AD_SETTINGS_SUCCESS, payload: data })
export const updateAdSettingsFailed = error => ({ type: UPDATE_AD_SETTINGS_FAILURE, payload: error })
export const inAppUpdateSettingsInitiated = () => ({ type: IN_APP_UPDATE_SETTINGS_INITIATE })
export const inAppUpdateSettingsSuccess = data => ({ type: IN_APP_UPDATE_SETTINGS_SUCCESS, payload: data })
export const inAppUpdateSettingsFailed = error => ({ type: IN_APP_UPDATE_SETTINGS_FAILURE, payload: error })

export const handleFetchAppSettings = (id, setting) => {
  return async dispatch => {
    try {
      dispatch(getAppSettingsInitiated())
      const response = await useJwt.getAppSettings(id, setting)
      if (response) {
        dispatch(getAppSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(getAppSettingsFailed(err.response.data.message))
      }
    }
  }
}

export const handleUpdateAdSettings = (id, data) => {
  return async dispatch => {
    try {
      dispatch(updateAdSettingsInitiated())
      const response = await useJwt.updateAdSettings(id, data)
      if (response) {
        dispatch(updateAdSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(updateAdSettingsFailed(err.response.data))
      }
    }
  }
}

export const handleInAppUpdateSettings = (id, data) => {
  return async dispatch => {
    try {
      dispatch(inAppUpdateSettingsInitiated())
      const response = await useJwt.updateInAppSettings(id, data)
      if (response.data) {
        dispatch(inAppUpdateSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(inAppUpdateSettingsFailed(err.response.data))
      }
    }
  }
}
