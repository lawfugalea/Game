import { economyEvents } from './economy';
import { scandalEvents } from './scandal';
import { debateEvents } from './debate';
import { pressEvents } from './press';
import { warEvents } from './war';
import { rallyEvents } from './rally';
import { miscEvents } from './misc';
import { wildcardEvents } from './wildcards';
import { storyEvents } from './story';

export const allEvents = [
  ...storyEvents,
  ...economyEvents,
  ...scandalEvents,
  ...debateEvents,
  ...pressEvents,
  ...warEvents,
  ...rallyEvents,
  ...miscEvents,
  ...wildcardEvents,
];
