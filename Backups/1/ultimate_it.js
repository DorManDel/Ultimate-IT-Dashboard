// ========================================
// ULTIMATE IT DASHBOARD - JS CORE
// Mouse, Keyboard, System Stats (Simulated)
// ========================================

// Fake system stat updater
function updateStats() {
  document.querySelector('#cpu .value').innerText = `${Math.floor(Math.random() * 50 + 30)}%`;
  document.querySelector('#ram .value').innerText = `${Math.floor(Math.random() * 60 + 20)}%`;
  document.querySelector('#disk .value').innerText = `${Math.floor(Math.random() * 50 + 30)}%`;
}

setInterval(updateStats, 2000);
updateStats(); // Initial

// Toggle dark/light mode
document.getElementById('toggleMode').onclick = () => {
  document.body.classList.toggle('dark');
};

// Show date and time
function updateDateTime() {
  const now = new Date();
  document.getElementById('dateTime').innerText = now.toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Mouse tracker
document.addEventListener('mousemove', (e) => {
  document.getElementById('mousePos').innerText = `X: ${e.clientX} | Y: ${e.clientY}`;
});

document.addEventListener('mousedown', (e) => {
  const btn = ['Left', 'Middle', 'Right'][e.button] || 'Unknown';
  document.getElementById('mouseBtn').innerText = `Last Button: ${btn}`;
});

// Keyboard tracker
document.addEventListener('keydown', (e) => {
  document.getElementById('keyPress').innerText = `Last Key Pressed: ${e.key}`;
});

// Ping simulation
function ping(type) {
  const target = type === 'local' ? '192.168.1.1' : '8.8.8.8';
  alert(`Pinging ${target}... (simulated)`);
}

// Speedtest simulation
function runSpeedTest() {
  alert("Running speedtest... (simulated)\nDownload: 78Mbps\nUpload: 20Mbps\nPing: 12ms");
}
