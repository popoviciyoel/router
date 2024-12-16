import axios from 'axios';

export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json();
    const { title, message, leads } = body;

    // Validate inputs
    if (!title || !message || !leads || !Array.isArray(leads)) {
      return new Response(JSON.stringify({ error: 'Invalid request data' }), {
        status: 400,
      });
    }

    // OneSignal API endpoint
    const ONE_SIGNAL_API_URL = 'https://onesignal.com/api/v1/notifications';

    // Your OneSignal REST API Key and App ID
    const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;
    const ONE_SIGNAL_API_KEY = process.env.ONE_SIGNAL_API_KEY;

    // Send notifications
    const response = await axios.post(
      ONE_SIGNAL_API_URL,
      {
        app_id: ONE_SIGNAL_APP_ID,
        headings: { en: title },
        contents: { en: message },
        include_external_user_ids: leads, // Leads as an array of user IDs
      },
      {
        headers: {
          Authorization: `Basic ${ONE_SIGNAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Return success response
    return new Response(JSON.stringify({ success: true, data: response.data }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
