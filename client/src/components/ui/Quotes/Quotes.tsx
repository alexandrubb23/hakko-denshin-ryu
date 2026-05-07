import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useInterval } from "usehooks-ts";

import { quotes } from "@locales/quotes.json";
import type { Lang } from "@store/useLangStore";
import { getQuoteDisplayTime } from "@utils/time";

import { AuthorText, QuoteContainer, QuoteText } from "./Quotes.style";

const Quotes = () => {
  const [key, setKey] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);

  const intl = useIntl();
  const locale = intl.locale as Lang;

  useInterval(() => {
    setCurrentQuote((prev) => {
      const nextQuote = prev + 1;
      return nextQuote >= quotes[locale].length ? 0 : nextQuote;
    });

    setKey((prev) => prev + 1);
  }, getQuoteDisplayTime(quotes[locale][currentQuote].quote));

  const { author, quote } = quotes[locale][currentQuote];

  return (
    <QuoteContainer>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <>
            <QuoteText variant="body2">{quote}</QuoteText>
            <AuthorText variant="body2">—{author},</AuthorText>
          </>
        </motion.div>
      </AnimatePresence>
    </QuoteContainer>
  );
};

export default Quotes;
