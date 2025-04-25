import express from "express";
import { initializeApp, cert } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import serviceAccount from "../firebaseServiceAccount.json"; // JSON ファイルをインポート

const app = express();
const PORT = 3000;

// Firebase Admin SDK を初期化
initializeApp({
  credential: cert(serviceAccount), // JSON ファイルのデータを渡す
  databaseURL: "https://helloapp-8f0ac-default-rtdb.asia-southeast1.firebasedatabase.app/", // 自身の Firebase URL を指定
});

const db = getDatabase();

// メッセージを保存する API エンドポイント
app.post("/save", (req, res) => {
  const ref = db.ref("messages");
  ref.set({ message: "こんにちは" }, (error) => {
    if (error) {
      res.status(500).send("Error saving message");
    } else {
      res.send("Message saved successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // サーバー起動時にデータベースに保存
  const ref = db.ref("messages");
  ref.set({ message: "こんにちは" }, (error) => {
      if (error) {
          console.error("Error saving startup message:", error);
      } else {
          console.log("Startup message saved successfully");
      }
  });
});

