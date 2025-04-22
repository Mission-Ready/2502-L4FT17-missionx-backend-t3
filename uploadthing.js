// Import the createUploadthing function from the uploadthing library
const { createUploadthing } = require('uploadthing/express');

// Create an instance of Uploadthing

const f = createUploadthing();

// Define the uploadRouter object
//The uploadRouter object is defined to hold the configuration for file uploads.
const uploadRouter = {
    // Define an image uploader configuration
    // The createUploadthing function is called to create an instance, stored in the variable f.
    imageUploader: f({
        // Specify the settings for the image upload
        image: {
            // Limit the maximum number of files that can be uploaded to 1
            maxFileCount: 1,
            // Set the maximum file size to 4MB
            maxFileSize: '4MB',
        },
        // The .onUploadComplete method is chained to log a message to the console whenever an upload is successfully completed.
    }).onUploadComplete(data => console.log('upload completed')), // Log a message when the upload is complete
};

// Export the uploadRouter object so it can be used in other parts of the application
// the uploadRouter object is exported using module.exports,
// making it available for use in other parts of the application (e.g., in the main server file).
module.exports = { uploadRouter };


