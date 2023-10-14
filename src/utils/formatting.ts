export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString();
  const dateElements = formattedDate.split('/');

  return dateElements.map(el => el.padStart(2, '0')).join('.');
};

export const cutString = (str: string): string => {
  return str.split(' ').slice(0, 70).join(' ') + '... ';
};
