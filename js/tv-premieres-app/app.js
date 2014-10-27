var app = angular.module('TVPremieresApp', ['ngRoute', 'ngDialog', 'ngCookies']);
// configure our routes
app.config(function ($routeProvider) {
    $routeProvider

        // route for the login page
        .when('/login', {
            templateUrl: 'tpl/login.html',
            controller: 'loginController'
        })

        // route for the about page
        .when('/about', {
            templateUrl: 'tpl/tvShow.html',
            controller: 'mainController'
        });
});