import useJwt from '@src/auth/jwt/useJwt'
import {
  GET_PROMOTION_LIST_FAILED,
  GET_PROMOTION_LIST_INITIATED,
  GET_PROMOTION_LIST_SUCCESS,
  PAGE_CHANGE,
  RESET_PROMOTION_STATES,
  SELECT_CHANGE
} from '../ActionTypes/promotion'

export const pageChange = data => ({ type: PAGE_CHANGE, payload: data })
export const selectChange = data => ({ type: SELECT_CHANGE, payload: data })

export const resetPromotionList = () => ({ type: RESET_PROMOTION_STATES })
export const getPromotionListInitiate = () => ({ type: GET_PROMOTION_LIST_INITIATED })
export const getPromotionListSuccess = data => ({ type: GET_PROMOTION_LIST_SUCCESS, payload: data })
export const getPromotionListFailed = error => ({ type: GET_PROMOTION_LIST_FAILED, payload: error })

export const handleGetPromotionList = (page, limit, appId, adFormat, label, searchKeyword, promotionId) => {
  return async dispatch => {
    try {
      dispatch(getPromotionListInitiate())
      const response = await useJwt.getListPromotion(page, limit, appId, adFormat, label, searchKeyword, promotionId)
      if (response.data) {
        dispatch(getPromotionListSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(getPromotionListFailed(err.response.data))
      }
    }
  }
}

export const handlePageChangePromotion = (page, limit, appId, adFormat, label, searchKeyword, promotionId) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch(pageChange(newPage))
    dispatch(handleGetPromotionList(newPage, limit, appId, adFormat, label, searchKeyword, promotionId))
  }
}

export const handleSelectChangePromotion = (newLimit, oldLimit, appId, label, adFormat, searchKeyword) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(selectChange(newLimit))
      dispatch(pageChange(1))
      dispatch(handleGetPromotionList(1, newLimit, appId, adFormat, label, searchKeyword))
    }
  }
}
