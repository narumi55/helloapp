"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("firebase-admin/app");
const database_1 = require("firebase-admin/database");
const firebaseServiceAccount_json_1 = __importDefault(require("../firebaseServiceAccount.json")); // JSON ファイルをインポート
const app = (0, express_1.default)();
const PORT = 3000;
// Firebase Admin SDK を初期化
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)(firebaseServiceAccount_json_1.default), // JSON ファイルのデータを渡す
    databaseURL: "https://helloapp-8f0ac-default-rtdb.asia-southeast1.firebasedatabase.app/", // 自身の Firebase URL を指定
});
const db = (0, database_1.getDatabase)();
// メッセージを保存する API エンドポイント
app.post("/save", (req, res) => {
    const ref = db.ref("messages");
    ref.set({ message: "こんにちは" }, (error) => {
        if (error) {
            res.status(500).send("Error saving message");
        }
        else {
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
        }
        else {
            console.log("Startup message saved successfully");
        }
    });
});
