import {
  GET_SETTINGS_FAILURE,
  GET_SETTINGS_INITIATE,
  GET_SETTINGS_SUCCESS,
  IN_APP_UPDATE_SETTINGS_FAILURE,
  IN_APP_UPDATE_SETTINGS_INITIATE,
  IN_APP_UPDATE_SETTINGS_SUCCESS,
  RESET_UPDATE_AD_SETTINGS,
  UPDATE_AD_SETTINGS_FAILURE,
  UPDATE_AD_SETTINGS_INITIATE,
  UPDATE_AD_SETTINGS_SUCCESS
} from '../../actions/ActionTypes/appSettings'

export const updateAdSettingsReducers = (state = {}, action) => {
  switch (action.type) {
    case GET_SETTINGS_INITIATE:
      return { ...state, inProcess: true }
    case GET_SETTINGS_SUCCESS:
      return { ...state, inProcess: false, fetchAppSettings: action.payload, error: null }
    case GET_SETTINGS_FAILURE:
      return { ...state, inProcess: false, fetchAppSettings: null, error: action.payload }

    case UPDATE_AD_SETTINGS_INITIATE:
      return { ...state, inProcess: true }
    case UPDATE_AD_SETTINGS_SUCCESS:
      return { ...state, inProcess: false, Ad: action.payload, error: null }
    case UPDATE_AD_SETTINGS_FAILURE:
      return { ...state, inProcess: false, Ad: {}, error: action.payload }

    case IN_APP_UPDATE_SETTINGS_INITIATE:
      return { ...state, inProcess: true }
    case IN_APP_UPDATE_SETTINGS_SUCCESS:
      return { ...state, inProcess: false, inAppUpdate: action.payload, error: null }
    case IN_APP_UPDATE_SETTINGS_FAILURE:
      return { ...state, inProcess: false, inAppUpdate: false, error: action.payload }

    case RESET_UPDATE_AD_SETTINGS:
      return {}

    default:
      return state
  }
}
