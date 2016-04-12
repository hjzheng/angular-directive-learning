/**
 * Created by hjzheng on 16/4/11.
 */

angular.module("app", []);

angular.module("app").controller("MainCtrl", function($scope){

});

angular.module("app").controller("myDirectiveCtrl", function($scope){
    $scope.ctrl = "This is a controller by angular module";
});

// function myDirectiveCtrl($scope){
//     $scope.ctrl = "This is a controller by angular module";
// });

angular.module("app").directive("myDirective", function(){
    return {
        template: "{{ctrl}}",
        controller: "myDirectiveCtrl"
    }
});


angular.module("app").directive("myParent", function(){
    return {
        restrict: "E",
        controller: function () {
            console.log("myParent controller");
        },
        link: {
            pre: function () {
                console.log("myParent prelink");
            },

            post: function () {
                console.log("myParent postlink");
            }

        }
    } 
});

angular.module("app").directive("myChild", function(){
    return {
        restrict: "E",
        controller: function () {
            console.log("myChild controller");
        },
        link: {
            pre: function () {
                console.log("myChild prelink");
            },

            post: function () {
                console.log("myChild postlink");
            }

        }
    }
});

angular.module("app").directive("myTabs", function(){
    return {
        restrict: "E",
        templateUrl: "myTabs.html",
        transclude: true,
        controllerAs: "myTabsCtrl",
        controller: function ($scope) {
            $scope.tabs = [];

            $scope.selectTab = function(tab) {
                $scope.tabs.forEach(function(t){
                    t.selected = false;
                })
                tab.selected = true;
            }

            this.pushTab = function(tab) {
                $scope.tabs.push(tab);
                if($scope.tabs.length === 1){
                    tab.selected = true;
                }
            }
        }
    }
});

angular.module("app").directive("myTab", function(){
    return {
        scope: {
            label: "@"
            //selected: "@"
        },
        restrict: "E",
        transclude: true,
        require: "^myTabs",
        templateUrl: "myTab.html",
        link: function (scope, iEle, iAttr, myTabsCtrl) {
            //scope.selected = (scope.selected === "true");
            myTabsCtrl.pushTab(scope);
        }
    }
})

/*
* Nested Directive
*
* 1.设置controller
*
* 你可以用匿名函数给赋值给controller属性, 也可以用 angular module 的 controller 方法去声明函数, 然后将函数名赋值给controller属性,
* 也可以使用命名函数单独声明, 这个我注释掉了
* 后者, 使你的controller从指令定义中脱离出来, 一般不建议使用.
*
* controllerAs
* bindToController
*
* 使用这两者的好处, 是让 controller 解耦
* http://plnkr.co/edit/558TIc4lYn6ph4YmLiHb?p=preview
*
* 2.preLink and postLink 方法
*
* 注意, 它们的执行顺序, 使用上面的 myParent 和 myChild 指令进行测试
*
* myParent controller
* myParent prelink
* myChild controller
* myChild prelink
* myChild postlink
* myParent postlink
*
* 3.require 属性
*
* (no prefix) - Locate the required controller on the current element. Throw an error if not found.
* ? - Attempt to locate the required controller or pass null to the link fn if not found.
* ^ - Locate the required controller by searching the element and its parents. Throw an error if not found.
* ^^ - Locate the required controller by searching the element's parents. Throw an error if not found.
* ?^ - Attempt to locate the required controller by searching the element and its parents or pass null to the link fn if not found.
* ?^^ - Attempt to locate the required controller by searching the element's parents, or pass null to the link fn if not found.
*
* 4.练习 tab
*
* */