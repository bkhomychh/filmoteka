import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';

const BookmarkButton = ({ addToBookmarks, removeFromBookMarks, isSaved }) => {
  const { t } = useTranslation();

  if (isSaved) {
    return (
      <Button handleClick={removeFromBookMarks}>
        {t('movieDetails.bookmarkBtn.remove')}
      </Button>
    );
  }

  return (
    <Button handleClick={addToBookmarks}>
      {t('movieDetails.bookmarkBtn.add')}{' '}
    </Button>
  );
};

BookmarkButton.propTypes = {
  addToBookmarks: PropTypes.func.isRequired,
  removeFromBookMarks: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
};

export default BookmarkButton;
