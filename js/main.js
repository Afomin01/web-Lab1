function getR() {
    return $('#rSelect').val();
}

function getX() {
    let xValue = $('#xField').val().replace(/\s/g,'').replace(',','.');

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
    let parseConfirmed = true;
    if(isValid===true){
        if(String(parseFloat(getX())) !== getX()) {
            let parseErrorConfirm = confirm("Your X value precision is too high, so it is recommended to reduce the precision. X value will be rounded to " + parseFloat(getX()) +".\n Would you like to send request with this rounded value?");
            if(!parseErrorConfirm) parseConfirmed=false;
        }

        if(parseConfirmed) {
            $.ajax({
                type: "POST",
                url: "php/check.php",
                data: {x: parseFloat(getX()), y: getSelectedYArray(), r: getR()},

                success: function (data) {
                    $("#results tr:not(:first)").remove();
                    $("#results").append(data);
                },

                error: function (xhr, status, error) {
                    alert("Server error: " + xhr.responseText);
                },

                timeout: function () {
                    alert("Timeout reached");
                }
            });
        }
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

function changeGraphRValue(){
    $('#Ry').html(parseFloat(getR()));
    $('#-Ry').html(-parseFloat(getR()));
    $('#R2y').html(parseFloat(getR())/2);
    $('#-R2y').html(-parseFloat(getR())/2);

    $('#Rx').html(parseFloat(getR()));
    $('#-Rx').html(-parseFloat(getR()));
    $('#R2x').html(parseFloat(getR())/2);
    $('#-R2x').html(-parseFloat(getR())/2);
}

function setDots(){

    $('#graph > circle').remove();
    if(getX()!=="null"){
        let x = parseFloat(getX());
        let r = parseFloat(getR());
        let svg = document.getElementById('graph');
        for(let i of getSelectedYArray()){
            let circleElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle' );
            circleElement.style.fill = "yellow";
            circleElement.setAttribute("r", "4");
            circleElement.setAttribute("cx", 175 + (x / r) * 140);
            circleElement.setAttribute("cy", 175 - (i / r) * 140);
            svg.append(circleElement);
        }
    }


}

$(function () {
    changeGraphRValue();

    $('#clear').bind('click',function () {
        clear();
    });
    $('#check').bind('click',function (event) {
        event.preventDefault();
        sendCheckRequest();
    });
    $('#xField').bind('change', function () {
        validate();
        setDots();
    })
    $("input[name='yCheckbox']").bind('change', function () {
        validate();
        setDots();
    })
    $('#rSelect').change(function () {
        changeGraphRValue();
        setDots();
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
