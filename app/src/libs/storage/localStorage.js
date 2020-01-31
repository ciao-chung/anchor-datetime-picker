import cookieStorage from 'libs/storage/cookie.js'

/**
 * localStorage
 * @param supportedSessionStorage {boolean} - 是否支援sessionStorage
 */
class localStorage {
  constructor() {
    // 偵測localStorage是否能使用(safari私密模式禁用localStorage, sessionStorage)
    const _testProperty = Math.random()
    try {
      window.localStorage.setItem(_testProperty, _testProperty)
      window.localStorage.removeItem(_testProperty)
      this.supportedLocalStorage = true
    } catch (e) {
      this.supportedLocalStorage = false
      return
    }
  }

  /**
   * 取得cookie storage的全部資料
   * @return {object}
   */
  all() {
    return window.localStorage
  }

  /**
   * 取得localStorage的指定屬性
   * @param property {string} - 屬性名稱
   * @param json {boolean} - 是否轉成json格式
   * @return {object|string|null}
   */
  get(property) {
    try {
      let value = window.localStorage.getItem(property)
      if(typeof(value) != 'string') return null
      return JSON.parse(value)
    }
    catch(e) {
      return null
    }
  }

  /**
   * 設定localStorage的指定數性
   * @param property {string} - 屬性名稱
   * @param value {any} - 設定的值
   * @param json {boolean} - 是否轉成json格式
   */
  set(property, value) {
    window.localStorage.setItem(property, JSON.stringify(value))
  }

  /**
   * 刪除localStorage的指定屬性
   * @param property {string} - 屬性名稱
   */
  delete(property) {
    window.localStorage.removeItem(property)
  }
}

// 不支援localStorage時, 改用cookie storage
const generateStorage = () => {
  const _localStorage = new localStorage()
  if(_localStorage.supportedLocalStorage) return _localStorage
  return cookieStorage()
}

export default generateStorage()
