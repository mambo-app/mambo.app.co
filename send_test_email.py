import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Target recipient
RECIPIENT = "lakshchawla2837@gmail.com"
SUBJECT = "MAMBO v1.0.5.7 — The Cinema Edition 🎬"

# Read the HTML template
template_path = os.path.join(os.path.dirname(__file__), "public", "mambo-update-email.html")
with open(template_path, "r", encoding="utf-8") as f:
    html_content = f.read()

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

def send_email(sender_email, sender_password, smtp_server="smtp.gmail.com", port=587):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = SUBJECT
    msg["From"] = f"MAMBO Team <{sender_email}>"
    msg["To"] = RECIPIENT

    part_text = MIMEText(plain_text_content, "plain", "utf-8")
    part_html = MIMEText(html_content, "html", "utf-8")
    
    msg.attach(part_text)
    msg.attach(part_html)

    print(f"Connecting to {smtp_server}:{port} with {sender_email}...")
    with smtplib.SMTP(smtp_server, port) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, RECIPIENT, msg.as_string())
    print(f"[SUCCESS] Email sent successfully to {RECIPIENT}")

if __name__ == "__main__":
    sender, pwd = load_env_credentials()
    if not sender:
        sender = input("Enter your sender email (e.g. your_email@gmail.com): ").strip()
    if not pwd:
        pwd = input("Enter your App Password / SMTP password: ").strip()

    if sender and pwd:
        send_email(sender, pwd)
    else:
        print("Error: Sender email and App password are required.")

