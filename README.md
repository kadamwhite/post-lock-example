# Post Locking Test Plugin

It's possible (likely) this could work using bare `select` and `dispatch` calls within a `subscribe` callback, but I plugged into the Block Editor plugin lifecycle to use that rendering pipeline instead of the `subscribe`.

## Install:

This assumes the [humanmade asset-loader](https://github.com/humanmade/asset-loader) is installed and active in your WordPress project. It has been tested in an Altis 6 local environment.

To install, within your plugins folder,

```bash
git clone git@github.com:kadamwhite/post-lock-example
cd post-lock-example
npm install
npm run build
```

Then in WordPress, activate this plugin
