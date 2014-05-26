'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Link Schema
 */
var LinkSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    url: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
LinkSchema.path('url').validate(function(url) {
    return url.length;
}, 'URL cannot be blank');

/**
 * Statics
 */
LinkSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Link', LinkSchema);
