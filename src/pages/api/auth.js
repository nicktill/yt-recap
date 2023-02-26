import { google } from "googleapis";
import Router from "next/router";

// Create a new OAuth2Client, and go to the Google
const OAuth2Client = google.auth.OAuth2;
const client = new OAuth2Client({
  clientId:
    "763688423244-c7lrtot64enn1c2fp6p0ifc456i963iq.apps.googleusercontent.com",
  clientSecret: "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",
  redirectUri: "http://localhost:3000/api/auth",
});

export default async function handler(req, res) {
  try {
    // Get the access token from the query string
    const code = req.query.code; // Authorization code
    const { tokens } = await client.getToken(code);
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;

    // Store the access token and refresh token in a database or session
    // for future use

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving access token" });
  }
}
