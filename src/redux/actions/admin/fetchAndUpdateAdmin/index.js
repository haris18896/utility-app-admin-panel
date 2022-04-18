import useJwt from '@src/auth/jwt/useJwt'
import {
  FETCH_ADMIN_FAILED,
  FETCH_ADMIN_INITIATED,
  FETCH_ADMIN_SUCCESS,
  RESET_ADMIN_UPDATE_STATE,
  UPDATE_ADMIN_FAILED,
  UPDATE_ADMIN_INITIATED,
  UPDATE_ADMIN_SUCCESS
} from '../../ActionTypes/admin'

export const fetchAdminInitiated = () => ({ type: FETCH_ADMIN_INITIATED })
export const fetchAdminSuccess = data => ({ type: FETCH_ADMIN_SUCCESS, payload: data })
export const fetchAdminFailed = data => ({ type: FETCH_ADMIN_FAILED, payload: data })
export const updateAdminInitiated = () => ({ type: UPDATE_ADMIN_INITIATED })
export const updateAdminSuccess = data => ({ type: UPDATE_ADMIN_SUCCESS, payload: data })
export const updateAdminFailed = data => ({ type: UPDATE_ADMIN_FAILED, payload: data })
export const resetUpdateAdmin = () => ({ type: RESET_ADMIN_UPDATE_STATE })

export const handleFetchAdminById = id => {
  return async dispatch => {
    try {
      dispatch(fetchAdminInitiated())
      const response = await useJwt.getAdmin(id)
      if (response.data) {
        dispatch(fetchAdminSuccess(response.data))
      }
    } catch (err) {
      if (err.response?.data) {
        dispatch(fetchAdminFailed(err.response?.data))
      }
    }
  }
}

export const handleUpdateAdmin = (id, data) => {
  return async dispatch => {
    try {
      dispatch(updateAdminInitiated())
      const response = await useJwt.updateAdmin(id, data)
      if (response.data) {
        dispatch(updateAdminSuccess(response.data.profile))
      }
    } catch (err) {
      if (err.response) {
        dispatch(updateAdminFailed(err.response.data))
      }
    }
  }
}
