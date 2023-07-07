export const convertToJson = (data: Buffer) => {
  try {
    const convertData = JSON.parse(data.toString()) as unknown;
    return convertData;
  } catch (err) {
    throw Error();
  }
};
