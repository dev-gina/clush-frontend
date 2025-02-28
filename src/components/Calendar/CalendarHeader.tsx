import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { CalendarHeaderProps } from "./types";
import { calendarStyles } from "./styles";

export const CalendarHeader = ({ value, onChange }: CalendarHeaderProps) => {
  const handleMonthChange = (num: number) => {
    const newValue = value.clone().add(num, "month");
    onChange(newValue);
  };

  return (
    <div
      style={calendarStyles.header.wrapper}
      onClick={(e) => e.stopPropagation()}
    >
      <LeftOutlined
        style={calendarStyles.header.icon}
        onClick={(e) => {
          e.stopPropagation();
          handleMonthChange(-1);
        }}
      />
      <div
        style={calendarStyles.header.title}
        onClick={(e) => e.stopPropagation()}
      >
        {value.format("YYYY년 MM월")}
      </div>
      <RightOutlined
        style={calendarStyles.header.icon}
        onClick={(e) => {
          e.stopPropagation();
          handleMonthChange(1);
        }}
      />
    </div>
  );
};
