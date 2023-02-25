// first fetch

// for this video https://www.youtube.com/watch?v=qlKx8uc_ppU&ab_channel=Vox
// the videoId is qlKx8uc_ppU

//so lets set that

const videoID = "qlKx8uc_ppU";
const YOUR_API_KEY = "AIzaSyCNwvM7_De7xjtbbAwh1g1XEcFPxVfaOKE";

fetch(
  `https://www.googleapis.com/youtube/v3/captions?part=id&videoId=[VIDEO_ID]&key=[YOUR_API_KEY]`
)
  .then((response) => response.json())
  .then((data) => console.log(data.items[0].id))
  .catch((error) => console.error(error));

//   first response output
// captionID is AUieDaazbUO7x6OGb0f08gS7i5Wgp3OmNLmItv_jTBRnYzCD09k in this example (there are two captions provided)
// {
//     "kind": "youtube#captionListResponse",
//     "etag": "0pcRyPBF54S9f7l_GSJThh0Vimk",
//     "items": [
//     {
//     "kind": "youtube#caption",
//     "etag": "cCedx3TWfhs3LsVMoqy5bVkCgaI",
//     "id": "AUieDaazbUO7x6OGb0f08gS7i5Wgp3OmNLmItv_jTBRnYzCD09k"
//     },
//     {
//     "kind": "youtube#caption",
//     "etag": "2P4F6Yv1LvjwlwhqDMXLGanywj8",
//     "id": "AUieDaapIyti5MJNQCmX8uVFrtwrI9V02woQDPECcM_4"
//     }
//     ]
//     }

//   second fretch
fetch(
  `https://www.googleapis.com/youtube/v3/captions/${captionTrackId}?key=${API_KEY}&tfmt=srt`
)
  .then((response) => response.text())
  .then((captionText) => {
    console.log(captionText);
  })
  .catch((error) => console.error(error));

//   second response output
// {
//     "error": {
//     "code": 401,
//     "message": "API keys are not supported by this API. Expected OAuth2 access token or other authentication credentials that assert a principal. See https://cloud.google.com/docs/authentication",
//     "errors": [
//     {
//     "message": "Login Required.",
//     "domain": "global",
//     "reason": "required",
//     "location": "Authorization",
//     "locationType": "header"
//     }
//     ],
//     "status": "UNAUTHENTICATED",
//     "details": [
//     {
//     "@type": "type.googleapis.com/google.rpc.ErrorInfo",
//     "reason": "CREDENTIALS_MISSING",
//     "domain": "googleapis.com",
//     "metadata": {
//     "method": "youtube.api.v3.V3DataCaptionService.Download",
//     "service": "youtube.googleapis.com"
//     }
//     }
//     ]
//     }
//     }
