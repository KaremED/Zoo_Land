document.getElementById("photobox").addEventListener("click", function () {
  document.getElementById("fileInput").click();
});

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      let objectURL = URL.createObjectURL(file);
      document.getElementById("uploadImg").src = objectURL;
      document.getElementById("uploadImg").style.width = "100%";
      document.getElementById("uploadImg").style.height = "100%";
      document.getElementById("upText").style.display = "none";
    }
  });

document.getElementById("upbutton").addEventListener("click", function () {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  console.log(file);
  if (!file) {
    alert("Please select an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8000/zoo_land/process/image", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        let mainCont = document.getElementById("mainContainer");
        mainCont.classList.add("hidden");
        let responseContainer = document.getElementById("responseContainer");
        responseContainer.classList.remove("hidden");
        console.log(response.name);
        console.log("Success:", response);
      } else {
        console.error("Error:", xhr.statusText);
        alert("Image upload failed.");
      }
    }
  };

  xhr.send(formData);
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
