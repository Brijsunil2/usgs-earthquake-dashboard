/**
 * Formats an ISO date string into a more readable format.
 * Example: 2024-03-18T19:26:06.000Z -> Mar 18, 2024, 7:26 PM
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

/**
 * Returns a relative time string (e.g., "5m ago", "2h ago").
 * @param {string} dateString 
 * @returns {string}
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDateTime(dateString);
};
