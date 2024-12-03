<?php
// Conectar a la base de datos
$mysqli = new mysqli("localhost:3308", "root", "", "solicitudes");

if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}

// Verificar si se recibió el ID de la solicitud y la decisión
if (isset($_GET['id']) && isset($_POST['decision'])) {
    $solicitud_id = $_GET['id'];
    $decision = $_POST['decision'];

    // Insertar la decisión en la tabla de decisiones
    $query = "INSERT INTO solicitudes_decision (solicitud_id, decision) VALUES (?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("is", $solicitud_id, $decision);

    if ($stmt->execute()) {
        // Redirigir al listado de solicitudes después de guardar la decisión
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
