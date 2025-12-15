export interface Review {
  id: string;
  rating: number; // 1-5
  comment: string;
  author: string;
  date: string;
}

export interface Court {
  id: string;
  name: string;
  location: string;
  image: string;
  surface: 'Clay' | 'Hard' | 'Grass';
  indoor: boolean;
  reviews: Review[];
}

export type RootStackParamList = {
  Courts: undefined;
  CourtDetail: { court: Court };
};
