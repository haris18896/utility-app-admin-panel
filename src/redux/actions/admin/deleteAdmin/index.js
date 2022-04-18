import useJwt from '@src/auth/jwt/useJwt'
import { DELETE_ADMIN_FAILED, DELETE_ADMIN_INITIATED, DELETE_ADMIN_SUCCESS } from '../../ActionTypes/admin'
import { handleAdminsFetch } from '../fetchAdminsList'

export const deleteAdminInitiated = () => ({ type: DELETE_ADMIN_INITIATED })
export const deleteAdminSuccess = () => ({ type: DELETE_ADMIN_SUCCESS })
export const deleteAdminFailed = () => ({ type: DELETE_ADMIN_FAILED })

export const handleDeleteAdmin = (adminId, page, limit, searchKeyword) => {
  return async dispatch => {
    try {
      dispatch(deleteAdminInitiated())
      const response = await useJwt.deleteAdmin(adminId)
      if (response?.data) {
        dispatch(deleteAdminSuccess())
        dispatch(handleAdminsFetch(page, limit, searchKeyword))
      }
    } catch (err) {
      if (err.response) {
        dispatch(deleteAdminFailed(err.response.data))
      }
    }
  }
}
