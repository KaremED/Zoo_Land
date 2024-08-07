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
  xhr.open(
    "POST",
    "https://d068-156-38-50-192.ngrok-free.app/zoo_land/process/image",
    true
  );

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
async function responseMethod(response) {
  // Get the main and response containers
  let mainCont = document.getElementById("mainContainer");
  let responseContainer = document.getElementById("responseContainer");

  // Display the uploaded image in the response image element
  let fileInput = document.getElementById("fileInput");
  let file = fileInput.files[0];
  let objectURL = URL.createObjectURL(file);
  document.getElementById("respImg").src = objectURL;
  document.getElementById("respImg").style.width = "100%";
  document.getElementById("respImg").style.height = "100%";

  // Populate the response text with animal information
  document.getElementById("animalType").textContent = response.AnimalType;
  document.getElementById("animalName").textContent = response.name;
  let probability = response.prob * 100;
  document.getElementById("animalProbability").textContent =
    probability.toFixed(1) + "%";
  document.getElementById("animalDescription").textContent =
    response.description;

  console.log("Success:", response);

  // Hide the main container and show the response container
  await fadeOut(mainCont);
  await fadeIn(responseContainer);
}

// Function to reset the form and go back to the main page
async function resetForm() {
  // Get the main and response containers
  let mainCont = document.getElementById("mainContainer");
  let responseContainer = document.getElementById("responseContainer");

  // Reset the file input and uploaded image display
  document.getElementById("fileInput").value = "";
  document.getElementById("uploadImg").src = "../assets/uploadimg.svg";
  document.getElementById("uploadImg").style.width = "150px";
  document.getElementById("uploadImg").style.height = "150px";
  document.getElementById("upText").classList.remove("hidden");

  // Clear the response text fields
  document.getElementById("animalName").textContent = "";
  document.getElementById("animalProbability").textContent = "";
  document.getElementById("animalDescription").textContent = "";
  // Hide the response container and show the main container
  await fadeOut(responseContainer);
  await fadeIn(mainCont);
}

// Fade out animation function
function fadeOut(target, duration = 500) {
  return new Promise((resolve) => {
    const animationEnded = () => {
      target.style.display = "none";
      target.onanimationend = null;
      target.style.animation = null;
      resolve();
    };
    target.onanimationend = animationEnded;
    target.style.animation = `fade-out ${duration}ms 1`;
  });
}

// Fade in animation function
function fadeIn(target, duration = 500, display = "block") {
  return new Promise((resolve) => {
    const animationEnded = () => {
      target.onanimationend = null;
      target.style.animation = null;
      resolve();
    };
    target.onanimationend = animationEnded;
    target.style.display = display;
    target.style.animation = `fade-in ${duration}ms 1`;
  });
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
