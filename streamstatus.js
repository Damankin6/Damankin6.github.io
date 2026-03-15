const CHANNEL = "damanking";

let startTime = null;

async function getStreamData() {
    const query = [{
        operationName: "StreamMetadata",
        variables: { channelLogin: CHANNEL },
        extensions: {
            persistedQuery: {
                version: 1,
                sha256Hash: "0828119ded1c13477984a0b6a6c9b7e6d8e1b7a62a7e46d9d67e5b7f1a3c5d2e"
            }
        }
    }];

    try {
        const res = await fetch("https://gql.twitch.tv/gql", {
            method: "POST",
            body: JSON.stringify(query)
        });

        const data = await res.json();

        const stream = data[0].data.user.stream;

        if (!stream) {
            document.getElementById("streamStatus").textContent = "Damanking is Offline";
            startTime = null;
            return;
        }

        startTime = new Date(stream.createdAt);

        updateStatus(stream.viewersCount);

    } catch {
        document.getElementById("streamStatus").textContent = "Damanking is Offline";
    }
}

function updateStatus(viewers) {
    if (!startTime) return;

    const diff = Math.floor((Date.now() - startTime) / 1000);

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    document.getElementById("streamStatus").textContent =
        `Damanking is LIVE • ${hours}h ${minutes}m ${seconds}s • ${viewers} viewers`;
}

function tick() {
    const text = document.getElementById("streamStatus").textContent;

    if (!startTime || text.includes("Offline")) return;

    const parts = text.split("•");
    const viewers = parts[2];

    updateStatus(viewers.replace("viewers","").trim());
}

async function init() {
    await getStreamData();

    setInterval(tick, 1000);      // uptime counter
    setInterval(getStreamData, 30000); // refresh viewers
}

init();