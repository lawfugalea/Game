# Campaign Chaos — Image Prompt Pack (ChatGPT-ready)

Local raster assets for `public/img/`. The game is offline-safe: any missing file falls back to the built-in SVG art.

## How to use (read this first)

- **One prompt = one image.** Every block below is fully self-contained — copy a single block, paste it into ChatGPT, get one finished image. Generate the next one in a new message.
- **Do NOT paste a "style" block on its own.** ChatGPT has no reusable style/system prompt for images, so a standalone style block just produces a cluttered collage of everything at once. The style is already baked into each prompt.
- **Match the size/aspect** noted in each block (square for portraits, wide 16:9 for scenarios).
- **Filenames matter.** Save each image to the exact `Target` path. Leaders are keyed by candidate `id`; scenarios by event category.
- **Format:** ChatGPT exports PNG; the game loads `.webp`. Generate as PNG, then convert/rename to the `.webp` target (or hand them over and they can be batch-converted).

The shared look every prompt already carries: *fictional, tasteful Maltese political satire; warm limestone light; deep broadcast shadows; red (Labour) and blue (Nationalist) campaign accents with subtle gold; cinematic editorial 35mm realism; readable on a phone; no text, no captions, no logos, no real public figures.*

---

## 1. Leaders (square portraits — `1024×1024`)

These eight are the portraits the game actually renders. Save to `public/img/leaders/<id>.webp`.

### Rohan Vella — `public/img/leaders/rohan-vella.webp`
```text
A square 1:1 chest-up portrait of Rohan Vella, a fictional Maltese Labour Deputy PM and finance minister: charismatic, slick, populist, the confident face of a winning party machine, with a polished half-smile that hints at the questions trailing his boom-time record. Sharp modern suit, restrained red campaign accents; a glass-and-limestone financial district with faint construction cranes softly blurred behind him. Cinematic editorial 35mm photo, warm limestone light, deep broadcast shadows, subtle gold, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

### Claudia Borg — `public/img/leaders/claudia-borg.webp`
```text
A square 1:1 chest-up portrait of Claudia Borg, a fictional Maltese Nationalist Leader of the Opposition: a former auditor — disciplined, detail-obsessed, reform-minded, campaigning on clean government — her composed expression warming slightly for the camera. Precise dark suit, restrained blue accents; a parliament or audit-office interior of limestone and soft window light. Cinematic editorial 35mm photo, warm limestone highlights, deep broadcast shadows, subtle gold, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

### Mario Cassar — `public/img/leaders/mario-cassar.webp`
```text
A square 1:1 chest-up portrait of Mario Cassar, a fictional Maltese Labour energy and tourism minister: blunt, hearty, backslapping, beloved in the southern harbour districts and band clubs, strong with the unions, wearing a broad confident grin. Suit with sleeves a touch loosened, warm red campaign accents; a harbour-side village or band-club setting in soft festa light. Cinematic editorial 35mm photo, warm limestone tones, deep broadcast shadows, subtle gold, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

### Elena Grech — `public/img/leaders/elena-grech.webp`
```text
A square 1:1 chest-up portrait of Elena Grech, a fictional Maltese Nationalist MEP and human-rights lawyer: Brussels-sharpened, principled, fearless on rule-of-law, a hero to younger voters and NGOs, with a sharp resolute expression. Crisp contemporary outfit, blue with subtle gold EU-toned accents; a Valletta or summit-corridor backdrop of limestone and cool light. Cinematic editorial 35mm photo, warm limestone highlights, deep broadcast shadows, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

### Joseph Attard — `public/img/leaders/joseph-attard.webp`
```text
A square 1:1 chest-up portrait of Joseph Attard, a fictional veteran Maltese Labour leader: an older, seasoned, old-school crowd-worker who can fill a village piazza, with a practised avuncular smile and a hint of weariness behind the eyes. Warm red campaign accents; a sunlit piazza crowd and festa bunting softly blurred behind him. Cinematic editorial 35mm photo, warm limestone light, deep broadcast shadows, subtle gold, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

### Bernard Sammut — `public/img/leaders/opp-sammut.webp`
```text
A square 1:1 chest-up portrait of Bernard Sammut, a fictional Maltese Nationalist opposition leader: polished, pro-business, technocratic, competent but slightly distant. Dark suit with restrained blue campaign accents; a Valletta office or parliament corridor with limestone walls and soft window light. Cinematic editorial 35mm photo, warm limestone highlights, deep broadcast shadows, subtle gold, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

