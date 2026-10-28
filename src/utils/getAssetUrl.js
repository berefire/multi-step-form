export function getAssetUrl(relativePath) {
  if (typeof relativePath !== "string") {
    throw new TypeError(
      `getAssetUrl expected a string, but received: ${JSON.stringify(relativePath)}`,
    );
  }
  const cleanPath = relativePath.replace(/^\.?\//, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}