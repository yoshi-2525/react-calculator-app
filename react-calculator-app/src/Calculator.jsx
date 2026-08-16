import { useState } from "react";
import "./App.css";

const buttons = [
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", "C", "=", "+"
];

// 計算処理
const calculate = (display) => {
  // 「整数 演算子 整数」の形式か確認
  const match = display.match(
    /^(\d+)\s*([+\-*/])\s*(\d+)$/
  );

  if (!match) {
    throw new Error("無効な式です。");
  }

  const num1 = Number(match[1]);
  const operator = match[2];
  const num2 = Number(match[3]);

  switch (operator) {
    case "+":
      return num1 + num2;

    case "-":
      return num1 - num2;

    case "*":
      return num1 * num2;

    case "/":
      if (num2 === 0) {
        throw new Error("0では割れません。");
      }

      return num1 / num2;

    default:
      throw new Error("無効な演算子です。");
  }
};


function Calculator() {

  // 電卓に表示する文字
  const [display, setDisplay] = useState("");

  // エラーメッセージ
  const [error, setError] = useState("");


  // ボタンを押したとき
  const handleButtonClick = (button) => {

    // Cボタン
    if (button === "C") {
      setDisplay("");
      setError("");
      return;
    }

    // =ボタン
    if (button === "=") {
      handleEqual();
      return;
    }

    // 数字・演算子を入力したらエラーを消す
    setError("");

    // displayにボタンの文字を追加
    setDisplay((current) => current + button);
  };


  // =ボタンを押したとき
  const handleEqual = () => {

    try {
      // displayに入っている式を計算
      const result = calculate(display);

      // 計算結果をdisplayに表示
      setDisplay(String(result));

      // エラーを消す
      setError("");

    } catch (error) {

      // エラーメッセージはdisplayには入れない
      setError(error.message);
    }
  };


  return (
    <>
    <h2>電卓アプリ</h2>
    <div className="calculator-container">
      {/* 電卓の表示部分 */}
      <div className="display">
        {display || "0"}
      </div>

      {/* エラーメッセージ */}
      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {/* ボタン */}
      <div className="button-grid">

        {buttons.map((button) => (
          <button
            key={button}
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </button>
        ))}

      </div>
    </div>
    </>
  );
}

export default Calculator;