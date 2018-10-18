module.exports.routes = {  
  'post /signup': 'UserController.create',
  'post /login': 'AuthenticationController.login',  
  'patch /me/update-password': 'UserController.updatePassword',  
  'get /me': 'UserController.getLoggedUser',  
  'get /user/:id': 'UserController.getUserWithLikes',  
  'post /user/:id': 'LikesController.like',  
  'delete /user/:id': 'LikesController.unlike',
  'get /most-liked'  : 'UserController.getUsersOrderdByLikes'
};