const formatDate = releaseDate => {
  return releaseDate.replaceAll('-', '.');
};

export { formatDate };
