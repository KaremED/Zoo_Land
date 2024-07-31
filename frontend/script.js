// Event listener for clicking on the main photobox to trigger file input click
document.getElementById("mainPhotobox").addEventListener("click", function () {
  document.getElementById("fileInput").click();
});

// Event listener for file input change to display the selected image
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the selected file and display it in the uploadImg element
      let objectURL = URL.createObjectURL(file);
      document.getElementById("uploadImg").src = objectURL;
      document.getElementById("uploadImg").style.width = "100%";
      document.getElementById("uploadImg").style.height = "100%";
      document.getElementById("upText").classList.add("hidden");
    }
  });

// Event listener for the upload button click to upload the image
document.getElementById("upbutton").addEventListener("click", function () {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  console.log(file);
  if (!file) {
    alert("Please select an image first.");
    return;
  }

  // Create FormData object and append the file
  const formData = new FormData();
  formData.append("file", file);

  // Create and configure the XMLHttpRequest to upload the image
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8000/zoo_land/process/image", true);

  // Event listener for the XMLHttpRequest state change
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Parse the response and call the responseMethod to handle the response
        const response = JSON.parse(xhr.responseText);
        responseMethod(response);
      } else {
        console.error("Error:", xhr.statusText);
        alert("Image upload failed.");
      }
    }
  };

  // Send the FormData object containing the file
  xhr.send(formData);
});

// Function to handle the response and display the animal information
function responseMethod(response) {
  // Hide the main container and show the response container
  let mainCont = document.getElementById("mainContainer");
  mainCont.classList.add("hidden");

  let responseContainer = document.getElementById("responseContainer");
  responseContainer.classList.remove("hidden");

  // Display the uploaded image in the response image element
  let fileInput = document.getElementById("fileInput");
  let file = fileInput.files[0];
  let objectURL = URL.createObjectURL(file);
  document.getElementById("respImg").src = objectURL;
  document.getElementById("respImg").style.width = "100%";
  document.getElementById("respImg").style.height = "100%";

  // Populate the response text with animal information
  document.getElementById("animalName").textContent = response.name;
  console.log(response.prob);
  let probability = response.prob * 100;
  document.getElementById("animalProbability").textContent =
    probability.toFixed(1) + "%";
  document.getElementById("animalDescription").textContent =
    response.description;

  console.log("Success:", response);
  return 0;
}
// Function to reset the form and go back to the main page
function resetForm() {
  // Hide the response container and show the main container
  document.getElementById("responseContainer").classList.add("hidden");
  document.getElementById("mainContainer").classList.remove("hidden");

  // Reset the file input and uploaded image display
  document.getElementById("fileInput").value = "";
  document.getElementById("uploadImg").src = "../assets/uploadfile.png";
  document.getElementById("uploadImg").style.width = "150px";
  document.getElementById("uploadImg").style.height = "150px";
  document.getElementById("upText").classList.remove("hidden");

  // Clear the response text fields
  document.getElementById("animalName").textContent = "";
  document.getElementById("animalProbability").textContent = "";
  document.getElementById("animalDescription").textContent = "";
}

// Event listener for the undo icon to reset the form
document.getElementById("undoicon").addEventListener("click", function () {
  resetForm();
});
//this code gives when you upload an image using fetch() method
//Erorr: 422 Unprocessable Entity

// document.getElementById("upbutton").addEventListener("click", function () {
//   const fileInput = document.getElementById("fileInput");
//   const file = fileInput.files[0];
//   console.log(file);
//   if (!file) {
//     alert("Please select an image first.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("image", file,);
//   fetch("http://localhost:8000/zoo_land/process/image", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//       alert("Image uploaded successfully!");
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("Image upload failed.");
//     });
// });
