import useJwt from '@src/auth/jwt/useJwt'
import { GET_APP_LIST_INITIATED, GET_APP_LIST_SUCCESS, PAGE_CHANGE, RESET_APP_STATES, SELECT_CHANGE } from '../ActionTypes/App'

export const pageChange = data => ({ type: PAGE_CHANGE, payload: data })
export const selectChange = data => ({ type: SELECT_CHANGE, payload: data })

export const resetAppList = () => ({ type: RESET_APP_STATES })
export const getAppListInitiate = () => ({ type: GET_APP_LIST_INITIATED })
export const getAppListSuccess = data => ({ type: GET_APP_LIST_SUCCESS, payload: data })
export const getAppListFailed = error => ({ type: GET_APP_LIST_FAILED, payload: error })

export const handleGetAppList = (page, limit, platform, searchKeyword) => {
  return async dispatch => {
    try {
      dispatch(getAppListInitiate())
      const response = await useJwt.getAppsList(page, limit, platform, searchKeyword)
      if (response.data) {
        dispatch(getAppListSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(getAppListFailed(err.response.data.message))
      }
    }
  }
}

export const handlePageChange = (page, limit, platform, searchKeyword) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch(pageChange(newPage))
    dispatch(handleGetAppList(newPage, limit, platform, searchKeyword))
  }
}

export const handleSelectChange = (newLimit, oldLimit, platform, searchKeyword) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(selectChange(newLimit))
      dispatch(pageChange(1))
      dispatch(handleGetAppList(1, newLimit, platform, searchKeyword))
    }
  }
}
