<?php
session_start();

if (isset($_SESSION['previous'])) {
    foreach ($_SESSION['previous'] as $previous) {
        $resultColor = $previous[5]=="invalid" ? "red" : ($previous[5]=="true" ? "green" : "red");
        echo "<tr>
                            <td>$previous[0]</td>
                            <td>$previous[1]</td>
                            <td>$previous[2]</td>
                            <td>$previous[3]</td>
                            <td>$previous[4]e</td>
                            <td style='color:$resultColor;'>$previous[5]</td>
                        </tr>";
    }
}