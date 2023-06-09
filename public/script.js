const containerDisplay = document.getElementById("container");

fetch("http://localhost:3000/products/")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      // Create a new div element
      const productDiv = document.createElement("div");

      // Add a class to the div if desired
      productDiv.classList.add("product");

      // Create HTML content for each product
      const productName = "<h3>Title: " + item.name + "</h3>";
      const productPrice = "<h5>Price: " + item.price + "</h5>";
      const productQuantity = "<h6>Quantity: " + item.quantity + "</h6>";
      const productImage = `<img alt="(No Image)" src="${item.image}">`;
      const productId = `ID: ${item._id}`;

      const lineBreaker = `<br>`;

      // Insert the HTML content into the productDiv
      productDiv.insertAdjacentHTML("beforeend", productName);
      productDiv.insertAdjacentHTML("beforeend", productPrice);
      productDiv.insertAdjacentHTML("beforeend", productQuantity);
      productDiv.insertAdjacentHTML("beforeend", productImage);

      productDiv.insertAdjacentHTML("beforeend", lineBreaker);
      productDiv.insertAdjacentHTML("beforeend", productId);
      productDiv.insertAdjacentHTML("beforeend", lineBreaker);

      // Append the productDiv to containerDisplay
      containerDisplay.appendChild(productDiv);

      // Create a cancel button element
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.id = "cancelButton"
      cancelButton.addEventListener("click", () => {
        // Call the cancelProduct function and pass the item ID
        cancelProduct(item._id);
      });

      // Append the cancel button to the productDiv
      productDiv.appendChild(cancelButton);
    });
  })
  .catch((err) => console.log(err));

// Function to cancel a product
function cancelProduct(productId) {
  fetch(`/products/${productId}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data if needed
      console.log(data);
      location.reload() // Refresh page
    })
    .catch(err => console.log(err));
}
