import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions(); //to invoke functions, we need an instance of it
// we know which project in firebase from the firebase file 
const generateUploadUrlFunction = httpsCallable(functions, 'generateUploadUrl'); // name of the function

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
