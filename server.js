const fetch = require('node-fetch');
const os = require('os');
const express = require('express');
const si = require('systeminformation');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public')); // Serve your frontend from here!


// API to get system stats
app.get('/api/stats', async (req, res) => {
  try {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const disk = await si.fsSize();
    const temp = await si.cpuTemperature();

    // Get Local IP
    const interfaces = os.networkInterfaces();
    let localIP = null;
    for (let name in interfaces) {
      for (let iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          localIP = iface.address;
          break;
        }
      }
    }

    // Get Public IP
    let publicIP = 'Unavailable';
    try {
      const ipRes = await fetch('https://api.ipify.org');
      publicIP = await ipRes.text();
    } catch (e) {
      console.error('Public IP fetch failed:', e.message);
    }

    res.json({
      cpu: cpu.currentLoad.toFixed(1),
      ramUsed: (mem.active / 1073741824).toFixed(2),
      ramTotal: (mem.total / 1073741824).toFixed(2),
      diskUsed: (disk[0].used / 1073741824).toFixed(2),
      diskTotal: (disk[0].size / 1073741824).toFixed(2),
      temperature: temp.main || null,
      ipLocal: localIP,
      ipPublic: publicIP
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve stats', details: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Ultimate IT API running at http://localhost:${PORT}`);
});
