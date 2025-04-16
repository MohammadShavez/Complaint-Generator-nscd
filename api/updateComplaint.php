// updateComplaint.php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"));

include "db.php";

$sql = "UPDATE complaints SET 
    galleryName=?, 
    exhibitName=?, 
    exhibitCode=?, 
    exhibitProblem=?, 
    concernSection=? 
    WHERE id=?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", 
    $data->galleryName, 
    $data->exhibitName, 
    $data->exhibitCode, 
    $data->exhibitProblem, 
    $data->concernSection, 
    $data->id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
