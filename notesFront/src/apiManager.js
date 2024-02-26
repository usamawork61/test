export default class ApiManager {
  static POST = "POST"
  static GET = "GET"
  static DELETE = "DELETE"
  static PUT = "PUT"
  static PATCH = "PATCH"
  // static singleton = null;

  //returns instance of this class
  static getInstance() {
    if (ApiManager.singleton == null) {
      ApiManager.singleton = new ApiManager()
    }
    return ApiManager.singleton
  }

  //Use this function to make post calls to the server
  post = (endpoint, body) => {
    return new Promise((resolve, reject) => {
      let endpointUrl = this.generateEndpointUrl(endpoint)
      this._callServer(endpointUrl, body, ApiManager.POST)
        .then((json) => {
          resolve(json)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  //Use this function to make get calls to the server
  get = (endpoint, params) => {
    return new Promise((resolve, reject) => {
      let endpointUrl =
        this.generateEndpointUrl(endpoint) + this.convertToGetParams(params)
      this._callServer(endpointUrl, null, ApiManager.GET)
        .then((json) => {
          resolve(json)
        })

        .catch((error) => {
          reject(error)
        })
    })
  }

  //Use this function to make put calls to the server
  put = (endpoint, body) => {
    return new Promise((resolve, reject) => {
      let endpointUrl = this.generateEndpointUrl(endpoint)
      this._callServer(endpointUrl, body, ApiManager.PUT)
        .then((json) => {
          resolve(json)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  patch = (endpoint, body) => {
    return new Promise((resolve, reject) => {
      let endpointUrl = this.generateEndpointUrl(endpoint)
      this._callServer(endpointUrl, body, ApiManager.PATCH)
        .then((json) => {
          resolve(json)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  //Use this function to make delete calls to the server
  delete = (endpoint, body) => {
    return new Promise((resolve, reject) => {
      let endpointUrl = this.generateEndpointUrl(endpoint)
      this._callServer(endpointUrl, body, ApiManager.DELETE)
        .then((json) => {
          resolve(json)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  generateEndpointUrl = (endpoint) => {
    return "http://localhost:5001/api" + endpoint
  }

  //convert object to GET params
  convertToGetParams = (params) => {
    let getParams = ""
    for (var key in params) {
      if (getParams != "") {
        getParams += "&"
      }
      getParams += key + "=" + params[key]
    }
    return "?" + getParams
  }

  //Make the actual call to server here. this should not be called from outside this class
  _callServer = (endpoint, body = null, method = ApiManager.GET) => {
    console.log("Endpoint: ", endpoint)

    //check if this api is called before login and is one of api with/without login

    return new Promise((resolve, reject) => {
      let headers = {}
      const lastSegment = endpoint.split("/").pop()
      //if token is present then qomie_session_id will be there already
      console.log("last", lastSegment)
      console.log(this.token)
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      }

      console.log("headers: ", headers)

      fetch(endpoint, {
        method: method,
        headers: headers,
        mode: "cors",
        body: body !== null ? JSON.stringify(body) : null,
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("json in fetch: ", endpoint, json)
          if (
            json.message === "1003" ||
            json.message === "1004" ||
            json.message === 5014 ||
            json.message === 5067
          ) {
            reject(json.message)
          } else if (
            json.message === "Unauthenticated." ||
            json.message === "Unauthenticated"
          ) {
            reject({ message: "Unauthenticated" })
          } else resolve(json)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  // encryptData(data) {
  //   var words = CryptoJS.enc.Utf8.parse(data) // WordArray object
  //   var base64 = CryptoJS.enc.Base64.stringify(words) // string: 'SGVsbG8gd29ybGQ='
  //   return base64
  //     ?.toString()
  //     ?.replace("+", "xMl3Jk")
  //     ?.replace("/", "Por21Ld")
  //     ?.replace("=", "Ml32")
  // }

  //sets the token in the sessio
}
