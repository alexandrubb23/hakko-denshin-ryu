import { Box } from "@mui/material";
import {
  type CSSProperties,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useResizeObserver } from "usehooks-ts";

import useActiveAnchors from "@hooks/useActiveAnchors";
import { prefersReducedMotion } from "@style/art";

import {
  ROW,
  tocDotSx,
  tocListSx,
  tocRailSx,
  tocRowSx,
  tocScrollAreaSx,
  tocTrackSx,
} from "./TocList.style";

// Ported from Fumadocs' table of contents (fumadocs-ui, MIT,
// Copyright (c) 2023 Fuma)

export interface TocRow {
  /** The target element's id */
  id: string;
  title: string;
}

interface Props {
  rows: readonly TocRow[];
  /** Called when a row is followed */
  onNavigate?: () => void;
}

const rowsOf = (element: HTMLElement) =>
  element.querySelectorAll<HTMLAnchorElement>(ROW);

/** A row's text within the list, its padding left out: top and bottom */
type Span = readonly [top: number, bottom: number];

const measureRows = (list: HTMLElement): Span[] =>
  Array.from(rowsOf(list), (row) => {
    const style = getComputedStyle(row);
    return [
      row.offsetTop + parseFloat(style.paddingTop),
      row.offsetTop + row.clientHeight - parseFloat(style.paddingBottom),
    ] as const;
  });

/**
 * A table of contents whose line lights beside the rows in view, with a dot
 * at the end the reading moves towards. The list scrolls on its own, keeping
 * the row being read in its middle.
 */
const TocList = ({ rows, onNavigate }: Props) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const [spans, setSpans] = useState<Span[]>([]);

  const ids = useMemo(() => rows.map((row) => row.id), [rows]);
  const { active, range, current, movingUp } = useActiveAnchors(ids);

  const measure = useCallback(() => {
    const list = listRef.current;
    // Hidden (a closed panel): measured once it shows, which resizes it
    if (list && list.clientHeight > 0) setSpans(measureRows(list));
  }, []);

  useResizeObserver({
    ref: listRef as RefObject<HTMLDivElement>,
    onResize: measure,
  });

  // Brings the row being read to the list's middle: at once the first time,
  // smoothly after. Not while hidden (a closed panel), which has no layout;
  // `spans` is remeasured once it shows, which brings this round again.
  useEffect(() => {
    const area = areaRef.current;
    if (!area || area.clientHeight === 0 || !current) return;
    const row = rowsOf(area)[ids.indexOf(current)];
    if (!row) return;

    const offset =
      row.getBoundingClientRect().top -
      area.getBoundingClientRect().top -
      (area.clientHeight - row.clientHeight) / 2;
    area.scrollBy({
      top: offset,
      behavior:
        scrolledRef.current && !prefersReducedMotion() ? "smooth" : "instant",
    });
    scrolledRef.current = true;
  }, [ids, current, spans]);

  const thumb =
    range && spans.length === rows.length
      ? ({
          "--toc-track-top": `${spans[range[0]][0]}px`,
          "--toc-track-bottom": `${spans[range[1]][1]}px`,
          "--toc-dot": `${movingUp ? spans[range[0]][0] : spans[range[1]][1]}px`,
        } as CSSProperties)
      : undefined;

  return (
    <Box ref={areaRef} sx={tocScrollAreaSx}>
      <Box ref={listRef} sx={tocListSx} style={thumb}>
        <Box sx={tocRailSx} />
        {thumb && (
          <>
            <Box sx={tocTrackSx} />
            <Box sx={tocDotSx} />
          </>
        )}

        {rows.map((row, i) => (
          <Box
            key={row.id}
            component="a"
            href={`#${row.id}`}
            data-active={active[i] ?? false}
            onClick={onNavigate}
            sx={tocRowSx}
          >
            {row.title}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TocList;
