import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Typography } from "@mui/material";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

import { PURPLE } from "@style/tokens";
import { DropZone } from "./AvatarUploadDialog.style";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_SIZE_MB = 5;
export const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
export { ACCEPTED_TYPES };

interface AvatarDropZoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
}

const AvatarDropZone = ({
  selectedFile,
  onFileSelect,
}: AvatarDropZoneProps) => {
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
      <DropZone
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
          JPEG, PNG or WebP · max {MAX_SIZE_MB} MB
        </Typography>
      </DropZone>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default AvatarDropZone;
