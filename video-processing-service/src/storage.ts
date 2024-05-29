// What this does
    // 1. GCS file interactions
    //  2. local file interactions
import { Storage } from "@google-cloud/storage";
import fs from 'fs'; // import file system
import ffmpeg from 'fluent-ffmpeg'; // may need to changes


const storage = new Storage(); // instance of cloud storage to interact with the API

const rawVideoBucketName = "jea68-yt-raw-videos";
const processedVideoBucketName = "jea68-yt-processed-videos"; // must be unique globally

const localRawVideoPath = "./raw-videos"; // folders we will upload raw and processed vids
const localProcessedVideoPath = "./processed-videos";

/**
 * Function below "setupDirectories" Creates the local directories for raw and processed videos.
 */
export function setupDirectories() {
  ensureDirectoryExistence(localRawVideoPath);
  ensureDirectoryExistence(localProcessedVideoPath);
}


/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}.
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}.
 * @returns A promise that resolves when the video has been converted.
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
  return new Promise<void>((resolve, reject) => {// javascript promise => allows us to either resolve or reject the prmoise
    ffmpeg(`${localRawVideoPath}/${rawVideoName}`) // variables of the folder /  name
      .outputOptions("-vf", "scale=-1:360") // 360p
      .on("end", function () {
        console.log("Processing finished successfully");
        resolve(); // resolve the promise (promise of void type)
      })
      .on("error", function (err: any) {
        console.log("An error occurred: " + err.message);
        reject(err); // reject the promise
      })
      .save(`${localProcessedVideoPath}/${processedVideoName}`); // variavles of the processed folder / name
  });
}


/**
 * @param fileName - The name of the file to download from the 
 * {@link rawVideoBucketName} bucket into the {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been downloaded.
 */

// these functions are similar to API functions again, but we split it up into functions
export async function downloadRawVideo(fileName: string) {
  await storage.bucket(rawVideoBucketName) // await blocks the console.log till the below runs
    .file(fileName)
    .download({
      destination: `${localRawVideoPath}/${fileName}`,
    });

  console.log(
    `gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}.`
  );
}


/**
 * @param fileName - The name of the file to upload from the 
 * {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName}.
 * @returns A promise that resolves when the file has been uploaded.
 */
export async function uploadProcessedVideo(fileName: string) {
  const bucket = storage.bucket(processedVideoBucketName);

  // Upload video to the bucket
  await storage.bucket(processedVideoBucketName)
    .upload(`${localProcessedVideoPath}/${fileName}`, {
      destination: fileName,
    });
  console.log(
    `${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}.`
  );

  // Set the video to be publicly readable
  await bucket.file(fileName).makePublic();
}


/**
 * @param fileName - The name of the file to delete from the
 * {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been deleted.
 * 
 */
export function deleteRawVideo(fileName: string) {
  return deleteFile(`${localRawVideoPath}/${fileName}`);
}// uses the deletefile functions we created below


/**
* @param fileName - The name of the file to delete from the
* {@link localProcessedVideoPath} folder.
* @returns A promise that resolves when the file has been deleted.
* 
*/
export function deleteProcessedVideo(fileName: string) {
  return deleteFile(`${localProcessedVideoPath}/${fileName}`);
}// uses the deletefile functions we created below


/**
 * @param filePath - The path of the file to delete.
 * @returns A promise that resolves when the file has been deleted.
 */
function deleteFile(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => { // fasted way to delete file
        if (err) {
          console.error(`Failed to delete file at ${filePath}`, err);
          reject(err);
        } else {
          console.log(`File deleted at ${filePath}`);
          resolve();
        }
      });
    } else {
      console.log(`File not found at ${filePath}, skipping delete.`);
      resolve();
    }
  });
}


/**
 * Ensures a directory exists, creating it if necessary.
 * @param {string} dirPath - The directory path to check.
 */
function ensureDirectoryExistence(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // recursive: true enables creating nested directories
    console.log(`Directory created at ${dirPath}`);
  }
}
