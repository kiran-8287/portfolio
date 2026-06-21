export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const apiKey = process.env.CARTESIA_API_KEY;

  if (!apiKey) {
    console.error('CARTESIA_API_KEY is not configured');
    return res.status(500).json({ error: 'TTS service not configured' });
  }


  try {
    const response = await fetch('https://api.cartesia.ai/tts/bytes', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Cartesia-Version': '2024-06-10',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model_id: 'sonic-english',
        transcript: text,
        voice: {
          mode: 'id',
          id: '1259b7e3-cb8a-43df-9446-30971a46b8b0'
        },
        output_format: {
          container: 'mp3',
          sample_rate: 44100
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Cartesia API error response:', errText);
      return res.status(response.status).json({ error: 'Failed to generate speech' });
    }

    const arrayBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    return res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error('Cartesia error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
