const fs = require('fs');

async function fetchSavedNotices(filePath) {
    try {
        if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '[]') };
        const data = fs.readFileSync(filePath, 'utf-8');
        if (data.length === 0) { return [] };
        return JSON.parse(data);
    }
    catch (err) {
        throw (err);
    }
}

async function saveNotices(notices, filePath) {
    fs.writeFileSync(filePath, JSON.stringify(notices, null, 2));
}

async function checkForNewNotices(currentNotices, savedNotices, filePath) {
    const newNotices = currentNotices.filter((notice) =>
        !savedNotices.some(savedNotice =>
            savedNotice.Date === notice.Date &&
            savedNotice.Description === notice.Description
        ));
    if (newNotices.length > 0) {
        savedNotices.unshift(...newNotices);
        saveNotices(savedNotices, filePath);
        return newNotices;
    }
    else {
        return [];
    }
}

module.exports = { fetchSavedNotices, checkForNewNotices };