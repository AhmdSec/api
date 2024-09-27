const { addonBuilder } = require('stremio-addon-sdk');

// Manifest for the add-on
const manifest = {
  id: "org.myaddon.vlcdefault",
  version: "1.0.0",
  name: "VLC Default Player",
  description: "This add-on automatically selects VLC as the external player.",
  resources: ["stream"],
  types: ["movie", "series"],
  idPrefixes: ["tt"],  // For IMDb-based content (movies/series)
};

// Create an add-on builder
const builder = new addonBuilder(manifest);

// Define the stream handler
builder.defineStreamHandler((args) => {
  if (args.type === "movie" || args.type === "series") {
    return Promise.resolve({
      streams: [
        {
          name: "VLC External Player",
          title: "Watch in VLC",
          player: "vlc",
          externalUrl: "",  // VLC handles the URL, leave it blank
          behaviorHints: {
            notWebReady: true,
            proxyHeaders: { "Access-Control-Allow-Origin": "*" }
          }
        }
      ]
    });
  }
  return Promise.resolve({ streams: [] });
});

// Export the builder interface
module.exports = builder.getInterface();
