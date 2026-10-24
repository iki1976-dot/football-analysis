exports.handler = async function () {
const apiKey = process.env.API_FOOTBALL_KEY;

if (!apiKey) {
return {
statusCode: 500,
body: JSON.stringify({ error: "Липсва API_FOOTBALL_KEY в Netlify." })
};
}

try {
const today = new Date().toISOString().slice(0, 10);

const response = await fetch(
  `https://v3.football.api-sports.io/fixtures?date=${today}`,
  {
    headers: {
      "x-apisports-key": apiKey
    }
  }
);

const data = await response.json();

return {
  statusCode: response.ok ? 200 : response.status,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  body: JSON.stringify(data)
};

} catch (error) {
return {
statusCode: 500,
body: JSON.stringify({ error: "Грешка при зареждане на мачовете." })
};
}
};
