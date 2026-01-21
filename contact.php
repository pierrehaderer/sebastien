<?php
// Configuration
$to_email = "contact@druzila67informatique.fr";
$subject_prefix = "Contact depuis druzila67informatique.fr";

// Vérification de la méthode POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: contact.html");
    exit;
}

// Protection anti-spam (honeypot)
if (isset($_POST['website']) && !empty($_POST['website'])) {
    // C'est probablement un bot, on ignore silencieusement
    header("Location: contact.html?success=1");
    exit;
}

// Récupération et nettoyage des données
$nom_complet = isset($_POST['nom_complet']) ? trim($_POST['nom_complet']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$telephone = isset($_POST['telephone']) ? trim($_POST['telephone']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$appareil = isset($_POST['appareil']) ? trim($_POST['appareil']) : '';
$type_probleme = isset($_POST['type_probleme']) ? trim($_POST['type_probleme']) : '';
$creneau = isset($_POST['creneau']) ? trim($_POST['creneau']) : '';

// Validation
$errors = [];

if (empty($email)) {
    $errors[] = "L'adresse email est obligatoire.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "L'adresse email n'est pas valide.";
}

if (empty($message)) {
    $errors[] = "Le message est obligatoire.";
}

// Si des erreurs, rediriger vers le formulaire avec les erreurs
if (!empty($errors)) {
    $error_message = implode(" ", $errors);
    header("Location: contact.html?error=" . urlencode($error_message));
    exit;
}

// Préparation de l'email
$subject = $subject_prefix . " - " . ($nom_complet ? $nom_complet : "Sans nom");

// Construction du corps du message
$email_body = "Nouveau message depuis le formulaire de contact\n\n";
$email_body .= "=== Informations du contact ===\n";
if ($nom_complet) {
    $email_body .= "Nom complet : " . htmlspecialchars($nom_complet) . "\n";
}
$email_body .= "Email : " . htmlspecialchars($email) . "\n";
if ($telephone) {
    $email_body .= "Téléphone : " . htmlspecialchars($telephone) . "\n";
}
if ($appareil) {
    $email_body .= "Appareil : " . htmlspecialchars($appareil) . "\n";
}
if ($type_probleme) {
    $email_body .= "Type de problème : " . htmlspecialchars($type_probleme) . "\n";
}
if ($creneau) {
    $email_body .= "Créneau horaire souhaité : " . htmlspecialchars($creneau) . "\n";
}
$email_body .= "\n=== Message ===\n";
$email_body .= htmlspecialchars($message) . "\n";
$email_body .= "\n---\n";
$email_body .= "Date : " . date('d/m/Y à H:i:s') . "\n";
$email_body .= "IP : " . $_SERVER['REMOTE_ADDR'] . "\n";

// En-têtes de l'email
$headers = [];
$headers[] = "From: " . $email;
$headers[] = "Reply-To: " . $email;
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// Envoi de l'email
$mail_sent = @mail($to_email, $subject, $email_body, implode("\r\n", $headers));

// Déterminer la page de redirection (wizard depuis index.html ou formulaire depuis contact.html)
$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
$redirect_page = (strpos($referer, 'index.html') !== false || $appareil || $type_probleme) ? 'index.html' : 'contact.html';

// Redirection selon le résultat
if ($mail_sent) {
    // Email envoyé avec succès
    header("Location: " . $redirect_page . "?success=1");
} else {
    // Erreur lors de l'envoi
    header("Location: " . $redirect_page . "?error=" . urlencode("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer ou nous contacter directement par téléphone."));
}
exit;
?>

