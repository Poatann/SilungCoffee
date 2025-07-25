document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signupForm');
  const output = document.getElementById('output');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const entries = Array.from(formData.entries());

    let result = "<ul>";
    entries.forEach(([key, value]) => {
      result += `<li><strong>${key.replace(/([A-Z])/g, ' $1')}:</strong> ${value}</li>`;
    });
    result += "</ul>";

    output.innerHTML = result;
    form.reset(); 
  });
});
