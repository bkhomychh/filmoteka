const formatDate = releaseDate => {
  const date = new Date(releaseDate);
  const formattedDate = date
    .toLocaleString()
    .split(',')
    .slice(0, 1)
    .toString()
    .replaceAll('/', '.');
  const dateElements = formattedDate.split('.');

  return dateElements.map(el => el.padStart(2, '0')).join('.');
};

const cutString = str => {
  return str.split(' ').slice(0, 70).join(' ') + '... ';
};

export { formatDate, cutString };
