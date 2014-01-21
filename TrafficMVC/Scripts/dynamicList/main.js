var myApp = angular.module('myApp', ['ngResource']);

function TrafficCtrl($scope, $http) {

    $scope.showSearchMenu = true;
    $scope.showColumnMenu = false;

    $scope.search = {
        $: undefined,
        ID: undefined,
        UpdateDate: undefined,
        Flag: undefined,
        IMO: undefined,
        ShipType: undefined,
        Owner: undefined,
        Name: undefined,
        ClassSociety: undefined
    };

    $http.get("/Ajax/GetAllTraffic").success(function (data) {
        $scope.traffic = data;
    });

    $scope.toggleSearchMenuVisibility = function() {
        $scope.showSearchMenu = !$scope.showSearchMenu;
        if (!$scope.showSearchMenu)
            $.fn.clearSearchMenuFields();
        else
            $.fn.clearSearchFieldByAllData();
    };
    $scope.toggleColumnMenuVisibility = function() {
        $scope.showColumnMenu = !$scope.showColumnMenu;
    };
    
    $scope.showColumnID = true;
    $scope.showColumnUpdateDate = true;
    $scope.showColumnName = true;
    $scope.showColumnIMO = true;
    $scope.showColumnShipType = true;
    $scope.showColumnClassSociety = true;
    $scope.showColumnFlag = true;
    $scope.showColumnOwner = true;

    $scope.activeColumnBtnID = 'active';
    $scope.activeColumnBtnUpdateDate = 'active';
    $scope.activeColumnBtnName = 'active';
    $scope.activeColumnBtnIMO = 'active';
    $scope.activeColumnBtnShipType = 'active';
    $scope.activeColumnBtnClassSociety = 'active';
    $scope.activeColumnBtnFlag = 'active';
    $scope.activeColumnBtnOwner = 'active';

    $scope.reverse = false;
    
    $scope.toggleColumnVisibility = function (column) {
        switch (column) {
            case 1:
                $scope.showColumnID = !$scope.showColumnID;
                $scope.activeColumnBtnID = $scope.showColumnID ? 'active' : '';
                break;
            case 2:
                $scope.showColumnUpdateDate = !$scope.showColumnUpdateDate;
                $scope.activeColumnBtnUpdateDate = $scope.showColumnUpdateDate ? 'active' : '';
                break;
            case 3:
                $scope.showColumnName = !$scope.showColumnName;
                $scope.activeColumnBtnName = $scope.showColumnName ? 'active' : '';
                break;
            case 4:
                $scope.showColumnIMO = !$scope.showColumnIMO;
                $scope.activeColumnBtnIMO = $scope.showColumnIMO ? 'active' : '';
                break;
            case 5:
                $scope.showColumnShipType = !$scope.showColumnShipType;
                $scope.activeColumnBtnShipType = $scope.showColumnShipType ? 'active' : '';
                break;
            case 6:
                $scope.showColumnClassSociety = !$scope.showColumnClassSociety;
                $scope.activeColumnBtnClassSociety = $scope.showColumnClassSociety ? 'active' : '';
            case 7:
                $scope.showColumnFlag = !$scope.showColumnFlag;
                $scope.activeColumnBtnFlag = $scope.showColumnFlag ? 'active' : '';
            case 8:
                $scope.showColumnOwner = !$scope.showColumnOwner;
                $scope.activeColumnBtnOwner = $scope.showColumnOwner ? 'active' : '';
            default:
                break;
        }
    };

    $.fn.clearSearchMenuFields = function () {
        $scope.search.ID = undefined;
        $scope.search.UpdateDate = undefined;
        $scope.search.Flag = undefined;
        $scope.search.IMO = undefined;
        $scope.search.ShipType = undefined;
        $scope.search.Owner = undefined;
        $scope.search.Name = undefined;
        $scope.search.ClassSociety = undefined;
    };

    $.fn.clearSearchFieldByAllData = function() {
        $scope.search.$ = undefined;
    };
}