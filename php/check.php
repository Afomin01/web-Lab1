<?php

session_start();

$startMicroTime = microtime(true);
$startWorldTime = date("H:i:s");

$xValue = $_POST['x'];
$yValuesArray = $_POST['y'];
$rValue = $_POST['r'];

if (isset($_SESSION['previous'])) {
    foreach ($_SESSION['previous'] as $previous){
        echo getHTMLRow($previous[0],$previous[1],$previous[2],$previous[3],$previous[4],$previous[5]);
    }
} else $_SESSION['previous'] = array();

foreach ($yValuesArray as $yValue){
    if(validate($xValue,$yValue,$rValue)){
        if(check($xValue,$yValue,$rValue)) $result="true";
        else $result = "false";
    }else $result = "invalid";


    $endMicroTime = round((microtime(true) - $startMicroTime)*1e6, 2)." μs";

    array_push($_SESSION['previous'], array($xValue,$yValue,$rValue,$startWorldTime,$endMicroTime,$result));

    echo getHTMLRow($xValue,$yValue,$rValue,$startWorldTime,$endMicroTime,$result);
}

function validate($x,$y,$r){
    if(is_numeric($x) && is_numeric($y) && is_numeric($r)){
        if(($x<=3 && $x>=-5)
            && ($y==-3 || $y==-2 || $y==-1 || $y==0 || $y==1 || $y==2 || $y==3 || $y==4 || $y==5)
            && ($r==1 || $r==1.5 || $r==2 || $r==2.5 || $r==3)){
            return true;
        }else return false;
    }else return false;
}

function check($x,$y,$r){
    if($x>0 && $y>0){
        if($y<=$r && $x<=($r/2)) return true;
        else return false;
    }
    if ($x<0 && $y>0) return false;
    if ($x>0 && $y<0){
        if($y>=(0.5*$x-($r/2))) return true;
        else return false;
    }
    if ($x<0 && $y<0){
        if((pow($x,2)+pow($y,2))<=pow($r,2)) return true;
        else return false;
    }
    if($x==0){
        if($y>=(-$r) && $y<=$r) return true;
        else return false;
    }
    if($y==0){
        if($x>=(-$r) && $x<=$r) return true;
        else return false;
    }
}

function getHTMLRow($xValue, $yValue, $rValue, $startWorldTime, $endMicroTime, $result){

    $resultColor = $result=="invalid" ? "red" : ($result=="true" ? "green" : "red");

    return "<tr>
                            <td>$xValue</td>
                            <td>$yValue</td>
                            <td>$rValue</td>
                            <td>$startWorldTime</td>
                            <td>$endMicroTime</td>
                            <td style='color:$resultColor;'>$result</td>
                        </tr>";
}


