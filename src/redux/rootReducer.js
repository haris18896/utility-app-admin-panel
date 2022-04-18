// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import { authReducer } from './reducers/auth'
import { registerReducer } from './reducers/admin/registerReducer'
import { profileUpdateReducer } from './reducers/admin/profileUpdateReducer'
import { updatePasswordReducer } from './reducers/admin/updatePasswordReducer'
import { adminUpdateReducer } from './reducers/admin/adminUpdateReducer'
import { adminsListReducer } from './reducers/admin/adminsListReducer'
import skinReducer from './reducers/skin'
import { AppRegisterReducer } from './reducers/App/AppRegisterReducer'
import { appListReducer } from './reducers/App/AppListReducer'
import { AppUpdateReducer } from './reducers/App/AppUpdateReducer'
import { AddPromotionReducer } from './reducers/promotion/AddPromotionReducer'
import { promotionListReducer } from './reducers/promotion/PromotionListReducer'
import { promotionUpdateReducer } from './reducers/promotion/PromotionUpdateReducer'
import { updateAdSettingsReducers } from './reducers/appSettings'
import { listNotificationReducer, resendNotificationReducer, sendPushNotificationReducer } from './reducers/notification'

const rootReducer = {
  auth: authReducer,
  navbar,
  layout,
  skin: skinReducer,
  register: registerReducer,
  adminsList: adminsListReducer,
  profileUpdate: profileUpdateReducer,
  passwordUpdate: updatePasswordReducer,
  adminUpdate: adminUpdateReducer,
  registerApp: AppRegisterReducer,
  appList: appListReducer,
  updateApp: AppUpdateReducer,
  promotionList: promotionListReducer,
  addPromotion: AddPromotionReducer,
  updatePromotion: promotionUpdateReducer,
  appSettings: updateAdSettingsReducers,
  sendNotification: sendPushNotificationReducer,
  resendNotification: resendNotificationReducer,
  listNotification: listNotificationReducer
}

export default rootReducer
