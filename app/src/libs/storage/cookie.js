class cookie {
  constructor() {
    this.cookie = {}

    // cookie storage的名稱
    this.storageItemName = 'cookieStorage'
    this.init()
  }

  /**
   * 初始化cookie storage
   */
  init() {
    if(document.cookie.trim() == '') return

    const _cookies = decodeURI(document.cookie).split(`${this.storageItemName}=`)[1]
    try {
      this.cookie = JSON.parse(_cookies)
    } catch (e) {
      this.cookie = {}
    }
  }

  /**
   * 取得cookie storage的全部資料
   * @return {object}
   */
  all() {
    return this.cookie
  }

  /**
   * 取得cookie storage的指定屬性
   * @param property {string} - 屬性名稱
   * @param json {boolean} - 是否轉成json格式
   * @return {object|string|null}
   */
  get(property, json = true) {

    if(document.cookie.trim() == '') return null
    let result = this.cookie[property]
    if(!result) return null
    return result
  }

  /**
   * 設定cookie storage的指定數性
   * @param property {string} - 屬性名稱
   * @param value {any} - 設定的值
   */
  set(property, value) {
    this.cookie[property] = value
    this._write()
  }

  /**
   * 刪除cookie storage的指定屬性
   * @param property {string} - 屬性名稱
   */
  delete(property) {
    delete this.cookie[property]
    this._write()
  }

  /**
   * 將cookie storage的更變寫入cookie中
   * @private
   */
  _write() {
    document.cookie = `${this.storageItemName}=${encodeURI(JSON.stringify(this.cookie))}`
  }
}

export default () => {
  return new cookie()
}