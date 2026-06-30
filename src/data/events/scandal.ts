import type { GameEvent } from '../../types/events';

export const scandalEvents: GameEvent[] = [
  {
    id: 'scandal-offshore-leak',
    category: 'scandal',
    title: 'An Offshore Leak Names Your Inner Circle',
    description: 'A cross-border journalism consortium has published documents tying a secret offshore company to one of your closest aides. The opposition smells blood; the front pages are merciless.',
    choices: [
      { label: 'Sack the aide immediately, demand an inquiry', effects: { trust: 8, mediaApproval: 6, scandalRisk: -8, partySupport: -6 }, headline: '"{name}" cuts ties with aide over offshore leak: "No one is above scrutiny"' },
      { label: 'Stand by them — "trial by media"', effects: { partySupport: 6, scandalRisk: 14, trust: -12, mediaApproval: -8 }, headline: '"{name}" defends aide, blasts "trial by media"' },
      { label: 'Say nothing and wait for it to blow over', effects: { scandalRisk: 8, trust: -5, momentum: -4 }, headline: '"{name}" stays silent as offshore story dominates the week' },
    ],
    weight: 10,
  },
  {
    id: 'scandal-hospitals',
    category: 'scandal',
    title: 'The Hospitals Concession Unravels',
    description: 'A court is reviewing the deal that handed three public hospitals to a private investor who never delivered. Auditors call it "fraudulent." Your government signed it — or inherited it.',
    choices: [
      { label: 'Cancel the concession and claw back the millions', effects: { trust: 12, popularity: 6, mediaApproval: 8, donorSupport: -10 }, headline: '"{name}" moves to cancel hospitals deal: "The people were robbed"' },
      { label: 'Defend the deal as "good for patients"', effects: { donorSupport: 6, scandalRisk: 12, trust: -10, mediaApproval: -6 }, headline: '"{name}" defends hospitals concession amid fraud findings' },
      { label: 'Promise a public inquiry after the election', effects: { trust: 2, momentum: -2, scandalRisk: 4 }, headline: '"{name}" kicks hospitals inquiry down the road to after polling day' },
    ],
    weight: 9,
  },
  {
    id: 'scandal-passports',
    category: 'scandal',
    title: 'Brussels Sues Over the Passport Scheme',
    description: 'The European Commission is taking Malta to court over the "golden passports" sold to wealthy foreigners. It earns the treasury a fortune — and earns the island a reputation.',
    choices: [
      { label: 'Scrap the scheme and take the moral high ground', effects: { foreignPolicy: 12, trust: 10, youthVote: 6, funds: -3000000, donorSupport: -6 }, headline: '"{name}" ends cash-for-passports: "Our values are not for sale"' },
      { label: 'Reform it with "stricter vetting"', effects: { foreignPolicy: 4, trust: 3, economyConfidence: 3 }, headline: '"{name}" promises tougher vetting but keeps passport scheme' },
      { label: 'Defend Maltese sovereignty against Brussels', effects: { rural: 6, partySupport: 6, foreignPolicy: -12, trust: -4 }, headline: '"{name}" defies Commission: "Citizenship is Malta\'s sovereign right"' },
    ],
    weight: 8,
  },
  {
    id: 'scandal-permit',
    category: 'scandal',
    title: 'A Planning Permit Smells Wrong',
    description: 'The planning authority just waved through a towering block in an ODZ green belt — owned by a donor to your party. Residents and environmental NGOs are in open revolt.',
    choices: [
      { label: 'Order the permit frozen and reviewed', effects: { trust: 8, youthVote: 6, urban: 4, donorSupport: -10, scandalRisk: -4 }, headline: '"{name}" freezes controversial ODZ permit pending review' },
      { label: 'Call it "a matter for the authority, not politicians"', effects: { donorSupport: 6, scandalRisk: 8, trust: -6 }, headline: '"{name}" refuses to intervene on donor\'s ODZ block' },
      { label: 'Champion a full overhaul of planning law', effects: { youthVote: 10, trust: 7, donorSupport: -14, momentum: 4 }, headline: '"{name}" vows to "tear up" the planning rulebook' },
    ],
    weight: 9,
  },
];
