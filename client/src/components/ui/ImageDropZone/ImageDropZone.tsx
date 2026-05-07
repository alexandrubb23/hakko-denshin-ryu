import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Typography } from "@mui/material";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

import { PURPLE } from "@style/tokens";
import { DropZoneRoot } from "./ImageDropZone.style";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const DEFAULT_IMAGE_HINT = `JPEG, PNG or WebP · max ${MAX_IMAGE_SIZE_MB} MB`;

interface ImageDropZoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  /** Accepted MIME types. Defaults to JPEG, PNG, WebP. */
  acceptedTypes?: string[];
  /** Helper text shown below the file name. */
  hint?: string;
}

const ImageDropZone = ({
  selectedFile,
  onFileSelect,
  acceptedTypes = ACCEPTED_IMAGE_TYPES,
  hint = DEFAULT_IMAGE_HINT,
}: ImageDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = "";
  };

  return (
    <>
      <DropZoneRoot
        isDragging={isDragging}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <CloudUploadIcon sx={{ fontSize: 36, color: PURPLE }} />
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {selectedFile ? selectedFile.name : "Drag & drop or click to select"}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          {hint}
        </Typography>
      </DropZoneRoot>

      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default ImageDropZone;
