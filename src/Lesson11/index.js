/**
 * Created by hjzheng on 16/4/11.
 */

angular.module("app", ["myDirective"]);

angular.module("app").controller("MainCtrl", function($scope){
    $scope.totalItems = 100;
    $scope.myPageSize = 20;

    $scope.selectHandler = function(start, end){
        console.log(arguments);
    }

    $scope.address = {
        country: "China",
        city: "Xi'an",
        area: "Yanta"
    }

    $scope.changeAddress = function(){
        $scope.address = {
            country: "China",
            city: "Shanghai",
            area: "Xuhui"
        }
    }
});

angular.module("app").directive("myValidateAddress", function(){
    return {
        require: "ngModel",
        link: function(scope, iEle, iAttr, ngModelCtrl){
            if(ngModelCtrl) {
                //Model Value -> View Value
                ngModelCtrl.$formatters.push(function(modelValue) {
                    console.log("Model Value: " + modelValue);
                    console.log("Run ngModelCtrl.$formatters");

                    //validate modelValue

                    //ngModelCtrl.$setValidity('address', valid); //检验完成, 设置结果
                    //这个可以参考 精通AngularJS 关于指令第八章

                    return modelValue.country + ", " + modelValue.city + ", " + modelValue.area;
                });

                //View Value -> Model Value
                ngModelCtrl.$parsers.push(function(viewValue) {

                    console.log("View Value: " + viewValue);
                    console.log("Run ngModelCtrl.$parsers");

                    //validate viewValue

                    //ngModelCtrl.$setValidity('address', valid); //检验完成, 设置结果

                    var vals = viewValue.split(",");

                    return {
                        country: vals[0],
                        city: vals[1],
                        area: vals[2]
                    }
                });

            }
        }
    }
});

/*
* 写一个modal的练习, 先放一个同事写的demo, 在这里, 有时间再搞
* http://jsbin.com/gojuyo/1/edit?html,css,js,output
* */