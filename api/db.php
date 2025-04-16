<?php
$host = "mysql.railway.internal";
$user = "root";
$password = "sinoERPgFWkkMqQyNKiWECrYDZUVDVni"; // Replace with your actual password
$dbname = "railway";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>


<!-- mysql://root:sinoERPgFWkkMqQyNKiWECrYDZUVDVni@interchange.proxy.rlwy.net:55224/railway -->