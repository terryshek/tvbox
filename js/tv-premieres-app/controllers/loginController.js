/**
 * Created by terryshek on 27/10/14.
 */
app.controller("loginController", function ($scope, $http, ngDialog) {
    $scope.user = {
        remember: false
    };
    $scope.submitForm = function (form) {
        console.log(form)
    }
});
