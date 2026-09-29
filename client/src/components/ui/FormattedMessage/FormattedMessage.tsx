import type { ComponentProps } from "react";
import { FormattedMessage as ReactFormattedMessage } from "react-intl";
import { v4 as uuid } from "uuid";

import type { IntlMessageID } from "i18n/messages";

type FormattedMessageProps = {
  id: IntlMessageID;
  defaultMessage?: string;
  values?: ComponentProps<typeof ReactFormattedMessage>["values"];
  children?: () => React.ReactNode;
};

const FormattedMessage = ({ values, ...props }: FormattedMessageProps) => (
  <ReactFormattedMessage
    values={{
      span: (value: React.ReactNode) => <span key={uuid()}>{value}</span>,
      strong: (value: React.ReactNode) => <strong key={uuid()}>{value}</strong>,
      em: (value: React.ReactNode) => <em key={uuid()}>{value}</em>,
      ...values,
    }}
    {...props}
  />
);

export default FormattedMessage;
