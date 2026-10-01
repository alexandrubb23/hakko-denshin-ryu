import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment, type IconButtonProps } from "@mui/material";
import { useIntl } from "react-intl";

import { TogglePasswordButton } from "./auth.style";

interface Props {
  shown: boolean;
  onToggle: () => void;
  size?: IconButtonProps["size"];
}

/** Shows or hides a password field's value; its `endAdornment` */
const PasswordToggle = ({ shown, onToggle, size }: Props) => {
  const intl = useIntl();

  return (
    <InputAdornment position="end">
      <TogglePasswordButton
        aria-label={intl.formatMessage({
          id: shown ? "auth.password.hide" : "auth.password.show",
        })}
        onClick={onToggle}
        edge="end"
        size={size}
      >
        {shown ? <VisibilityOff /> : <Visibility />}
      </TogglePasswordButton>
    </InputAdornment>
  );
};

export default PasswordToggle;
