import React, { useState, useEffect } from "react";
import Link from "next/link";

const Index = () => {
  const [input, setInput] = useState("");
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!input) {
      return;
    }

    setLoading(true);
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${input}&key=AIzaSyCNwvM7_De7xjtbbAwh1g1XEcFPxVfaOKE`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items[0] && data.items[0].snippet) {
          setVideo(data.items[0].snippet);
        }
        setLoading(false);
      });
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getVideoId(
        input
      )}&key=AIzaSyCNwvM7_De7xjtbbAwh1g1XEcFPxVfaOKE`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length) {
          setVideo(data.items[0].snippet);
        }
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center h-screen bg-white">
      <h1 className="text-black text-3xl font-bold p-8">YT-Recap</h1>
      <form onSubmit={handleSubmit} className="m-auto">
        <input
          className="bg-gray-200 p-2 rounded-lg w-64 mt-5"
          type="text"
          placeholder="Enter YouTube URL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Link href={`/summary?id=${input}`}>
          <button className="bg-rose-500 text-white p-2 rounded-lg ml-2 hover:bg-rose-700 mt-5">
            Go!
          </button>
        </Link>
      </form>
      {loading && <div>Loading...</div>}
    </div>
  );
};

const Summary = ({ video }) => {
  return (
    <div className="flex flex-col items-center h-screen bg-white">
      <h1 className="text-black text-3xl font-bold p-8">YT-Recap</h1>
      <div className="m-auto">
        <h2 className="text-black text-2xl font-bold p-8">{video.title}</h2>
        <p className="text-black text-lg font-normal p-8">
          {video.channelTitle}
        </p>
        <p className="text-black text-lg font-normal p-8">
          {video.description}
        </p>
      </div>
    </div>
  );
};

Summary.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${query.id}&key=AIzaSyCNwvM7_De7xjtbbAwh1g1XEcFPxVfaOKE`
  );
  const data = await res.json();
  return { video: data.items[0].snippet };
};

export default Index;
