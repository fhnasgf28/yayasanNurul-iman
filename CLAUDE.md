@AGENTS.md

# Yayasan Nurul Iman — Agent Notes

## ⚙️ Deploy / Update Workflow

Setiap kali ada perubahan kode yang perlu diterapkan ke production, **WAJIB** ikuti urutan ini:

### 1. Kill proses lama di port 3001
```bash
kill $(lsof -ti:3001) 2>/dev/null || true
# atau langsung by PID yang terdeteksi
```

### 2. Build ulang production bundle
```bash
cd /home/fhnasgf/.openclaw/workspace/yayasan/yayasanNurul-iman
npm run build
```

### 3. Restart systemd service
```bash
systemctl --user restart yayasan-nurul-iman.service
```

### 4. Verifikasi
```bash
systemctl --user status yayasan-nurul-iman.service
curl -sf http://localhost:3001 -o /dev/null -w "%{http_code}"
```

---

## 📌 Info Penting

- **Production port**: `3001` (binding `0.0.0.0:3001`)
- **Mode**: `next start` (production build, bukan dev)
- **Auto-start**: systemd user service `yayasan-nurul-iman.service`
  - File: `~/.config/systemd/user/yayasan-nurul-iman.service`
  - Enabled: ya (`WantedBy=default.target`)
- **Database**: Docker Compose postgres (distart otomatis via `ExecStartPre` di service)
- **Env file**: `.env` di root proyek

## ⚠️ Masalah Umum

- **EADDRINUSE port 3001**: Ada proses next-server lama yang tidak dikelola systemd (biasanya PID dari boot awal). Kill dulu sebelum restart service.
- **Service crash-loop**: Hampir selalu karena port 3001 masih dipakai proses lama. Cek dengan `ss -tlnp | grep 3001`.
