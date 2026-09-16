import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Target recipients list (excluding lakshchawla2837@gmail.com as requested)
RECIPIENTS = [
    "krrishchawla04@gmail.com",
    "vandanachawla301@gmail.com",
    "streetbeastgaming@gmail.com"
]

SUBJECT = "Your entire watch world, massively upgraded"

# Read the HTML template
template_path = os.path.join(os.path.dirname(__file__), "public", "mambo-update-email.html")
with open(template_path, "r", encoding="utf-8") as f:
    html_content = f.read()

plain_text_content = """MAMBO - Upgrade Your Watch Experience

YOUR ENTIRE WATCH WORLD. MASSIVELY UPGRADED.

Letterboxd username import, 1-on-1 chat movie attachments, weekly episode drops, custom watchlist groups, and a brand-new profile aesthetic.

Update MAMBO Now: https://mambo-app-co.vercel.app/

Key Highlights:
- Instant Letterboxd Username and ZIP Import
- Attach Movies & Collections Directly in 1-on-1 Chat
- All-New Profile & Top 4 Showcase
- Track Weekly Dropping TV Series & Anime
- Custom Watchlist Groups & Folders
- Tinder-Style 'Suipe' Content Swiping
- Instagram Story Review Card Exporter

Download APK: https://mambo-app-co.vercel.app/mambo.v1.0.6.1.apk
Website: https://mambo-app-co.vercel.app/
"""

def load_env_credentials():
    env_paths = [
        os.path.join(os.path.dirname(__file__), ".env"),
        os.path.join(os.path.dirname(__file__), "..", "mambo-backend", ".env")
    ]
    env_vars = {}
    for p in env_paths:
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        env_vars[k.strip()] = v.strip().strip("'\"")
    sender = env_vars.get("SENDER_EMAIL") or env_vars.get("SMTP_USER") or env_vars.get("GMAIL_USER") or env_vars.get("MAIL_USER")
    pwd = env_vars.get("SENDER_PASSWORD") or env_vars.get("SMTP_PASS") or env_vars.get("GMAIL_APP_PASSWORD") or env_vars.get("MAIL_PASS") or env_vars.get("SMTP_PASSWORD")
    return sender, pwd

def send_emails(sender_email, sender_password, recipients, smtp_server="smtp.gmail.com", port=587):
    print(f"Connecting to {smtp_server}:{port} with {sender_email}...")
    with smtplib.SMTP(smtp_server, port) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        
        for recipient in recipients:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = SUBJECT
            msg["From"] = f"MAMBO Team <{sender_email}>"
            msg["To"] = recipient

            part_text = MIMEText(plain_text_content, "plain", "utf-8")
            part_html = MIMEText(html_content, "html", "utf-8")
            
            msg.attach(part_text)
            msg.attach(part_html)

            server.sendmail(sender_email, recipient, msg.as_string())
            print(f"[SUCCESS] Email sent successfully to {recipient}")

if __name__ == "__main__":
    sender, pwd = load_env_credentials()
    if not sender:
        sender = input("Enter your sender email (e.g. your_email@gmail.com): ").strip()
    if not pwd:
        pwd = input("Enter your App Password / SMTP password: ").strip()

    if sender and pwd:
        send_emails(sender, pwd, RECIPIENTS)
    else:
        print("Error: Sender email and App password are required.")


