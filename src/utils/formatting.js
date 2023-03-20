const formatDate = releaseDate => {
  const date = new Date(releaseDate);
  return date.toDateString().split(' ').slice(1).join(' ');
};

export { formatDate };
