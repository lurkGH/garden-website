function loadHTML(tagName, filePath) {
    const elements = document.getElementsByTagName(tagName);
    if (elements.length > 0) {
      fetch(filePath)
        .then(function(response) {
          return response.text();
        })
        .then(function(data) {
          elements[0].innerHTML = data;
        })
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    loadHTML("header", "./components/header.html");
    loadHTML("nav", "./components/nav.html");
    loadHTML("footer", "./components/footer.html");
  });