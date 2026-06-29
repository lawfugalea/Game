import type { GameEvent } from '../../types/events';

export const pressEvents: GameEvent[] = [
  {
    id: 'press-hardball',
    category: 'press',
    title: 'Hardball Interview on NNN',
    description: 'You\'re sitting across from Marcus Webb — the most feared interviewer in America. The camera light turns red. He opens with: "Why should anyone trust you after what happened in your first term?"',
    participants: ['Marcus Webb, NNN', 'Live audience: 8M viewers'],
    isPress: true,
    choices: [
      { label: 'Answer directly — show you have nothing to hide', effects: { trust: 8, mediaApproval: 6, popularity: 3 }, headline: '"{name}" impresses in toughest interview of the campaign' },
      { label: 'Challenge the premise of the question', effects: { momentum: 4, trust: -3, mediaApproval: -4, independents: -3 }, headline: '"{name}" pushes back hard on Webb — clips dominate social media' },
      { label: 'Go off-message with an emotional appeal', effects: { popularity: 6, trust: 2, youthVote: 5, mediaApproval: -2 }, headline: '"{name}" gets emotional in Webb interview — moment goes viral' },
      { label: 'Give safe, rehearsed answers', effects: { trust: 2, popularity: -2, mediaApproval: -6, momentum: -3 }, headline: '"{name}" survives Webb interview but appears overly scripted' },
      { label: 'Walk off the set', effects: { scandalRisk: 12, momentum: -8, trust: -10, youthVote: 6 }, headline: 'BREAKING: "{name}" walks off NNN set mid-interview' },
    ],
    weight: 11,
    isDebate: false,
  },
  {
    id: 'press-softball',
    category: 'press',
    title: 'Friendly Interview: The Morning Couch',
    description: 'A relaxed morning show interview. The hosts are fans. But the question nobody expected: "Can you name all five of your swing-state capitals?" A gotcha hidden in cotton candy.',
    participants: ['Kelly & Dave, Morning Couch'],
    isPress: true,
    choices: [
      { label: 'Answer correctly — you did your homework', effects: { trust: 5, mediaApproval: 4, popularity: 3, momentum: 3 }, headline: '"{name}" aces Morning Couch quiz — team relieved' },
      { label: 'Laugh it off — pivot to your message', effects: { popularity: 4, trust: -2, mediaApproval: 2 }, headline: '"{name}" dodges quiz question with charm — some notice' },
      { label: 'Get one wrong — embarrassing silence', effects: { trust: -5, mediaApproval: -4, scandalRisk: 3, momentum: -3 }, headline: '"{name}" blanks on state capital — clip goes viral' },
      { label: 'Use it to make a larger point about voters\' real concerns', effects: { workingClass: 5, popularity: 3, trust: 3, mediaApproval: 3 }, headline: '"{name}" turns geography quiz into powerful moment about working families' },
    ],
    weight: 9,
  },
  {
    id: 'press-gotcha',
    category: 'press',
    title: 'Investigative Reporter Ambush',
    description: 'A reporter from The National Record has been waiting outside your event with a folder full of documents. "We\'re running a story about your campaign finances tomorrow. Comment?"',
    participants: ['Sarah Okafor, The National Record'],
    isPress: true,
    choices: [
      { label: 'Stop and answer every question', effects: { trust: 6, scandalRisk: -6, mediaApproval: 5, stamina: -5 }, headline: '"{name}" stands firm: addresses finance questions head-on' },
      { label: 'Walk past — "No comment"', effects: { scandalRisk: 8, trust: -5, mediaApproval: -6 }, headline: '"{name}" ignores reporter — footage shows campaign dodging press' },
      { label: 'Invite the reporter for a full briefing tomorrow', effects: { trust: 5, scandalRisk: -4, mediaApproval: 3 }, headline: '"{name}" campaign opens books to National Record reporter' },
      { label: 'Have your lawyer speak for you', effects: { scandalRisk: 5, trust: -4, mediaApproval: -5, donorSupport: -3 }, headline: '"{name}" lawyers up over finance questions — raises red flags' },
    ],
    weight: 10,
  },
];
