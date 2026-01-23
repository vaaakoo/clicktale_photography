
export enum SessionType {
  COUPLES = 'Couples',
  FAMILY = 'Family',
  LIFESTYLE = 'Lifestyle',
  RESTAURANTS = 'Restaurants'
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: SessionType;
  imageUrl: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}
