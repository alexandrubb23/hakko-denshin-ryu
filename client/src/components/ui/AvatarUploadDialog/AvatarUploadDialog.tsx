import {
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import { useState } from "react";

import ModalDialog from "@components/ui/ModalDialog/ModalDialog";
import ModalTitle from "@components/ui/ModalTitle/ModalTitle";
import ErrorAlert from "@components/shared/ErrorAlert";
import { BORDER_COLOR } from "@style/tokens";
import { UseMutationResult } from "@tanstack/react-query";
import { getInitials } from "@utils/string";
import AvatarDropZone, {
  ACCEPTED_TYPES,
  MAX_SIZE_BYTES,
  MAX_SIZE_MB,
} from "./AvatarDropZone";
import {
  CancelButton,
  PreviewAvatar,
  UploadButton,
} from "./AvatarUploadDialog.style";

export interface AvatarUploadDialogProps {
  open: boolean;
  onClose: () => void;
  currentImageUrl?: string | null;
  /** Display name used to generate initials fallback */
  displayName?: string;
  /** Mutation for uploading the image — caller decides which hook to pass */
  uploadMutation: UseMutationResult<string, Error, File, unknown>;
}

const AvatarUploadDialog = ({
  open,
  onClose,
  currentImageUrl,
  displayName,
  uploadMutation,
}: AvatarUploadDialogProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { mutate: upload, isPending, isError, error, reset } = uploadMutation;

  const handleClose = () => {
    if (isPending) return;
    setPreview(null);
    setSelectedFile(null);
    setValidationError(null);
    reset();
    onClose();
  };

  const validateAndStage = (file: File) => {
    setValidationError(null);
    reset();

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setValidationError("Only JPEG, PNG, and WebP images are accepted.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setValidationError(`File must be smaller than ${MAX_SIZE_MB} MB.`);
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    upload(selectedFile, { onSuccess: () => handleClose() });
  };

  return (
    <ModalDialog open={open} onClose={handleClose} maxWidth="xs">
      <ModalTitle>Update Profile Photo</ModalTitle>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <DialogContent sx={{ pt: 3 }}>
        {/* Current / preview avatar */}
        <PreviewAvatar
          src={preview ?? currentImageUrl ?? undefined}
          sx={{ mx: "auto", mb: 3 }}
        >
          {getInitials(displayName)}
        </PreviewAvatar>

        {/* Drop zone */}
        <AvatarDropZone
          selectedFile={selectedFile}
          onFileSelect={validateAndStage}
        />

        {validationError && <ErrorAlert>{validationError}</ErrorAlert>}

        {isError && !validationError && (
          <ErrorAlert>
            {error?.message ?? "Upload failed. Please try again."}
          </ErrorAlert>
        )}
      </DialogContent>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <CancelButton onClick={handleClose} disabled={isPending}>
          Cancel
        </CancelButton>
        <UploadButton
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedFile || isPending}
          startIcon={
            isPending ? <CircularProgress size={16} color="inherit" /> : null
          }
        >
          {isPending ? "Uploading…" : "Upload"}
        </UploadButton>
      </DialogActions>
    </ModalDialog>
  );
};

export default AvatarUploadDialog;
