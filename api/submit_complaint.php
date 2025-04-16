<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$galleryName = $data['galleryName'];
$exhibitCode = $data['exhibitCode'];
$exhibitName = $data['exhibitName'];
$exhibitProblem = $data['exhibitProblem'];
$concernSection = $data['concernSection'];

$sql = "INSERT INTO complaints (galleryName, exhibitCode, exhibitName, exhibitProblem, concernSection)
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $galleryName, $exhibitCode, $exhibitName, $exhibitProblem, $concernSection);

$response = [];

if ($stmt->execute()) {
    $response['message'] = "Complaint submitted successfully.";
} else {
    $response['error'] = "Error submitting complaint.";
}

echo json_encode($response);

$conn->close();
?>
