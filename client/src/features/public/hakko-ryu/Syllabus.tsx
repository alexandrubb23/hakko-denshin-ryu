import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { useTechniques } from "@features/public/techniques/useTechniques";

import ProgramSection from "./ProgramSection";
import { SYLLABUS_GRADES, gradeName } from "./syllabusData";

/** The Shodan–Yondan techniques, one tab per grade */
const Syllabus = () => (
  <ProgramSection
    query={useTechniques()}
    // The grade is kept in the URL: ?grade=nidan-gi
    paramKey="grade"
    errorId="page.techniques.error"
    tabsLabelId="page.hakko-ryu.syllabus.tabs"
    toTab={(suite) => ({
      kanji: SYLLABUS_GRADES[suite.id]?.kanji,
      label: gradeName(suite),
    })}
    toPanel={(suite) => ({
      title: (
        <FormattedMessage
          id="page.hakko-ryu.syllabus.grade-title"
          values={{ grade: gradeName(suite) }}
        />
      ),
      rank: SYLLABUS_GRADES[suite.id],
      grade: "dan",
      groups: suite.groups,
    })}
  />
);

export default Syllabus;
