import express from "express";
import puppeteer from "puppeteer";

const app = express();
app.use(express.static("public"));

app.get("/download", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // A4 at 96dpi = 794×1123px
  await page.setViewport({
    width: 794,
    height: 1123,
    deviceScaleFactor: 1,
  });

  await page.goto("http://127.0.0.1:3000/", {
    waitUntil: "networkidle0", // wait for Google Fonts to load before rendering
    timeout: 10000,
  });

  await page.emulateMediaType("print");

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: "0px", bottom: "0px", left: "0px", right: "0px" },
    preferCSSPageSize: true,
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=resume.pdf",
  });
  res.send(pdf);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Running on http://127.0.0.1:3000");
});