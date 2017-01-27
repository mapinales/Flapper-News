var app = angular.module("flapperNews", ["ui.router"]);

app.config([
"$stateProvider",
"$urlRouterProvider",

function($stateProvider, $urlRouterProvider) {
	$stateProvider.state("home", {
		url: "/home",
		templateUrl: "/home.html",
		controller: "MainCtrl"
	}).state("posts", {
		url: "/posts/{id}",
		templateUrl: "/posts.html",
		controller: "PostsCtrl"
	});
	
	$urlRouterProvider.otherwise("home");
}]);

app.factory("posts", [function(){
	var o = {
		posts: [
			{ id: 0, title: "post1", upvotes: 5, comments: [] },
			{ id: 1, title: "post2", upvotes: 2, comments: [
				{ author: "Bob", body: "Great idea, but everything is wrong!", upvotes: 0 }
			]},
			{ id: 2, title: "post3", upvotes: 15, comments: [] },
			{ id: 3, title: "post4", upvotes: 9, comments: [] },
			{ id: 4, title: "post5", upvotes: 4, comments: [] }
		]
	};
	return o;
}]);

app.controller("MainCtrl", [
"$scope",
"posts",

function($scope, posts) {
	$scope.posts = posts.posts;
	
	$scope.addPost = function(){
		if (!$scope.title || $scope.title === "") { return; }
		$scope.posts.push({
			id: $scope.posts.length,
			title: $scope.title,
			link: $scope.link,
			upvotes: 0, 
			comments: [
				{ author: "Joe", body: "Cool post!", upvotes: 0 },
				{ author: "Bob", body: "Great idea, but everything is wrong!", upvotes: 0 }
			]
		})
		$scope.title = "";
		$scope.link = "";	
	};
	
	$scope.incrementUpvotes = function(post) {
		post.upvotes++;
	}
}]);

app.controller("PostsCtrl", [
"$scope",
"$stateParams",
"posts",
	
function($scope, $stateParams, posts) {
	$scope.post = posts.posts[$stateParams.id];
	
	$scope.addComment = function() {
		if ($scope.body === "") { return; }
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body = "";
	}
	
	$scope.incrementUpvotes = function(comment) {
		comment.upvotes++;
	}
}]);