import { format, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { id } from 'date-fns/locale';

export const Backend_URL = 'http://localhost:4000';

export function formatDateToIndonesian(date: Date): string {
  const now = new Date();
  const daysDifference = differenceInDays(now, date);

  if (daysDifference > 7) {
    // More than 1 week ago
    return format(date, 'EEEE, dd MMMM yyyy', { locale: id });
  } else if (daysDifference > 0) {
    // Less than 1 week ago but more than 1 day ago
    return `${daysDifference} hari yang lalu`;
  } else {
    const hoursDifference = differenceInHours(now, date);
    if (hoursDifference > 0) {
      // Less than 1 day ago but more than 1 hour ago
      return `${hoursDifference} jam yang lalu`;
    } else {
      const minutesDifference = differenceInMinutes(now, date);
      // Less than 1 hour ago
      return `${minutesDifference} menit yang lalu`;
    }
  }
}
