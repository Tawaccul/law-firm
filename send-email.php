<?php
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получение данных из тела запроса
    $data = json_decode(file_get_contents("php://input"), true);

    // Проверяем, что все необходимые поля заполнены
    if (isset($data['name'], $data['phone'], $data['email'], $data['service'])) {
        $name    = htmlspecialchars(trim($data['name']));
        $phone   = htmlspecialchars(trim($data['phone']));
        $email   = htmlspecialchars(trim($data['email']));
        $service = htmlspecialchars(trim($data['service']));

        // Список получателей через запятую
        $to = "tawaccul@gmail.com, mka.solidarnost@gmail.com";

        // Тема письма
        $subject = "Новая заявка с сайта mka-solidarnost.ru";

        // Формирование тела письма
        $message  = "Имя: $name\n";
        $message .= "Телефон: $phone\n";
        $message .= "Email: $email\n";
        $message .= "Услуга: $service\n";

        // Заголовки письма
        $headers  = "From: no-reply@mka-solidarnost.ru\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Отправка письма
        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(["message" => "Заявка успешно отправлена."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Не удалось отправить письмо. Попробуйте позже."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Некорректные данные."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Метод запроса не поддерживается."]);
}
