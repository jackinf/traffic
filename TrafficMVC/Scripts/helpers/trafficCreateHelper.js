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
        // Get data asyncroniously by IMO from http://maritime-connector.com
        $.getJSON("/Ajax/ParseMarineTrafficData?imo=" + search_value, function (data) {
            if (data["Success"] == "true") {
                // Convert all forbidden symbols specified as keys into values
                var convertSymbols = { "<br>": " ", "<": " ", ">": " ", "Â": "", "´": "'" };
                for (var key in data) {
                    var value = data[key];
                    for (var convertFrom in convertSymbols) {
                        value = $.fn.replaceAll(convertFrom, convertSymbols[convertFrom], value);
                    }
                    data[key] = value;
                }

                if (data["Duplicate"] == "true") {
                    $('#myModal').modal('show');
                    delete data["Duplicate"];
                }
                
                $.fn.fillField(input_name, "Name of the ship", data);
                $.fn.fillField(input_imo, "IMO number", data);
                $.fn.fillField(input_ship_type, "Type of ship", data);
                $.fn.fillField(input_mmsi, "MMSI", data);
                if (data["Gross tonnage"]) {
                    var gt = data["Gross tonnage"];
                    gt = gt.indexOf("tons") != -1 ? gt.replace("tons", "") : gt;
                    if (gt)
                        input_gt.val(gt.trim());
                    delete data["Gross tonnage"];
                }
                if (data["DWT"]) {
                    var dwt = data["DWT"];
                    dwt = dwt.indexOf("tons") != -1 ? dwt.replace("tons", "") : dwt;
                    if (dwt)
                        input_dwt.val(dwt.trim());
                    delete data["DWT"];
                }
                $.fn.fillField(input_yob, "Year of build", data);
                $.fn.fillField(input_builder, "Builder", data);
                $.fn.fillField(input_flag, "Last known flag", data);
                $.fn.fillField(input_flag, "Flag", data);
                $.fn.fillField(input_home_port, "Home port", data);
                $.fn.fillField(input_class_society, "Class society", data);
                if (data["Manager & owner"]) {
                    input_manager.val(data["Manager & owner"]);
                    input_owner.val(data["Manager & owner"]);
                    delete data["Manager & owner"];
                } else {
                    $.fn.fillField(input_manager, "Manager", data);
                    $.fn.fillField(input_owner, "Owner", data);
                }
                $.fn.fillField(input_former_names, "Former names", data);
                
                $("#imo").append("<a id='externalLink' href='http://maritime-connector.com/ship/" + search_value + "/' class='btn btn-default'>See on maritime-connector</a>");
                $("input[name='Link']").val("http://maritime-connector.com/ship/" + search_value + "/");

                delete data["Success"];
                delete data["Duplicate"];

                // show header if there are any unused fields
                if (Object.keys(data).length > 0)
                    $("#unusedFieldsHeader").show();
                else
                    $("#unusedFieldsHeader").hide();
                
                for (var key1 in data) {
                    var value1 = data[key1];
                    $("#parsedTable").append("<tr><th>" + key1 + "</th><td>" + value1 + "</td></tr>");
                }
            } else {
                $.fn.clearData();
            }
            img_loading.hide();
        });
    });
    
    $.fn.fillField = function (inputField, arrayKey, resultArray) {
        if (resultArray[arrayKey]) {
            inputField.val(resultArray[arrayKey]);
            delete resultArray[arrayKey];
        }
    };

    $("#noBtn").on("click", function() {
        $.fn.clearData();
    });

    $.fn.clearData = function() {
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
    };

    $.fn.replaceAll = function(find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    };

});