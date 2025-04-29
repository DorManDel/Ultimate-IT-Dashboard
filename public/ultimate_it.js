/* ╔════════════════════════════════════════════════════════════════╗
   ║ ultimate_it.js | Created by Dor Mandel | Version 1.0 (04/2025) ║
   ╚════════════════════════════════════════════════════════════════╝ */

// ۩ஜ═════════════════════🔻 START HERE 🔻═════════════════════════ஜ۩

document.addEventListener("DOMContentLoaded", () => {

  // ───────────────────────────────────────────────
  // 🕒 Clock Updater
  // ───────────────────────────────────────────────
  function updateDateTime() {
    const now = new Date();
    const clock = document.getElementById('dateTime');
    if (clock) clock.innerText = now.toLocaleString();
  }
  setInterval(updateDateTime, 1000);
  updateDateTime();

  // ───────────────────────────────────────────────
  // 📈 Simulated System Stats Updater (CPU/RAM/Disk)
  // ───────────────────────────────────────────────
// 📈 Real System Stats from Backend + Max Tracking
let maxCPU = 0;
let maxRAM = 0;
let maxDisk = 0;
let maxTemp = 0;
let maxVolt = 0;

async function updateStats() {
  try {
    const res = await fetch('/api/stats');
    const data = await res.json();

    const cpuVal = document.getElementById('cpuVal');
    const ramVal = document.getElementById('ramVal');
    const diskVal = document.getElementById('diskVal');
    const tempVal = document.getElementById('tempVal');
    const voltVal = document.getElementById('voltVal');
	const ipLocal = document.getElementById('ipLocal');
	const ipPublic = document.getElementById('ipPublic');

	if (ipLocal && data.ipLocal) {
		ipLocal.innerText = data.ipLocal;
	}
	if (ipPublic && data.ipPublic) {
		ipPublic.innerText = data.ipPublic;
	}


    if (cpuVal && data.cpu) {
      maxCPU = Math.max(maxCPU, data.cpu);
      cpuVal.innerText = `${data.cpu}% (Max: ${maxCPU}%)`;
    }

    if (ramVal && data.ramUsed) {
      maxRAM = Math.max(maxRAM, data.ramUsed);
      ramVal.innerText = `${data.ramUsed} GB / ${data.ramTotal} GB (Max: ${maxRAM} GB)`;
    }

    if (diskVal && data.diskUsed) {
      maxDisk = Math.max(maxDisk, data.diskUsed);
      diskVal.innerText = `${data.diskUsed} GB / ${data.diskTotal} GB (Max: ${maxDisk} GB)`;
    }

    if (tempVal && data.temperature) {
      maxTemp = Math.max(maxTemp, data.temperature);
      tempVal.innerText = `${data.temperature}°C (Max: ${maxTemp}°C)`;
    }

    if (voltVal && data.voltage) {
      maxVolt = Math.max(maxVolt, data.voltage);
      voltVal.innerText = `${data.voltage}V (Max: ${maxVolt}V)`;
    }

  } catch (err) {
    console.error('❌ Error fetching stats from backend:', err);
  }
}

setInterval(updateStats, 3000);
updateStats();


  // ───────────────────────────────────────────────
  // 🌗 Dark/Light Mode Toggle
  // ───────────────────────────────────────────────
  const toggle = document.getElementById('toggleMode');
  if (toggle) {
    toggle.onclick = () => {
      document.body.classList.toggle('dark');
    };
  }

  // ───────────────────────────────────────────────
  // 🖱️ Mouse Tracker
  // ───────────────────────────────────────────────
  const mousePos = document.getElementById('mousePos');
  const mouseBtn = document.getElementById('mouseBtn');

  document.addEventListener('mousemove', (e) => {
    if (mousePos) {
      mousePos.innerText = `X: ${e.clientX} | Y: ${e.clientY}`;
    }
  });

  document.addEventListener('mousedown', (e) => {
    const btn = ['Left', 'Middle', 'Right'][e.button] || 'Unknown';
    if (mouseBtn) {
      mouseBtn.innerText = `Last Button: ${btn}`;
    }
  });

  // ───────────────────────────────────────────────
  // ⌨️ Keyboard Tracker + Key History (up to 50)
  // ───────────────────────────────────────────────
  const keyDisplay = document.getElementById('keyPress');
  const keyHistoryBox = document.getElementById('keyHistory');
  let keyHistory = [];

  document.addEventListener('keydown', (e) => {
    if (keyDisplay) keyDisplay.innerText = `Last Key Pressed: ${e.key}`;
    keyHistory.unshift(e.key);
    if (keyHistory.length > 50) keyHistory.pop();
    if (keyHistoryBox) keyHistoryBox.innerText = keyHistory.join(' ');
  });

  // ───────────────────────────────────────────────
  // 🌐 Network Tools: Ping Simulation
  // ───────────────────────────────────────────────
  window.ping = function(type) {
    const target = type === 'local' ? '192.168.1.1' : '8.8.8.8';
    alert(`Pinging ${target}... (simulated)`);
  };

  // ───────────────────────────────────────────────
  // 🚀 Network Tools: Speed Test Simulation
  // ───────────────────────────────────────────────
  window.runSpeedTest = function () {
    alert("Running speedtest... (simulated)\nDownload: 78Mbps\nUpload: 20Mbps\nPing: 12ms");
  };

  // ───────────────────────────────────────────────
  // 🦠 VirusTotal Hash Check Simulation
  // ───────────────────────────────────────────────
  window.vtCheck = function () {
    const input = document.getElementById('vtInput');
    const result = document.getElementById('vtResult');
    if (!input || !result) return;

    if (!input.value) {
      alert("Please enter a hash or file name.");
      return;
    }

    result.innerText = `Status: Clean (Simulated for ${input.value})`;
  };

});
