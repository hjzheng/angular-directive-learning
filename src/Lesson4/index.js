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
        }
    }
});
/*
* 1. 隔离scope中的传参
*
* 传递字符串 @
*
* 传入一个简单的值 @传入字符串，如果是boolean，需要自己转换 下面的方法不错
* $scope.isCollapsed = ($scope.collapsed === "true");
*
* 传递对象 =
*
* 传递函数 &
*
* */