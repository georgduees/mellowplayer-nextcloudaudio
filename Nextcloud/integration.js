const helpers = {
  playbackStatusOnLoad: mellowplayer.PlaybackStatus.STOPPED,

  getTime: function (el) {
    let value = 0
    try {
      const element = el[0]
      if (element) value = toSeconds(element.innerText)
    } catch (e) { }

    return value
  },
  getDuration: function () {
    return toSeconds(OCA.Audioplayer.Core.Player.dom.duration.innerHTML)
  },
  getPosition: function () {
    return toSeconds(OCA.Audioplayer.Core.Player.dom.time.innerHTML)
  },
  getTitle: function () {
    let title = ''
    try {
      title = OCA.Audioplayer.Core.Player.playlistController.getItem().dataset.title
    } catch (e) { }

    return title
  },
  getSongId: function () {
    let songId = 0
    try {
      let trackId = OCA.Audioplayer.Core.Player.playlistController.getItem().dataset.trackid;

      songId = trackId
    } catch (e) { }

    return songId
  },
  getArtist: function () {
    let artist = ''
    try {

      artist = OCA.Audioplayer.Core.Player.playlistController.getItem().dataset.artist

    } catch (e) { }

    return artist
  },
  isFavorite: function () {
    let favorite = false
    try {

      let trackId = OCA.Audioplayer.Core.Player.playlistController.getItem().dataset.trackid;

      let other = document.querySelector(`i[data-trackid="` + trackId + `"]`);
      let classes = other.classList;
      if (classes.contains('icon-starred')) {

        favorite = true
      } else {

        favorite = false
      }
    } catch (e) { }

    return favorite
  },
  getVolume: function () {
    let volume = 1
    try {
      volume = parseFloat(OCA.Audioplayer.Core.Player.actions.getVolume() / 100);
    } catch (e) { }

    return volume
  },
  getAlbumTitle: function () {
    let albumTitle = ''
    try {
      albumTitle = OCA.Audioplayer.Core.Player.playlistController.getItem().dataset.album

    } catch (e) { }

    return albumTitle
  },
  getAlbumArt: function () {
    let albumCoverUrl = ''
    try {
      let coverId = OCA.Audioplayer.Core.Player.playlistController.getItem().dataset.cover;

      albumCoverUrl = window.location.protocol + `//` + window.location.hostname + window.location.pathname + 'getcover/' + coverId;


    } catch (e) { }

    return albumCoverUrl

  }
}
let playbackStatus = helpers.playbackStatusOnLoad
function update() {
  return {
    'playbackStatus': playbackStatus,
    'canSeek': true,
    'canGoNext': true,
    'canGoPrevious': true,
    'canAddToFavorites': true,
    'volume': helpers.getVolume(),
    'duration': helpers.getDuration(),
    'position': helpers.getPosition(),
    'songId': helpers.getSongId(),
    'songTitle': helpers.getTitle(),
    'artistName': helpers.getArtist(),
    'albumTitle': helpers.getAlbumTitle(),
    'artUrl': helpers.getAlbumArt(),
    'isFavorite': helpers.isFavorite()
  }
}
function play() {
  try {
    OCA.Audioplayer.Core.Player.actions.play();
    playbackStatus = mellowplayer.PlaybackStatus.PLAYING
  } catch (e) { }

}
function pause() {
  try {
    if (playbackStatus == mellowplayer.PlaybackStatus.PLAYING
    ) {
      OCA.Audioplayer.Core.Player.actions.pause();
      playbackStatus = mellowplayer.PlaybackStatus.STOPPED;
    } else {
      play();
    }
  } catch (e) { }
}
function goNext() {
  try {
    OCA.Audioplayer.Core.Player.actions.next();
    playbackStatus = mellowplayer.PlaybackStatus.PLAYING;
  } catch (e) { }
}
function goPrevious() {
  try {
    OCA.Audioplayer.Core.Player.actions.next();
    playbackStatus = mellowplayer.PlaybackStatus.PLAYING
  } catch (e) { }
}
function setVolume(volume) {
  try {

    OCA.Audioplayer.Core.Player.actions.adjustVolume(Math.floor((volume) * 100));
    playbackStatus = mellowplayer.PlaybackStatus.PLAYING
  } catch (e) { }

}
function addToFavorites() {
  try {
    let trackId = OCA.Audioplayer.Core.Player.playlistController.getItem().dataset.trackid;
    let favorite = false


    let other = document.querySelector(`i[data-trackid="` + trackId + `"]`);
    let classes = other.classList;

    if (classes.contains('icon-starred')) {

      favorite = true

    } else {

      favorite = false
      other.classList.replace('icon-star', 'icon-starred');

    }
    OCA.Audioplayer.Backend.favoriteUpdate(trackId, favorite)

  } catch (e) { }
}
function removeFromFavorites() {
  try {
    let trackId = OCA.Audioplayer.Core.Player.playlistController.getItem().dataset.trackid;
    let favorite = false


    let other = document.querySelector(`i[data-trackid="` + trackId + `"]`);
    let classes = other.classList;
    if (classes.contains('icon-starred')) {

      favorite = true
      other.classList.replace('icon-starred', 'icon-star');

    } else {

      favorite = false

    }

    OCA.Audioplayer.Backend.favoriteUpdate(trackId, favorite)

  } catch (e) { }
}
function seekToPosition(position) {
  try {
    window.soundManager.getSoundById(window.soundManager.soundIDs[0]).setPosition(position * 1000)
  } catch (e) { }
}