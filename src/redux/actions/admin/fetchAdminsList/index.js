import useJwt from '@src/auth/jwt/useJwt'
import {
  FETCH_ADMINS_FAILED,
  FETCH_ADMINS_INITIATED,
  FETCH_ADMINS_SUCCESS,
  PAGE_CHANGE,
  RESET_ADMINS_LIST,
  SELECT_CHANGE
} from '../../ActionTypes/admin'

export const restAdminsList = () => ({ type: RESET_ADMINS_LIST })
export const fetchAdminsInitiated = () => ({ type: FETCH_ADMINS_INITIATED })
export const fetchAdminsSuccess = data => ({ type: FETCH_ADMINS_SUCCESS, payload: data })
export const fetchAdminsFailed = data => ({ type: FETCH_ADMINS_FAILED, payload: data })

export const handleAdminsFetch = (page, limit, searchKeyword = null) => {
  return async dispatch => {
    try {
      dispatch(fetchAdminsInitiated())
      const response = await useJwt.getAdminsList(page, limit, searchKeyword)
      if (response?.data) {
        dispatch(fetchAdminsSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(fetchAdminsFailed(err.response.data))
      }
    }
  }
}

export const handleSelectChange = (newLimit, oldLimit, searchKeyword) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch({ type: SELECT_CHANGE, payload: newLimit })
      dispatch({ type: PAGE_CHANGE, payload: 1 })
      dispatch(handleAdminsFetch(1, newLimit, searchKeyword))
    }
  }
}

export const handlePageChange = (page, limit, searchKeyword) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE, payload: newPage })
    dispatch(handleAdminsFetch(newPage, limit, searchKeyword))
  }
}
