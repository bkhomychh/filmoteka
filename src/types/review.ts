export interface IReview {
  id: string;
  content: string;
  url: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  created_at: string;
  updated_at: string;
}

export interface IFoundReviews {
  results: IReview[];
}
