import type { GameEvent } from '../../types/events';

export const scandalEvents: GameEvent[] = [
  {
    id: 'scandal-leaked-email',
    category: 'scandal',
    title: 'Leaked Email Surfaces',
    description: 'A private email from your campaign manager has been leaked to the press. It contains frank — and damaging — language about your biggest donors.',
    choices: [
      { label: 'Deny and attack the source', effects: { scandalRisk: 12, trust: -8, mediaApproval: -5, momentum: -4 }, headline: '"{name}" denies leaked email authenticity — journalists skeptical' },
      { label: 'Apologise and move on fast', effects: { scandalRisk: -5, trust: -4, popularity: -3, momentum: -2 }, headline: '"{name}" apologises for leaked email, vows transparency' },
      { label: 'Fire the campaign manager publicly', effects: { scandalRisk: -8, trust: 2, popularity: -2, donorSupport: -6 }, headline: '"{name}" fires campaign manager over leaked email scandal' },
      { label: 'Reframe it as "candid honesty"', effects: { scandalRisk: 4, trust: 3, mediaApproval: -4, independents: 3 }, headline: '"{name}" defends leaked email: "I say what I mean"' },
    ],
    weight: 9,
  },
  {
    id: 'scandal-financial-ties',
    category: 'scandal',
    title: 'Foreign Investment Ties Exposed',
    description: 'An investigative outlet has published a report linking a major donor to your campaign with a foreign government. The report stops short of wrongdoing but the optics are brutal.',
    choices: [
      { label: 'Return the donation immediately', effects: { scandalRisk: -10, funds: -500000, trust: 5, mediaApproval: 4 }, headline: '"{name}" returns foreign-linked donation: "No conflict of interest"' },
      { label: 'Dispute the report\'s accuracy', effects: { scandalRisk: 6, trust: -6, mediaApproval: -8 }, headline: '"{name}" calls foreign ties report "politically motivated hit job"' },
      { label: 'Call for broader campaign finance reform', effects: { youthVote: 7, scandalRisk: -4, donorSupport: -8, popularity: 4 }, headline: '"{name}" turns scandal into campaign finance reform rallying cry' },
      { label: 'Say nothing and hope it blows over', effects: { scandalRisk: 8, momentum: -5 }, headline: '"{name}" campaign silent on foreign donor controversy' },
    ],
    weight: 8,
  },
  {
    id: 'scandal-affair-rumour',
    category: 'scandal',
    title: 'Tabloid Affair Rumour',
    description: 'A tabloid is running a story alleging an affair. There\'s no evidence — but the rumour is spreading on social media faster than your team can counter it.',
    choices: [
      { label: 'Issue a firm, forceful denial', effects: { scandalRisk: 3, trust: 1, mediaApproval: -3 }, headline: '"{name}" issues forceful denial of tabloid allegations' },
      { label: 'Appear publicly with spouse immediately', effects: { scandalRisk: -6, popularity: 3, stamina: -5 }, headline: '"{name}" and spouse laugh off tabloid story at public event' },
      { label: 'Threaten legal action against the tabloid', effects: { scandalRisk: -4, trust: -5, mediaApproval: -6 }, headline: '"{name}" lawyers up against tabloid — raises questions for some voters' },
      { label: 'Ignore it — respond only to real journalists', effects: { scandalRisk: 5, trust: 2 }, headline: '"{name}" refuses to dignify tabloid story with response' },
    ],
    weight: 7,
  },
  {
    id: 'scandal-old-quote',
    category: 'scandal',
    title: 'Resurfaced Controversial Quote',
    description: 'A clip from a 2009 speech has gone viral. In it, you made a comment that — in today\'s context — sounds deeply problematic. Your communications team is in crisis mode.',
    choices: [
      { label: 'Apologise unreservedly', effects: { scandalRisk: -8, trust: 3, youthVote: 4, workingClass: -3 }, headline: '"{name}" issues full apology for decade-old remarks' },
      { label: 'Provide context without full apology', effects: { scandalRisk: 2, trust: -2, independents: -3 }, headline: '"{name}" explains context of controversial quote — critics unsatisfied' },
      { label: 'Double down — defend the statement', effects: { scandalRisk: 10, workingClass: 6, rural: 5, youthVote: -12, urban: -8 }, headline: '"{name}" defends controversial 2009 remarks — backlash erupts' },
      { label: 'Counter-attack opponent on similar record', effects: { scandalRisk: 4, mediaApproval: -5, momentum: 3 }, headline: '"{name}" fires back: points to opponent\'s own controversial history' },
    ],
    weight: 9,
  },
];
