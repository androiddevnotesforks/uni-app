import { defineSyncApi } from '@dcloudio/uni-api'
import deviceId from '../../../helpers/uuid'
import { getBrowserInfo } from '../base/getBrowserInfo'
import { getWindowInfo } from './getWindowInfo'
import { extend } from '@vue/shared'

let browserInfo: ReturnType<typeof getBrowserInfo>
let _initBrowserInfo = true

function initBrowserInfo() {
  if (!_initBrowserInfo) return
  browserInfo = getBrowserInfo()
}
export const getDeviceInfo = defineSyncApi<typeof uni.getDeviceInfo>(
  'getDeviceInfo',
  () => {
    initBrowserInfo()
    const { deviceBrand, deviceModel, brand, model, platform, system } =
      browserInfo

    return {
      deviceBrand,
      deviceModel,
      brand,
      model,
      system,
      platform,
    }
  }
)
export const getAppBaseInfo = defineSyncApi<typeof uni.getAppBaseInfo>(
  'getAppBaseInfo',
  () => {
    initBrowserInfo()
    const { theme, browserName, browseVersion, language } = browserInfo

    return {
      SDKVersion: '',
      hostSDKVersion: '',
      enableDebug: false,
      hostPackageName: '',
      hostFontSizeSetting: undefined,
      language,
      hostName: browserName,
      hostVersion: browseVersion,
      hostTheme: theme,
      hostLanguage: language,
      theme,
      appId: __uniConfig.appId,
      appName: __uniConfig.appName,
      appVersion: __uniConfig.appVersion,
      appVersionCode: __uniConfig.appVersionCode,
      appLanguage: uni.getLocale(),
      version: __uniConfig.appVersion,
    }
  }
)

/**
 * 获取系统信息-同步
 */
export const getSystemInfoSync = defineSyncApi<typeof uni.getSystemInfoSync>(
  'getSystemInfoSync',
  () => {
    if (__NODE_JS__) {
      //TODO 临时搞一下配合 uniCloud 测试
      return {
        deviceId: Date.now() + '' + Math.floor(Math.random() * 1e7),
        platform: 'nodejs',
      } as unknown as UniApp.GetSystemInfoResult
    }

    _initBrowserInfo = true
    initBrowserInfo()
    _initBrowserInfo = false
    const windowInfo = getWindowInfo()
    const deviceInfo = getDeviceInfo()
    const appBaseInfo = getAppBaseInfo()
    _initBrowserInfo = true

    const {
      ua,
      deviceType,
      browserName,
      browseVersion,
      osname,
      osversion,
      deviceOrientation,
    } = browserInfo
    const { pixelRatio } = windowInfo

    const systemInfo: UniApp.GetSystemInfoResult = extend(
      windowInfo,
      deviceInfo,
      appBaseInfo,
      {
        ua,
        deviceType,
        browserName,
        browseVersion,
        deviceId: deviceId(),
        devicePixelRatio: pixelRatio,
        deviceOrientation,
        uniPlatform: 'web',
        uniCompileVersion: __uniConfig.compilerVersion,
        uniRuntimeVersion: __uniConfig.compilerVersion,
        fontSizeSetting: appBaseInfo.hostFontSizeSetting,
        osName: osname!.toLocaleLowerCase(),
        osVersion: osversion,
        osLanguage: undefined,
        osTheme: undefined,
      }
    )

    delete (systemInfo as any).screenTop
    delete (systemInfo as any).enableDebug
    delete (systemInfo as any).theme

    return systemInfo
  }
)
