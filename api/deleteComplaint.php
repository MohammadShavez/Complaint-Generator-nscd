<?php
header("Access-Control-Allow-Origin: *");

// Allow specific headers and methods
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// If it's an OPTIONS request (CORS preflight), stop here
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
// Get complaint ID from the request
$input = json_decode(file_get_contents("php://input"), true);
$complaintId = $input["id"] ?? null;

// Database connection
include "db.php";

if ($conn->connect_error || !$complaintId) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit();
}

$sql = "DELETE FROM complaints_nscd WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $complaintId);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Deletion failed"]);
}

$stmt->close();
$conn->close();
?>
