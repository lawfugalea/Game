export type DistrictRegion = 'harbour' | 'south' | 'central' | 'north' | 'gozo';

export interface District {
  code: string;
  name: string;
  seats: number;
  // -100 (safe Labour / player-red) .. +100 (safe Nationalist / opponent-blue); 0 = even
  baseLean: number;
  region: DistrictRegion;
  isSwing: boolean;
}
