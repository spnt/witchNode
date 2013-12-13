/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-9
 * Time: 上午10:58
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require("mongoose"),
    config=require('../config');
 mongoose.connect('mongodb://192.168.1.207:10000/rrest');//config.MongodbConnectString

exports.mongoose=mongoose;

