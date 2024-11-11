const form_processing = document.getElementById("data_info")

async function send_data() {
    const formData = new FormData(form_processing);
    const url = 'http://127.0.0.1:8000/upload_file';

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'  // Adjust this if the server expects a different response format
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();  // Ensure response is in JSON format
        alert(JSON.stringify(data));  // Print response to alert

        form_processing.reset();
    } catch (e) {
        console.error(e);
        alert('There was a problem with the submission: ' + e.message);
    }
}

form_processing.addEventListener("submit", (event) => {
    event.preventDefault();
    send_data().catch(error => {
        console.error("Error in handleListFilesClick:", error);
    });
});