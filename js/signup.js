document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signupForm');
  const outputContainer = document.getElementById('output');
  const submittedData = document.getElementById('submittedData');
  const clearBtn = document.getElementById('clearOutput');

  // Hide the Clear button by default
  clearBtn.style.display = 'none';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const entries = Array.from(formData.entries());

    let result = "<ul>";
    entries.forEach(([key, value]) => {
      result += `<li><strong>${key.replace(/([A-Z])/g, ' $1')}:</strong> ${value}</li>`;
    });
    result += "</ul>";

    submittedData.innerHTML = result;
    clearBtn.style.display = 'block'; // ShowS the clear button
    form.reset();
  });

  clearBtn.addEventListener('click', function () {
    submittedData.innerHTML = '';
    clearBtn.style.display = 'none'; // Hide the button again
  });
});
