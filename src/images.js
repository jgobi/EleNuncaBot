let images = {};

module.exports = {
    get (path) {
        return images[path] || { source: path };
    },
    add (path, file_id) {
        images[path] = file_id;
    },
    addFromMessage(path, message) {
        images[path] = message.photo[message.photo.length-1].file_id;
    },
    all () {
        return images;
    }
}