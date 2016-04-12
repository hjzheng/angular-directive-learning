/**
 * Created by hjzheng on 16/4/11.
 */

angular.module("app", []);

angular.module("app").controller("MainCtrl", function($scope){

    $scope.messages = [];

    $scope.log = function(evt){
        console.log(evt);
        $scope.messages.push("paused");
        console.log("video paused");
    }

    $scope.clickHandler = function(){
        console.log("clicked");
    }

    $scope.size = 100;
});

//这种方式肯定是不好的, 等于使用了isolate scope
// angular.module("app").directive("eventPause", function(){
//     return {
//         restrict: "A",
//         scope: {
//             eventPause: "&"
//         },
//         link: function(scope, iElement, iAttrs){
//             iElement.on("pause", function (evt) {
//                scope.$apply(function(){
//                    scope.eventPause();
//                })
//             });
//         }
//     }
// });


//使用$parse 和 iAttr

angular.module("app").directive("eventPause", function($parse){
    return {
        restrict: "A",
        link: function(scope, iElement, iAttrs){
            var fn = $parse(iAttrs["eventPause"]);
            iElement.on("pause", function (event) {
               scope.$apply(function(){
                   //第二个参数,相当于对fn进行传参
                   fn(scope, {evt: event});
               })
            });
        }
    }
});


angular.module("app").directive("spacebarSupport", function(){
    return {
      restrict: "A",
      link: function(scope, iElement, iAttrs){
        $('body').on("keypress", function(evt){
            var vidEl = iElement[0];
            if(evt.keyCode === 32){
                if(vidEl.paused){
                    vidEl.play();
                }else{
                    vidEl.pause();
                }
            }
        });
      }
    };
});

angular.module("app").directive('myClick', function($parse){
    return {
        link: function(scope, iElement, iAttr){
            var fn = $parse(iAttr["myClick"]);
            iElement.on("click", function(event){
               scope.$apply(function(){
                    fn(scope, {evt: event});
               });
            });
        }
    };
});

angular.module("app").directive("scaleFont", function(){
    return {
        link: function (scope, iElement, iAttr) {
            var expression = iAttr["scaleFont"];
            scope.$watch(expression, function(newVal, oldVal){
                iElement.css("font-size", newVal + "%");
            });
        }
    }
});

/*
*
* decorator directive
*
* 1. The link function
*
* link: function postLink(scope, iElement, iAttrs, controller) { ... }
*
* 注意,不要使用isolate scope, 使用 iAttr 和 $parse 方式来进行参数传递
* 另外 注意fn的参数传递
*
* 2. recreate ng-click
*
*
* 3. use $watch, Example scale font
* */