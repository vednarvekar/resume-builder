import express from "express";
import puppeteer from "puppeteer";

const app = express();
app.use(express.static("public"));

app.get("/download", async(req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle0",
  })

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });
  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=resume.pdf"
  })
  res.send(pdf);

})

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});