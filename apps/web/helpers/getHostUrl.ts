export const getHostUrl = (host: string | undefined) => {
  const isLocal = host?.includes('localhost');
  return isLocal ? `http://${host}` : `https://${host}`;
};
