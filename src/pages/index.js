import { useState } from "react";

const API_KEY = "AIzaSyCNwvM7_De7xjtbbAwh1g1XEcFPxVfaOKE";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState("");

  const getClosedCaptions = () => {
    // Get video ID from YouTube URL
    if (!videoUrl) {
      setCaptions("Please enter a valid YouTube URL");
      return; //break from loop
    }
    const videoId = videoUrl.split("v=")[1];
    console.log("videoID", videoId);

    // Make request to YouTube Data API to get video details
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet%2C+contentDetails&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Check if video has closed captions
        console.log("DATA => ", data);
        const items = data.items;
        console.log("ITEMS => ", items);
        if (!items || items.length === 0) {
          setCaptions("Error fetching first API for video details.");
          return;
        }
        const captionAvailable = items[0].contentDetails.caption === "true";
        if (!captionAvailable) {
          setCaptions("This video does not have closed captions.");
          return;
        }

        // Get first closed caption track
        const captionTrack = items[0].snippet.captionTracks[0];
        console.log("Caption Track HEREE => ", captionTrack);

        // Make request to YouTube Data API to get closed caption text
        fetch(
          `https://www.googleapis.com/youtube/v3/captions/${captionTrack.id}?key=${API_KEY}`
        )
          .then((response) => response.text())
          .then((text) => {
            setCaptions(text);
          })
          .catch((error) => {
            console.error("Error fetching 2nd API closed captions:", error);
            setCaptions("Error fetching 2nd API closed captions.");
          });
      })
      .catch((error) => {
        console.error("Error fetching video END OF details:", error);
        setCaptions("Error fetching video details.");
      });
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
