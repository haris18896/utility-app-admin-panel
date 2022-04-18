import useJwt from '@src/auth/jwt/useJwt'
import { DELETE_PROMOTION_FAILED, DELETE_PROMOTION_INITIATED, DELETE_PROMOTION_SUCCESS } from '../ActionTypes/promotion'

export const deletePromotionInitiated = () => ({ type: DELETE_PROMOTION_INITIATED })
export const deletePromotionSuccess = data => ({ type: DELETE_PROMOTION_SUCCESS, payload: data })
export const deletePromotionFailed = error => ({ type: DELETE_PROMOTION_FAILED, payload: error })

export const handleDeletePromotion = Id => {
  return async dispatch => {
    try {
      dispatch(deletePromotionInitiated())
      const response = await useJwt.deletePromotion(Id)
      if (response) {
        dispatch(deletePromotionSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(deletePromotionFailed(err.response.data))
      }
    }
  }
}
