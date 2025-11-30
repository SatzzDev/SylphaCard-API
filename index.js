const express = require('express');
const { Classic, ClassicPro, Dynamic, Mini, Upcoming, QueueList, AddedToQueue, Lyrics } = require('sylphacard');
const morgan = require('morgan');

const app = express();
const PORT = process.env.SERVER_PORT || 80;

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const normalizeColor = (color) => {
  if (!color) return null;
  return color.startsWith('#') ? color : `#${color}`;
};

const validateRequiredParams = (params, required) => {
  const missing = required.filter(field => !params[field]);
  if (missing.length > 0) {
    return { valid: false, message: `Missing required parameters: ${missing.join(', ')}` };
  }
  return { valid: true };
};

app.get('/', (req, res) => {
  res.json({
    message: 'Sylphacard API Server',
    endpoints: {
      '/classic': 'Generate Classic theme music card',
      '/classic-pro': 'Generate Classic Pro theme music card',
      '/dynamic': 'Generate Dynamic theme music card',
      '/mini': 'Generate Mini theme music card',
      '/upcoming': 'Generate Upcoming theme music card',
      '/queue': 'Generate Queue list music card (POST)',
      '/added-to-queue': 'Generate Added to Queue music card',
      '/lyrics': 'Generate Lyrics card'
    }
  });
});

