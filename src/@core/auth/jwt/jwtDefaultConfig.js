// ** Auth Endpoints
import { MAIN_SERVICE_URL, NOT_OF_THIS_APP } from '../../../constants/const'

export default {
  registerAdminEndpoint: `${MAIN_SERVICE_URL}/admin/registerAdmin`,
  loginEndpoint: `${MAIN_SERVICE_URL}/admin/loginAdmin`,
  updateAdminEndpoint: `${MAIN_SERVICE_URL}/admin/updateAdmin/`,
  updateAdminProfile: `${MAIN_SERVICE_URL}/admin/updateAdminProfile`,
  updateAdminPasswordEndPoint: `${MAIN_SERVICE_URL}/admin/updateAdminPassword`,
  deleteAdminEndPoint: `${MAIN_SERVICE_URL}/admin/deleteAdmin/`,
  getAdminEndPoint: `${MAIN_SERVICE_URL}/admin/getAdmin/`,
  fetchProfileEndPoint: `${MAIN_SERVICE_URL}/admin/getAdminProfile`,
  getAdminsListEndPoint: `${MAIN_SERVICE_URL}/admin/listAdmins`,
  registerAppEndpoint: `${MAIN_SERVICE_URL}/app/registerApp`,
  updateAppEndpoint: `${MAIN_SERVICE_URL}/app/updateApp/`,
  deleteAppEndpoint: `${MAIN_SERVICE_URL}/app/deleteApp/`,
  getAppEndpoint: `${MAIN_SERVICE_URL}/app/getApp/`,
  getAppsListEndpoint: `${MAIN_SERVICE_URL}/app/listApps`,
  addPromotionEndpoint: `${MAIN_SERVICE_URL}/promotion/addPromotion/`,
  updatePromotionEndPoint: `${MAIN_SERVICE_URL}/promotion/updatePromotion/`,
  deletePromotionEndPoint: `${MAIN_SERVICE_URL}/promotion/deletePromotion/`,
  getPromotionEndPoint: `${MAIN_SERVICE_URL}/promotion/getPromotions/`,
  getPromotionsListEndPoint: `${MAIN_SERVICE_URL}/promotion/listPromotions`,
  getAppSettingsEndPoint: `${MAIN_SERVICE_URL}/appSetting/getSetting/`,
  updateAdSettingEndPoint: `${MAIN_SERVICE_URL}/appSetting/updateAdSetting/`,
  inAppUpdateSettingEndPoint: `${MAIN_SERVICE_URL}/appSetting/updateInAppUpdateSetting/`,
  sendPushNotificationEndPoint: `${MAIN_SERVICE_URL}/pushNotification/sendPushNotification/`,
  resendPushNotificationEndPoint: `${MAIN_SERVICE_URL}/pushNotification/resendPushNotification/`,
  deletePushNotificationEndPoint: `${MAIN_SERVICE_URL}/pushNotification/deletePushNotification/`,
  listNotificationsEndPoint: `${MAIN_SERVICE_URL}/pushNotification/listPushNotifications`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'JWT',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken'
}
