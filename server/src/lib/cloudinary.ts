import { v2 as cloudinary } from "cloudinary";
import { env } from "../env.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const FOLDER = "hakko-ryu/avatars";

/**
 * Uploads a buffer to Cloudinary and returns the secure URL.
 * Uses a base64 data URI to avoid Node.js stream compatibility issues.
 * If the user already has an image, the old asset is deleted first.
 */
export async function uploadAvatar(
  buffer: Buffer,
  userId: string,
  existingImageUrl?: string | null
): Promise<string> {
  if (existingImageUrl) {
    const publicId = extractPublicId(existingImageUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId).catch((err) => {
        console.warn("[cloudinary] Failed to delete old image:", err?.message);
      });
    }
  }

  const base64 = buffer.toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: FOLDER,
    public_id: `user_${userId}`,
    overwrite: true,
    invalidate: true,
  });

  return result.secure_url;
}

/**
 * Extracts the Cloudinary public_id from a secure URL.
 * e.g. "https://res.cloudinary.com/<cloud>/image/upload/v123/hakko-ryu/avatars/user_abc"
 *   -> "hakko-ryu/avatars/user_abc"
 */
function extractPublicId(url: string): string | null {
  try {
    const match = url.match(/\/image\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
