import * as FileSystem from "expo-file-system";

export default async function convertToBase64(filePath) {
  try {
    const base64String = await FileSystem.readAsStringAsync(filePath, {
      encoding: "base64",
    });

    return base64String;
  } catch (error) {
    console.error("Failed to convert to base 64:", error);
  }
}
