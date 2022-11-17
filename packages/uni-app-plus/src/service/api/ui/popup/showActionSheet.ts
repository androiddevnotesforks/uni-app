import {
  API_TYPE_SHOW_ACTION_SHEET,
  API_SHOW_ACTION_SHEET,
  ShowActionSheetProtocol,
  ShowActionSheetOptions,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { extend } from '@vue/shared'
import { initI18nShowActionSheetMsgsOnce, useI18n } from '@dcloudio/uni-core'

const ACTION_SHEET_THEME: Record<UniApp.ThemeMode, { itemColor: string }> = {
  light: {
    itemColor: '#000000',
  },
  dark: {
    itemColor: 'rgba(255, 255, 255, 0.8)',
  },
}

export const showActionSheet = defineAsyncApi<API_TYPE_SHOW_ACTION_SHEET>(
  API_SHOW_ACTION_SHEET,
  ({ itemList = [], itemColor, title = '', popover }, { resolve, reject }) => {
    // #000 by default in protocols
    if (itemColor === '#000') {
      itemColor =
        ACTION_SHEET_THEME[plus.navigator.getUIStyle() as UniApp.ThemeMode]
          .itemColor
    }
    initI18nShowActionSheetMsgsOnce()
    const { t } = useI18n()
    const options = {
      title,
      cancel: t('uni.showActionSheet.cancel'),
      buttons: itemList.map((item) => ({
        title: item,
        color: itemColor,
      })),
    }
    plus.nativeUI.actionSheet(
      extend(options, {
        popover,
      }),
      (e) => {
        if (e.index > 0) {
          resolve({
            tapIndex: e.index - 1,
          })
        } else {
          reject('showActionSheet:fail cancel')
        }
      }
    )
  },
  ShowActionSheetProtocol,
  ShowActionSheetOptions
)
