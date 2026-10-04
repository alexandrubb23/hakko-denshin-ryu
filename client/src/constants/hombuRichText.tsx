// Rich-text tag for messages linking to the Hombu Dojo website
export const hombuRichText = {
  link: (chunks: React.ReactNode) => (
    <a
      href="https://hakkodenshinryu.net/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
};
