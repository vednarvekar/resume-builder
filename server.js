import express from "express";
import puppeteer from "puppeteer";

const app = express();
app.use(express.static("public"));

app.get("/download", async(req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 816,
    height: 1056,
    deviceScaleFactor: 1
  });

  // Using 127.0.0.1 fixes the mirrored networking loopback issue
  await page.goto("http://127.0.0.1:3000/", {
    waitUntil: "load", // 'load' is safer than 'networkidle0' in mirrored mode
    timeout: 10000     // 10 second safety cap to prevent server freezes
  });

  await page.emulateMediaType("print");

  const pdf = await page.pdf({
    format: "letter",
    printBackground: true,
    displayHeaderFooter: false,
    margin: {
        top: "0px",
        bottom: "0px",
        left: "0px",
        right: "0px"
    },
    preferCSSPageSize: true 
  });
  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=resume.pdf"
  })
  res.send(pdf);
});

// Explicitly bind to '0.0.0.0' so Windows can see the WSL mirrored port
app.listen(3000, "0.0.0.0", () => {
  console.log("Running on http://127.0.0.1:3000");
});
