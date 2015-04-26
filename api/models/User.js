/**
* User.js
*
* @description :: TODO
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true // only attributes in the model's attributes will be stored
  
  attributes: {

    username: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
    }

  }

};

