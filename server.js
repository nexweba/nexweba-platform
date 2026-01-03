import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const APP_SECRET = "YOUR_PI_APP_SECRET"; // from Pi Dev Portal

app.post("/approve-payment", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {
        method: "POST",
        headers: {
          "Authorization": `Key ${APP_SECRET}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ txid })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Approval failed" });
  }
});

app.listen(3000, () => {
  console.log("Pi backend running");
});
