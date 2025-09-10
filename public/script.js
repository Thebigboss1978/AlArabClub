// تحميل الجولات من الباك إند
async function loadTours() {
  const res = await fetch("http://localhost:5000/api/tours");
  const data = await res.json();
  const container = document.getElementById("tours-container");

  container.innerHTML = data.tours.map(tour => `
    <div class="card">
      <h3>${tour.Name}</h3>
      <p>${tour.Description}</p>
      <a href="https://wa.me/${tour.Phone}?text=مرحباً%20أرغب%20في%20حجز%20${tour.Name}" target="_blank">
        📲 احجز عبر واتساب
      </a>
    </div>
  `).join("");
}

// إرسال رسالة للبوت
async function sendMsg() {
  const msg = document.getElementById("msg").value;
  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });
  const data = await res.json();

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><b>أنت:</b> ${msg}</p>`;
  chatBox.innerHTML += `<p><b>بوت:</b> ${data.reply}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
  document.getElementById("msg").value = "";
}

loadTours();