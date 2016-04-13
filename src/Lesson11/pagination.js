/**
 * Created by hjzheng on 16/4/13.
 */
angular.module("myDirective", []).directive("myPagination", function(){
   return {
       restrict: "E",
       scope: {
           totalItems: "@",
           pageSize: "=",
           onSelectPage: "&"
       },
       templateUrl: "pagination.html",
       controller: function($scope){

           var maxPage = 0;
           $scope.currentPage = 1;
           $scope.totalPages = [];

           var fn = $scope.onSelectPage || angular.noop();
           var ti = parseInt($scope.totalItems);
           var ps = parseInt($scope.pageSize);

           $scope.$watch("pageSize", function(newVal){

               $scope.totalPages = [];
               $scope.currentPage = 1;

               ps = parseInt(newVal);

               maxPage = Math.floor(ti/ps + (ti%ps === 0 ? 0 : 1));

               for(var i=1; i <= maxPage; i++){
                   $scope.totalPages.push(i);
               }
           });

           function pagingInfo(num, ps){
               return {start: (num-1)*ps + 1, end: (num-1)*ps + ps};
           }

           $scope.prePage = function(){
               if($scope.currentPage == 1) return;
               $scope.currentPage = $scope.currentPage - 1;
               fn(pagingInfo($scope.currentPage, ps));
           }

           $scope.nextPage = function () {
               if($scope.currentPage == maxPage) return;
               $scope.currentPage = $scope.currentPage + 1;
               fn(pagingInfo($scope.currentPage, ps));
           }

           $scope.selectPage = function (num) {
               $scope.currentPage = num;
               fn(pagingInfo(num, ps));
           }

       }
   }
});