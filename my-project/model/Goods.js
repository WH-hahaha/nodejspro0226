var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Goods = new Schema({
    goods_Id     : Number,
    goods_Number : String,
    goods_name   : String,
    price        : String,
    putaway		 : Boolean,
    boutique	 : Boolean,
    goods_new    : Boolean,
    goods_hot    : Boolean,
    goods_sort   : Number,
    repertory    : Number,
    virtualsale  : Number,
    imgPath      : String,
    indate		 : Number,
    create_date: { type: Date, default: Date.now }
});
// 创建model对象
var GoodsModel = mongoose.model('goods', Goods);
// 公开对象，暴露接口
module.exports = GoodsModel;