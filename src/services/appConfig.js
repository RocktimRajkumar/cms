export const configuration = {
     // API base url production server
    // apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://52.163.118.48:8010/api/v1',
    // API base url test server
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "http://uat.apps.waycool.in:8010/api/v1",
    fileLimit: 10240, // File Limit is 10 MB,
    // All the formats for file and images that can be uploaded 
    allowedFileFormats: '.txt,.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.csv',
    version:'1.0.0',
};
// Here replace  GoogleMapsAPI value with original one
export const GoogleMapsAPI = 'AIzaSyAscjPuHsmxseZEeitNZp3SrZ8kl7Z1EX0';
