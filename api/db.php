<?php
$host = "localhost";
$port = 55224; // if needed
$user = "root";
$password = ""; // Replace with your actual password
$dbname = "complaint_db_nscd";

$conn = new mysqli($host, $user, $password, $dbname, $port);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>


<!-- mysql://root:sinoERPgFWkkMqQyNKiWECrYDZUVDVni@interchange.proxy.rlwy.net:55224/railway -->