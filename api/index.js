const { addonBuilder } = require('stremio-addon-sdk');

const manifest = {
  id: "org.myaddon.vlcdefault",
  version: "1.0.0",
  name: "VLC Default Player",
  resources: ["stream"],
  types: ["movie", "series"],
  idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler((args) => {
  return Promise.resolve({
    streams: [
      {
        name: "VLC External Player",
        title: "Watch with VLC",
        player: "vlc",
        externalUrl: "",  // Let Stremio handle it
        behaviorHints: { notWebReady: true }
      }
    ]
  });
});

module.exports = (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const addonInterface = builder.getInterface();
  addonInterface(req, res);
};
