angular.module('flapperNews')
  .controller('MainCtrl', ['$scope', 'posts', 'auth', function($scope, posts, auth){    
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.posts = posts.posts;
    
    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') { return; }
      posts.create({
        title: $scope.title,
        link: $scope.link,
        author: auth.currentUser
      });
      $scope.title = '';
      $scope.link = '';
    };
    
    $scope.incrementUpvotes = function(post) {
      posts.upvote(post);
    };
  }]);