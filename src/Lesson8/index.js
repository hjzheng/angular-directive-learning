/**
 * Created by hjzheng on 16/4/11.
 */

angular.module("app", []);

angular.module("app").controller("MainCtrl", function($scope){
    $scope.message = "this is a message";
    $scope.answers = {
        place: "China",
        name: "harry",
        likeAngular: "true",
        likeBaby: "true"
    }
    console.log("Main Ctrl: ");
    console.log($scope);
});

angular.module("app").controller("InnerCtrl", function($scope){
    console.log("Inner Ctrl: ");
    console.log($scope);
});

angular.module("app").directive("displayBox", function(){
    return {
        restrict: "E",
        templateUrl: "displayBox.html",
        controller: function ($scope) {
            $scope.hidden = false;
            $scope.close = function(){
                $scope.hidden = true;
            }

            $scope.message = "message in directive";

            console.log("displayBox : ");
            console.log($scope);
        },
        scope: true,
        transclude: true
    }
});

angular.module("app").directive("myQuestion", function () {
    return {
        restrict: "E",
        scope: {
            q: "@"
        },
        templateUrl: "question.html",
        transclude: true
    }
})

/*
* Transclusion
*
* 1. first transclusion directive displayBox
*
* > 注意, 请将 transclude 设置成 true
*
* 2. transclusion 与 scope,
*
* > 注意 本例中,虽然说 displayBox 指令与 MainCtrl 是继承 scope 的关系, 但是指令的controller中的 message 变量, 却无法遮住 MainCtrl 中的
*  message 变量, 也就是说 ng-transclude 内部 scope, 直接指向外层的 MainCtrl 的 scope
*
* 3. demo myQuestion directive
*
* > 注意, 我们在外层使用了对象, 为了防止直接在scope上定义所产生的覆盖
* */