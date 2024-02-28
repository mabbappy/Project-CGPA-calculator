document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById('add');
  const calculateBtn = document.getElementById('final-calculate'); // Changed the id to final-calculate
  const courseWrapper = document.querySelector('.courseWrapper');
  const showResult = document.getElementById('final-cgpa'); // Changed the id to final-cgpa

  // Function to add a new course form
  addBtn.addEventListener("click", () => {
    const newForm = document.createElement("form");
    newForm.classList.add('form');

    const newField = `
      <div class="inputField">
         <input type="text" placeholder="Course Name" class="CourseNameField" required>
         <input type="number" placeholder="Credit Units" class="CreditField" value="" required>
         <select class="gradeField" required>
            <option class="grade" value="select">Select</option>
            <option class="grade" value="A+">A+</option>
            <option class="grade" value="A">A</option>
            <option class="grade" value="A-">A-</option>
            <option class="grade" value="B+">B+</option>
            <option class="grade" value="B">B</option>
            <option class="grade" value="B-">B-</option>
            <option class="grade" value="C+">C+</option>
            <option class="grade" value="C">C</option>
            <option class="grade" value="D">D</option>
            <option class="grade" value="F">F</option>
         </select>
         <div class="deleteBtnWrap"><button class="deleteBtn" value="">-</button></div>
      </div>
    `;

    newForm.innerHTML = newField;
    courseWrapper.appendChild(newForm);
  });

  // Function to remove the last added course form
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('deleteBtn')) {
      const formToDelete = e.target.closest('.form');
      if (formToDelete) {
        courseWrapper.removeChild(formToDelete);
      }
    }
  });

  // Function to calculate CGPA
  calculateBtn.addEventListener("click", () => {
    const courseForms = document.querySelectorAll('.form');
    let totalCredits = 0;
    let totalGradePoints = 0;

    courseForms.forEach((form) => {
      const creditInput = form.querySelector('.CreditField');
      const gradeSelect = form.querySelector('.gradeField');

      if (creditInput.value !== "" && gradeSelect.value !== "select") {
        const credit = parseFloat(creditInput.value);
        totalCredits += credit;

        const grade = getGradePoint(gradeSelect.value);
        totalGradePoints += credit * grade;
      }
    });

    if (totalCredits > 0) {
      const cgpa = totalGradePoints / totalCredits;
      showResult.textContent = `CGPA: ${cgpa.toFixed(2)}`;
    } else {
      showResult.textContent = `Please add courses to calculate CGPA.`;
    }
  });

  // Helper function to get grade points for the selected grade
  function getGradePoint(grade) {
    switch (grade) {
      case "A+":
        return 4.00;
      case "A":
        return 4.00;
      case "A-":
        return 3.70;
      case "B+":
        return 3.30;
      case "B":
        return 3.00;
      case "B-":
        return 2.70;
      case "C+":
        return 2.30;
      case "C":
        return 2.00;
      case "D":
        return 1.00;
      case "F":
        return 0.00;
      default:
        return 0.00;
    }
  }
});
