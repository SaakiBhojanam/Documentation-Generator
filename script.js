document.getElementById("documentation-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const author = document.getElementById("author").value;
    const summary = document.getElementById("summary").value;
    const changes = document.getElementById("changes").value;
    const rationale = document.getElementById("rationale").value;
    const attachments = document.getElementById("attachments").files;
    const next_steps = document.getElementById("next_steps").value;
    const additional_notes = document.getElementById("additional_notes").value;

    // Handle the uploaded attachments (if any)
    let attachmentsList = '';
    if (attachments.length > 0) {
        for (let i = 0; i < attachments.length; i++) {
            const file = attachments[i];
            const fileType = file.type.startsWith('image') ? 'image' : 'video';
            const reader = new FileReader();

            reader.onload = function (event) {
                if (fileType === 'image') {
                    attachmentsList += `<img src="${event.target.result}" alt="${file.name}" width="300"><br>`;
                } else if (fileType === 'video') {
                    attachmentsList += `
                        <video controls width="300">
                            <source src="${event.target.result}" type="${file.type}">
                            Your browser does not support the video tag.
                        </video><br>`;
                }

                if (i === attachments.length - 1) {
                    // All attachments processed, generate the documentation message
                    showDocumentationMessage(attachmentsList);
                }
            };

            reader.readAsDataURL(file);
        }
    } else {
        // No attachments, generate the documentation message directly
        showDocumentationMessage(attachmentsList);
    }
});

function showDocumentationMessage(attachmentsList) {
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const author = document.getElementById("author").value;
    const summary = document.getElementById("summary").value;
    const changes = document.getElementById("changes").value;
    const rationale = document.getElementById("rationale").value;
    const next_steps = document.getElementById("next_steps").value;
    const additional_notes = document.getElementById("additional_notes").value;

    let documentationMessage = `
    <h2>Generated Documentation Message</h2>
    <p>Documentation Update - ${date}</p>
    <p>Project/Topic: ${title}</p>
    <p>Date: ${date}</p>
    <p>Author: ${author}</p>
    <p>Summary: ${summary}</p>
    <p>Changes Made: ${changes}</p>
    <p>Rationale: ${rationale}</p>
    <p>Next Steps: ${next_steps}</p>
    <p>Additional Notes: ${additional_notes}</p>
    `;

    // Add attachments section if there are attachments
    if (attachmentsList) {
        documentationMessage += `<p>Attachments:</p>${attachmentsList}`;
    }

    // Add the "Create Another Documentation" button
    documentationMessage += `<button id="create-another-btn">Create Another Documentation Message</button>`;

    document.getElementById("result-container").innerHTML = documentationMessage;

    document.getElementById("form-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";

    document.getElementById("result-container").addEventListener("click", function (event) {
        if (event.target.id === "create-another-btn") {
            document.getElementById("documentation-form").reset();
            document.getElementById("form-container").style.display = "block";
            document.getElementById("result-container").style.display = "none";
        }
    });
}
