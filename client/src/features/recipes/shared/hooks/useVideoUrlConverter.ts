export const useVideoUrlConverter = () => {
  const convertToEmbedUrl = (url: string): string => {
    if (!url) return "";

    if (url.includes("/embed/")) {
      return url;
    }

    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) {
      const videoId = watchMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) {
      const videoId = shortMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  };

  return { convertToEmbedUrl };
};