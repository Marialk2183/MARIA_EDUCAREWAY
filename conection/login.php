<?php
session_start();  // Start session to store user login information

// Database connection credentials
$servername = "localhost";
$username = "root";  // Default XAMPP MySQL username
$password = "";      // Default XAMPP MySQL password (usually empty)
$dbname = "login_system";  // Replace with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle the POST request from the login form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sapid = $_POST['sapid'];
    $password = $_POST['password'];

    // Query to check if the sapid exists and retrieve the password
    $sql = "SELECT * FROM student WHERE sapid = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $sapid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch user data
        $user = $result->fetch_assoc();
        // Verify the password (assumes the password is hashed in the database)
        if (password_verify($password, $user['password'])) {
            // Successful login
            $_SESSION['sapid'] = $user['sapid'];  // Store student information in session
            header("Location: project.php");      // Redirect to home/project page
            exit();
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "Invalid SAP ID.";
    }
    $stmt->close();
}
$conn->close();
?>
