/**
 * Created by hjzheng on 16/4/11.
 */

angular.module("app", []);

angular.module("app").controller("MainCtrl", function($scope){
    $scope.user = {
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

    console.log($scope);

});


angular.module("app").directive("userCardInfo", function(){
    return {
        templateUrl: "userCardInfo.html",
        restrict: 'E',
        controller: function($scope){
            $scope.knightMe = function(){
                $scope.user.rank = "Knight";
            }

            console.log($scope);
        }
    }
});

angular.module("app").directive("myDirective", function(){
    return {
        scope: {}
    }
});

/*
*
* 1. 在指令中加入 controller
*
* 2. 这种情况下 $scope是共享的, 也就是 MainCtrl 控制器和 userCardInfo 指令的scope是共享的
*
* 3. 为了测试它, 我们将scope打印出来, 在 chrome dev tools 工具中查看
*
* 4. 指令的scope属性, 默认false 是共享scope
*
* 5. 将scope修改成true, 进行测试, 发现两个scope有继承关系, 其实是js中的原型继承,
*
* 这个我们同样可以翻看 AngularJS 源码, 查找关键字 $RootScopeProvider
*
* 6. 将scope修改成 {}, 进行测试, 发现指令的scope变成了隔离的scope
*
* 7. 隔离scope 传参
*
* 在说隔离scope如何传参之前, 看看一个元素上多个scope的情况
*
* 多个指令在一个元素上的scope情况 两个isolate scope在同一个元素上，angular是不允许这样的情况出现的，会直接报错
*
* 更多情况 https://segmentfault.com/q/1010000004028966/a-1020000004030499
*
* best pratice不要在同一个元素上多个指令中使用inherit scope 相同的名字有可能被覆盖掉
*/