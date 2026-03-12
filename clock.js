function updateClock() {
    const now = new Date();

    const options = {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    };

    const timeString = new Intl.DateTimeFormat("en-US", options).format(now);

    document.getElementById("clock").textContent = "Damanking's Local Time: " + timeString;
}

setInterval(updateClock, 1000);
updateClock();
