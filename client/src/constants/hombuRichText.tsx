// Rich-text tag for messages linking to the Hombu Dojo website; keyed, as
// the message renders it in a list beside its text
export const hombuRichText = {
  link: (chunks: React.ReactNode) => (
    <a
      key="link"
      href="https://hakkodenshinryu.net/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
};
