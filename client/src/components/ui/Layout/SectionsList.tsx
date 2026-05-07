import { SxProps } from "@mui/material";
import ImageTextSection from "./ImageTextSection";

export type SectionImage = {
  highQualitySrc: string;
  lowQualitySrc: string;
  sx?: SxProps;
};

export type Section = {
  children: React.ReactNode;
  image: SectionImage;
  imageFirstOnDesktop?: boolean;
  imageFirstOnMobile?: boolean;
  sectionTitle: string;
};

interface SectionsListProps {
  sections: Section[];
}

const SectionsList = ({ sections }: SectionsListProps) => {
  return (
    <>
      {sections.map(
        (
          {
            image,
            imageFirstOnMobile,
            imageFirstOnDesktop,
            sectionTitle,
            children,
          },
          index
        ) => (
          <ImageTextSection
            key={index}
            image={image}
            imageFirstOnMobile={imageFirstOnMobile}
            imageFirstOnDesktop={imageFirstOnDesktop}
            sectionTitle={sectionTitle}
          >
            {children}
          </ImageTextSection>
        )
      )}
    </>
  );
};

export default SectionsList;
