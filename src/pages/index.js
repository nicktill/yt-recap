import { useState } from "react";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState("");

  async function fetchCaptions(videoUrl) {
    const videoID = videoUrl.split("v=")[1];
    const res = await fetch(`/captions?videoId=${videoID}`);
    const captionsData = await res.json();
    return captionsData;
  }

  const getClosedCaptions = async () => {
    const { videoId, captions } = await fetchCaptions(videoUrl);
    setCaptions(captions);
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
