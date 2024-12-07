const https = require('https');
const fs = require('fs');

const API_URL = 'https://127.0.0.1:27124/active/';
const API_KEY = '75544b67a7dc5d3cb1f154d58f5559e4a529bde066a781e60849933297d5171b'; // Replace with the correct API Key

// Load the PEM certificate
const certPath = '/Users/valentinaliu/obsidianrestapi.pem'; // Use the PEM file used in curl
const cert = fs.readFileSync(certPath);

// Create an HTTPS agent using the certificate
const httpsAgent = new https.Agent({
  ca: cert, // Add the PEM certificate
});

async function fetchCommands() {
  console.log(`Connecting to ${API_URL}...`);
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'accept': 'application/vnd.olrapi.note+json', // Match the 'accept' header from curl
        'Authorization': `Bearer ${API_KEY}`, // Match the Authorization header
      },
      agent: httpsAgent, // Add the HTTPS agent
    });

    console.log(`Response status: ${response.status}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response Data:', data);
  } catch (error) {
    console.error('Error fetching commands:', error.message);
    console.error('Detailed Error:', error);
  }
}

fetchCommands();
