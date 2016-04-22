/**
 * Created by hjzheng on 16/4/11.
 */

angular.module("app", []);

angular.module("app").controller("MainCtrl", function($scope){
    $scope.myDate = new Date("2016-11-22");
});

// angular.module("app").directive("myDatepicker", function(){
//     return {
//         restrict: 'A',
//         require : 'ngModel',
//         link : function (scope, element, attrs, ngModelCtrl) {
//             $(function(){
//                 element.datepicker({
//                     dateFormat:'dd/mm/yy',
//                     onSelect:function (date) {
//                         scope.$apply(function () {
//                             ngModelCtrl.$setViewValue(date);
//                         });
//                     }
//                 });
//             });
//         }
//     }
// });


angular.module("app").directive("myDatepicker", function(){
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {

            if(ngModelCtrl) {
                //Model Value -> View Value
                ngModelCtrl.$formatters.push(function(modelValue) {
                    console.log("Model Value: " + modelValue);
                    console.log("Run ngModelCtrl.$formatters");

                    //validate modelValue

                    //ngModelCtrl.$setValidity('date format', valid); //检验完成, 设置结果
                    //这个可以参考 精通AngularJS 关于指令第八章

                    if (angular.isDate(modelValue)) {
                        return $.datepicker.formatDate(attrs['dateFormat'], modelValue);
                    }

                    return null;
                });

                //View Value -> Model Value
                ngModelCtrl.$parsers.push(function(viewValue) {

                    console.log("View Value: " + viewValue);
                    console.log("Run ngModelCtrl.$parsers");

                    //validate viewValue
                    //ngModelCtrl.$setValidity('date format', valid); //检验完成, 设置结果

                    if (viewValue) {
                        try {
                            return $.datepicker.parseDate(attrs['dateFormat'], viewValue);
                        } catch (e) {
                            ngModelCtrl.$setValidity('date format error', e);
                            return null;
                        }
                    }

                    return null;

                });

                //UI -> Model
                $(function(){
                    element.datepicker({
                        dateFormat: attrs['dateFormat'],
                        onSelect:function (date) {
                            scope.$apply(function () {
                                ngModelCtrl.$setViewValue(date);
                            });
                        }
                    });
                });

                scope.$watch(attrs["ngModel"], function (newVal) {
                    if(newVal) {
                        element.datepicker("setDate", newVal);
                    }
                });

                //Model -> UI  ngModel do it for you
            }
        }
    }
});


/*
* 如何将 JQuery UI 包装成 AngularJS 指令
* */