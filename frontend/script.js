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
  formData.append("image", file);

  fetch("http://localhost:8000/zoo_land/process/image", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Image uploaded successfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Image upload failed.");
    });
});
