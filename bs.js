// Student data - change as needed (or load from Firebase later)
const student = {
  name: "Sagar Sharma",
  course: "B.Sc. (Hons) Computer Science",
  roll: "26570052",
  college: "Ramanujan College"
};

document.getElementById("name").textContent = student.name;
document.getElementById("course").textContent = "🎓 " + student.course;
document.getElementById("roll").textContent = "🪪 Roll No. : " + student.roll;
document.getElementById("college").textContent = "🏛️ " + student.college;
document.getElementById("avatar").textContent =
  student.name.split(" ").map(w => w[0]).join("").slice(0, 2);

// Dark mode switch
const root = document.documentElement;
const btn = document.getElementById("themeToggle");
function applyTheme(t) {
  root.setAttribute("data-theme", t);
  btn.textContent = t === "dark" ? "☀️" : "🌙";
}
let saved = "light";
try { saved = localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); } catch (e) {}
applyTheme(saved);
btn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});