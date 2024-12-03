// APIキーとベースURL
const apiKey = "f63eeed6d5d2b9ed9e176aacfb630252";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// 天気情報を取得する関数
async function getWeather() {
  const prefecture = document.getElementById("prefecture");
  const selectedPrefecture = prefecture.value; // 選択された都道府県（ローマ字）

  const weatherDiv = document.getElementById("weather");

  // 都道府県が選択されていない場合の処理
  if (!selectedPrefecture) {
    weatherDiv.textContent = "都道府県を選択してください。";
    return;
  }

  try {
    // ローディングメッセージを表示
    weatherDiv.textContent = "天気情報を取得しています...";

    // 非同期リクエストを送信
    const response = await fetch(
      `${apiUrl}?q=${selectedPrefecture}&appid=${apiKey}&units=metric&lang=ja`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `${errorData.message} (ステータスコード: ${response.status})`
      );
    }

    // レスポンスデータをJSON形式に変換
    const data = await response.json();

    // 天気情報を表示
    weatherDiv.innerHTML = `
      <h2>${data.name}の天気</h2>
      <p>気温: ${data.main.temp}°C</p>
      <p>天気: ${data.weather[0].description}</p>
      <p>湿度: ${data.main.humidity}%</p>
      <p>風速: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherDiv.textContent = `エラー: ${error.message}`;
  }
}

// ボタンにクリックイベントを追加
document.getElementById("getWeather").addEventListener("click", getWeather);
