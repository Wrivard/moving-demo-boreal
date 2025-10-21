export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the Google Maps API key from environment variables
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  // Log for debugging (remove in production)
  console.log('API Key check:', apiKey ? 'Key found' : 'No key found');
  
  if (!apiKey || apiKey === 'undefined' || apiKey.trim() === '') {
    return res.status(200).json({ 
      error: 'Google Maps API key not configured',
      apiKey: null 
    });
  }
  
  // Return the API key
  res.status(200).json({ 
    apiKey: apiKey.trim(),
    status: 'success'
  });
}
