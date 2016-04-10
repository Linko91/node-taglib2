# SYNOPSIS
taglib version 2 bindings

# USAGE
### WRITING TAGS
A `cover`, can be any image type, but you need to specify the mimetype,
to find the mimetype, we use [`node-mime`](https://github.com/broofa/node-mime).

```js
const taglib = require('taglib2')
const mime = require('node-mime')

const props = {
  artist: 'Howlin\' Wolf',
  title: 'Evil is goin\' on',
  album: 'Smokestack Lightnin\'',
  comment: 'Chess Master Series',
  genre: 'blues',
  year: 1951,
  track: 3,
  mimetype: mime('./cover.jpg'),
  cover: fs.readFileSync('./cover.jpg')
}

taglib.writeTagsSync('./file.mp3', props)
```

### READING TAGS

```js
const taglib = require('taglib2')
const tags = taglib.readTagsSync('./file.mp3')
```

#### OUTPUT
`tags.cover` will be an array of buffers that contain image data.

```json
{
  "artist": "Howlin' Wolf",
  "title": "Evil is goin' on",
  "album": "Smokestack Lightnin'",
  "comment": "Chess Master Series",
  "genre": "blues",
  "year": 1951,
  "track": 3,
  "cover": [],
  "bitrate": 192,
  "samplerate": 44100,
  "channels": 2,
  "time": "1:30",
  "length": 90
}
```

