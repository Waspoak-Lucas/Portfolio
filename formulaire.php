<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Destinataire
    $to = "lucaswpk@gmail.com";

    // Sujet du mail
    $subject = "New contact form submission from $name";

    // Contenu du message
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    // En-têtes du mail
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Envoyer l'email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
}
?>
