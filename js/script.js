// fuck you😘.
// Anyone reading your gay fag
const correctPasswordHash = "9c647bfdc9aec9e594ea315d316c64acd764ea59b91db387864f62a4f94ff5d9";

async function hashText(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function tryLogin() {
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("errorMessage");

  const enteredHash = await hashText(password);

  if (enteredHash === correctPasswordHash) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("successBox").style.display = "block";
  } else {
    errorMessage.textContent = "Incorrect password";
  }
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  tryLogin();
});

document.getElementById("password").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    tryLogin();
  }
});

document.getElementById("backBtn").addEventListener("click", function () {
  document.getElementById("successBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("password").value = "";
  document.getElementById("errorMessage").textContent = "";
});
