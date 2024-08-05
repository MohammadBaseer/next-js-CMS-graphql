export const convertToBase64 = async (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((res, rej) => {
    reader.onload = () => res(reader.result);
    reader.onerror = (e) => rej(e);
  });
};
