import useJwt from '@src/auth/jwt/useJwt'
import {
  ADD_PROMOTION_FAILED,
  ADD_PROMOTION_INITIATED,
  ADD_PROMOTION_SUCCESS,
  RESET_PROMOTION_STATES
} from '../ActionTypes/promotion'

export const resetAddPromotion = () => ({ type: RESET_PROMOTION_STATES })
export const addPromotionInitiated = () => ({ type: ADD_PROMOTION_INITIATED })
export const addPromotionSucceeded = data => ({ type: ADD_PROMOTION_SUCCESS, payload: data })
export const addPromotionFailed = error => ({ type: ADD_PROMOTION_FAILED, payload: error })

export const handleAddPromotion = (_id, data) => {
  return async dispatch => {
    try {
      dispatch(addPromotionInitiated())
      const response = await useJwt.addPromotion(_id, data)
      if (response) {
        dispatch(addPromotionSucceeded(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(addPromotionFailed(err.response.data))
      }
    }
  }
}
