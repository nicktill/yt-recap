import { useState } from "react";

const API_KEY = "AIzaSyCNwvM7_De7xjtbbAwh1g1XEcFPxVfaOKE";
const CLIENT_ID =
  "763688423244-c7lrtot64enn1c2fp6p0ifc456i963iq.apps.googleusercontent.com";
const REDIRECT_URI = "https://localhost:3000/api/auth";
const SCOPE = "https://www.googleapis.com/auth/youtube.readonly";
const STATE = "123";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState("");

  const getClosedCaptions = () => {
    const videoID = videoUrl.split("v=")[1];

    // Generate the authentication URL for the user to click on
    const AUTH_URL = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${STATE}`;

    // Open the authentication URL in a new window
    window.open(AUTH_URL, "_blank");
    // grab the code from the URL
    const code = window.location.href.split("code=")[1];

    // Prompt the user to enter the authorization code they received after authorizing the app

    // Send the authorization code to the `/api/auth` endpoint to exchange for access and refresh tokens
    fetch(`/api/auth?code=${code}`)
      .then((response) => response.json())
      .then((data) => {
        const accessToken = data.accessToken;
        console.log(accessToken);

        fetch(
          `https://www.googleapis.com/youtube/v3/captions?part=id&videoId=${videoID}&key=${API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            const captionTrackId = data.items[0].id;
            console.log("Caption track here", captionTrackId);

            fetch(
              `https://www.googleapis.com/youtube/v3/captions/${captionTrackId}?key=${API_KEY}&tfmt=srt`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
              .then((response) => response.text())
              .then((captionText) => {
                setCaptions(captionText);
              })
              .catch((error) => console.error(error));
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full md:w-1/3">
        <h1 className="text-2xl align-middle font-bold mb-4">YT-Recap </h1>
        <input
          type="text"
          value={videoUrl}
          onChange={(event) => setVideoUrl(event.target.value)}
          className="w-full border border-gray-400 rounded px-3 py-2 mb-2"
          placeholder="Enter a YouTube video URL"
        ></input>
        <button
          onClick={getClosedCaptions}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Go!
        </button>

        {captions && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Closed captions:</h2>
            <p>{captions}</p>
          </div>
        )}
      </div>
    </div>
  );
}
