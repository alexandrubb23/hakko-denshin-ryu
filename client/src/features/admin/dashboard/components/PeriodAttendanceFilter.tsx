import { useLayoutEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import type { AttendancePeriod } from "@api/dashboard";
import Chip from "@mui/material/Chip";

import { defaultChipSx } from "@components/shared/ChipFilterRow";
import useIsMobile from "@hooks/isMobile";
import { PURPLE } from "@style/tokens";

import {
  ChipRow,
  ConnectorSvg,
  FilterContainer,
  SubRow,
} from "./PeriodAttendanceFilter.style";

export const ALL_ATTENDANCE_FILTER = "all";
export const ACTIVE_ATTENDANCE_FILTER = "active";

const ATTENDANCE_OPTIONS = [
  { value: ALL_ATTENDANCE_FILTER, label: "All Students" },
  { value: ACTIVE_ATTENDANCE_FILTER, label: "With Attendance" },
];

const PERIOD_OPTIONS: { value: AttendancePeriod; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "day", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

type Props = {
  period: AttendancePeriod;
  onPeriodChange: (p: AttendancePeriod) => void;
  attendanceFilter: string;
  onAttendanceChange: (v: string) => void;
};

const PeriodAttendanceFilter = ({
  period,
  onPeriodChange,
  attendanceFilter,
  onAttendanceChange,
}: Props) => {
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);
  const subRowRef = useRef<HTMLDivElement>(null);
  const periodChipRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const attendanceChipRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [svgHeight, setSvgHeight] = useState(0);
  const [connectorPath, setConnectorPath] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (isMobile || !containerRef.current || !subRowRef.current) {
      setConnectorPath(null);
      return;
    }

    const periodChipEl = periodChipRefs.current.get(period);
    const attendanceChipEl = attendanceChipRefs.current.get(attendanceFilter);
    if (!periodChipEl || !attendanceChipEl) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const periodChipRect = periodChipEl.getBoundingClientRect();
    const attendanceChipRect = attendanceChipEl.getBoundingClientRect();
    const subRowRect = subRowRef.current.getBoundingClientRect();

    const periodCx = Math.round(
      periodChipRect.left - containerRect.left + periodChipRect.width / 2
    );
    const periodBottom = Math.round(periodChipRect.bottom - containerRect.top);
    const attendanceCx = Math.round(
      attendanceChipRect.left -
        containerRect.left +
        attendanceChipRect.width / 2
    );
    const subRowTop = Math.round(subRowRect.top - containerRect.top);
    const containerHeight = Math.round(subRowRect.bottom - containerRect.top);
    const midY = Math.round(periodBottom + (subRowTop - periodBottom) / 2);

    setSvgHeight(containerHeight);
    // Path: drop from period chip → horizontal to attendance chip x → drop into attendance chip
    setConnectorPath(
      `M ${periodCx} ${periodBottom} L ${periodCx} ${midY} L ${attendanceCx} ${midY} L ${attendanceCx} ${subRowTop}`
    );
  }, [period, attendanceFilter, isMobile]);

  return (
    <FilterContainer ref={containerRef}>
      {/* SVG connector — only on desktop after positions are measured */}
      {!isMobile && connectorPath && (
        <ConnectorSvg width="100%" height={svgHeight}>
          <motion.path
            d={connectorPath}
            fill="none"
            stroke={PURPLE}
            strokeWidth={1.5}
            strokeOpacity={0.35}
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ d: connectorPath }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          />
        </ConnectorSvg>
      )}

      {/* Period chips */}
      <ChipRow>
        {PERIOD_OPTIONS.map((opt) => {
          const active = opt.value === period;
          return (
            <Chip
              key={opt.value}
              label={opt.label}
              size="small"
              variant="outlined"
              onClick={() => onPeriodChange(opt.value)}
              sx={defaultChipSx(active)}
              ref={(el) => {
                if (el)
                  periodChipRefs.current.set(opt.value, el as HTMLDivElement);
                else periodChipRefs.current.delete(opt.value);
              }}
            />
          );
        })}
      </ChipRow>

      {/* Attendance sub-chips — visually connected to active period chip */}
      <SubRow ref={subRowRef} isMobile={isMobile}>
        {ATTENDANCE_OPTIONS.map((opt) => {
          const active = opt.value === attendanceFilter;
          return (
            <Chip
              key={opt.value}
              label={opt.label}
              size="small"
              variant="outlined"
              onClick={() => onAttendanceChange(opt.value)}
              sx={defaultChipSx(active)}
              ref={(el) => {
                if (el)
                  attendanceChipRefs.current.set(
                    opt.value,
                    el as HTMLDivElement
                  );
                else attendanceChipRefs.current.delete(opt.value);
              }}
            />
          );
        })}
      </SubRow>
    </FilterContainer>
  );
};

export default PeriodAttendanceFilter;
