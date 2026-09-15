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

def send_email(sender_email, sender_password, smtp_server="smtp.gmail.com", port=587):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = SUBJECT
    msg["From"] = f"MAMBO Team <{sender_email}>"
    msg["To"] = RECIPIENT

    part = MIMEText(html_content, "html", "utf-8")
    msg.attach(part)

    print(f"Connecting to {smtp_server}:{port}...")
    with smtplib.SMTP(smtp_server, port) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, RECIPIENT, msg.as_string())
    print(f"✅ Success! Email sent to {RECIPIENT}")

if __name__ == "__main__":
    sender = input("Enter your sender email (e.g. your_email@gmail.com): ").strip()
    pwd = input("Enter your App Password / SMTP password: ").strip()
    if sender and pwd:
        send_email(sender, pwd)
    else:
        print("Sender email and password required to send.")
