/* THEME */
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("herTheme", theme);
}

const savedTheme = localStorage.getItem("herTheme") || "classic";
document.body.className = savedTheme;

/* ACCENT SLIDER */
const slider = document.getElementById("colorSlider");

slider.addEventListener("input", () => {
  document.documentElement.style.setProperty(
    "--accent",
    `hsl(${slider.value}, 60%, 65%)`
  );
  localStorage.setItem("herAccent", slider.value);
});

const savedAccent = localStorage.getItem("herAccent");
if (savedAccent) {
  slider.value = savedAccent;
  document.documentElement.style.setProperty(
    "--accent",
    `hsl(${savedAccent}, 60%, 65%)`
  );
}

/* DIARY */
function saveDiary() {
  const text = document.getElementById("entry").value;
  if (text.trim() === "") return;

  localStorage.setItem("herDiary", text);
  alert("Saved gently 🤍");
}

document.getElementById("entry").value =
  localStorage.getItem("herDiary") || "";

/* WISHLIST */
let wishes = JSON.parse(localStorage.getItem("herWishes")) || [];

function addWish() {
  const input = document.getElementById("wishInput");
  if (input.value.trim() === "") return;

  wishes.push({ text: input.value, done: false });
  localStorage.setItem("herWishes", JSON.stringify(wishes));
  input.value = "";
  displayWishes();
}

function toggleWish(index) {
  wishes[index].done = !wishes[index].done;
  localStorage.setItem("herWishes", JSON.stringify(wishes));
  displayWishes();
}

function deleteWish(index) {
  wishes.splice(index, 1);
  localStorage.setItem("herWishes", JSON.stringify(wishes));
  displayWishes();
}

function displayWishes() {
  const list = document.getElementById("wishList");
  list.innerHTML = "";

  wishes.forEach((wish, i) => {
    const div = document.createElement("div");
    div.className = "wish" + (wish.done ? " done" : "");
    div.innerHTML = `
      <p onclick="toggleWish(${i})">${wish.text}</p>
      <button onclick="deleteWish(${i})">×</button>
    `;
    list.appendChild(div);
  });
}

displayWishes();
