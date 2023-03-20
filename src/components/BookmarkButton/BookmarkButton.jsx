import PropTypes from 'prop-types';

import Button from 'components/Button';

const BookmarkButton = ({ addToBookmarks, removeFromBookMarks, isSaved }) => {
  if (isSaved) {
    return (
      <Button handleClick={removeFromBookMarks}>Remove from bookmarks</Button>
    );
  }

  return <Button handleClick={addToBookmarks}>Add to bookmarks</Button>;
};

BookmarkButton.propTypes = {
  id: PropTypes.number,
};

export default BookmarkButton;
