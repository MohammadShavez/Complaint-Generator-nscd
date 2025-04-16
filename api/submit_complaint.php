<?php
// Allow cross-origin requests (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

// Decode incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Use current date in Y-m-d format
$created_at = date('Y-m-d');

// Validate required fields
if (
    isset($data["galleryName"], $data["exhibitName"], $data["exhibitCode"],
    $data["exhibitProblem"], $data["concernSection"])
) {
    $galleryName = $data["galleryName"];
    $exhibitName = $data["exhibitName"];
    $exhibitCode = $data["exhibitCode"];
    $exhibitProblem = $data["exhibitProblem"];
    $concernSection = $data["concernSection"];

    $sql = "INSERT INTO complaints_nscd (galleryName, exhibitName, exhibitCode, exhibitProblem, concernSection, created_at)
            VALUES (?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $galleryName, $exhibitName, $exhibitCode, $exhibitProblem, $concernSection, $created_at);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Complaint submitted successfully"]);
    } else {
        echo json_encode(["error" => "Error submitting complaint: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid input data"]);
}

$conn->close();
?>
