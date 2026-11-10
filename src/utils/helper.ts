export const escapeRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * format date of birth in the form of dd.mm.yyy
 * @param d 
 * @returns 
 */
export const formatDate = (d: Date): string => {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
}).format(d);
};
