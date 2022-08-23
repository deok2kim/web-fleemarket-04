export const getTownName = (region: string | undefined) => {
  if (!region) return;

  const regExp = /[가-힣0-9]+동/;

  const town = region.match(regExp);
  return town ? town[0] : '';
};
