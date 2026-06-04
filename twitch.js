const embed = new Twitch.Embed("twitch-embed", {
	channel: "Damanking",
	layout: "video",
	autoplay: true,
	parent: ["Damankin6.github.io"]
});
embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
	const player = embed.getPlayer();
	player.setVolume(0.01);
	player.play();
	player.setQuality('160p')
});
