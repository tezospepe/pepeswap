const tzktAvatarUrl = 'https://services.tzkt.io/v1/avatars';

export const fetchAvatarByAddress = async (
  address: string,
): Promise<string> => {
  const req = `${tzktAvatarUrl}/${address}`;
  const res = await fetch(req);
  const imageBlob = await res.blob();

  const createUrlFromBlob = (blob: Blob | MediaSource): string => {
    return URL.createObjectURL(blob);
  };

  return createUrlFromBlob(imageBlob);
};
