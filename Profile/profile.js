document.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("userName");

  if (!userName) {
    console.error("No user is logged in.");
    return;
  }

  fetch("http://127.0.0.1:8000/api/customer") // Replace with your actual API URL
    .then(response => response.json())
    .then(json => {
      const allCustomers = json.data;

      // Find the customer that matches the logged-in username
      const currentUser = allCustomers.find(customer => customer.name === userName);

      if (!currentUser) {
        console.error("User not found in customer list.");
        return;
      }

      // Populate the form fields
      document.getElementById("fullName").value = currentUser.name || "";
      document.getElementById("contactNumber").value = currentUser.phonenumber || "";
      document.getElementById("password").value = "********"; // Hide actual hashed password

      // Now, simply populate the "address" field with the value from the customer record
      document.getElementById("address").value = currentUser.address || ""; // Address is now from the customer table
    })
    .catch(err => console.error("Error loading data:", err));
});
