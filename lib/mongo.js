/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-9
 * Time: 上午10:58
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require("mongoose"),
    config=require('../config/config.js');
 mongoose.connect(config.MongodbConnectString);

exports.mongoose=mongoose;

