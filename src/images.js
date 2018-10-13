let images = {};

module.exports = {
    get (id) {
        return images[id];
    },
    add (id, file_id) {
        return images[id] = file_id;
    },
    addFromMessage(id, message) {
        if (!images[id])
            return images[id] = message.photo[message.photo.length-1].file_id;
        else
            return null;
    }
}