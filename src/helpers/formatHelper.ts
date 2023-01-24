const MAX_URL_DISPLAY_LENGTH = 50;

export default {
  truncateUrl
};

function truncateUrl(url: string) {
  let shortenedUrl = url;

  if (shortenedUrl.length > MAX_URL_DISPLAY_LENGTH) {
    shortenedUrl = shortenedUrl.substring(0, MAX_URL_DISPLAY_LENGTH) + '...';
  }

  return shortenedUrl;
}
