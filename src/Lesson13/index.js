/**
 * Created by hjzheng on 16/4/11.
 */

angular.module("app", []);

angular.module("app").controller("MainCtrl", function($scope){

});

angular.module("app").component("myComponent", {
	bindings: {
		name: '@'
	},
	template: "this a component template: {{$ctrl.name}}"
});

/*
* component: https://docs.angularjs.org/guide/component
* 说白了, component 是一种特殊的指令
*
* 用component写的一个tabs指令, 注意 hook 方法
*
*
* $onInit() - Called on each controller after all the controllers on an element have been constructed and had their bindings initialized (and before the pre & post linking functions for the directives on this element). This is a good place to put initialization code for your controller.
* $onChanges(changesObj) - Called whenever one-way bindings are updated. The changesObj is a hash whose keys are the names of the bound properties that have changed, and the values are an object of the form { currentValue: ..., previousValue: ... }. Use this hook to trigger updates within a component such as cloning the bound value to prevent accidental mutation of the outer value.
* $onDestroy() - Called on a controller when its containing scope is destroyed. Use this hook for releasing external resources, watches and event handlers.
* $postLink() - Called after this controller's element and its children have been linked. Similar to the post-link function this hook can be used to set up DOM event handlers and do direct DOM manipulation. Note that child elements that contain templateUrl directives will not have been compiled and linked since they are waiting for their template to load asynchronously and their own compilation and linking has been suspended until that occurs. This hook can be considered analogous to the ngAfterViewInit and ngAfterContentInit hooks in Angular 2. Since the compilation process is rather different in Angular 1 there is no direct mapping and care should be taken when upgrading.
* */



angular.module("app").component("myTabs", {
	templateUrl: "myTabs.html",
	transclude: true,
	controller: function () {
		this.tabs = [];

		this.selectTab = function(tab) {
			this.tabs.forEach(function(t){
				t.selected = false;
			})
			tab.selected = true;
		}

		this.pushTab = function(tab) {
			this.tabs.push(tab);
			if(this.tabs.length === 1){
				tab.selected = true;
			}
		}
	}
});

angular.module("app").component("myTab", {
	bindings: {
		label: '@'
	},
	require: {
		tabsCtrl: '^myTabs'
	},
	transclude: true,
	templateUrl: "myTab.html",
	controller: function () {
		this.$onInit = function() {
			this.tabsCtrl.pushTab(this);
			console.log(this);
		};

		this.$onChanges = function(changesObj) {
			console.log(changesObj)
		}
	}
});