const ffprobe = require("ffprobe"),
  ffprobeStatic = require("ffprobe-static");
const fs = require("fs");

const videoManipulation = (file) => {
  let metadata = null;
  try {
    metadata = ffprobe(file.tempFilePath, { path: ffprobeStatic.path })
      .then((info) => {
        console.log(file.tempFilePath);
        deleteVideo();
        return info;
      })
      .catch(function (err) {
        console.error(err);
        return err;
      });
  } catch (error) {
    console.log(error);
  }

  const deleteVideo = () => {
    try {
      fs.unlink(file.tempFilePath, (err) => {
        if (err) throw err;
        console.log("File deleted");
      });
    } catch (error) {
      console.log("Error from fs: ", error);
    }
  };

  return metadata;
};

module.exports = videoManipulation;
