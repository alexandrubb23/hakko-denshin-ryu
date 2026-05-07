import { useEffect } from "react";

import useMenuStore from "@store/useMenuStore";

const useBodyOverflow = () => {
  const isOpen = useMenuStore((state) => state.isOpen);

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "";
  }, [isOpen]);
};

export default useBodyOverflow;
