import ImageDropZone, {
  ACCEPTED_IMAGE_TYPES as ACCEPTED_TYPES,
  MAX_IMAGE_SIZE_BYTES as MAX_SIZE_BYTES,
  MAX_IMAGE_SIZE_MB as MAX_SIZE_MB,
} from "@components/ui/ImageDropZone/ImageDropZone";

export { ACCEPTED_TYPES, MAX_SIZE_BYTES, MAX_SIZE_MB };

interface AvatarDropZoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
}

const AvatarDropZone = ({
  selectedFile,
  onFileSelect,
}: AvatarDropZoneProps) => (
  <ImageDropZone selectedFile={selectedFile} onFileSelect={onFileSelect} />
);

export default AvatarDropZone;
