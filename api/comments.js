import fetch from 'node-fetch';

export default async function handler(request, res) {
  const { op } = request.query;
  switch (op) {
    case 'GET':
      const comments = await fetch(`https://api.jsonbin.io/v3/b/${process.env.jsonbinBin}`, {
        method: 'GET',
        headers: {
          'X-Master-Key': process.env.jsonbinXMasterKey
        }
      }).then((t) => {
        if (t.ok) {
          return t.json();
        }
      }).then((data) => data.record);
      res.json(await comments);
    break;
  }
}