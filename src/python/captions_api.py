from flask import Flask, jsonify
from youtube_transcript_api import YouTubeTranscriptApi


app = Flask(__name__)

@app.route('/api/captions')
def get_captions(videoId):
    # code to retrieve captions data from video or audio file
    # and return it as a JSON object
    captionsOutput = YouTubeTranscriptApi.get_transcript(videoId)
    return jsonify(captionsOutput)