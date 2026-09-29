import { isStudentCategory, type StudentCategory } from "@hakko/core";
import { useSearchParams } from "react-router";

const GROUP_PARAM = "group";

/** Selected group from `?group=`, or null when showing every group. */
const useGroupFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get(GROUP_PARAM);
  const selected = isStudentCategory(param) ? param : null;

  const toggle = (group: StudentCategory) =>
    setSearchParams(group === selected ? {} : { [GROUP_PARAM]: group }, {
      replace: true,
      preventScrollReset: true,
    });

  return { selected, toggle };
};

export default useGroupFilter;
