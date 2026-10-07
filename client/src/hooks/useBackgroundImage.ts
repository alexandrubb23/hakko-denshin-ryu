import useCurrentPage from "./useCurrentPage";

const useBackgroundImage = () => useCurrentPage()?.bgImage;

export default useBackgroundImage;
