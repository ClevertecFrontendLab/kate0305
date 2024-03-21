import dayjs, { Dayjs } from 'dayjs';

export const checkIsPastDate = (date: Dayjs) => dayjs().isAfter(dayjs(date));
