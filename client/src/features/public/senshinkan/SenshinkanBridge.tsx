import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { EASE_OUT } from "@constants/animationsTiming";

import {
  bridgeCiteSx,
  bridgeQuoteSx,
  bridgeRuleSx,
  bridgeSx,
} from "./Senshinkan.style";

/** The old ways joined the new: a cited quote over the moonlit garden */
const SenshinkanBridge = () => (
  <Box component="figure" sx={bridgeSx}>
    <FadeIn>
      <Typography component="blockquote" sx={bridgeQuoteSx}>
        <FormattedMessage id="page.senshinkan.bridge.quote" />
      </Typography>
    </FadeIn>
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
    >
      <Box sx={bridgeRuleSx} />
    </motion.div>
    <FadeIn delay={0.9}>
      <Box component="figcaption">
        <Typography component="cite" sx={bridgeCiteSx}>
          <FormattedMessage id="page.senshinkan.bridge.cite" />
        </Typography>
      </Box>
    </FadeIn>
  </Box>
);

export default SenshinkanBridge;
