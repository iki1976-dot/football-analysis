exports.handler = async function (event) {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Липсва API_FOOTBALL_KEY в Netlify." })
    };
  }

  try {
    const date =
      event.queryStringParameters?.date ||
      new Date().toLocaleDateString("en-CA", {
        timeZone: "Europe/Sofia"
      });

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${date}&timezone=Europe%2FSofia`,
      {
        headers: { "x-apisports-key": apiKey }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "Грешка при зареждане на мачовете." })
      };
    }

    const countries = ["England", "Italy", "Spain", "Germany", "France"];
    const allMatches = Array.isArray(data.response) ? data.response : [];

    const matches = allMatches.filter(match =>
      countries.includes(match.league?.country)
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        date,
        results: matches.length,
        response: matches,
        message: "Показани са мачове от Англия, Италия, Испания, Германия и Франция."
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Грешка при зареждане на мачовете." })
    };
  }
};
