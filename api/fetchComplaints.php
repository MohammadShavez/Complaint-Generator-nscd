<?php
header("Access-Control-Allow-Origin: *");

// Allow specific headers and methods
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// If it's an OPTIONS request (CORS preflight), stop here
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
 include "db.php";

// Query to fetch complaints data
$sql = "SELECT * FROM complaints_nscd order by galleryName and concernSection ASC";
$result = $conn->query($sql);

$complaints = [];

// Fetching data as associative array
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $complaints[] = $row;
    }
}

// Return complaints data in JSON format
echo json_encode($complaints);

$conn->close();
?>
