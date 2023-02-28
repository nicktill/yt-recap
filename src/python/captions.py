from flask import Flask, jsonify, request
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)

@app.route('/captions')
def get_captions():
    videoId = request.args.get('videoId')
    captionsOutput = YouTubeTranscriptApi.get_transcript(videoId)
    return jsonify(captionsOutput)
