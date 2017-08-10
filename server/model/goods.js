
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Goods', new Schema({
	"productId": String,
	"productName": String,
	"salePrice": Number,
	"productImage": String,
	"productUrl": String
}));

