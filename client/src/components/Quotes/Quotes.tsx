import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

import { getQuoteDisplayTime } from '@utils/time';
import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import { quotes } from '@locales/quotes.json';
import { useIntl } from 'react-intl';
import type { Lang } from '@store/useLangStore';

const Quotes = () => {
  const [key, setKey] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);

  const intl = useIntl();
  const locale = intl.locale as Lang;

  useInterval(() => {
    setCurrentQuote(prev => {
      const nextQuote = prev + 1;
      return nextQuote >= quotes[locale].length ? 0 : nextQuote;
    });

    setKey(prev => prev + 1);
  }, getQuoteDisplayTime(quotes[locale][currentQuote].quote));

  const { author, quote } = quotes[locale][currentQuote];

  return (
    <Box
      sx={{
        minHeight: 250,
        overflow: 'hidden',
        padding: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <>
            <Typography
              variant='body2'
              sx={{
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                fontStyle: 'italic',
                textShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
              }}
            >
              {quote}
            </Typography>
            <Typography
              variant='body2'
              align='right'
              sx={{
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                textShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
              }}
            >
              —{author},
            </Typography>
          </>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default Quotes;
