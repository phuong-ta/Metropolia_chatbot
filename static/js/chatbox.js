async function send_message_to_server() {
    const userInput = document.getElementById('text-area').value;
    // Define the request options
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: userInput})
    };
    try {
        // Call the endpoint
        const response = await fetch('http://127.0.0.1:8000/chat', requestOptions);
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } // Parse the JSON from the response
        const data = await response.json();
        // Add the response to bot-message
        addMessageToChatbox("bot", data.response);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function addMessageToChatbox(sender, message) {
    const chatbox = document.querySelector(".chatbox"); // Ensure this class is in the chatbox div

    // Create a new message element
    const messageElement = document.createElement("div");
    messageElement.className = sender === "user" ? "user-message" : "bot-response";
    messageElement.textContent = message;

    // Append the message element to the chatbox
    chatbox.appendChild(messageElement);

    // Optionally scroll to the bottom of the chatbox for new messages
    chatbox.scrollTop = chatbox.scrollHeight;
}

function send_message() {
    // Get the user input from the text area
    const userInput = document.getElementById("text-area").value.trim();

    // Check if user input is not empty
    if (userInput) {
        // Show the user message in the user-message div
        addMessageToChatbox("user", userInput);

        // Clear the text area after displaying the message
        document.getElementById("text-area").value = "";
        console.log("hello");
        // Call fetchFiles with the user's message to get the server response
        send_message_to_server(userInput);
    }
}

// Event listener to trigger sendMessage on Enter key press
document.getElementById("text-area").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        send_message();
    }
});









