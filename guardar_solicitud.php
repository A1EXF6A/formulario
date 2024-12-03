<?php
// Incluir el archivo de conexión
include('conexion.php');

// Verificar si la conexión se realizó correctamente
if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

try {
    // Recopilar datos del formulario
    $titulo = $_POST['titulo'];
    $fecha = $_POST['fecha'];
    $proyecto = $_POST['proyecto'];
    $solicitante = $_POST['solicitante'];
    $departamento = $_POST['departamento'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $gerente = $_POST['gerente'];
    $descripcion = $_POST['descripcion'];
    $tipos = isset($_POST['tipo']) ? implode(', ', $_POST['tipo']) : ''; // Unir los valores seleccionados

    // Guardar archivos adjuntos
    $archivos_guardados = [];
    if (!empty($_FILES['adjuntos']['name'][0])) {
        $directorio = 'uploads/';
        if (!is_dir($directorio)) {
            mkdir($directorio, 0777, true); // Crear el directorio si no existe
        }

        foreach ($_FILES['adjuntos']['tmp_name'] as $index => $tmp_name) {
            $nombre_archivo = basename($_FILES['adjuntos']['name'][$index]);
            $ruta_destino = $directorio . $nombre_archivo;
            if (move_uploaded_file($tmp_name, $ruta_destino)) {
                $archivos_guardados[] = $ruta_destino;
            }
        }
    }

    // Convertir la lista de archivos en texto para guardar en la base de datos
    $archivos = implode(', ', $archivos_guardados);

    // Preparar la consulta SQL
    $sql = "INSERT INTO solicitudes_cambio (
                titulo, fecha, proyecto, solicitante, departamento, email, telefono, gerente, tipo, descripcion, archivos
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )";

    // Preparar la consulta para evitar inyecciones SQL
    $stmt = mysqli_prepare($conexion, $sql);
    if (!$stmt) {
        throw new Exception("Error al preparar la consulta: " . mysqli_error($conexion));
    }

    // Vincular los parámetros
    mysqli_stmt_bind_param($stmt, 'sssssssssss', $titulo, $fecha, $proyecto, $solicitante, $departamento, $email, $telefono, $gerente, $tipos, $descripcion, $archivos);

    // Ejecutar la consulta
   // Si se guardó correctamente, redirigir al index con un mensaje de éxito
if (mysqli_stmt_execute($stmt)) {
    header("Location: index.html?mensaje=exito");
    exit(); // Asegúrate de detener el script después de redirigir
} else {
    header("Location: index.html?mensaje=error");
    exit();
}


    // Cerrar la consulta
    mysqli_stmt_close($stmt);

} catch (Exception $e) {
    echo "Error al guardar la solicitud: " . $e->getMessage();
}

// Cerrar la conexión
mysqli_close($conexion);
?>
