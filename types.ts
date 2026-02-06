export enum SessionType {
  COUPLES = 'couples',
  FAMILY = 'family',
  LIFESTYLE = 'lifestyle',
  RESTAURANTS = 'restaurants'
}

export interface PortfolioItem {
  id: string;
  titleKey: string;
  category: SessionType;
  imageUrl: string;
  descriptionKey: string;
}

export interface FAQItem {
  questionKey: string;
  answerKey: string;
}

export interface ServiceItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  imageUrl: string;
}
