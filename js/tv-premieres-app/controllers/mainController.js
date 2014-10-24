app.controller("mainController", function($scope, $http){
    var apiKey = "43232be0b3972a27cbd7cf7208225b9f";
    $scope.init = function() {
        $scope.orderFields = ["Air Date", "Rating"];
        $scope.orderDirections = ["Descending", "Ascending"];
        $scope.orderField = "Air Date"; //Default order field
        $scope.orderReverse = "Descending"; //Default order field

        $scope.orderReverse = false;
        //API requires a start date
        var today = new Date();
        //analyse the result
        $scope.results = [];

        $scope.filterText = null;

        $scope.availableGenres = [];

        $scope.genreFilter = null;
        //Create the date string and ensure leading zeros if required
        var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
        console.log(apiDate)
        var responseData = function(){return $http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK')};
        responseData(apiKey).then(function(response) {
            console.log(response.data);
            //For each day, get all the episodes
            var data = response.data;
            angular.forEach(data, function(value, index){
                //The API stores the full date separately from each episode. Save it so we can use it later
                var date = value.date;
                //For each episodes, add it to the results array
                angular.forEach(value.episodes, function(tvshow, index){
                    //Create a date string from the timestamp so we can filter on it based on user text input
                    tvshow.date = date; //Attach the full date to each episode
                    $scope.results.push(tvshow);
                    //Loop through each genre for this episode
                    angular.forEach(tvshow.show.genres, function(genre, index){
                        //Only add to the availableGenres array if it doesn't already exist
                        var exists = false;
                        angular.forEach($scope.availableGenres, function(avGenre, index){
                            if (avGenre == genre) {
                                exists = true;
                            }
                        });
                        if (exists === false) {
                            $scope.availableGenres.push(genre);
                        }
                    });
                });
            });
            console.log($scope.results)
        }, function(reason) {
            alert('Failed: ' + reason);
        });

    };
    $scope.setGenreFilter = function (genre) {
        console.log(genre);
        $scope.genreFilter = genre;
    }
    $scope.customOrder = function (tvshow) {
        switch ($scope.orderField) {
            case "Air Date":
                return tvshow.episode.first_aired;
                break;
            case "Rating":
                return tvshow.episode.ratings.percentage;
                break;
        }
    };
});
app.filter('isGenre', function() {
    return function(input, genre) {
//        console.log(input);
//        console.log(genre);
        if (typeof genre == 'undefined' || genre == null) {
            return input;
        } else {
            var out = [];
            for (var a = 0; a < input.length; a++){
                for (var b = 0; b < input[a].show.genres.length; b++){
                    if(input[a].show.genres[b] == genre) {
                        out.push(input[a]);
                    }
                }
            }
            return out;
        }
    };
});
