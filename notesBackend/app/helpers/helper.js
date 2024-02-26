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

const getTemplate = (type, data) => {
  switch (type) {
    case "addReview":
      return reviewEmail(data)

    default:
      break
  }
}

function sendEmail(to, type, data) {
  let mailOptions = {
    from: config.email,
    to: "usama@adziv.com",
    subject: data?.emailData?.subject ?? "Quoli Email",
    text: null,
    html: getTemplate(type, data),
  }
  console.log("mailOptions", getTemplate(type, data))
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log("err", err)
    else console.log("info", info)
  })
}
function getAverageRating(reviewStats, totalDocs) {
  let sum = 0
  reviewStats?.map((item) => {
    sum += item._id * item.count
  })
  console.log("sum", reviewStats)
  console.log("totalDocs", totalDocs)
  console.log(
    "sum",
    isNaN((sum / totalDocs).toFixed(1) || 0)
      ? 0
      : (sum / totalDocs).toFixed(1) || 0
  )
  return isNaN((sum / totalDocs).toFixed(1) || 0)
    ? 0
    : isFinite((sum / totalDocs).toFixed(1) || 0)
    ? (sum / totalDocs).toFixed(1) || 0
    : 0
}

function getRating(rating, reviewStats, totalDocs) {
  const value = isNaN(
    parseFloat(
      ((reviewStats?.filter((item) => item._id == rating)[0]?.count ?? 0) /
        totalDocs) *
        100
    )
  )
    ? 0
    : parseFloat(
        ((reviewStats?.filter((item) => item._id == rating)[0]?.count ?? 0) /
          totalDocs) *
          100
      )?.toFixed(2)
  return value
}
module.exports = {
  encryptData,
  decryptData,
  sendEmail,
  getAverageRating,
  getRating,
}
