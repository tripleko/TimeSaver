Web extension and a localhost time logger that blocks listed websites until a weekly or daily hour quota is met. It's something like a greatly simplified feature subset of the service RescueTime,without the privacy concerns. Time logs are stored in a local SQLite database that can be kept synced across devices with something like Syncthing or Dropbox.

The reality is that it's way too easy to get caught up in the rabbit hole of social media and other internet distractions, but at the same time, it's not practical to completely cut myself off from the web when I need to get work done. There are way too many useful docs and pages.

This isn't a particularly complex solution nor a one size fits all, but it works great for me. It blocks me off from distracting sites when I haven't met my personal work quota but at the same time allows me to briefly view pages related to stuff like code workarounds when I need to, even if they appear on normally blocked sites like [reddit.com/r/python](https://www.reddit.com/r/python) or the like. It's not hard to cheat and get around the block if I really want to, but I've generally been pretty good about staying honest.

Out of all of my personal projects, this has easily been among the most useful to me.

I only tested it under linux, but I've tried to keep it cross-platform so it **probably** works fine in MacOS and Windows.

# Requirements

The web extension requires any modern Chrome or Firefox version.

The localhost app requires Python 3.6+, Flask 1.0+, and SQLite 3.24+ (because I use UPSERT, a relatively new feature in SQLite).

I recommend using something like [virtualenv](https://virtualenv.pypa.io/) or [conda](https://conda.io).

# Install

The web extension works in Chrome and Firefox Developer Editions without issue. See [respective browser documentation](https://developer.chrome.com/extensions/getstarted) for info on installing an unpacked extension. To install in regular Firefox requires [self signing the extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Distribution).

The extension can function on its own as a simple always on web blocker that redirects to about:blank, but was intended to be used in conjunction with the time logging Flask app.

To run the localhost app, you can do so directly with `python timersaver/app.py`. I've set my script to run on system start but you'll have to look up instructions specific to your environment.

# Config

The blocked sites lists can be configured in webextension_src/config.js. One url pattern per line of the string.

Time quotas, block message, port number, etc. can be configured in timersaver/config.py.

Example values are provided in both files.
