/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	new: function (req, res) {
    return res.view();
  },

  create: function (req, res) {
  	var params = req.allParams();
    var newUser = {
      username: params['username'],
      email: params['email'],
      password: params['password']
    }
    User.create(newUser, function (err, user) {
      if (err) return res.redirect('/user/new');
      if (!user) return res.negotiate(err);
      req.session.authenticated = true;
      req.session.user = user;
      return res.redirect('/user/show/' + user.id);
    });
  },

  show: function (req, res) {
    User.findOne(req.params["id"], function (err, user) {
      if (err) res.negotiate(err);
      if (!user) res.negotiate(err);
      return res.view({user: user});
    });
  },

  index: function (req, res) {
    User.find(function (err, users) {
      if (err) res.negotiate(err);
			return res.view({users: users});
    });
  },

  edit: function (req, res) {
    User.findOne(req.params["id"], function (err, user) {
      if (err) res.negotiate(err);
      if (!user) res.negotiate(err);
      return res.view({user: user});
    });
  },

  update: function (req, res) {
    var params = req.allParams();
    var userId = req.params['id'];
    var updUser = {
      username: params['username'],
      email: params['email']
    }
    User.update(userId, updUser, function (err) {
      if (err) return res.redirect('/user/edit/' + userId);
      return res.redirect('/user/show/' + userId);
    });
  },

  destroy: function (req, res) {
    User.destroy(req.params["id"], function (err) {
      if (err) return res.negotiate(err);
      return res.redirect('/users');
    });
  }

};

