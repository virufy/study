import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { endOfDay } from 'date-fns';

// Images
import calendarSvg from 'assets/icons/calendar.svg';
import chevronSvg from 'assets/icons/chevron.svg';

// Styles
import {
  DatePickerContainer,
  Label,
  LabelValueContainer,
  StyledReactDatePickerContainer,
  Value,
} from './style';

interface DatePickerProps {
  label: string;
  value: Date | null | undefined;
  locale: string;
  onChange(date: Date | [Date, Date] | null, event: React.SyntheticEvent<any, Event> | undefined): void
}

interface DatePickerInputProps {
  label: string;
  value?: Date | null | undefined;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}

const DatePickerInput = React.forwardRef((
  { label, value, onClick }: DatePickerInputProps,
  ref: ((instance: HTMLButtonElement | null) => void) | React.RefObject<HTMLButtonElement> | null | undefined,
) => (
  <DatePickerContainer ref={ref} onClick={onClick}>
    <img alt="calendar" src={calendarSvg} />
    <LabelValueContainer>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </LabelValueContainer>
    <img alt="calendar" src={chevronSvg} />
  </DatePickerContainer>
));

DatePickerInput.defaultProps = {
  value: undefined,
  onClick: undefined,
};

const DatePicker = ({
  label, value, locale, onChange,
}: DatePickerProps) => {
  // Memos
  const today = React.useMemo(() => endOfDay(new Date()), []);

  return (
    <StyledReactDatePickerContainer>
      <ReactDatePicker
        selected={value}
        customInput={<DatePickerInput label={label} />}
        onChange={onChange}
        dateFormat="EEE, MMM d, Y"
        locale={locale}
        maxDate={today}
      />
    </StyledReactDatePickerContainer>
  );
};

export default React.memo(DatePicker);
