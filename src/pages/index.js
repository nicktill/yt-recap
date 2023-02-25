import { useState } from "react";

const API_KEY = "AIzaSyCNwvM7_De7xjtbbAwh1g1XEcFPxVfaOKE";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState("");

  const getClosedCaptions = () => {
    const videoID = videoUrl.split("v=")[1];
    fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=id&videoId=${videoID}&key=${API_KEY}`
    )
      //  parse the response as JSON and then grab the captionID
      .then((response) => response.json())
      .then((data) => {
        const captionTrackId = data.items[0].id;
        console.log("Caption track here", captionTrackId);
        fetch(
          `https://www.googleapis.com/youtube/v3/captions/${captionTrackId}?key=${API_KEY}&tfmt=srt`
        )
          .then((response) => response.text())
          .then((captionText) => {
            setCaptions(captionText);
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
