import cookieStorage from 'libs/storage/cookie.js'

/**
 * sessionStorage
 * @param supportedSessionStorage {boolean} - 是否支援sessionStorage
 * @param isNewTab {boolean} - 是否為新開的tab
 * @param onSessionSync {boolean} - 是否正在同步sessionStorage
 */
class sessionStorage {
  constructor() {

    // 偵測sessionStorage是否能使用(safari私密模式禁用sessionStorage, sessionStorage)
    const _testProperty = Math.random()
    try {
      window.sessionStorage.setItem(_testProperty, _testProperty)
      window.sessionStorage.removeItem(_testProperty)
      this.supportedSessionStorage = true
    } catch (e) {
      this.supportedSessionStorage = false
      return
    }

    this.isNewTab = !window.sessionStorage.length
    this.onSessionSync = false
    this._requestSyncSessionStorage()
    this._listenLocalStorageChange()
  }

  /**
   * 取得cookie storage的全部資料
   * @return {object}
   */
  all() {
    return window.sessionStorage
  }

  /**
   * 取得sessionStorage的指定屬性
   * @param property {string} - 屬性名稱
   * @param json {boolean} - 是否轉成json格式
   * @return {object|string|null}
   */
  get(property, json = true) {
    try {
      let value = window.sessionStorage.getItem(property)
      if(typeof(value) != 'string') return null
      if(json) value = JSON.parse(value)
      return value
    }
    catch(e) {
      return null
    }
  }

  /**
   * 設定sessionStorage的指定數性
   * @param property {string} - 屬性名稱
   * @param value {any} - 設定的值
   * @param json {boolean} - 是否轉成json格式
   */
  set(property, value, json = true) {
    window.sessionStorage.setItem(property, JSON.stringify(value))
    this._syncSessionStorage()
  }

  /**
   * 刪除sessionStorage的指定屬性
   * @param property {string} - 屬性名稱
   */
  delete(property) {
    window.sessionStorage.removeItem(property)
    this._syncSessionStorage()
  }

  /**
   * 要求其他tab同步session到新開的tab(如果是新開的tab, 更動localStorage來觸發sessionStorage同步)
   * @private
   */
  _requestSyncSessionStorage() {
    if(!this.isNewTab) return
    window.localStorage.setItem('requestSyncSessionStorage', Math.random())
    window.localStorage.removeItem('requestSyncSessionStorage')
  }

  /**
   * 監聽localStorage更動事件
   * @private
   */
  _listenLocalStorageChange() {
    const self = this
    window.addEventListener('storage', (event) => {
      if(!event.newValue) return

      // 收到其他tab的sessionStorage同步請求, 開始同步
      if(event.key == 'requestSyncSessionStorage') {
        self._syncSessionStorage()
        return
      }

      // 新開的tab收到請求來的sessionStorage, 取出寫回sessionStorage
      if(event.key == 'sessionStorage' && !self.onSessionSync) {
        self.onSessionSync = true
        const _sessionStorageData = JSON.parse(event.newValue)
        window.sessionStorage.clear()
        for(const key in _sessionStorageData) {
          window.sessionStorage.setItem(key, _sessionStorageData[key])
        }
        self.onSessionSync = false

        // 廣播session更新事件
        window.dispatchEvent(new Event('sessionUpdate'))
      }
    }, false)
  }

  /**
   * 同步sessionStorage(先將整個sessionStorage存到localStorage, 再由接收到的tab取出寫入sessionStorage)
   * @private
   */
  _syncSessionStorage() {
    if(this.onSessionSync) return
    this.onSessionSync = true
    window.localStorage.setItem('sessionStorage', JSON.stringify(window.sessionStorage))
    window.localStorage.removeItem('sessionStorage')
    this.onSessionSync = false
  }
}

// 不支援sessionStorage時, 改用cookie storage
const generateStorage = () => {
  const _sessionStorage = new sessionStorage()
  if(_sessionStorage.supportedSessionStorage) return _sessionStorage
  return cookieStorage()
}

export default generateStorage()
