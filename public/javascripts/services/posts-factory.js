angular.module('flapperNews')

.factory('posts', ['$http', 'auth', function($http, auth){
    var news = {
      posts: []
    };

    news.getAll = function(){
      return $http.get('/posts').success(function(data){
      angular.copy(data, news.posts);
      });
    };
    
    news.create = function(post) {
      return $http.post('/posts', post,
      {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .success(function(data){
          news.posts.push(data);
      });
    };

    news.upvote = function(post) {
      return $http.put('/posts/' + post._id + '/upvote', null,
      {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .success(function(data){
        post.upvotes += 1;
      });
    };
    
    news.get = function(id) {
      return $http.get('/posts/' + id).then(function(res){
        return res.data;
      });
    };
    
    news.addComment = function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment, 
      {headers: {Authorization: 'Bearer '+auth.getToken()}});
    };
    
    news.upvoteComment = function(post, comment) {
      return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null,
      {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .success(function(data){
        comment.upvotes += 1;
      });
    };

    return news;
  }]);