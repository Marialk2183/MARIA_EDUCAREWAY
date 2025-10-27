<?php
session_start();
if (!isset($_SESSION['sapid'])) {
    header("Location: login.html");  // Redirect to login if not authenticated
    exit();
}
?>
<!-- Protected content for logged-in users -->
<h1>Welcome, <?php echo htmlspecialchars($_SESSION['sapid']); ?>!</h1>
