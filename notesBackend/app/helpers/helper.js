const config = require("config")
// const crypto = require("crypto")
const nodemailer = require("nodemailer")
const { reviewEmail } = require("./emails")
const CryptoJS = require("crypto-js")
// EMAIL SERVICES //
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email,
    pass: config.password,
  },
})

function encryptData(data) {
  var words = CryptoJS.enc.Utf8.parse(JSON.stringify(data)) // WordArray object
  var base64 = CryptoJS.enc.Base64.stringify(words) // string: 'SGVsbG8gd29ybGQ='
  return base64
    ?.toString()
    ?.replace("+", "xMl3Jk")
    ?.replace("/", "Por21Ld")
    ?.replace("=", "Ml32")
}

function decryptData(data) {
  data = data
    ?.toString()
    ?.replace("xMl3Jk", "+")
    ?.replace("Por21Ld", "/")
    ?.replace("Ml32", "=")
  var words = CryptoJS.enc.Base64.parse(data)
  var decryptedString = CryptoJS.enc.Utf8.stringify(words)

  if (decryptedString) {
    decryptedString = JSON.parse(decryptedString)
  }
  console.log("dec===>", decryptedString)
  return decryptedString
}
module.exports = {
  encryptData,
  decryptData,
}
