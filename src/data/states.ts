import type { District } from '../types/election';

// Malta's 13 electoral districts — each returns 5 MPs by Single Transferable Vote (65 total).
// baseLean: negative leans Labour (player/red), positive leans Nationalist (opponent/blue).
export const districts: District[] = [
  { code: 'D1', name: 'Valletta · Marsa · Ħamrun', seats: 5, baseLean: -18, region: 'harbour', isSwing: false },
  { code: 'D2', name: 'Birżebbuġa · Marsaxlokk · Żejtun', seats: 5, baseLean: -24, region: 'south', isSwing: false },
  { code: 'D3', name: 'Cottonera · Fgura · Żabbar', seats: 5, baseLean: -20, region: 'harbour', isSwing: false },
  { code: 'D4', name: 'Paola · Tarxien · Santa Luċija', seats: 5, baseLean: -16, region: 'harbour', isSwing: true },
  { code: 'D5', name: 'Żurrieq · Qrendi · Siġġiewi', seats: 5, baseLean: -8, region: 'south', isSwing: true },
  { code: 'D6', name: 'Rabat · Dingli · Attard', seats: 5, baseLean: 6, region: 'central', isSwing: true },
  { code: 'D7', name: 'Mosta · Naxxar · Għargħur', seats: 5, baseLean: 4, region: 'central', isSwing: true },
  { code: 'D8', name: 'Sliema · Gżira · Pembroke', seats: 5, baseLean: 22, region: 'north', isSwing: false },
  { code: 'D9', name: 'Birkirkara · Balzan · Lija', seats: 5, baseLean: 14, region: 'central', isSwing: true },
  { code: 'D10', name: 'St Julian\'s · Swieqi · San Ġwann', seats: 5, baseLean: 18, region: 'north', isSwing: false },
  { code: 'D11', name: 'Mellieħa · St Paul\'s Bay · Mġarr', seats: 5, baseLean: 2, region: 'north', isSwing: true },
  { code: 'D12', name: 'Qormi · Żebbuġ · Santa Venera', seats: 5, baseLean: -12, region: 'harbour', isSwing: true },
  { code: 'D13', name: 'Gozo & Comino', seats: 5, baseLean: 8, region: 'gozo', isSwing: true },
];

export const swingDistricts = districts.filter((d) => d.isSwing);
