const data = {
  name: "Anjali Gupta",
  email: "anjali@gmail.com",
  phone: "9876543210"
};

fetch("http://localhost:5000/api/v1/enquiry", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
  .then(async res => {
    console.log("Status:", res.status);
    try {
      console.log("Response Body:", await res.json());
    } catch (e) {
      console.log("Could not parse JSON response");
    }
  })
  .catch(err => {
    console.error("Fetch Error:", err);
  });
