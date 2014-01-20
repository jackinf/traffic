var app = angular.module("TrafficApp", ['ngResource', 'ngRoute']);

app.controller("CreateTrafficController", function ($scope, $http) {
    // all inputs on create form
    var input_imo = $("input[name='IMO']");
    var input_name = $("input[name='Name']");
    var input_mmsi = $("input[name='MMSI']");
    var input_gt = $("input[name='GrossTonnage']");
    var input_dwt = $("input[name='DeathWeightTonnage']");
    var input_yob = $("input[name='YearOfBuild']");
    var input_builder = $("input[name='Builder']");
    var input_class_society = $("input[name='ClassSociety']");
    var input_manager_owner = $("input[name='ManagerAndOwner']");
    var input_former_names = $("input[name='FormerNames']");

    var img_loading = $("#img_loading");

    $scope.searchMarineTrafficData = function () {
        img_loading.show();
        var external_link = $("#externalLink");
        if (external_link)
            external_link.remove();
        
        // Get data asyncroniously from http://maritime-connector.com
        $http.get("/Traffic/ParseMarineTrafficData?imo=" + input_imo.val()).success(function (data) {
            if (data["Success"] == "true") {
                if (data["Name of the ship"]) {
                    input_name.val(data["Name of the ship"]);
                }
                if (data["MMSI"]) {
                    input_mmsi.val(data["MMSI"]);
                }
                if (data["Gross tonnage"]) {
                    input_gt.val(data["Gross tonnage"]);
                }
                if (data["DWT"]) {
                    input_dwt.val(data["DWT"]);
                }
                if (data["Year of build"]) {
                    input_yob.val(data["Year of build"]);
                }
                if (data["Builder"]) {
                    input_builder.val(data["Builder"]);
                }
                if (data["Class society"]) {
                    input_class_society.val(data["Class society"]);
                }
                if (data["ManagerAndOwner"]) {
                    input_manager_owner.val(data["ManagerAndOwner"]);
                }
                if (data["Former names"]) {
                    input_former_names.val(data["Former names"]);
                }
                $("#imo").append("<a id='externalLink' href='http://maritime-connector.com/ship/" + input_imo.val() + "/' class='btn btn-default'>See on maritime-connector</a>");
            } else {
                // Clear all data
                input_name.val("");
                input_mmsi.val("");
                input_gt.val("");
                input_dwt.val("");
                input_yob.val("");
                input_builder.val("");
                input_class_society.val("");
                input_manager_owner.val("");
                input_former_names.val("");
            }
            img_loading.hide();
        });
    };
});