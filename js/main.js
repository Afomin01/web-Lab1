function getR() {
    return $('#rSelect').val();
}

function getX() {
    let xValue = $('#xField').val();

    if(xValue==="") xValue="null";
    return xValue;
}

function getSelectedYArray() {
    let yValues = new Array();
    $("input[name='yCheckbox']:checked+label").each(function () {
        yValues.push($(this).text().replace(/\s/g,''));
    })

    return yValues;
}

function validate(suppresErr=false){

    $('#errors-text').children().remove();

    if(isNaN(getX())) {
        if(!suppresErr) $("#errors-text").append($("<td colspan='2'>X must be a number (-5;3)</td>"))
        return false;
    }
    if (parseFloat(getX()) >= 3 || parseFloat(getX()) <= -5 ) {
        if(!suppresErr) $("#errors-text").append($("<td colspan='2'>X must be number (-5;3)</td>"))
        return false;
    }

    if(getSelectedYArray().length===0){
        if(!suppresErr) $("#errors-text").append($("<td colspan='2'>You must select at least one Y</td>"))
        return false;
    }
    return true;

}

function sendCheckRequest(){
    let isValid = validate();
    if(isValid===true){

        $.ajax({
            type: "POST",
            url: "php/check.php",
            data: {x: parseFloat(getX()), y: getSelectedYArray(), r: getR()},

            success: function (data) {
                $("#results tr:not(:first)").remove();
                $("#results").append(data);
            },

            error:function (xhr,status,error) {
                alert("Server error: "+xhr.responseText);
            },

            timeout:function () {
                alert("Timeout reached");
            }
        });
    }
}

function clear(){
    $.ajax({
        type: "POST",
        url: "php/clear.php",

        success: function () {
            $("#results tr:not(:first)").remove();
        },

        error:function (xhr,status,error) {
            alert("Server error: "+xhr.responseText);
        },

        timeout:function () {
            alert("Timeout reached");
        }
    });
}

$(function () {
    $('#clear').bind('click',function () {
        clear();
    });
    $('#check').bind('click',function (event) {
        event.preventDefault();
        sendCheckRequest();
    });
    $('#xField').bind('change', function () {
        validate();
    })
    $("input[name='yCheckbox']").bind('change', function () {
        validate();
    })

    $.ajax({
        type: "POST",
        url: "php/getPrevious.php",

        success: function (data) {
            $("#results tr:not(:first)").remove();
            $("#results").append(data);
        }
    });
})