### Tania Farrugia — `public/img/leaders/opp-farrugia.webp`
```text
A square 1:1 chest-up portrait of Tania Farrugia, a fictional incumbent Maltese prime minister: charismatic, formidable, populist and media-savvy, with a controlled smile that suggests she is always campaigning. Subtle red campaign accents; a busy campaign stop with warm crowd lights and Maltese limestone architecture behind her. Cinematic editorial 35mm photo, warm limestone tones, deep broadcast shadows, subtle gold, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

### Karl Zammit — `public/img/leaders/opp-zammit.webp`
```text
A square 1:1 chest-up portrait of Karl Zammit, a fictional former Maltese finance minister: cautious, traditional, trusted on budgets, quietly ruthless, with a reserved and analytical expression. Conservative suit with blue accents; old parliament furniture, folders and subdued limestone tones around him. Cinematic editorial 35mm photo, warm limestone highlights, deep broadcast shadows, subtle gold, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

---

## 2. Scenarios (wide establishing shots — `1600×900`, 16:9)

Save to `public/img/scenarios/<category>.webp`. Filenames must match the event category exactly.

### economy — `public/img/scenarios/economy.webp`
```text
A wide 16:9 cinematic establishing shot of Malta's economy under election pressure: Valletta financial offices and harbour cranes, a few workers and journalists in the foreground. Grounded Maltese political satire, warm limestone tones, deep broadcast shadows, red and blue campaign accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### healthcare — `public/img/scenarios/healthcare.webp`
```text
A wide 16:9 cinematic establishing shot of a Maltese hospital entrance during campaign season: ambulances, nurses and waiting families outside a limestone facade, press cameras present, humane but tense. Grounded Maltese political satire, warm limestone tones, deep broadcast shadows, restrained red and blue campaign accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### immigration — `public/img/scenarios/immigration.webp`
```text
A wide 16:9 cinematic establishing shot at a Maltese harbour at evening: a patrol boat, aid workers and officials with journalists nearby, treated respectfully and without sensationalism, luzzu boats in the distance. Grounded Maltese political satire, Mediterranean evening light, warm limestone tones, deep broadcast shadows, red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### trade — `public/img/scenarios/trade.webp`
```text
A wide 16:9 cinematic establishing shot of Malta Freeport at dusk: stacked shipping containers and cranes, a few business delegates and dock workers, campaign aides watching from the side. Grounded Maltese political satire, warm limestone and dock tones, deep broadcast shadows, red, blue and gold accents, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### war — `public/img/scenarios/war.webp`
```text
A wide 16:9 cinematic establishing shot of a tense Maltese government situation room during an overseas crisis: officials and campaign staff under broadcast lighting, blurred maps and naval silhouettes on monitors with no readable text and no real military insignia. Grounded Maltese political satire, cool monitor glow over warm limestone, deep broadcast shadows, red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### environment — `public/img/scenarios/environment.webp`
```text
A wide 16:9 cinematic establishing shot of an ODZ countryside controversy in Malta: limestone fields with construction cranes encroaching at the edge, a small group of environmental activists, farmers and reporters. Grounded Maltese political satire, green undertones with warm limestone, deep broadcast shadows, red and blue political tension with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### crime — `public/img/scenarios/crime.webp`
```text
A wide 16:9 cinematic establishing shot of a Maltese police press line outside a courthouse at night: microphones and flashing lights on limestone steps, campaign aides in the shadows, serious civic mood, no real badges. Grounded Maltese political satire, cool night tones over limestone, deep broadcast shadows, red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### disaster — `public/img/scenarios/disaster.webp`
```text
A wide 16:9 cinematic establishing shot of a Malta storm or infrastructure emergency: a flooded street by old limestone buildings, emergency crews and journalists, campaign staff trying to look useful, a dramatic sky, tasteful and non-exploitative. Grounded Maltese political satire, stormy tones over warm limestone, deep broadcast shadows, red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### party — `public/img/scenarios/party.webp`
```text
A wide 16:9 cinematic establishing shot inside a fictional Maltese party headquarters: a tense strategy meeting under red and blue light, abstract posters with shapes only, maps, coffee cups and phones, old party-club atmosphere. Grounded Maltese political satire, warm limestone and lamp light, deep broadcast shadows, subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### donor — `public/img/scenarios/donor.webp`
```text
A wide 16:9 cinematic establishing shot of a discreet political donor meeting in a Maltese hotel lounge with a harbour view: business figures and a campaign aide, gold and shadowy broadcast tones, envelopes and phones implied but not cartoonish. Grounded Maltese political satire, warm limestone, deep broadcast shadows, red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### debate — `public/img/scenarios/debate.webp`
```text
A wide 16:9 cinematic establishing shot of a Maltese TV debate studio: two empty podiums under bright broadcast lights and cameras, an empty moderator desk, red and blue set accents, high-stakes mood, no station logos. Grounded Maltese political satire, bright studio light with deep shadows, subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### press — `public/img/scenarios/press.webp`
```text
A wide 16:9 cinematic establishing shot of a Maltese press scrum outside grand limestone government steps: microphones and cameras around aides, a candidate silhouette entering frame, afternoon sun. Grounded Maltese political satire, warm limestone, deep broadcast shadows, red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### rally — `public/img/scenarios/rally.webp`
```text
A wide 16:9 cinematic establishing shot of a Maltese village-square rally at festa time: balconies, bunting and warm lights over a lively crowd, band-club energy, red and blue campaign flags with no logos or text. Grounded Maltese political satire, warm festa light over limestone, deep broadcast shadows, subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### fundraiser — `public/img/scenarios/fundraiser.webp`
```text
A wide 16:9 cinematic establishing shot of a campaign fundraiser in a Maltese villa courtyard: donors and waiters among limestone arches with harbour lights, polished but slightly uneasy atmosphere. Grounded Maltese political satire, warm limestone, deep broadcast shadows, discreet red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### scandal — `public/img/scenarios/scandal.webp`
```text
A wide 16:9 cinematic establishing shot of a late-night Maltese newsroom during a scandal: a board of blurred documents, reporters and anxious campaign aides, Valletta lights through the window, dramatic red-blue broadcast lighting, no real names. Grounded Maltese political satire, warm limestone offset by cool night light, deep broadcast shadows, subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### supreme-court — `public/img/scenarios/supreme-court.webp`
```text
A wide 16:9 cinematic establishing shot of a fictional Maltese constitutional court exterior: limestone columns with lawyers, reporters and campaign officials on the steps, muted gold light, civic gravity, no real court insignia. Grounded Maltese political satire, warm limestone, deep broadcast shadows, restrained red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### election-security — `public/img/scenarios/election-security.webp`
```text
A wide 16:9 cinematic establishing shot of a secure Maltese vote-counting room: sealed ballot boxes, officials and observers, monitors showing abstract graphics only, tense party representatives. Grounded Maltese political satire, warm limestone with cool monitor glow, deep broadcast shadows, red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### foreign — `public/img/scenarios/foreign.webp`
```text
A wide 16:9 cinematic establishing shot of a Malta-EU diplomatic summit: a conference hall with abstract blue-gold flag shapes and a Mediterranean harbour view, officials and interpreters, a nervous campaign adviser watching. Grounded Maltese political satire, warm limestone with cool summit light, deep broadcast shadows, blue and gold accents, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### education — `public/img/scenarios/education.webp`
```text
A wide 16:9 cinematic establishing shot of a Maltese school or university courtyard during an education-policy row: students, teachers and journalists by limestone buildings, campaign aides present, hopeful but tense. Grounded Maltese political satire, warm limestone daylight, deep broadcast shadows, red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### technology — `public/img/scenarios/technology.webp`
```text
A wide 16:9 cinematic establishing shot of a Maltese digital-government crisis: a server room or startup office with cybersecurity monitors showing abstract graphics only, campaign staff and reporters, blue-green tech light with red political tension. Grounded Maltese political satire, cool tech glow over warm limestone, deep broadcast shadows, subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### energy — `public/img/scenarios/energy.webp`
```text
A wide 16:9 cinematic establishing shot of Malta's energy debate: power-station silhouettes and solar panels with a distant fuel tanker in the harbour, a small campaign press event, warm industrial light. Grounded Maltese political satire, warm limestone and industrial tones, deep broadcast shadows, red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

### rare — `public/img/scenarios/rare.webp`
```text
A wide 16:9 cinematic establishing shot of a surreal but tasteful Maltese election wildcard moment: Valletta streets under dramatic broadcast lights with confused journalists, symbolic ballot boxes and festa decorations, strange civic theatre and no fantasy creatures. Grounded Maltese political satire, warm limestone under dramatic light, deep broadcast shadows, red and blue accents with subtle gold, editorial 35mm realism, readable on a phone. No text, no captions, no logos, no real people.
```

---

## 3. Situations (UI backdrops)

### menu-hero — `public/img/situations/menu-hero.webp` (`1600×844`, ~1.9:1)
```text
A wide cinematic hero image (~1.9:1) of the Valletta skyline and Grand Harbour at golden hour for a Maltese election game's main menu: limestone bastions, church domes and luzzu boats, subtle red and blue campaign lights. Grounded Maltese political satire, warm golden-hour limestone glow, deep broadcast shadows, subtle gold, editorial 35mm realism, clean and readable on mobile. No text, no captions, no logos, no real people.
```

### election-night — `public/img/situations/election-night.webp` (`1600×1156`, ~1.38:1)
```text
A wide election-night backdrop (~1.38:1) for a mobile game: a Malta counting hall blended with the Valletta skyline under broadcast lighting, ballot boxes, reporters and result screens showing abstract unreadable graphics, red and blue suspense, with a deliberately darker top third suitable for overlaid UI. Grounded Maltese political satire, warm limestone with cool broadcast light, deep shadows, subtle gold, editorial 35mm realism. No text, no captions, no logos, no real people.
```

---

## 4. Optional — custom-player archetypes (not currently used)

The game does NOT load these: custom-created players fall back to SVG (`id` = `custom`). Generate them only if you later wire portraits to the creator. Square `1024×1024`, save to `public/img/leaders/player-<archetype>.webp`.

### Union Firebrand — `public/img/leaders/player-union.webp`
```text
A square 1:1 chest-up portrait of a fictional Maltese union firebrand candidate: rolled sleeves, intense grassroots energy, a shipyard or workers' hall behind, red campaign accents. Cinematic editorial 35mm photo, warm limestone light, deep broadcast shadows, subtle gold, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