app.get('/classic', async (req, res) => {
  try {
    const { 
      title, 
      author, 
      thumbnail, 
      backgroundColor, 
      progressColor, 
      progressBarColor, 
      nameColor, 
      authorColor, 
      timeColor,
      progress, 
      startTime, 
      endTime,
      backgroundImage,
      imageDarkness,
      imageBlur
    } = req.query;

    const validation = validateRequiredParams(req.query, ['title', 'author', 'thumbnail']);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const card = await Classic({
      thumbnailImage: thumbnail,
      backgroundImage: backgroundImage || undefined,
      imageDarkness: imageDarkness ? parseInt(imageDarkness) : 60,
      imageBlur: imageBlur ? parseInt(imageBlur) : undefined,
      backgroundColor: normalizeColor(backgroundColor) || '#070707',
      progress: progress ? parseInt(progress) : 50,
      progressColor: normalizeColor(progressColor) || '#FF7A00',
      progressBarColor: normalizeColor(progressBarColor) || '#5F2D00',
      name: title,
      nameColor: normalizeColor(nameColor) || '#FF7A00',
      author: author,
      authorColor: normalizeColor(authorColor) || '#696969',
      startTime: startTime || '0:00',
      endTime: endTime || '3:00',
      timeColor: normalizeColor(timeColor) || '#fdfdfdff'
    });

    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'no-transform');
    res.set('Content-Encoding', 'identity');
    res.status(200).end(card);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

app.get('/classic-pro', async (req, res) => {
  try {
    const { 
      title, 
      author, 
      thumbnail, 
      backgroundColor, 
      progressColor, 
      progressBarColor, 
      nameColor, 
      authorColor, 
      timeColor,
      progress, 
      startTime, 
      endTime,
      backgroundImage,
      imageDarkness,
      imageBlur
    } = req.query;

    const validation = validateRequiredParams(req.query, ['title', 'author', 'thumbnail']);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const card = await ClassicPro({
      thumbnailImage: thumbnail,
      backgroundImage: backgroundImage || undefined,
      imageDarkness: imageDarkness ? parseInt(imageDarkness) : 60,
      imageBlur: imageBlur ? parseInt(imageBlur) : undefined,
      backgroundColor: normalizeColor(backgroundColor) || '#070707',
      progress: progress ? parseInt(progress) : 50,
      progressColor: normalizeColor(progressColor) || '#FF7A00',
      progressBarColor: normalizeColor(progressBarColor) || '#5F2D00',
      name: title,
      nameColor: normalizeColor(nameColor) || '#FF7A00',
      author: author,
      authorColor: normalizeColor(authorColor) || '#696969',
      startTime: startTime || '0:00',
      endTime: endTime || '3:00',
      timeColor: normalizeColor(timeColor) || '#FF7A00'
    });

    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'no-transform');
    res.set('Content-Encoding', 'identity');
    res.status(200).end(card);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

app.get('/dynamic', async (req, res) => {
  try {
    const { 
      title, 
      author, 
      thumbnail, 
      backgroundColor, 
      progressColor, 
      progressBarColor, 
      nameColor, 
      authorColor,
      progress,
      backgroundImage,
      imageDarkness,
      imageBlur
    } = req.query;

    const validation = validateRequiredParams(req.query, ['title', 'author', 'thumbnail']);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const card = await Dynamic({
      thumbnailImage: thumbnail,
      backgroundImage: backgroundImage || thumbnail,
      imageDarkness: imageDarkness ? parseInt(imageDarkness) : 60,
      imageBlur: imageBlur ? parseInt(imageBlur) : undefined,
      backgroundColor: normalizeColor(backgroundColor) || '#070707',
      progress: progress ? parseInt(progress) : 50,
      progressColor: normalizeColor(progressColor) || '#FF7A00',
      progressBarColor: normalizeColor(progressBarColor) || '#5F2D00',
      name: title,
      nameColor: normalizeColor(nameColor) || '#FF7A00',
      author: author,
      authorColor: normalizeColor(authorColor) || '#696969'
    });

    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'no-transform');
    res.set('Content-Encoding', 'identity');
    res.status(200).end(card);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

app.get('/mini', async (req, res) => {
  try {
    const { 
      thumbnail, 
      backgroundColor, 
      progressColor, 
      progressBarColor, 
      menuColor,
      progress,
      paused,
      backgroundImage,
      imageDarkness,
      imageBlur
    } = req.query;

    const validation = validateRequiredParams(req.query, ['thumbnail']);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const card = await Mini({
      thumbnailImage: thumbnail,
      backgroundImage: backgroundImage || undefined,
      imageDarkness: imageDarkness ? parseInt(imageDarkness) : 60,
      imageBlur: imageBlur ? parseInt(imageBlur) : undefined,
      backgroundColor: normalizeColor(backgroundColor) || '#070707',
      progress: progress ? parseInt(progress) : 50,
      progressColor: normalizeColor(progressColor) || '#FF7A00',
      progressBarColor: normalizeColor(progressBarColor) || '#5F2D00',
      menuColor: normalizeColor(menuColor) || '#FF7A00',
      paused: paused === 'true'
    });

    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'no-transform');
    res.set('Content-Encoding', 'identity');
    res.status(200).end(card);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

app.get('/upcoming', async (req, res) => {
  try {
    const {
      thumbnail,
      backgroundImage,
      imageDarkness,
      imageBlur,
      author,
      title,
      trackIndexBackgroundRadii
    } = req.query;

    const validation = validateRequiredParams(req.query, ['thumbnail', 'author', 'title']);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const radii = trackIndexBackgroundRadii 
      ? trackIndexBackgroundRadii.split(',').map(r => parseInt(r.trim()))
      : [10, 20, 30, 40, 50, 60, 70, 80, 80, 100];

    const card = await Upcoming({
      thumbnailImage: thumbnail,
      backgroundImage: backgroundImage || undefined,
      imageDarkness: imageDarkness ? parseInt(imageDarkness) : 70,
      imageBlur: imageBlur ? parseInt(imageBlur) : undefined,
      author: author,
      title: title,
      trackIndexBackgroundRadii: radii
    });

    res.set('Content-Type', 'image/png');
    res.status(200).end(card);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

app.post('/queue', async (req, res) => {
  try {
    console.log('📥 Received POST /queue request');

    const {
      tracks,
      title,
      titleColor,
      backgroundColor,
      backgroundImage,
      imageDarkness,
      imageBlur,
      badgeBg,
      badgeBorder,
      badgeText
    } = req.body;

    const validation = validateRequiredParams(req.body, ['tracks']);
    if (!validation.valid) {
      console.error('❌ Validation failed:', validation.message);
      return res.status(400).json({ message: validation.message });
    }

    if (!Array.isArray(tracks)) {
      console.error('❌ Tracks is not an array');
      return res.status(400).json({ message: 'Tracks must be an array.' });
    }

    if (tracks.length === 0) {
      console.error('❌ Tracks array is empty');
      return res.status(400).json({ message: 'Tracks array cannot be empty.' });
    }

    console.log(`✅ Processing ${tracks.length} tracks`);

    const card = await QueueList({
      tracks: tracks,
      title: title || 'Queue List',
      titleColor: normalizeColor(titleColor) || '#FFFFFF',
      backgroundColor: normalizeColor(backgroundColor) || '#070707',
      backgroundImage: backgroundImage || undefined,
      imageDarkness: imageDarkness ? parseInt(imageDarkness) : 60,
      imageBlur: imageBlur ? parseInt(imageBlur) : undefined,
      badgeBg: normalizeColor(badgeBg) || '#5865F2',
      badgeBorder: normalizeColor(badgeBorder) || '#FFFFFF',
      badgeText: normalizeColor(badgeText) || '#FFFFFF'
    });

    console.log('✅ Queue card generated successfully');
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'no-transform');
    res.set('Content-Encoding', 'identity');
    res.status(200).end(card);
  } catch (err) {
    console.error('❌ Error in POST /queue:', err);
    res.status(500).json({ 
      message: err.message || 'Internal server error'
    });
  }
});

app.get('/added-to-queue', async (req, res) => {
  try {
    const {
      title,
      author,
      thumbnail,
      message,
      titleColor,
      authorColor,
      messageColor,
      backgroundColor,
      backgroundImage,
      imageDarkness,
      imageBlur
    } = req.query;

    const validation = validateRequiredParams(req.query, ['title', 'author', 'thumbnail']);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const card = await AddedToQueue({
      title: title,
      author: author,
      thumbnailImage: thumbnail,
      message: message || 'Added to Queue',
      titleColor: normalizeColor(titleColor) || '#FFFFFF',
      authorColor: normalizeColor(authorColor) || '#FFFFFF',
      messageColor: normalizeColor(messageColor) || '#00FF00',
      backgroundColor: normalizeColor(backgroundColor) || '#070707',
      backgroundImage: backgroundImage || thumbnail,
      imageDarkness: imageDarkness ? parseInt(imageDarkness) : 60,
      imageBlur: imageBlur ? parseInt(imageBlur) : undefined
    });

    res.set('Content-Type', 'image/png');
    res.status(200).end(card);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

app.post('/lyrics', async (req, res) => {
  try {
    const {
      title,
      author,
      thumbnail,
      lyrics,
      titleColor,
      authorColor,
      lyricsColor,
      backgroundColor,
      backgroundImage,
      imageDarkness,
      imageBlur
    } = req.body;

    const validation = validateRequiredParams(req.body, ['title', 'author', 'thumbnail', 'lyrics']);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const card = await Lyrics({
      title: title,
      author: author,
      thumbnailImage: thumbnail,
      lyrics: lyrics,
      titleColor: normalizeColor(titleColor) || '#FFFFFF',
      authorColor: normalizeColor(authorColor) || '#FFFFFF',
      lyricsColor: normalizeColor(lyricsColor) || '#FFFFFF',
      backgroundColor: normalizeColor(backgroundColor) || '#070707',
      backgroundImage: backgroundImage || undefined,
      imageDarkness: imageDarkness ? parseInt(imageDarkness) : 60,
      imageBlur: imageBlur ? parseInt(imageBlur) : undefined
    });

    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'no-transform');
    res.set('Content-Encoding', 'identity');
    res.status(200).end(card);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error in server setup:', err);
    process.exit(1);
  }
  console.log(`Sylphacard API Server listening on Port ${PORT}`);
});