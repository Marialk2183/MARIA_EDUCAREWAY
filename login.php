<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sapid = $_POST['sapid'];
    $password = $_POST['password'];
    $errorMsg = "";

    // Validate SAP ID (11 digits only)
    if (!preg_match('/^\d{11}$/', $sapid)) {
        $errorMsg = "SAP ID must be exactly 11 digits.";
    }

    if (empty($errorMsg)) {
        // Database connection
        $conn = new mysqli('localhost', 'username', 'password', 'user_auth'); // Update with your DB credentials

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("SELECT password FROM users WHERE sapid = ?");
        $stmt->bind_param("s", $sapid);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($hashedPassword);
            $stmt->fetch();

            if (password_verify($password, $hashedPassword)) {
                $_SESSION['sapid'] = $sapid; // Store the session
                // Redirect to the home page
                header("Location: project.php");
                exit();
            } else {
                $errorMsg = "Invalid SAP ID or password.";
            }
        } else {
            $errorMsg = "Invalid SAP ID or password.";
        }

        $stmt->close();
        $conn->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <style>
        /* Styles here... */
        /* (Add your existing CSS styles from the previous code) */
    </style>
</head>
<body>
    <div class="navbar">
        <a href="#">Home</a>
        <a id="logoutLink" href="#">Logout</a>
    </div>

    <div class="login-container">
        <h2>Login</h2>
        <form id="loginForm" action="login.php" method="POST">
            <div class="input-group">
                <label for="sapid">Sapid</label>
                <input type="text" id="sapid" name="sapid" pattern="\d{11}" placeholder="Enter your 11-digit SAP ID" required>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
            </div>
            <button type="submit" class="btn">Login</button>
        </form>
        <?php if (isset($errorMsg) && !empty($errorMsg)): ?>
            <p id="error-msg"><?= $errorMsg; ?></p>
        <?php endif; ?>
    </div>

    <script>
        document.getElementById('logoutLink').addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = "NMIMS.html"; 
        });
    </script>
</body>
</html>
