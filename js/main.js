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
        yValues.push($(this).text());
    })

    return yValues;
}

function validate(suppresErr=false){

    $('#errors-text').children().remove();

    if(isNaN(getX())) {
        if(!suppresErr) $("#errors-text").append($("<td colspan='2'>X must be a number form -5 to 3</td>"))
        return false;
    }
    if (parseInt(getX()) > 3 || parseInt(getX()) < -5 ) {
        if(!suppresErr) $("#errors-text").append($("<td colspan='2'>X must be a number form -5 to 3</td>"))
        return false;
    }

    if(getSelectedYArray().length===0){
        if(!suppresErr) $("#errors-text").append($("<td colspan='2'>You must select at least one Y</td>"))
        return false;
    }

    return true;

}

function sendRequest(){
    let isValid = validate();
    if(isValid===true){

    }
}

function changeCirclePosition(){
    if(validate(true)){
        $("#coordinates-circle").attr('cx','26');
        $("#coordinates-circle").attr('cy','26');
    }
}

$(function () {
    $('#clear').click(function () {
        sendRequest();
    });
    $("input[name='yCheckbox']").click(function () {
        changeCirclePosition();
    })
})
