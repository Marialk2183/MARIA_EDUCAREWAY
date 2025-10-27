<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sapid = $_POST['sapid'];
    $password = $_POST['password'];
    $errorMsg = "";

    // Validate SAP ID (11 digits only)
    if (!preg_match('/^\d{11}$/', $sapid)) {
        $errorMsg = "SAP ID must be exactly 11 digits.";
    }

    // Validate Username (7 characters, including at least one special character)
    if (!preg_match('/^(?=.*[\W_]).{7}$/', $username)) {
        $errorMsg .= " Username must be exactly 7 characters, including a special character.";
    }

    if (empty($errorMsg)) {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Database connection
        $conn = new mysqli('localhost', 'username', 'password', 'user_auth'); // Update with your DB credentials

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Insert user into the database
        $stmt = $conn->prepare("INSERT INTO users (sapid, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $sapid, $hashedPassword);

        if ($stmt->execute()) {
            $successMsg = "Registration successful! You can now log in.";
        } else {
            $errorMsg = "Error: " . $stmt->error;
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
    <title>Signup Page</title>
    <style>
        /* Styles here... */
        /* (Add your existing CSS styles) */
    </style>
</head>
<body>
    <div class="signup-container">
        <h2>Signup</h2>
        <form action="signup.php" method="POST">
            <div class="input-group">
                <label for="sapid">Sapid</label>
                <input type="text" id="sapid" name="sapid" pattern="\d{11}" placeholder="Enter your 11-digit SAP ID" required>
            </div>
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" pattern="(?=.*[\W_]).{7}" placeholder="7 chars including special chars" required>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
            </div>
            <button type="submit" class="btn">Signup</button>
        </form>
        <?php if (isset($successMsg)): ?>
            <p id="success-msg"><?= $successMsg; ?></p>
        <?php endif; ?>
        <?php if (isset($errorMsg) && !empty($errorMsg)): ?>
            <p id="error-msg"><?= $errorMsg; ?></p>
        <?php endif; ?>
    </div>
</body>
</html>
