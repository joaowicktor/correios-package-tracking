module.exports = {
  build: (success, message, data)  => {
      return { success, message, data }
  },
  error: (success, errorCode, message)=> {
      return { success, errorCode, message }
  }
}