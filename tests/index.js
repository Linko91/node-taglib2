'use strict'
const fs = require('fs')
const taglib2 = require('../index')
const test = require('tape')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

const TMP_PATH = __dirname + '/tmp'
const FIXTURES_PATH = __dirname + '/fixtures'

test('setup', assert => {
  try { fs.statSync(TMP_PATH) }
  catch(_) { mkdirp.sync(TMP_PATH) }
  assert.end()
})

rimraf.sync(TMP_PATH + '/*')

test('sync write/read', assert => {

  function getRandomYear() {
    const date = new Date
    const from = date.setFullYear(1877, 0, 1)
    const to = (new Date).getTime()
    return new Date(from + Math.random() * (to - from)).getFullYear()
  }

  const rn = Math.floor(Math.random() * 100)
  const rn_year = getRandomYear()

  const audiopath = FIXTURES_PATH + '/sample-output.mp3'
  fs.writeFileSync(audiopath, fs.readFileSync(FIXTURES_PATH + '/sample.mp3'))

  const imagepath = FIXTURES_PATH + '/sample.jpg'
  const imagefile = fs.readFileSync(imagepath)

  assert.ok(!!fs.statSync(audiopath))
  assert.ok(!!fs.statSync(imagepath))

  assert.throws(() => {
    taglib2.writeTagsSync()
  }, 'not enough arguments')

  const r = taglib2.writeTagsSync(audiopath, {
    artist: 'ärtist' + rn,
    albumartist: 'albumartist' + rn,
    title: 'title' + rn,
    album: 'album' + rn,
    comment: 'comment' + rn,
    genre: 'genre' + rn,
    year: rn_year,
    //track: 3 + rn,
    tracknumber: '3/' + rn,
    discnumber: '1/' + rn,
    composer: 'composer' + rn,
    //mimetype: 'image/jpeg',
    pictures: [{ mimetype: '', picture: imagefile }]
  })

  assert.ok(r)

  assert.throws(() => {
    taglib2.readTagsSync()
  }, 'not enough arguments')

  const tags = taglib2.readTagsSync(audiopath)

  assert.equal(tags.artist, 'ärtist' + rn)
  assert.equal(tags.albumartist, 'albumartist' + rn)
  assert.equal(tags.title, 'title' + rn)
  assert.equal(tags.bpm, 120)
  assert.equal(tags.album, 'album' + rn)
  assert.equal(tags.comment, 'comment' + rn)
  assert.equal(tags.genre, 'genre' + rn)
  assert.equal(tags.year, parseInt(rn_year, 10))
  assert.equal(tags.discnumber, '1/' + rn)
  assert.equal(tags.composer, 'composer' + rn)
  //assert.equal(tags.track, 3 + rn)
  assert.equal(tags.tracknumber, '3/' + rn)

  const tmpImagepath = TMP_PATH + '/sample.jpg'
  fs.writeFileSync(tmpImagepath, tags.pictures[0].picture)

  assert.equal(tags.bitrate, 192)
  assert.equal(tags.samplerate, 44100)
  assert.equal(tags.channels, 2)
  assert.equal(tags.length, 90)
  assert.equal(tags.time, '1:30')

  assert.equal(Buffer.compare(
    fs.readFileSync(tmpImagepath),
    fs.readFileSync(imagepath)
  ), 0)

  assert.end()
})

test('sync write/read m4a + jpg', assert => {

  const rn = Math.floor(Math.random() * 100)
  const rn_year = Math.floor(Math.random() * 1000)

  const audiopath = FIXTURES_PATH + '/sample-output.m4a'
  fs.writeFileSync(audiopath, fs.readFileSync(FIXTURES_PATH + '/sample.m4a'))

  const imagepath = FIXTURES_PATH + '/sample.jpg'
  const imagefile = fs.readFileSync(imagepath)

  assert.comment('write a copy of an mp4 file with a new image')
  const r = taglib2.writeTagsSync(audiopath, {
    pictures: [{
      mimetype: 'image/jpeg',
      picture: imagefile 
    }]
  })  

  assert.comment('read the tags from the new file')
  const tags = taglib2.readTagsSync(audiopath)

  assert.comment('write the picture to a tmp file')
  const tmpImagepath = TMP_PATH + '/sample.jpg'
  fs.writeFileSync(tmpImagepath, tags.pictures[0].picture)

  assert.comment('compare the image extracted to the image added')

  assert.equal(Buffer.compare(
    fs.readFileSync(tmpImagepath),
    fs.readFileSync(imagepath)
  ), 0)

  assert.end()
})


test('sync write/read m4a + png', assert => {

  const rn = Math.floor(Math.random() * 100)
  const rn_year = Math.floor(Math.random() * 1000)

  const audiopath = FIXTURES_PATH + '/sample-output-png.m4a'
  fs.writeFileSync(audiopath, fs.readFileSync(FIXTURES_PATH + '/sample.m4a'))

  const imagepath = FIXTURES_PATH + '/sample.png'
  const imagefile = fs.readFileSync(imagepath)

  assert.comment('write a copy of an mp4 file with a new image')
  const r = taglib2.writeTagsSync(audiopath, {
    pictures: [{
      mimetype: 'image/png',
      picture: imagefile
    }]
  })

  assert.comment('read the tags from the new file')
  const tags = taglib2.readTagsSync(audiopath)

  assert.comment('write the picture to a tmp file')
  const tmpImagepath = TMP_PATH + '/sample.png'
  fs.writeFileSync(tmpImagepath, tags.pictures[0].picture)

  assert.comment('compare the image extracted to the image added')

  assert.equal(Buffer.compare(
    fs.readFileSync(tmpImagepath),
    fs.readFileSync(imagepath)
  ), 0)

  assert.end()
})

