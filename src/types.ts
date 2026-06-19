export interface Artist {
  id: string;
  stageName: string;
  subGenres: string[];
  soundSignature: string;
  profileImage: string;
  previewTrack: string;
  minFee: number;
  setDuration: string;
  priceCategory: 'budget' | 'standard' | 'premium';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  day: string;
  description: string;
  venuType: string;
  capacity: number;
  claimed: number;
  genre: string;
  coordinates?: string;
}

export interface BookingFormData {
  eventName: string;
  date: string;
  venueType: string;
  proposedFee: string;
}

export interface OnboardingFormData {
  stageName: string;
  subGenres: string;
  soundcloudLink: string;
  technicalRider: string;
  minFee: string;
}

export interface TicketData {
  quantity: number;
  ticketType: 'standard' | 'vip';
  totalPrice: number;
  paymentMethod: 'card' | 'upi';
}
