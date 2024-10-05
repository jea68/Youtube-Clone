# YouTube-Clone Project
Built a skeleton of the YouTube web app where you can List videos, Watch a video, Sign in/out, Upload a video and Watch the transcoded video. I initiated the project to enhance my full-stack development skills.

**Technologies Used:** Node.js, TypeScript, Next.js, HTML, CSS, Firebase, Google Cloud Platform (GCP), FFMPEG.

**Link:** https://yt-web-client-immn7fa7pa-uc.a.run.app/

*site is down as my google cloud wallet is used up :(*

## Architecture
<img src="assets/yt-clone-architecture.png" width="650" height="400">

## Key Components
- **Video Processing Service:** Created using Node.js and TypeScript, leveraging FFMPEG for video processing.
- **Frontend:** Built with Next.js, incorporating HTML and CSS to practice and improve front-end development skills.
- **Backend:** Implemented using Firebase Functions for the Video API, handling user sign-in/sign-out and video metadata management.
- **Storage:** Utilized Google Cloud Storage to store both raw and processed videos.
- **Message Queue:** Employed Google Pub/Sub for asynchronous event handling, ensuring smooth video processing and upload.
- **Deployment:** Deployed the Next.js UI and non-public video processing service on Google Cloud Run.
- **Database:** Stored video metadata in Google Firestore.

## General Idea
- Cloud Storage stores the raw and processed videos uploaded by users.
- Pub/Sub acts as a message queue and sends messages to the video processing service.
- Cloud Run hosts a non-public video processing service. After it transcodes videos, they are uploaded to Cloud Storage, and Cloud Run uploads the video metadata to Cloud Firestore.
- Cloud Firestore stores the metadata for the videos.
- Cloud Run also hosts a Next.js app, which serves as the YouTube web client.
- The Next.js app makes API calls to Firebase Functions.
- Firebase Functions fetches videos from Cloud Firestore and returns them to show on the app.

## Limitations
It's a basic level of video streaming provided by Google Cloud Storage; it's not optimized like YouTube. Also, there is no implementation of a Content Delivery Network (CDN) for faster services.

*nb. This project was inspired by neetcode.io and has a similar tech stack and architecture*
