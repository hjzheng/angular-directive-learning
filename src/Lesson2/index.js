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

});

angular.module("app").directive("myDirective", function(){
    return {
        template: `This is my first directive`,
        restrict: 'ECMA'
    };
});

angular.module("app").directive("userCardInfo", function(){
    return {
        //用到ES6的多行字符串
        template: `name: {{user.name}} <br/> 
              address: <br/> 
              street: {{user.address.street}} <br/> 
              city: {{user.address.city}} <br/> 
              country: {{user.address.country}} <br/>
              friends:<br/>
              <ul>
                <li ng-repeat="friend in user.friends"> {{friend}} </li>
              </ul>`,
        restrict: 'E'
    }
});

/*
* 1. First AngularJS Directive
* 非常的简单, 你只要返回一个对象就行.
* 注意: js 中的指令名称的写法, 驼峰式 camel-case, html 中的写法是 snake-case
*
* 2. 在对象中加入一个 template 属性, 注意这里使用的是 ES6 的多行字符串, 表示指令的模板
*
* 3. restrict 属性, 默认是EA, 所以默认情况下, 可以用作属性和元素,
* 这个大家可以翻看angularJS源码, 关于指令的定义 search $compileProvider#directive
*
* <div my-directive></div>
* <my-directive></my-directive>
*
* 4. restrict 其他属性, CM, 关于 M 目前还没搞清楚
*
* 5. 在模板中加入 bindings, 参考 userInfoCard 指令
*
* 6. 在模本中使用 angular 内置指令 参考 userInfoCard 指令
*
* 7. 使用templateUrl
*
* 8. 使用 replace 属性, replace 属性要求模板必须要有一个根元素
*
* 9. 指令的命名, 加上 prefix
*
* 10. Types of Directives
*
*   Component like user-info-card
*   Decorators like ng-click ng-show
*   Structure/Templating like ng-repeat
*
* */