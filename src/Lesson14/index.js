/**
 * Created by hjzheng on 16/4/11.
 */

angular.module("app", []);

angular.module("app").controller("MainCtrl", function($scope){

});

angular.module("app").directive("myText", function(){
	return function(scope, element){
		element.on('click', function(){
			console.log('clicked !!!');
		});
		element.css('color', 'red');
	}
});

/*
* 准备一个练习模板, 另外希望大家熟悉一下 webstorm 的快捷键
*
* 指令的其他定义方法
* 可以通过返回 function 方式(其实是postlink方法), 去定义一个指令
* */