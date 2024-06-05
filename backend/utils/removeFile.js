import fs from "fs";

const removeFile = (file) => {
    fs.unlink(file, function (err) {
        if (err && err.code === "ENOENT") {
            console.log("file does not exist");
        } else if (err) {
            console.log("Error occured in removing the file");
        } else {
            console.log("file removed");
        }
    });
};
export { removeFile };
