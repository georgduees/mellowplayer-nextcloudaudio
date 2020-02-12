# Mellowplayer Nextcloud Plugin

This Plugin loads the default Audio Player of Nextcloud as Mellowplayer Plugin.
## Installation

Copy this Plugin to your Mellowplayer plugin-folder and adjust the settings in the metadata.ini-file, so it points to your nextcloud installation.

```ini
url=https://domain.example.org/apps/audioplayer/
```
The Url 'domain.example.org' needs to be replaced with your url to the nextcloud instance.
Depending on your Url settings this can either be the plain-url followed by the '/apps/audioplayer'-Path or adjusted.
```ini
url=https://MYNEXTCLOUDDOMAIN/apps/audioplayer/
```
After you saved this settings start Mellowplayer again and enable the Plugin.


## Licensing
The plugin itself is licensed as MIT license https://gduees.mit-license.org/

The Icon comes from Terence Eden Blog-Url: https://shkspr.mobi/blog/ and is licensed by 
Creative Commons 4.0 Attribution License.
https://creativecommons.org/licenses/by/4.0/