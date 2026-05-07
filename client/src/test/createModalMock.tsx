import { useEffect, type ReactNode } from "react";

type ModalBaseProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Creates a lightweight mock modal component for use with `vi.mock`.
 * The mock handles Escape key dismissal and exposes a backdrop element for
 * click-outside testing.
 *
 * Test IDs:
 *   - container:  `testId`
 *   - backdrop:   `${testId}-backdrop`
 *
 * @param testId        The `data-testid` for the modal container.
 * @param renderContent Optional function to render additional content from props.
 *
 * @example
 * vi.mock("./CreateStudentModal", () => ({
 *   default: createModalMock("create-student-modal"),
 * }));
 *
 * vi.mock("./DeleteRankModal", () => ({
 *   default: createModalMock("delete-rank-modal", ({ entry }) => (
 *     <span data-testid="delete-rank-name">{entry.rank.name}</span>
 *   )),
 * }));
 */
const createModalMock = <P extends Record<string, unknown>>(
  testId: string,
  renderContent?: (props: P) => ReactNode,
) =>
  function MockModal(props: P & ModalBaseProps) {
    const { open, onClose } = props;

    useEffect(() => {
      if (!open) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
      <div data-testid={testId}>
        {renderContent?.(props as P)}
        <div data-testid={`${testId}-backdrop`} onClick={onClose} />
      </div>
    );
  };

export default createModalMock;
