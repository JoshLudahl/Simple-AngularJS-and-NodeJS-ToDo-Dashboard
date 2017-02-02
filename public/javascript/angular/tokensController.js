angular.module('tokens', []).controller('tokenCtrl', function($scope){
   $scope.admin_name = "Jo";

    $scope.links = [
        {
            site: "Pandora",
            url: "http://www.pandora.com"
        },
        {
            site: "Crunchy Roll",
            url: "http://www.crunchyroll.com/"
        },
        {
            site: "Spotify",
            url: "http://www.spotify.com/"
        },
        {
            site: "",
            url: ""
        },
        {
            site: "Gmail",
            url: "https://www.gmail.com"
        },
        {
            site: "Kiss Anime",
            url: "https://www.kissanime.to"
        }
        ,
        {
            site: "Facebook",
            url: "https://www.facebook.com"
        }
        ,
        {
            site: "Twitter",
            url: "https://www.twitter.com"
        }
    ]
});