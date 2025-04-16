<?php
$host = "mysql.railway.internal";
$user = "root";
$password = "sinoERPgFWkkMqQyNKiWECrYDZUVDVni"; // or your MySQL password
$dbname = "railway";
$port = 55224;

$conn = new mysqli($host, $user, $password, $dbname, $port);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>


<!-- mysql://root:sinoERPgFWkkMqQyNKiWECrYDZUVDVni@interchange.proxy.rlwy.net:55224/railway -->