export const convertToJson = (data: Buffer) => {
  try {
    const convertData: unknown = JSON.parse(data.toString());
    return convertData;
  } catch (err) {
    throw Error();
  }
};
