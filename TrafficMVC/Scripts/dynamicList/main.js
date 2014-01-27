var myApp = angular.module('myApp', ['ngResource']);

function TrafficCtrl($scope, $http) {
    var backupItem = {
        Name: "", IMO: "", ShipType: "", MMSI: "", GrossTonnage: "", DeathWeightTonnage: "",
        YearOfBuild: "", Builder: "", Flag: "", HomePort: "", ClassSociety: "", Manager: "",
        Owner: "", FormerNames: "", Link: ""
    };

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
        ClassSociety: undefined,
        MMSI: undefined
    };

    $("#img_loading").show();

    $http.get("/Ajax/GetAllTraffic").success(function (data) {
        data.each(function(element) {
            element["selected"] = false;
        });
        $scope.traffic = data;
        $("#img_loading").hide();

        //var owners = [];
        //data.each(function (element) {
        //    var owner = element["Owner"];
        //    if (owner != undefined && owner != '')
        //        owners.push(owner);
        //});

        // enable autocomplete
        //$("input[name='owner']").autocomplete({
        //    source: owners,
        //    select: function() {
        //        console.log($scope.search.Owner);
        //        $scope.search.Owner = "abis";
        //    }
        //});
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
    
    $scope.showColumnRowNumber = true;
    $scope.showColumnID = true;
    $scope.showColumnUpdateDate = true;
    $scope.showColumnName = true;
    $scope.showColumnIMO = true;
    $scope.showColumnMMSI = true;
    $scope.showColumnShipType = true;
    $scope.showColumnClassSociety = true;
    $scope.showColumnFlag = true;
    $scope.showColumnOwner = true;

    $scope.activeColumnBtnRowNumber = 'active';
    $scope.activeColumnBtnID = 'active';
    $scope.activeColumnBtnUpdateDate = 'active';
    $scope.activeColumnBtnName = 'active';
    $scope.activeColumnBtnIMO = 'active';
    $scope.activeColumnBtnMMSI = 'active';
    $scope.activeColumnBtnShipType = 'active';
    $scope.activeColumnBtnClassSociety = 'active';
    $scope.activeColumnBtnFlag = 'active';
    $scope.activeColumnBtnOwner = 'active';

    $scope.reverse = false;
    $scope.predicate = 'Name';
    
    $scope.toggleColumnVisibility = function (column) {
        switch (column) {
            case 0:
                $scope.showColumnRowNumber = !$scope.showColumnRowNumber;
                $scope.activeColumnBtnRowNumber = $scope.showColumnRowNumber ? 'active' : '';
                break;
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
                break;
            case 7:
                $scope.showColumnFlag = !$scope.showColumnFlag;
                $scope.activeColumnBtnFlag = $scope.showColumnFlag ? 'active' : '';
                break;
            case 8:
                $scope.showColumnOwner = !$scope.showColumnOwner;
                $scope.activeColumnBtnOwner = $scope.showColumnOwner ? 'active' : '';
                break;
            case 9:
                $scope.showColumnMMSI = !$scope.showColumnMMSI;
                $scope.activeColumnBtnMMSI = $scope.showColumnMMSI ? 'active' : '';
                break;
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
        $scope.search.MMSI = undefined;
    };

    $.fn.clearSearchFieldByAllData = function() {
        $scope.search.$ = undefined;
    };

    $scope.openEditMenu = function (item) {
        $("#myModal").modal('show');
        backupItem.Name = item.Name;
        backupItem.IMO = item.IMO;
        backupItem.ShipType = item.ShipType;
        backupItem.MMSI = item.MMSI;
        backupItem.GrossTonnage = item.GrossTonnage;
        backupItem.DeathWeightTonnage = item.DeathWeightTonnage;
        backupItem.YearOfBuild = item.YearOfBuild;
        backupItem.Builder = item.Builder;
        backupItem.Flag = item.Flag;
        backupItem.HomePort = item.HomePort;
        backupItem.ClassSociety = item.ClassSociety;
        backupItem.Manager = item.Manager;
        backupItem.Owner = item.Owner;
        backupItem.FormerNames = item.FormerNames;
        backupItem.Link = item.Link;
        $scope.editItem = item;
    };

    $scope.editSaveChanges = function (item) {
        $http.post("/Ajax/SaveChanges?id=" + item.ID +
            "&name=" + item.Name +
            "&imo=" + item.IMO +
            "&shiptype=" + item.ShipType +
            "&mmsi=" + item.MMSI +
            "&gt=" + item.GrossTonnage +
            "&dwt=" + item.DeathWeightTonnage +
            "&yob=" + item.YearOfBuild +
            "&builder=" + item.Builder +
            "&flag=" + item.Flag +
            "&homeport=" + item.HomePort + 
            "&cs=" + item.ClassSociety + 
            "&manager=" + item.Manager +
            "&owner=" + item.Owner +
            "&fn=" + item.FormerNames +
            "&link=" + item.Link
        ).success(function () {
            $("#myModal").modal('hide');
        });
    };

    $scope.openDeleteMenu = function (item) {
        $("#deleteModal").modal('show');
        $scope.deleteItem = item;
    };

    $scope.openDeleteMultipleMenu = function () {
        $scope.deleteItemCount = $scope.traffic.findAll({ 'selected': true }).length;
        if ($scope.deleteItemCount > 0) {
            $("#deleteMultipleModal").modal('show');
        } else {
            $scope.info = {                
                Title: "No records selected",
                Body: "Sir, in order to delete records you should select them using checkboxes"
            };
            $("#infoModal").modal('show');
        }
    };

    $scope.confirmDelete = function (item) {
        var deleteID = item.ID;
        $http.post("/Ajax/DeleteRecord?id=" + deleteID).success(function (data) {
            if (data["Success"]) {
                $scope.traffic.remove(function (el) { return el.ID === deleteID; });
                $("#deleteModal").modal('hide');
            } else {
                console.log('not success');
            }
        });
    };

    $scope.editDiscardChanges = function () {
        $scope.editItem.Name = backupItem.Name;
        $scope.editItem.IMO = backupItem.IMO;
        $scope.editItem.ShipType = backupItem.ShipType;
        $scope.editItem.MMSI = backupItem.MMSI;
        $scope.editItem.GrossTonnage = backupItem.GrossTonnage;
        $scope.editItem.DeathWeightTonnage = backupItem.DeathWeightTonnage;
        $scope.editItem.YearOfBuild = backupItem.YearOfBuild;
        $scope.editItem.Builder = backupItem.Builder;
        $scope.editItem.Flag = backupItem.Flag;
        $scope.editItem.HomePort = backupItem.HomePort;
        $scope.editItem.ClassSociety = backupItem.ClassSociety;
        $scope.editItem.Manager = backupItem.Manager;
        $scope.editItem.Owner = backupItem.Owner;
        $scope.editItem.FormerNames = backupItem.FormerNames;
        $scope.editItem.Link = backupItem.Link;
    };

    $scope.confirmDeleteMultiple = function() {
        var res = $scope.traffic.findAll({ 'selected': true });
        for (var i = res.length - 1; i >= 0; i--) {
            $scope.confirmDelete(res[i]);
        }
        $("#deleteMultipleModal").modal('hide');
    };
}