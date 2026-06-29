export interface USState {
  code: string;
  name: string;
  electoralVotes: number;
  baseLean: number; // -100 (strong D) to +100 (strong R); 0 = tossup
  region: 'northeast' | 'south' | 'midwest' | 'west';
  isSwing: boolean;
}
