/**
 * SessionController
 *
 * @description :: Server-side logic for managing session
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  create: function(req, res) {
  	var params = req.allParams();
  	var user = {
  		username: params['username'],
  		password: params['password'],
  	};
  	User.findOne(user, function findUser(err, user) {
  		if (err) return res.negotiate(err);
  		if (!user) return res.redirect('/');
      req.session.authenticated = true;
  		req.session.user = user;
  		return res.redirect('/user/show/' + user.id);
  	});
  },

  destroy: function(req, res) {
    req.session.authenticated = false;
  	delete req.session.user;
  	return res.redirect('/');
  }

};

