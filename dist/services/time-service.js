"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calculateDuration = function (postDate) {
    // Ensure postDate is a Date object
    var parsedPostDate = typeof postDate === 'string' ? new Date(postDate) : postDate;
    if (!(parsedPostDate instanceof Date && !isNaN(parsedPostDate.getTime()))) {
        throw new Error('Invalid postDate');
    }
    // Get the current date
    var currentDate = new Date();
    // Calculate time difference in milliseconds
    var timeDifference = currentDate.getTime() - parsedPostDate.getTime();
    // Convert time difference to seconds
    var secondsDifference = Math.floor(timeDifference / 1000);
    if (secondsDifference < 60) {
        return "".concat(secondsDifference, " seconds ago");
    }
    // Convert time difference to minutes
    var minutesDifference = Math.floor(secondsDifference / 60);
    if (minutesDifference < 60) {
        return "".concat(minutesDifference, " minutes ago");
    }
    // Convert time difference to hours
    var hoursDifference = Math.floor(minutesDifference / 60);
    if (hoursDifference < 24) {
        return "".concat(hoursDifference, " hours ago");
    }
    // Convert time difference to days
    var daysDifference = Math.floor(hoursDifference / 24);
    if (daysDifference < 30) {
        return "".concat(daysDifference, " days ago");
    }
    // Convert time difference to months
    var monthsDifference = Math.floor(daysDifference / 30);
    if (monthsDifference < 12) {
        return "".concat(monthsDifference, " months ago");
    }
    // Convert time difference to years
    var yearsDifference = Math.floor(monthsDifference / 12);
    return "".concat(yearsDifference, " years ago");
};
exports.default = calculateDuration;
//# sourceMappingURL=time-service.js.map