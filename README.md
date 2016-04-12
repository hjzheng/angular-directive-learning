# angular-directive-learning

#### Lesson 1
一个写AngularJS指令的模板, 另外一个希望大家熟悉 WebStorm 快捷键

```
修改键（基于Mac OS X 10.5 +）
command + 0 打开终端

默认快捷键
command + 1 打开Projects
command + 2 打开最喜爱，我用来从终端跳回编辑区

在终端中
command + T 新建 终端tab
command + w 关闭 终端tab

在编辑区
shift + command + [ / ] 切换tab
command + D 重复当前行
shift + command + 上 / 下 整行上下移动
command + -> 行尾
command + <- 行首
command + L 跳到第几行
command + Z 撤销
command + shift + Z 重做
command + delete 删除整行
shift + 方向键 选中区域
option + 方向键 按单词移动光标

ctrl + tab 快速导航
```
其他快捷键 [你需要知道的 WebStorm 快捷键](http://blog.jetbrains.com/webstorm/2015/06/10-webstorm-shortcuts-you-need-to-know/)

#### Lesson 2
AngularJS 指令的基本知识

1.你的第一个AngularJS指令
非常的简单, 你只要返回一个空对象就行.
```js
angular.module("app").directive("myDirective", function(){
    return {

    };
});
```
> 注意: js 中的指令名称的写法, 驼峰式 camel-case, html 中的写法是 snake-case

2.template 属性, 注意例子中使用的是 ES6 的多行字符串, 表示指令的模板

3.restrict 属性, 默认是EA, 所以默认情况下, 可以用作属性和元素
```js
<div my-directive></div>
<my-directive></my-directive>
```
> 扩展: 关于restrict默认为什么是 EA, 这个大家可以翻看 AngularJS 源码, 搜索 `$compileProvider#directive` 查看关于指令的定义

4.restrict 其他属性, CM, 关于 M 目前还没搞清楚

5.在模板中加入 bindings, 参考 userInfoCard 指令

6.在模本中使用 AngularJS 内置指令 参考 userInfoCard 指令

7.使用 templateUrl, 将模板移出 指令定义

8.使用 replace 属性, replace 属性要求模板必须要有一个根元素

9.指令的命名最佳实践, 请加上 prefix, 像 AngularJS 内部指令 ng 或 ui-bootstrap 的 ui

10.Types of Directives
    *   Component like user-info-card
    *   Decorators like ng-click ng-show
    *   Structure like ng-repeat

#### Lesson 3

1.在指令中加入 controller

2.这种情况下 $scope 是共享的, 也就是 MainCtrl 控制器和 userCardInfo 指令的 scope 是共享的
   
  为了测试它, 我们将 scope 打印出来, 在 console 中查看, 注意 $id 的值

3.指令的 scope 属性, 默认 false 是共享 scope

4.将 scope 修改成true, 进行测试, 发现两个 scope 有继承关系, 其实是 js中 的原型继承.

> 扩展: 这个我们同样可以翻看 AngularJS 源码, 查找关键字 `$RootScopeProvider`, 注意下面的代码片段
如果是 isolate, 去 new Scope(), 如果不是createChildScopeClass(this), 然而ChildScope函数使用的是 JS 的原型继承

```js
 $new: function(isolate, parent) {
        var child;

        parent = parent || this;

        if (isolate) {
          child = new Scope();
          child.$root = this.$root;
        } else {
          // Only create a child scope class if somebody asks for one,
          // but cache it to allow the VM to optimize lookups.
          if (!this.$$ChildScope) {
            this.$$ChildScope = createChildScopeClass(this);
          }
          child = new this.$$ChildScope();
        }
```

5.将scope修改成 {}, 进行测试, 发现指令的 scope 变成了隔离 scope

6.隔离scope 如何传参

说隔离scope如何传参之前, 看看一个元素上多个scope的情况

多个指令在一个元素上的 scope 情况 两个 isolate scope 在同一个元素上，AngularJS 是不允许这样的情况出现的，会直接报错.
请在 index.html 页面的 user-card-info 上添加,另一个隔离指令 my-directive, 如下, 进行测试

```html
<user-card-info my-directive></user-card-info>
```

> 其他情况 https://segmentfault.com/q/1010000004028966/a-1020000004030499

> 最佳实践: 不要在同一个元素上多个指令中使用inherit scope 相同的名字有可能被覆盖掉

#### Lesson 4

隔离 scope 中的传参, 参考本节中的例子

1.传递字符串 @

> 小技巧: 传入一个简单的值 @传入字符串，如果是 boolean，需要自己转换 下面的方法不错
>  $scope.isCollapsed = ($scope.collapsed === "true");

2.传递对象 =

3.传递函数 &

#### Lesson 5

重构 userCardInfo 指令

1.进行重构 1

抽取 address 指令

2.进行重构 2

添加 removeFriend 指令

#### Lesson 6

Decorator Directive

1.The link function

link: function postLink(scope, iElement, iAttrs, controller) { ... }

>注意, 不要在 Decorator Directive 使用 isolate scope, 使用 iAttr 和 $parse 方式来进行参数传递
>另外 注意fn的参数传递, 见指令 eventPause

```js
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
```

2.Recreate ng-click, 参见指令 my-click

3.使用 $watch 观察值的变化, Example scale-font

```js
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
```

> 小技巧: 在写装饰指令的时候, 大家其实可以参考一些ng指令的写法, 例如 ng-show, ng-style, ng-class

#### Lesson 7

例子: display-status 指令

#### Lesson 8

Transclusion
