# SYNOPSIS
taglib version 2 bindings

# USAGE
For example, with electron...

```
ELECTRON=1 npm install
```

### WRITING TAGS
Note that `track` will overwrite `tracknumber` if specified in the same write.

```js
const taglib = require('taglib2')
const mime = require('node-mime')
const fs = require('fs')

const props = {
  artist: 'Howlin\' Wolf',
  title: 'Evil is goin\' on',
  album: 'Smokestack Lightnin\'',
  comment: 'Chess Master Series',
  genre: 'blues',
  year: 1951,
  track: 3,
  tracknumber: '1/1',
  discnumber: '1/1',
  pictures: [
    {
      "mimetype": mime('./cover.jpg'),
      "picture": fs.readFileSync('./cover.jpg')
    } 
  ],
}

taglib.writeTagsSync('./file.mp3', props)
```

### READING TAGS

```js
const taglib = require('taglib2')
const tags = taglib.readTagsSync('./file.mp3')
```

#### OUTPUT
`tags.pictures` will be an array of buffers that contain image data.

```json
{
  "artist": "Howlin' Wolf",
  "albumartist": "Howlin' Wolf",
  "title": "Evil is goin' on",
  "album": "Smokestack Lightnin'",
  "comment": "Chess Master Series",
  "composer": "Chester Burnett",
  "genre": "blues",
  "year": 1951,
  "track": 3,
  "tracknumber": "3/3",
  "discnumber": "1/1",
  "pictures": [
    {
      "mimetype": "image/jpeg",
      "picture": <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 ... >
    } 
  ],
  "bitrate": 192,
  "bpm": 120,
  "samplerate": 44100,
  "channels": 2,
  "compilation": false,
  "time": "1:30",
  "length": 90
}
```

