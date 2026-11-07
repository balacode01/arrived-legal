// /join/<token> → the Play Store listing, with the token passed along as the
// install referrer so the app can add the sharer after a fresh install.
// Nothing is read from a database here; the app checks the token itself.

const PLAY_LISTING = 'https://play.google.com/store/apps/details?id=com.locateapp.locate_app';

module.exports = (req, res) => {
  const token = String(req.query.token || '');
  const valid = /^[0-9a-f]{64}$/.test(token);
  const location = valid
    ? `${PLAY_LISTING}&referrer=${encodeURIComponent(`join=${token}`)}`
    : PLAY_LISTING;

  res.statusCode = 302;
  res.setHeader('Location', location);
  res.setHeader('Cache-Control', 'no-store');
  res.end();
};
