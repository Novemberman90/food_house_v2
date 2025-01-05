 <?php
 // для работы с локальным сервером
// $_POST = json_decode(file_get_contents("php://input"), true); // это позволяет рабоать с JSON
// echo var_dump($_POST);

$method = $_SERVER['REQUEST_METHOD'];
$c = true;

// Декодируем JSON, чтобы работать с данными
$_POST = json_decode(file_get_contents("php://input"), true); 

if ($_POST) {
    $project_name = trim($_POST["project_name"]);
    $admin_email  = trim($_POST["admin_email"]);
    $form_subject = trim($_POST["form_subject"]);

    $message = "";
    foreach ($_POST as $key => $value) {
        if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
            $message .= "
            " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
                <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
            </tr>
            ";
        }
    }

    $message = "<table style='width: 100%;'>$message</table>";

    $headers = "MIME-Version: 1.0" . "\r\n" .
        "Content-Type: text/html; charset=utf-8" . "\r\n" .
        "From: " . adopt($project_name) . " <" . $admin_email . ">" . "\r\n" .
        "Reply-To: " . $admin_email . "" . "\r\n";

    // Отправляем почту
    $mail_sent = mail($admin_email, adopt($form_subject), $message, $headers);

    // Возвращаем JSON-ответ
    if ($mail_sent) {
        echo json_encode(["message" => "Сообщение отправлено успешно!"]);
    } else {
        echo json_encode(["message" => "Ошибка отправки сообщения."]);
    }
} else {
    echo json_encode(["message" => "Некорректные данные."]);
}

// Функция кодирования заголовков письма
function adopt($text) {
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

