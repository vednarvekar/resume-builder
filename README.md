# Resume Builder (HTML → PDF)

A simple personal resume builder that converts a custom HTML/CSS resume into a high-quality PDF using Puppeteer.

## 🚀 Features

* Clean A4 resume layout (HTML + CSS)
* High-quality PDF export (via Puppeteer)
* Local server setup with Express
* Print-optimized styling (no UI elements in PDF)

---

## 📁 Project Structure

```
resume-builder/
│── public/
│   ├── index.html
│   ├── style.css
│── server.js
│── package.json
```

---

## ⚙️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run server

```bash
node server.js
```

### 4. Open in browser

```
http://localhost:3000
```

---

## 📄 How it works

1. Resume is built using HTML/CSS (A4 layout)
2. Express serves the page locally
3. Puppeteer loads the page in a headless browser
4. PDF is generated with:

   * A4 format
   * Background styles preserved
5. File is downloaded automatically

---

## 🖨️ PDF Optimization

Make sure your CSS includes:

```css
@page {
  size: A4;
  margin: 0;
}

@media print {
  .no-print {
    display: none;
  }
}

* {
  -webkit-print-color-adjust: exact;
}
```

---

## 🧠 Notes

* This project is designed for personal use
* Resume content is currently static (hardcoded in HTML)
* Can be extended into a dynamic resume builder later

---

## 🔮 Future Improvements

* Form-based input (dynamic resume data)
* Multiple templates
* Export customization
* Online hosting

---

## 🛠️ Tech Stack

* HTML, CSS
* Node.js + Express
* Puppeteer

---

## 📌 Author

Ved

---
