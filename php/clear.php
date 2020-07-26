<?php

session_start();

if (isset($_SESSION['previous'])) {
    $_SESSION['previous'] = array();
}

