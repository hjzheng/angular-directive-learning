/**
 * Created by hjzheng on 16/4/11.
 */

angular.module("app", []);

angular.module("app").controller("MainCtrl", function($scope, $log){
    $scope.user1 = {
        name: "hjzheng",
        address: {
            street: "ming jie road No.1",
            city: "xi'an",
            country: "China"
        },
        friends: [
            'huiming',
            'yangfang',
            'wenbo'
        ]
    }

    $scope.user2 = {
        name: "hjzheng",
        address: {
            street: "ming jie road No.1",
            city: "xi'an",
            country: "China"
        },
        friends: [
            'huiming',
            'yangfang',
            'wenbo'
        ]
    }

    $scope.log = function(){
        $log.info("do some thing when pane is collapsed!");
        console.log("do some thing when pane is collapsed!");
    }

    console.log($scope);

});


angular.module("app").directive("userCardInfo", function(){
    return {
        scope: {
            user: "=",
            collapsed: "@",
            afterCollapse: "&method"
        },
        templateUrl: "userCardInfo.html",
        restrict: 'E',
        controller: function($scope){

            $scope.isCollapsed = ($scope.collapsed === "true");

            $scope.knightMe = function(){
                $scope.user.rank = "Knight";
            }

            $scope.collapse = function(){
                $scope.isCollapsed = !$scope.isCollapsed;
                if($scope.isCollapsed) {
                    $scope.afterCollapse();
                }
            }

            console.log($scope);

            $scope.removeFriend = function(f){
                var index = $scope.user.friends.indexOf(f);
                $scope.user.friends.splice(index, 1);
            }
        }
    }
});

angular.module("app").directive("address", function () {
    return {
        scope: true,
        templateUrl: "address.html",
        restrict: "E",
        controller: function ($scope) {
            $scope.isAddressCollapsed = false;

            $scope.addressOpen = function(){
                $scope.isAddressCollapsed = true;
            }

            $scope.addressClose = function(){
                $scope.isAddressCollapsed = false;
            }
        }
    };
});

angular.module("app").directive("removeFriend", function () {
    return {
        scope: {
            method: "&"
        },
        templateUrl: "friend.html",
        restrict: "E",
        controller: function ($scope) {
            $scope.removeReady = false;
            $scope.removing = function(){
                $scope.removeReady = true;
            }
            $scope.cancel = function(){
                $scope.removeReady = false;
            }

            $scope.remove = function(){
                $scope.method();
            }
        }
    };
});
/*
* 进行重构 1
* 添加 address 指令
*
* 进行重构 2
* 添加 removeFriend 指令
* */