### Economist Technocrat — `public/img/leaders/player-technocrat.webp`
```text
A square 1:1 chest-up portrait of a fictional Maltese economist-technocrat candidate: composed and data-driven, charts and budget folders blurred behind, restrained suit, neutral limestone-and-gold lighting with subtle party-colour accents. Cinematic editorial 35mm photo, deep broadcast shadows, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

### Brussels Insider — `public/img/leaders/player-eu-insider.webp`
```text
A square 1:1 chest-up portrait of a fictional Maltese Brussels-insider candidate: confident international posture, former-MEP energy, an EU summit corridor atmosphere, blue and gold accents, Maltese identity hinted through limestone and harbour light. Cinematic editorial 35mm photo, deep broadcast shadows, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

### Grassroots Activist — `public/img/leaders/player-activist.webp`
```text
A square 1:1 chest-up portrait of a fictional Maltese grassroots-activist candidate: youthful reform energy, an urban Valletta street with blurred unreadable placards, green and gold details, a determined expression. Cinematic editorial 35mm photo, warm limestone light, deep broadcast shadows, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no readable text, no logos.
```

### Party Loyalist — `public/img/leaders/player-loyalist.webp`
```text
A square 1:1 chest-up portrait of a fictional Maltese party-loyalist candidate: a seasoned, confident insider in a party-club atmosphere, campaign badges without logos, red and blue light mixing behind, loyal machine-politics mood. Cinematic editorial 35mm photo, warm limestone light, deep broadcast shadows, subtle gold, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```

### Clean-Hands Outsider — `public/img/leaders/player-outsider.webp`
```text
A square 1:1 chest-up portrait of a fictional Maltese clean-hands outsider candidate: a calm but resolute reformist newcomer, a neutral civic setting, soft limestone light, minimal campaign styling, trusted-independent mood. Cinematic editorial 35mm photo, deep broadcast shadows, subtle gold, shallow depth of field, readable on a phone. Fictional person, no real-person likeness, no text, no logos.
```
