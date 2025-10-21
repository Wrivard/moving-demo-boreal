export default function handler(req, res) {
  // Get the Google Maps API key from environment variables
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'Google Maps API key not configured',
      apiKey: null 
    });
  }
  
  // Return the API key (this is safe since it's meant to be used client-side)
  res.status(200).json({ 
    apiKey: apiKey 
  });
}
