export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fromAddress, toAddress } = req.body;

    if (!fromAddress || !toAddress) {
      return res.status(400).json({ 
        error: 'Both fromAddress and toAddress are required' 
      });
    }

    // Get the Google Maps API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'undefined' || apiKey.trim() === '') {
      return res.status(500).json({ 
        error: 'Google Maps API key not configured' 
      });
    }

    // Call Google Distance Matrix API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(fromAddress)}&destinations=${encodeURIComponent(toAddress)}&units=metric&key=${apiKey}`
    );

    if (!response.ok) {
      // If Distance Matrix API is not enabled, return a helpful error
      if (response.status === 403) {
        return res.status(400).json({
          error: 'Distance Matrix API is not enabled for this project. Please enable it in Google Cloud Console.',
          details: 'API_NOT_ENABLED'
        });
      }
      throw new Error(`Google API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'OK' && data.rows[0] && data.rows[0].elements[0]) {
      const element = data.rows[0].elements[0];
      
      if (element.status === 'OK' && element.distance) {
        const distanceKm = Math.round(element.distance.value / 1000);
        
        return res.status(200).json({
          success: true,
          distance: distanceKm,
          distanceText: element.distance.text,
          duration: element.duration ? element.duration.text : null
        });
      } else {
        return res.status(400).json({
          error: 'Could not calculate distance between the provided addresses',
          details: element.status || 'UNKNOWN_ERROR'
        });
      }
    } else {
      return res.status(400).json({
        error: 'Invalid response from Google Distance Matrix API',
        details: data.status || 'UNKNOWN_ERROR',
        fullResponse: data
      });
    }

  } catch (error) {
    console.error('Distance calculation error:', error);
    return res.status(500).json({
      error: 'Failed to calculate distance',
      details: error.message
    });
  }
}
