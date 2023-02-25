// const API_KEY = "AIzaSyCNwvM7_De7xjtbbAwh1g1XEcFPxVfaOKE";

import React, { useState } from "react";

const Index = () => {
  // const API_KEY = "AIzaSyCNwvM7_De7xjtbbAwh1g1XEcFPxVfaOKE";
  const [input, setInput] = useState("");
  const [captions, setCaptions] = useState("");

  const getCaptions = async (url) => {
    const searchParams = new URLSearchParams(new URL(url).search);
    const videoId = searchParams.get("v");
    console.log("Video ID", videoId); // e.g. "https://www.youtube.com/watch?v=9bZkp7q19f0" => "9bZkp7q19f0"

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=AIzaSyCNwvM7_De7xjtbbAwh1g1XEcFPxVfaOKE`
    );
    const json = await response.json();
    console.log("JSON", json);

    if (!json.items.length) {
      setCaptions("No captions found for this video.");
      return;
    }

    const captionId = json.items[0].id;
    const captionResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions/${captionId}?key=AIzaSyCNwvM7_De7xjtbbAwh1g1XEcFPxVfaOKE`
    );
    const captionJson = await captionResponse.json();
    const captionUrl =
      captionJson["snippet"] && captionJson["snippet"]["trackKind"] === "ASR"
        ? captionJson["snippet"]["v3AudioTrackId"]
        : captionJson["snippet"] && captionJson["snippet"]["url"];

    if (!captionUrl) {
      setCaptions("No captions found for this video.");
      return;
    }

    const captionTextResponse = await fetch(captionUrl);
    const captionTextXml = await captionTextResponse.text();
    const captionTextParser = new DOMParser();
    const captionTextXmlDoc = captionTextParser.parseFromString(
      captionTextXml,
      "text/xml"
    );
    const textArray = captionTextXmlDoc.getElementsByTagName("text");
    let captions = "";
    for (let i = 0; i < textArray.length; i++) {
      captions += textArray[i].childNodes[0].nodeValue + " ";
    }
    setCaptions(captions);
  };

  const handleGoClick = (e) => {
    e.preventDefault();
    getCaptions(input);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-white">
      <h1 className="text-black text-3xl font-bold p-8">YT-Recap</h1>
      <form className="m-auto">
        <input
          className="bg-gray-200 p-2 rounded-lg w-64 mt-5"
          type="text"
          placeholder="Enter YouTube URL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-rose-500 text-white p-2 rounded-lg ml-2 hover:bg-rose-700 mt-5"
          onClick={handleGoClick}
        >
          Go!
        </button>
      </form>
      {captions && (
        <div className="bg-gray-200 p-2 rounded-lg w-64 mt-5">{captions}</div>
      )}
    </div>
  );
};

export default Index;
