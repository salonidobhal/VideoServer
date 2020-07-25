//create thumbnails using ffmpeg

const {spawn}= require('child_process');
const {createWriteStream }= require('fs');
const VideoDetails = require('../models/VideoDetails');
const config = require('../configs/default');
const port= config.port;
const ffmpegPath= 'C:/Users/Saloni Dobhal/react/video-server/server/ffmpeg-4.3-win64-static/bin/ffmpeg';
const width= 256;
const height= 144;

const generateThumbnail = (target, title, username) => {
    title = title.replace(/.mov| .mpg|.mpeg|.mp4|.wmv|..avi/gi, '');
    let tmpFile= createWriteStream('media/uploads/video_thumbnails/'+ title + '.jpg');
    const ffmpeg= spawn(ffmpegPath, [
    '-ss',
    0,
    '-i',
    target,
    '-vf',
    `thumbnail,scale=${width}:${height}`,
    '-qscale:v',
    '2',
    '-frames:v',
    '1',
    '-f',
    'image2',
    '-c:v',
    'mjpeg',
    'pipe:1'
  ]);
 
    ffmpeg.stdout.pipe(tmpFile);
    const videoDetails = new VideoDetails({
        uploader_name : username,
        upload_title: title,
        video_path : target,
        thumbnail_path : 'http://localhost:'+port + '/api/videos/video_thumbnails/' + encodeURIComponent(title + '.jpg')
    });
    videoDetails
    .save()
    .then(result=> {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
}

module.exports={
    generateThumbnail: generateThumbnail
}