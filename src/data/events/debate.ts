import type { GameEvent } from '../../types/events';

export const debateEvents: GameEvent[] = [
  {
    id: 'debate-primary',
    category: 'debate',
    title: 'Presidential Debate — Round 1',
    description: 'Fifty million viewers tuned in. The moderator opens with the economy. Your opponent lands an early punch: "My opponent\'s entire plan is a wish list with no price tag." The audience stirs. It\'s your turn.',
    participants: ['Moderator: Sandra Kline', 'Opponent on stage'],
    isDebate: true,
    choices: [
      { label: 'Fire back with specific numbers', effects: { trust: 8, mediaApproval: 6, popularity: 4, momentum: 5 }, headline: '"{name}" wins debate on substance — post-debate poll surges +4' },
      { label: 'Pivot to a personal story about voters you\'ve met', effects: { popularity: 8, workingClass: 7, trust: 2, momentum: 6 }, headline: '"{name}" earns debate win with emotional working-class appeal' },
      { label: 'Go on the attack — question opponent\'s record', effects: { momentum: 5, mediaApproval: -3, independents: -4, popularity: 2 }, headline: '"{name}" aggressive in debate — independents uncomfortable' },
      { label: 'Give a measured, presidential answer', effects: { trust: 6, independents: 5, youthVote: -3, momentum: 2 }, headline: '"{name}" measured but unexciting — draw declared by most pundits' },
      { label: 'Fumble — lose your train of thought', effects: { trust: -8, popularity: -6, momentum: -8, scandalRisk: 4 }, headline: '"{name}" stumbles badly in debate — worst moment of campaign so far' },
    ],
    weight: 15,
  },
  {
    id: 'debate-foreign-policy',
    category: 'debate',
    title: 'Foreign Policy Debate Showdown',
    description: 'Tonight\'s debate is foreign policy focused. The moderator asks about your position on the escalating crisis in Eastern Europe. Your opponent has staked out a hawkish position. The world is watching.',
    participants: ['Moderator: Robert Chen', 'Opponent'],
    isDebate: true,
    choices: [
      { label: 'Match the hawkish tone — show strength', effects: { foreignPolicy: 8, rural: 4, youthVote: -6, trust: 3 }, headline: '"{name}" calls for firm action in European crisis' },
      { label: 'Advocate for diplomatic solutions', effects: { youthVote: 8, urban: 6, foreignPolicy: -4, rural: -4 }, headline: '"{name}" backs diplomacy over military action' },
      { label: 'Criticise the opponent\'s recklessness', effects: { independents: 5, mediaApproval: 4, foreignPolicy: 2, momentum: 4 }, headline: '"{name}" calls opponent\'s foreign policy "dangerous bravado"' },
      { label: 'Propose a bipartisan task force', effects: { trust: 5, partySupport: -4, independents: 6 }, headline: '"{name}" breaks party line with bipartisan foreign policy proposal' },
    ],
    weight: 12,
  },
  {
    id: 'debate-gaffe',
    category: 'debate',
    title: 'The Debate Gaffe That Went Viral',
    description: 'In an unguarded moment between questions, your microphone catches you muttering something that you absolutely should not have said. The clip is already at 2 million views.',
    participants: ['Hot mic', 'The entire internet'],
    isDebate: true,
    choices: [
      { label: 'Laugh it off immediately — own the moment', effects: { popularity: 5, trust: 2, momentum: 3, youthVote: 4 }, headline: '"{name}" laughs off hot mic moment — internet loves the realness' },
      { label: 'Apologise sincerely on stage', effects: { trust: 4, scandalRisk: -5, popularity: -2 }, headline: '"{name}" apologises for hot mic moment mid-debate' },
      { label: 'Deny you said it — bad look', effects: { trust: -10, scandalRisk: 10, mediaApproval: -8 }, headline: '"{name}" denies hot mic clip — video evidence says otherwise' },
      { label: 'Use it to humanise yourself', effects: { youthVote: 7, popularity: 4, trust: 1, independents: 4 }, headline: '"{name}" turns hot mic gaffe into campaign\'s most relatable moment' },
    ],
    weight: 8,
  },
];
