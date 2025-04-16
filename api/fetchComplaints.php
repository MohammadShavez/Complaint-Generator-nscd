<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

$sql = "SELECT * FROM complaints ORDER BY created_at DESC";
$result = $conn->query($sql);

$complaints = [];

while ($row = $result->fetch_assoc()) {
    $complaints[] = $row;
}

echo json_encode($complaints);

$conn->close();
?>
