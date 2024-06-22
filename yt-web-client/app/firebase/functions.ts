import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';
 //to invoke functions, we need an instance of it
// we know which project in firebase from the firebase file 
const generateUploadUrlFunction = httpsCallable(functions, 'generateUploadUrl'); // name of the function

const getVideosFunction = httpsCallable(functions, 'getVideos');

export async function uploadVideo(file: File) {
  const response: any = await generateUploadUrlFunction({
    fileExtension: file.name.split('.').pop() // get file extension by getting splitting it into "." and getting the last value ".mp4"
  });

  // Upload the file to the signed URL
  // the fetch API
  // ? means it could be undefined
  const uploadResult = await fetch(response?.data?.url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  return uploadResult;
}

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: 'processing' | 'processed',
  title?: string,
  description?: string  
}

// If we want to call getVideos from a React server component,
//  we have to make sure the initializeApp(firebaseConfig) is run before.

export async function getVideos() {
  const response: any = await getVideosFunction();
  return response.data as Video[];
}
