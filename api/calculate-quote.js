export default async function handler(req, res) {
  // CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Extract form data from the calculator
    const {
      'Multi-Form-11-Name': name,
      'Multi-Form-11-Email': email,
      'Multi-form-11-Type': serviceType,
      'Multi-Form-11-Budget': budget,
      'Multi-Form-11-Project': projectDetails,
      'Multi-Form-11-Company': company,
      'Multi-form-11-People': peopleCount,
      'Multi-Form-11-Link': website,
      'Multi-Form-11-Country': country,
      'Multi-Form-11-Date': movingDate
    } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Calculate quote based on form data
    let basePrice = 0;
    let serviceMultiplier = 1;
    let peopleMultiplier = 1;
    let budgetMultiplier = 1;

    // Service type pricing
    switch (serviceType) {
      case 'Multi-form 11 Type Option 1': // Déménagement résidentiel
        basePrice = 800;
        serviceMultiplier = 1.0;
        break;
      case 'Multi-form 11 Type Option 2': // Déménagement commercial
        basePrice = 1200;
        serviceMultiplier = 1.5;
        break;
      case 'Multi-form 11 Type Option 3': // Transport longue distance
        basePrice = 1500;
        serviceMultiplier = 2.0;
        break;
      case 'Multi-form 11 Type Option 4': // Autre
        basePrice = 1000;
        serviceMultiplier = 1.2;
        break;
      default:
        basePrice = 800;
        serviceMultiplier = 1.0;
    }

    // People count multiplier
    switch (peopleCount) {
      case 'Multi-form 11 People Option 1': // Moi seul
        peopleMultiplier = 0.8;
        break;
      case 'Multi-form 11 People Option 2': // 2-10
        peopleMultiplier = 1.0;
        break;
      case 'Multi-form 11 People Option 3': // 11-50
        peopleMultiplier = 1.5;
        break;
      case 'Multi-form 11 People Option 4': // 51-100
        peopleMultiplier = 2.0;
        break;
      case 'Multi-form 11 People Option 5': // 101-500
        peopleMultiplier = 3.0;
        break;
      case 'Multi-form 11 People Option 6': // 501+
        peopleMultiplier = 4.0;
        break;
      default:
        peopleMultiplier = 1.0;
    }

    // Budget multiplier (higher budget = more services)
    switch (budget) {
      case 'First': // Lower budget
        budgetMultiplier = 0.8;
        break;
      case 'Second': // Medium budget
        budgetMultiplier = 1.0;
        break;
      case 'Third': // Higher budget
        budgetMultiplier = 1.3;
        break;
      default:
        budgetMultiplier = 1.0;
    }

    // Calculate final price
    const calculatedPrice = Math.round(basePrice * serviceMultiplier * peopleMultiplier * budgetMultiplier);
    
    // Add some randomness for demo purposes (±10%)
    const variation = calculatedPrice * 0.1;
    const finalPrice = Math.round(calculatedPrice + (Math.random() - 0.5) * variation);

    // Create quote response
    const quote = {
      success: true,
      quote: {
        basePrice: basePrice,
        serviceType: serviceType,
        peopleCount: peopleCount,
        budget: budget,
        calculatedPrice: calculatedPrice,
        finalPrice: finalPrice,
        currency: 'CAD',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        breakdown: {
          baseService: basePrice,
          serviceMultiplier: serviceMultiplier,
          peopleMultiplier: peopleMultiplier,
          budgetMultiplier: budgetMultiplier
        }
      },
      customer: {
        name: name,
        email: email,
        company: company,
        projectDetails: projectDetails,
        movingDate: movingDate,
        country: country
      }
    };

    res.status(200).json(quote);

  } catch (error) {
    console.error('Calculator error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
