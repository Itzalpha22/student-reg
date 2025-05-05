let students = [
    { name: "Ot41k1", class: "JSS1", score: 85 },
    { name: "Naomi", class: "JSS1", score: 42 },
    { name: "Silas", class: "JSS2", score: 65 },
    { name: "Joseph", class: "JSS2", score: 37 },
    { name: "Junia", class: "JSS3", score: 78 },
  ]; 
  
  // Grade function
  function getGrade(score) {
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    if (score >= 40) return "D";
    return "F";
  }
  
  // Group by key
  function groupBy(array, keyFn) {
    return array.reduce((acc, student) => {
      const key = keyFn(student);
      if (!acc[key]) acc[key] = [];
      acc[key].push(student);
      return acc;
    }, {});
  }
  
  // Render class containers with forms
  function renderClassGroups() {
    const container = document.getElementById("class-container");
    container.innerHTML = "";
  
    const classGroups = groupBy(students, s => s.class);
  
    Object.entries(classGroups).forEach(([className, studentsInClass]) => {
      const groupDiv = document.createElement("div");
      groupDiv.className = "group";
  
      const heading = document.createElement("h3");
      heading.textContent = `Class: ${className}`;
      groupDiv.appendChild(heading);
  
      const list = document.createElement("ul");
      studentsInClass.forEach(student => {
        const li = document.createElement("li");
        li.textContent = `${student.name} - Score: ${student.score}`;
        list.appendChild(li);
      });
      groupDiv.appendChild(list);
  
      // Add student form for this class
      const form = document.createElement("form");
      form.innerHTML = `
        <input type="text" name="name" placeholder="Student Name" required>
        <input type="number" name="score" placeholder="Score" min="0" max="100" required>
        <button type="submit">Add to ${className}</button>
      `;
  
      form.addEventListener("submit", e => {
        e.preventDefault();
        const name = form.name.value.trim();
        const score = parseInt(form.score.value, 10);
  
        if (!name || isNaN(score) || score < 0 || score > 100) {
          alert("Enter valid name and score (0–100)");
          return;
        }
  
        students.push({ name, score, class: className });
        renderClassGroups();
        renderGradeGroups();
      });
  
      groupDiv.appendChild(form);
      container.appendChild(groupDiv);
    });
  }
  
  // Render grade groups
  function renderGradeGroups() {
    const container = document.getElementById("grade-container");
    container.innerHTML = "";
  
    const studentsWithGrades = students.map(s => ({ ...s, grade: getGrade(s.score) }));
    const gradeGroups = groupBy(studentsWithGrades, s => s.grade);
  
    Object.entries(gradeGroups).forEach(([grade, students]) => {
      const groupDiv = document.createElement("div");
      groupDiv.className = "group";
  
      const heading = document.createElement("h3");
      heading.textContent = `Grade: ${grade}`;
      groupDiv.appendChild(heading);
  
      const list = document.createElement("ul");
      students.forEach(student => {
        const li = document.createElement("li");
        li.textContent = `${student.name} - ${student.class}, Score: ${student.score}`;
        list.appendChild(li);
      });
  
      groupDiv.appendChild(list);
      container.appendChild(groupDiv);
    });
  }
  
  // Initial render
  renderClassGroups();
  renderGradeGroups();
  
