import fetch from 'node-fetch';

export default async function handler(request, res) {
  const { city } = request.query;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.openweathermapappid}`;
	const currentWeather = await fetch(url).then(res => res.json());
  res.json(await currentWeather);
}