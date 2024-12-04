<?php
$mysqli = new mysqli("localhost:3308", "root", "", "solicitudes");

if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}

if (isset($_GET['id']) && isset($_POST['decision'])) {
    $solicitud_id = $_GET['id'];
    $decision = $_POST['decision'];

    $query = "INSERT INTO solicitudes_decision (solicitud_id, decision) VALUES (?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("is", $solicitud_id, $decision);

    if ($stmt->execute()) {
        header("Location: solicitudes.php");
        exit();
    } else {
        echo "Error al guardar la decisión: " . $mysqli->error;
    }
} else {
    echo "Solicitud inválida.";
}

$mysqli->close();
?>
