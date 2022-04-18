import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig }

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    axios.interceptors.request.use(
      config => {
        const accessToken = this.getToken()
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    axios.interceptors.response.use(
      response => response,
      error => {
        const { response } = error
        if (response && response.status === 406) {
          localStorage.removeItem('accessToken')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }

  registerAdmin(data) {
    return axios.post(this.jwtConfig.registerAdminEndpoint, data)
  }

  login(data) {
    return axios.post(this.jwtConfig.loginEndpoint, data)
  }

  updateAdmin(id, data) {
    return axios.put(`${this.jwtConfig.updateAdminEndpoint}${id}`, data)
  }

  updateProfile(data) {
    return axios.put(this.jwtConfig.updateAdminProfile, data)
  }

  updatePassword(data) {
    return axios.put(this.jwtConfig.updateAdminPasswordEndPoint, data)
  }

  deleteAdmin(id) {
    return axios.delete(`${this.jwtConfig.deleteAdminEndPoint}${id}`)
  }

  getAdmin(id) {
    return axios.get(`${this.jwtConfig.getAdminEndPoint}${id}`)
  }

  fetchProfile() {
    return axios.get(this.jwtConfig.fetchProfileEndPoint)
  }

  getAdminsList(page, limit, searchKeyword = null) {
    let endpoint = `${this.jwtConfig.getAdminsListEndPoint}?page=${page}&limit=${limit}`
    if (searchKeyword) {
      endpoint = `${endpoint}&searchKeyword=${searchKeyword}`
    }
    return axios.get(endpoint)
  }

  registerApp(data) {
    return axios.post(this.jwtConfig.registerAppEndpoint, data)
  }

  updateApp(_id, data) {
    return axios.put(`${this.jwtConfig.updateAppEndpoint}${_id}`, data)
  }

  deleteApp(id) {
    return axios.delete(`${this.jwtConfig.deleteAppEndpoint}${id}`)
  }

  getApp(id) {
    return axios.get(`${this.jwtConfig.getAppEndpoint}${id}`)
  }

  getAppsList(page, limit, platform, searchKeyword = null) {
    let endpoint = `${this.jwtConfig.getAppsListEndpoint}?page=${page}&limit=${limit}`
    if (platform) {
      endpoint = `${endpoint}&platform=${platform}`
    }

    if (searchKeyword) {
      endpoint = `${endpoint}&searchKeyword=${searchKeyword}`
    }
    return axios.get(endpoint)
  }

  addPromotion(_id, data) {
    return axios.post(`${this.jwtConfig.addPromotionEndpoint}${_id}`, data)
  }

  updatePromotion(_id, data) {
    return axios.put(`${this.jwtConfig.updatePromotionEndPoint}${_id}`, data)
  }

  deletePromotion(id) {
    return axios.delete(`${this.jwtConfig.deletePromotionEndPoint}${id}`)
  }

  getListPromotion(page, limit, appId, adFormat, screenId, searchKeyword = null, promotionId) {
    let endpoint = `${this.jwtConfig.getPromotionsListEndPoint}?page=${page}&limit=${limit}`

    if (adFormat) {
      endpoint = `${endpoint}&adFormat=${adFormat}`
    }

    if (appId) {
      endpoint = `${endpoint}&appId=${appId}`
    }

    if (screenId) {
      endpoint = `${endpoint}&screenId=${screenId}`
    }
    if (searchKeyword) {
      endpoint = `${endpoint}&searchKeyword=${searchKeyword}`
    }

    if (promotionId) {
      endpoint = `${endpoint}&promotionId=${promotionId}`
    }

    return axios.get(endpoint)
  }

  getAppSettings(_id, setting) {
    return axios.get(`${this.jwtConfig.getAppSettingsEndPoint}${_id}?setting=${setting}`)
  }

  updateAdSettings(id, data) {
    return axios.put(`${this.jwtConfig.updateAdSettingEndPoint}${id}`, data)
  }

  updateInAppSettings(id, data) {
    return axios.put(`${this.jwtConfig.inAppUpdateSettingEndPoint}${id}`, data)
  }

  sendPushNotification(_id, data) {
    return axios.post(`${this.jwtConfig.sendPushNotificationEndPoint}${_id}`, data)
  }

  resendPushNotification(id) {
    const endpoint = `${this.jwtConfig.resendPushNotificationEndPoint}${id}`
    return axios.post(endpoint)
  }

  deletePushNotification(id) {
    const endpoint = `${this.jwtConfig.deletePushNotificationEndPoint}${id}`
    return axios.delete(endpoint)
  }

  listNotifications(page, limit, appId, searchKeyword = null) {
    let endpoint = `${this.jwtConfig.listNotificationsEndPoint}?page=${page}&limit=${limit}`

    if (appId) {
      endpoint = `${endpoint}&appId=${appId}`
    }

    if (searchKeyword) {
      endpoint = `${endpoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endpoint)
  }
}
