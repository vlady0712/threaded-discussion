// [name].js

export default function handler(request, res) {
  const { name } = request.query;
  res.end(`Hello ${name}!`);
}