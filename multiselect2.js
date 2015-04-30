// A Fully Customizable Angular Directive for Multiselects
//
// Author : Subhash S
// www.github.com/subu28
angular.module('multiselect2',[]).directive('multiselect2',function(){
    var tpl = "<div class='multiselect'><div class='options' ng-repeat='option in finalobj'><label ng-class=\"{'selected':option.selected}\"><input ng-model='option.selected' ng-change='select(option.obj)' type='checkbox'>{{option.obj.$label}}</label></div></div>";
    return {
        replace: true,
        restrict: 'E',
        template: function($element,$attrs){
            return tpl.replace('$label',$attrs.label)
        },
        scope:{
            optionlist: '=',
            selectedlist: '='
        },
        controller: function ($scope,$element){
            $scope.finalobj=[];
            $scope.$watch('optionlist',function(){
                $scope.createfinalobj()
            })
            $scope.$watch('selectedlist',function(){
                $scope.createfinalobj()
            },true)
            $scope.createfinalobj = function(){
                //logic to create finalobj from scratch
                $scope.finalobj.splice(0,$scope.finalobj.length);
                if($scope.optionlist == undefined)
                    return false;
                for(var option=0;option<$scope.optionlist.length;option++){
                    $scope.finalobj.push({obj:$scope.optionlist[option],selected:$scope.selectedlist.indexOf($scope.optionlist[option])>-1})
                }
            }
            $scope.select = function(option){
                //logic to update selected
                var index = $scope.selectedlist.indexOf(option)
                if(index == -1){
                    $scope.selectedlist.push(option)
                }
                else{
                    $scope.selectedlist.splice(index,1)
                }
            }
            $scope.createfinalobj();
        }
    }
})