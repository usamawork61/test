const mongoosePaginate = require("mongoose-paginate-v2")
const config = require("config")

mongoosePaginate.paginate.options = {
  lean: true,
  limit: config.defaultPageSize,
}

var paginate = mongoosePaginate

module.exports = paginate
