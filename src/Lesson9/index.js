/**
 * Created by hjzheng on 16/4/11.
 */

angular.module("app", []);

angular.module("app").controller("MainCtrl", function($scope){
    $scope.nums = [2, 3, 6];

    $scope.items = [
        {name: "hurry"},
        {name: "king"}
    ];
    $scope.add =  function(){
        $scope.items.push({name: 'Test'});
    }
    $scope.remove = function(){
        $scope.items.length --;
    }
});

angular.module("app").directive("myTransclude", function(){
    return {
        restrict: "E",
        transclude: "element",
        link: function (scope, iEle, iAttr, ctrl, transclude) {
            transclude(scope, function(clone, scope){
               iEle.after(clone);
            });
        }
    }
});

angular.module("app").directive("myLazyRender", function () {
    return {
        restrict: "A",
        transclude: "element",
        priority: 1200,
        link: function(scope, iEle, iAttr, ctrl, transclude){
            var hasBeenShown = false;
            var unwatcher = scope.$watch(iAttr["myLazyRender"], function (newVal) {
                if(newVal && !hasBeenShown){
                    hasBeenShown = true;
                    transclude(scope, function(clone){
                       iEle.after(clone);
                    });
                    unwatcher();
                }
            });
        }
    }  
});

angular.module('app').directive("myRepeat", function() {
    return {
        restrict: 'A',
        transclude: 'element',
        link: function(scope, ele, attrs, ctrl, transclude) {
            var pieces = attrs['myRepeat'].split(' ');
            var stringItem = pieces[0];
            var collectionName = pieces[2];
            var elements = [];

            scope.$watchCollection(collectionName, function(collection){

                if(elements.length > 0) {
                    for(var i=0; i<elements.length; i++) {
                        elements[i].ele.remove();
                        elements[i].scope.$destroy();
                    }
                    elements = [];
                }


                for(var i=0; i<collection.length; i++) {
                    var childScope = scope.$new();
                    childScope[stringItem] = collection[i];
                    transclude(childScope, function(clone){
                        ele.after(clone);
                        var item = {};
                        item.ele = clone;
                        item.scope = childScope;
                        elements.push(item);
                    });
                }
            });
        }
    };
});

angular.module("app").directive(mySimpleDirective, function () {
    return {
        compile: function (ele, attr) {
            //do some things
            return link(scope, ele, attr, ctrl, transclude) {

            }
        }
    }
});

/*
* structure directive
* 1. The transclude function
*
* > 注意: transclusion 的值是 "element" , link函数的第五个参数是 transclude 函数, 注意它的用法
*
* 2. The directive myLazyRender
*
* > 注意: unwatcher 用法, 具体参见 代码, 另外注意 priority 设置成 1200, 因为 ng-repeat 是 1000,
* 这里牵扯到同一元素上, 指令执行的先后顺序. 你可以尝试将 priority 改成小于 1000, 你会发现 myLazyRender 的
* 第二个例子, 不工作.
*
* 3. The directive myRepeat, 当然,这个比较简单的实现, 很多东西是不能和 ng-repeat 比较的
*
* 4. The compile function
*
* */