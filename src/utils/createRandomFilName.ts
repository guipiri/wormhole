export const createRandomFileName = (): string => {
  const chars =
    'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let fileName = '';
  for (let i = 0; i < 5; i++) {
    const random = Math.floor(Math.random() * chars.length);
    fileName = fileName + chars[random];
  }
  return fileName;
};
