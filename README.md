This script set is for adding local time tracking feature to [Hiveminder](http://hiveminder.com/).

Yeah, I know Hiveminder supports time tracking. But it doesn't work at offline.
I sometimes place myself at offline, because working at online has a number of temptations, twitter/irc/im and so on.. That's why I want this.

## Screenshot

<a href="http://www.flickr.com/photos/typester/3257131671/" title="Hiveminder.app by typester, on Flickr"><img src="http://farm4.static.flickr.com/3347/3257131671_4449115c2c_o.png" width="505" height="554" alt="Hiveminder.app" /></a>

## Features

* Simple time tracking
* Fluid app support (also include my userstyle for this)
* Enable growl notification instead of jGrowl (Fluid only)
* Notify current tasks every 10 minutes (it probably get you back to work ;)


## Current issues

* Currently it doesn't save elapsed time, so you lost it when reload page.
* And also doesn't save it to official time record.

## How to use

### For fluid app users

* Setup hiveminder fluid app
* Open the app and go preferences panel -> Userstyles, and copy 'hiveminder-fluid.css' and paste it there.
* Copy `*.user.js` into `~/Library/Application Support/Fluid/SSB/{Your App Name/Userscripts/` and enable these.

### For firefox users

* install `hiveminder-local-time-track.user.js` as Greasemonkey script and enable it.


## Author

Daisuke Murase <typester@cpan.org>
