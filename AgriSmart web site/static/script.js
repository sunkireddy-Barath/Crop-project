// script.js

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animate all sections on scroll
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
  gsap.fromTo(section,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );
});

// 🌾 Handle form submission and predict crop
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('cropForm');
  const resultDiv = document.getElementById('predictionResult');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Convert input values to numbers
      for (let key in data) {
        data[key] = parseFloat(data[key]);
      }

      try {
        const response = await fetch('/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.crop) {
          resultDiv.innerText = `🌿 Recommended Crop: ${result.crop}`;
          resultDiv.style.color = "#2e7d32";
        } else {
          resultDiv.innerText = `❌ Error: ${result.error}`;
          resultDiv.style.color = "red";
        }
      } catch (error) {
        resultDiv.innerText = "❌ Failed to connect to the server.";
        resultDiv.style.color = "red";
      }
    });
  }
});
