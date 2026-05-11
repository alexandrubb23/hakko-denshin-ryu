import { v2 as cloudinary } from "cloudinary";
import { env } from "../env.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const AVATARS_FOLDER = "hakko-ryu/avatars";
const EVENTS_FOLDER = "hakko-ryu/events";

/**
 * Uploads a buffer to Cloudinary under the given folder/public_id and returns
 * the secure URL. Deletes the existing asset first if a URL is provided.
 * In test mode the Cloudinary API is never called — a deterministic fake URL
 * is returned so DB persistence is still exercised without real credentials.
 */
type UploadBase = { buffer: Buffer; existingImageUrl?: string | null };
type UploadImageOptions = UploadBase & { folder: string; publicId: string };
export type UploadAvatarOptions = UploadBase & { userId: string };
export type UploadEventImageOptions = UploadBase & { eventId: string };

async function uploadImage({
  buffer,
  folder,
  publicId,
  existingImageUrl,
}: UploadImageOptions): Promise<string> {
  if (env.NODE_ENV === "test") {
    return `https://res.cloudinary.com/test/image/upload/v${Date.now()}/${folder}/${publicId}.jpg`;
  }

  if (existingImageUrl) {
    const existingPublicId = extractPublicId(existingImageUrl);
    if (existingPublicId) {
      await cloudinary.uploader.destroy(existingPublicId).catch((err) => {
        console.warn("[cloudinary] Failed to delete old image:", err?.message);
      });
    }
  }

  const dataUri = `data:image/jpeg;base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    public_id: publicId,
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

export async function uploadAvatar({
  buffer,
  userId,
  existingImageUrl,
}: UploadAvatarOptions): Promise<string> {
  return uploadImage({
    buffer,
    folder: AVATARS_FOLDER,
    publicId: `user_${userId}`,
    existingImageUrl,
  });
}

export async function uploadEventImage({
  buffer,
  eventId,
  existingImageUrl,
}: UploadEventImageOptions): Promise<string> {
  return uploadImage({
    buffer,
    folder: EVENTS_FOLDER,
    publicId: `event_${eventId}`,
    existingImageUrl,
  });
}
