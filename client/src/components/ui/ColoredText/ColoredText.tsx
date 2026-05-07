import { Box } from '@mui/material';

interface ColoredTextProps {
  text: string;
  color: string;
}

const ColoredText = ({ text, color }: ColoredTextProps) => (
  <Box component='span' color={color}>
    {text}
  </Box>
);

export default ColoredText;
