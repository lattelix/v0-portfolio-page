# Lattelix Portfolio

Frontend Developer portfolio built with Next.js 16, Tailwind CSS, shadcn/ui, and Framer Motion.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to cloud.ru VDS + lattelix.ru (Selectel DNS)

### 1. Prepare the VDS

SSH into your server:

```bash
ssh root@<your-vds-ip>
```

Install Node.js (v20+), npm, and nginx:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git
node -v && npm -v
```

### 2. Clone and Build

```bash
cd /var/www
git clone https://github.com/lattelix/v0-portfolio-page.git lattelix
cd lattelix

npm install
npm run build
```

### 3. Run with PM2

```bash
sudo npm install -g pm2

pm2 start npm --name "lattelix" -- start
pm2 save
pm2 startup   # follow the output command to enable auto-restart on reboot
```

### 4. Configure Nginx Reverse Proxy

Create config:

```bash
sudo nano /etc/nginx/sites-available/lattelix.ru
```

Paste:

```nginx
server {
    listen 80;
    server_name lattelix.ru www.lattelix.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/lattelix.ru /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Configure DNS at Selectel

In the Selectel DNS panel for `lattelix.ru`, add two **A records**:

| Type | Name  | Value           |
| ---- | ----- | --------------- |
| A    | `@`   | `<your-vds-ip>` |
| A    | `www` | `<your-vds-ip>` |

DNS propagation takes 5 min to 48 hours (usually under 1 hour).

### 6. Add HTTPS with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d lattelix.ru -d www.lattelix.ru
```

Follow the prompts. Auto-renewal is enabled by default -- verify with:

```bash
sudo certbot renew --dry-run
```

### 7. Updating the Site

After pushing changes to GitHub:

```bash
cd /var/www/lattelix
git pull origin main
npm install
npm run build
pm2 restart lattelix
```

Or use the deploy script:

```bash
#!/bin/bash
cd /var/www/lattelix
git pull origin main
npm install
npm run build
pm2 restart lattelix
echo "Deployed successfully"
```

Save as `/var/www/lattelix/deploy.sh`, make executable with `chmod +x deploy.sh`, then run `./deploy.sh`.

### Firewall

Make sure your cloud.ru security group allows inbound traffic on ports:

- **22** -- SSH
- **80** -- HTTP
- **443** -- HTTPS
