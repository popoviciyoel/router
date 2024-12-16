import axios from 'axios';

export async function POST(req) {
  try {
    // Parse incoming request data
    const body = await req.json();
    const { playerName, email, score } = body;

    // Validate the incoming data
    if (!playerName || !email || !score) {
      return new Response(JSON.stringify({ error: 'Invalid player data' }), {
        status: 400,
      });
    }

    // HubSpot API endpoint and your credentials
    const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3/objects/contacts';
    const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
    console.log('HUBSPOT_API_KEY', HUBSPOT_API_KEY)

    // Payload to send to HubSpot
    const data = {
      properties: {
        firstname: playerName,
        email: email,
        // score: score, // Custom property in HubSpot
      },
    };

    // Make API request to HubSpot
    const response = await axios.post(`${HUBSPOT_API_URL}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`
      },
    });

    // Success response
    return new Response(JSON.stringify({ success: true, data: response.data }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending data to HubSpot:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
