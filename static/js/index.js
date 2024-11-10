async function fetchFiles() {
    try {
        const response = await fetch("http://127.0.0.1:8000/list_files");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        const fileContent = document.getElementById("fileContent");

        // Clear previous content
        fileContent.innerHTML = "";

        // Check if item_id array exists in the response
        if (data.data_files && data.data_files.length > 0) {
            data.data_files.forEach(file => {
                const fileItem = document.createElement("div");
                fileItem.textContent = file;
                fileItem.className = "file-item py-1";
                fileContent.appendChild(fileItem);
            });
        } else {
            fileContent.innerHTML = "<p class='text-muted'>No items available.</p>";
        }
    } catch (error) {
        console.error("Fetch error: ", error);
        document.getElementById("fileContent").innerHTML = "<p class='text-danger'>Error loading items.</p>";
    }
}

// New function to handle button click and call fetchFiles
function handleListFilesClick() {
    // Call fetchFiles() and handle any errors here
    fetchFiles().catch(error => {
        console.error("Error in handleListFilesClick:", error);
    });
}
