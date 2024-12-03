<?php
// Conectar a la base de datos
$mysqli = new mysqli("localhost:3308", "root", "", "solicitudes");

if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}

// Recuperar solicitudes que no han sido aprobadas ni rechazadas
$query = "SELECT * FROM solicitudes_cambio WHERE id NOT IN (SELECT solicitud_id FROM solicitudes_decision)";
$result = $mysqli->query($query);

// Mostrar mensaje si no hay solicitudes
if ($result->num_rows == 0) {
    echo "<p>No hay solicitudes pendientes.</p>";
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitudes de Cambio</title>
    <style>
        /* Estilos de la tabla */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #0d47a1;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
        }
        th {
            background-color: #0d47a1;
            color: white;
        }
        .button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        .approve {
            background-color: #4caf50;
            color: white;
        }
        .reject {
            background-color: #f44336;
            color: white;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Solicitudes de Cambio</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Fecha</th>
                    <th>Proyecto</th>
                    <th>Solicitante</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Mostrar cada solicitud pendiente
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['titulo'] . "</td>";
                    echo "<td>" . $row['fecha'] . "</td>";
                    echo "<td>" . $row['proyecto'] . "</td>";
                    echo "<td>" . $row['solicitante'] . "</td>";
                    echo "<td>
                            <form method='POST' style='display:inline;'>
                                <button type='submit' class='button approve' name='decision' value='aprobado' formaction='decision.php?id=" . $row['id'] . "'>Aprobar</button>
                                <button type='submit' class='button reject' name='decision' value='rechazado' formaction='decision.php?id=" . $row['id'] . "'>Rechazar</button>
                            </form>
                          </td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>

</body>
</html>

<?php
$mysqli->close();
?>
