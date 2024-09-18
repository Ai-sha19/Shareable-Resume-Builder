// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    var usernameElement = document.getElementById("username");
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var educationElement = document.getElementById("education");
    var experienceElement = document.getElementById("experience");
    var skillsElement = document.getElementById("skills");
    if (!usernameElement || !nameElement || !emailElement || !phoneElement || !educationElement || !experienceElement || !skillsElement) {
        console.error("One or more elements are missing");
        return;
    }
    var resumeData = {
        username: usernameElement.value,
        name: nameElement.value,
        email: emailElement.value,
        phone: phoneElement.value,
        education: educationElement.value,
        experience: experienceElement.value,
        skills: skillsElement.value,
    };
    // Store resume data in localStorage
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    // Show generated resume
    displayResume(resumeData);
    // Generate shareable link
    generateShareableLink(resumeData.username);
    // Enable PDF download functionality
    attachPdfDownloadListener();
}
// Function to display the generated resume
function displayResume(resumeData) {
    var resumeOutput = "\n        <h2>Resume</h2>\n\n        <h3>Personal Information</h3>\n        <p><strong>Username:</strong> ".concat(resumeData.username, "</p>\n        <p><strong>Name:</strong> ").concat(resumeData.name, "</p>\n        <p><strong>Email:</strong> ").concat(resumeData.email, "</p>\n        <p><strong>Phone:</strong> ").concat(resumeData.phone, "</p>\n\n        <h3>Education</h3>\n        <p>").concat(resumeData.education, "</p>\n\n        <h3>Experience</h3>\n        <p>").concat(resumeData.experience, "</p>\n\n        <h3>Skills</h3>\n        <p>").concat(resumeData.skills, "</p>\n    ");
    var resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
    }
}
// Function to handle toggling between Edit and Save modes
function toggleEditMode() {
    var editButton = document.getElementById("editButton");
    if (!editButton)
        return;
    var editableElements = document.querySelectorAll(".editable");
    if (editButton.textContent === "Edit") {
        // Switch to edit mode
        editableElements.forEach(function (element) {
            if (element instanceof HTMLElement) {
                element.contentEditable = "true";
                element.classList.add("editing");
            }
        });
        editButton.textContent = "Save";
    }
    else {
        // Switch to save mode
        editableElements.forEach(function (element) {
            if (element instanceof HTMLElement) {
                element.contentEditable = "false";
                element.classList.remove("editing");
            }
        });
        editButton.textContent = "Edit";
    }
}
// Attach event listeners only once
function attachEventListeners() {
    var formElement = document.getElementById("resumeForm");
    var editButton = document.getElementById("editButton");
    if (formElement) {
        formElement.addEventListener("submit", handleFormSubmit);
    }
    if (editButton) {
        editButton.addEventListener("click", toggleEditMode);
    }
}
// Generate a shareable link
function generateShareableLink(username) {
    var shareableLinkContainer = document.getElementById('shareable-link-container');
    var shareableLinkElement = document.getElementById('shareable-link');
    if (username) {
        var shareableURL = "".concat(window.location.origin, "?view=resume&username=").concat(encodeURIComponent(username));
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    }
    else {
        console.error("Username is missing");
    }
}
// Handle PDF download
function attachPdfDownloadListener() {
    var downloadPdfButton = document.getElementById('download-pdf');
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', function () {
            window.print(); // This will open the print dialog to save as PDF
        });
    }
    else {
        console.error("Download PDF button is missing");
    }
}
// Retrieve resume data from localStorage on page load and handle view mode
window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var view = urlParams.get("view");
    var resumeData = localStorage.getItem("resumeData");
    if (view === "resume" && resumeData) {
        var parsedData = JSON.parse(resumeData);
        displayResume(parsedData);
        // Hide form and edit button if viewing resume
        var formElement = document.getElementById("resumeForm");
        var editButton = document.getElementById("editButton");
        if (formElement)
            formElement.style.display = "none";
        if (editButton)
            editButton.style.display = "none";
    }
};
// Initialize the script
attachEventListeners();
