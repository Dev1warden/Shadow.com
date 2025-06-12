const API_URL = "http://localhost:3000/api/send-email";

// Send Email
document.getElementById("send-email-btn").addEventListener("click", async () => {
  const to = document.getElementById("compose-to").value;
  const subject = document.getElementById("compose-subject").value;
  const body = document.getElementById("compose-body").value;
  const feedback = document.getElementById("compose-feedback");

  // Validate inputs
  if (!to || !subject || !body) {
    feedback.textContent = "Please fill in all fields.";
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, body }),
    });

    const data = await response.json();
    if (response.ok) {
      feedback.textContent = data.message;
      document.getElementById("compose-to").value = "";
      document.getElementById("compose-subject").value = "";
      document.getElementById("compose-body").value = "";
    } else {
      feedback.textContent = data.error || "Failed to send email.";
    }
  } catch (error) {
    console.error("Error:", error);
    feedback.textContent = "An error occurred. Please try again.";
  }
});
