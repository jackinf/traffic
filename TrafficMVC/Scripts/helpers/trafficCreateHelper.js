$(document).ready(function () {
    
    var input_imo = $("input[name='IMO']");
    var input_name = $("input[name='Name']");
    var input_ship_type = $("input[name='ShipType']");
    var input_mmsi = $("input[name='MMSI']");
    var input_gt = $("input[name='GrossTonnage']");
    var input_dwt = $("input[name='DeathWeightTonnage']");
    var input_yob = $("input[name='YearOfBuild']");
    var input_builder = $("input[name='Builder']");
    var input_flag = $("input[name='Flag']");
    var input_home_port = $("input[name='HomePort']");
    var input_class_society = $("input[name='ClassSociety']");
    var input_manager = $("input[name='Manager']");
    var input_owner = $("input[name='Owner']");
    var input_former_names = $("input[name='FormerNames']");

    var img_loading = $("#img_loading");

    $("#searchBtn").click(function () {
        
        img_loading.show();
        var external_link = $("#externalLink");
        if (external_link)
            external_link.remove();

        var search_value = $("input[name='imo_search']").val();
        // Get data asyncroniously from http://maritime-connector.com
        $.getJSON("/Traffic/ParseMarineTrafficData?imo=" + search_value, function (data) {
            if (data["Success"] == "true") {
                //console.log(Object.keys(data).length);
                //for (var i = 0; i < Object.keys(data).length; i++) {
                //    var dataValue = data[i];
                //    console.log(dataValue);
                //    dataValue = dataValue.indexOf("<") != -1 ? dataValue.replace("<", " ") : dataValue;
                //    dataValue = dataValue.indexOf(">") != -1 ? dataValue.replace(">", " ") : dataValue;
                //    data[i] = dataValue;
                //}
                
                if (data["Name of the ship"]) {
                    input_name.val(data["Name of the ship"]);
                }
                if (data["IMO number"]) {
                    input_imo.val(data["IMO number"]);
                }
                if (data["Type of ship"]) {
                    input_ship_type.val(data["Type of ship"]);
                }
                if (data["MMSI"]) {
                    input_mmsi.val(data["MMSI"]);
                }
                if (data["Gross tonnage"]) {
                    var gt = data["Gross tonnage"];
                    gt = gt.indexOf("tons") != -1 ? gt.replace("tons", "") : gt;
                    if (gt)
                        input_gt.val(gt.trim());
                }
                if (data["DWT"]) {
                    var dwt = data["DWT"];
                    dwt = dwt.indexOf("tons") != -1 ? dwt.replace("tons", "") : dwt;
                    if (dwt)
                        input_dwt.val(dwt.trim());
                }
                if (data["Year of build"]) {
                    input_yob.val(data["Year of build"]);
                }
                if (data["Builder"]) {
                    input_builder.val(data["Builder"]);
                }
                if (data["Last known flag"]) {
                    input_flag.val(data["Last known flag"]);
                }
                if (data["Flag"]) {
                    input_flag.val(data["Flag"]);
                }
                if (data["Home port"]) {
                    input_home_port.val(data["Home port"]);
                }
                if (data["Class society"]) {
                    input_class_society.val(data["Class society"]);
                }
                if (data["Manager & owner"]) {
                    input_manager.val(data["Manager & owner"]);
                    input_owner.val(data["Manager & owner"]);
                } else {
                    if (data["Manager"]) {
                        input_manager.val(data["Manager"]);
                    }
                    if (data["Owner"]) {
                        input_owner.val(data["Owner"]);
                    }
                }
                if (data["Former names"]) {
                    input_former_names.val(data["Former names"]);
                }
                $("#imo").append("<a id='externalLink' href='http://maritime-connector.com/ship/" + search_value + "/' class='btn btn-default'>See on maritime-connector</a>");
            } else {
                console.log("fail");
                // Clear all data
                input_name.val("");
                input_ship_type.val("");
                input_imo.val("");
                input_mmsi.val("");
                input_gt.val("");
                input_dwt.val("");
                input_yob.val("");
                input_builder.val("");
                input_flag.val("");
                input_home_port.val("");
                input_class_society.val("");
                input_manager.val("");
                input_owner.val("");
                input_former_names.val("");
            }
            img_loading.hide();
        });
    });

});