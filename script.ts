// Function to handle form submission
function handleFormSubmit(event: Event): void {
    event.preventDefault();

    const usernameElement = document.getElementById("username") as HTMLInputElement | null;
    const nameElement = document.getElementById("name") as HTMLInputElement | null;
    const emailElement = document.getElementById("email") as HTMLInputElement | null;
    const phoneElement = document.getElementById("phone") as HTMLInputElement | null;
    const educationElement = document.getElementById("education") as HTMLTextAreaElement | null;
    const experienceElement = document.getElementById("experience") as HTMLTextAreaElement | null;
    const skillsElement = document.getElementById("skills") as HTMLTextAreaElement | null;

    if (!usernameElement || !nameElement || !emailElement || !phoneElement || !educationElement || !experienceElement || !skillsElement) {
        console.error("One or more elements are missing");
        return;
    }

    const resumeData = {
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
function displayResume(resumeData: any): void {
    const resumeOutput = `
        <h2>Resume</h2>

        <h3>Personal Information</h3>
        <p><strong>Username:</strong> ${resumeData.username}</p>
        <p><strong>Name:</strong> ${resumeData.name}</p>
        <p><strong>Email:</strong> ${resumeData.email}</p>
        <p><strong>Phone:</strong> ${resumeData.phone}</p>

        <h3>Education</h3>
        <p>${resumeData.education}</p>

        <h3>Experience</h3>
        <p>${resumeData.experience}</p>

        <h3>Skills</h3>
        <p>${resumeData.skills}</p>
    `;

    const resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
    }
}

// Function to handle toggling between Edit and Save modes
function toggleEditMode(): void {
    const editButton = document.getElementById("editButton") as HTMLButtonElement | null;
    if (!editButton) return;

    const editableElements = document.querySelectorAll(".editable");

    if (editButton.textContent === "Edit") {
        // Switch to edit mode
        editableElements.forEach((element) => {
            if (element instanceof HTMLElement) {
                element.contentEditable = "true";
                element.classList.add("editing");
            }
        });
        editButton.textContent = "Save";
    } else {
        // Switch to save mode
        editableElements.forEach((element) => {
            if (element instanceof HTMLElement) {
                element.contentEditable = "false";
                element.classList.remove("editing");
            }
        });
        editButton.textContent = "Edit";
    }
}

// Attach event listeners only once
function attachEventListeners(): void {
    const formElement = document.getElementById("resumeForm");
    const editButton = document.getElementById("editButton");

    if (formElement) {
        formElement.addEventListener("submit", handleFormSubmit);
    }

    if (editButton) {
        editButton.addEventListener("click", toggleEditMode);
    }
}

// Generate a shareable link
function generateShareableLink(username: string): void {
    const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
    const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;

    if (username) {
        const shareableURL = `${window.location.origin}?view=resume&username=${encodeURIComponent(username)}`;
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    } else {
        console.error("Username is missing");
    }
}

// Handle PDF download
function attachPdfDownloadListener(): void {
    const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', () => {
            window.print(); // This will open the print dialog to save as PDF
        });
    } else {
        console.error("Download PDF button is missing");
    }
}

// Retrieve resume data from localStorage on page load and handle view mode
window.onload = function (): void {
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get("view");
    const resumeData = localStorage.getItem("resumeData");

    if (view === "resume" && resumeData) {
        const parsedData = JSON.parse(resumeData);
        displayResume(parsedData);

        // Hide form and edit button if viewing resume
        const formElement = document.getElementById("resumeForm") as HTMLElement;
        const editButton = document.getElementById("editButton") as HTMLElement;
        if (formElement) formElement.style.display = "none";
        if (editButton) editButton.style.display = "none";
    }
};

// Initialize the script
attachEventListeners();
