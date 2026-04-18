// Practice exercises keyed by lesson ID — 4-5 exercises per lesson
export const GRAMMAR_PRACTICE = {

  /* ── TENSES ─────────────────────────────────────────────────────── */
  'present-simple': [
    { type: 'multiple-choice', sentence: 'She ___ at a hospital.', options: ['work', 'works', 'working', 'worked'], correct: 1, explanation: 'He/she/it → add -s to the verb.' },
    { type: 'multiple-choice', sentence: 'They ___ like pizza.', options: ['doesn\'t', 'don\'t', 'isn\'t', 'aren\'t'], correct: 1, explanation: 'They → use don\'t (not doesn\'t).' },
    { type: 'fill-blank', sentence: 'He ___ (study) every night.', answer: 'studies', hint: 'he/she/it + y → ies', explanation: 'study → studies for he/she/it.' },
    { type: 'rewrite', question: 'Make negative:', original: 'She drinks coffee.', answer: 'She doesn\'t drink coffee.', hint: 'doesn\'t + base verb', explanation: 'Remove -s from verb after doesn\'t.' },
    { type: 'multiple-choice', sentence: 'Water ___ at 100 degrees.', options: ['boil', 'boils', 'boiling', 'boiled'], correct: 1, explanation: 'Scientific fact — he/she/it form.' },
  ],

  'present-continuous': [
    { type: 'multiple-choice', sentence: 'I ___ TV right now.', options: ['watch', 'watches', 'am watching', 'have watched'], correct: 2, explanation: 'Right now = present continuous.' },
    { type: 'fill-blank', sentence: 'She ___ (not/work) today.', answer: 'is not working', hint: 'is/am/are + not + verb-ing', explanation: 'Negative: is not + verb-ing (or isn\'t working).' },
    { type: 'multiple-choice', sentence: 'Which sentence is WRONG?', options: ['I am knowing you', 'I am eating lunch', 'She is sleeping', 'They are playing'], correct: 0, explanation: 'Know = state verb. You cannot say "am knowing".' },
    { type: 'rewrite', question: 'Make a question:', original: 'He is leaving now.', answer: 'Is he leaving now?', hint: 'Move is to the front', explanation: 'Question: am/is/are + subject + verb-ing?' },
    { type: 'fill-blank', sentence: 'Listen! The birds ___ (sing).', answer: 'are singing', hint: 'Listen! = happening right now', explanation: 'Happening right now = present continuous.' },
  ],

  'present-perfect': [
    { type: 'multiple-choice', sentence: 'I ___ never been to Japan.', options: ['have', 'has', 'had', 'did'], correct: 0, explanation: 'I → have + past participle.' },
    { type: 'multiple-choice', sentence: 'She ___ just finished the test.', options: ['have', 'has', 'had', 'did'], correct: 1, explanation: 'She → has + past participle.' },
    { type: 'fill-blank', sentence: '___ you ever eaten sushi?', answer: 'Have', hint: 'You → Have', explanation: 'You takes have, not has.' },
    { type: 'rewrite', question: 'Rewrite using present perfect + just:', original: 'He lost his keys.', answer: 'He has just lost his keys.', hint: 'has + just + past participle', explanation: 'Just with present perfect = very recent action.' },
    { type: 'multiple-choice', sentence: 'I ___ him yesterday.', options: ['have seen', 'saw', 'has seen', 'see'], correct: 1, explanation: 'Yesterday = specific time → Past Simple.' },
  ],

  'past-simple': [
    { type: 'fill-blank', sentence: 'We ___ (go) to Paris last year.', answer: 'went', hint: 'Irregular verb: go → went', explanation: 'Go is irregular — past simple is went.' },
    { type: 'multiple-choice', sentence: 'She ___ eat breakfast this morning.', options: ['didn\'t', 'doesn\'t', 'hasn\'t', 'wasn\'t'], correct: 0, explanation: 'Past simple negative = didn\'t + base verb.' },
    { type: 'rewrite', question: 'Make a question:', original: 'They visited Rome.', answer: 'Did they visit Rome?', hint: 'Did + subject + base verb', explanation: 'Questions: Did + base verb (no -ed).' },
    { type: 'fill-blank', sentence: 'He ___ (buy) a new car.', answer: 'bought', hint: 'Irregular: buy → bought', explanation: 'Buy is irregular — past simple is bought.' },
    { type: 'multiple-choice', sentence: '___ you at home last night?', options: ['Did', 'Were', 'Was', 'Have'], correct: 1, explanation: 'Was/were for states in past (no action verb needed).' },
  ],

  'future-perfect': [
    { type: 'multiple-choice', sentence: 'By 8pm, she ___ finished cooking.', options: ['will finish', 'will have finished', 'has finished', 'is finishing'], correct: 1, explanation: 'By + time = future perfect: will have + pp.' },
    { type: 'fill-blank', sentence: '___ you ___ (eat) by the time I arrive? (will/have eaten)', answer: 'Will', hint: 'Future perfect question: Will + subject + have + pp', explanation: 'Will + subject + have + past participle for future perfect questions.' },
    { type: 'rewrite', question: 'Use future perfect:', original: 'I finish the project. Deadline: next Friday.', answer: 'I will have finished the project by next Friday.', hint: 'by + deadline = future perfect', explanation: 'BY next Friday = will have finished.' },
    { type: 'multiple-choice', sentence: 'By 2030, electric cars ___ the majority of vehicles.', options: ['will become', 'will have become', 'become', 'are becoming'], correct: 1, explanation: 'By 2030 = deadline = future perfect.' },
    { type: 'fill-blank', sentence: 'She ___ (not/finish) the report by tomorrow.', answer: "won't have finished", hint: 'Negative future perfect', explanation: 'Negative: will not have + past participle.' },
  ],

  'past-perfect-continuous': [
    { type: 'multiple-choice', sentence: 'She was tired because she ___ all day.', options: ['worked', 'was working', 'had been working', 'has worked'], correct: 2, explanation: 'Duration before past result = past perfect continuous.' },
    { type: 'fill-blank', sentence: 'How long ___ you been waiting when the bus arrived?', answer: 'had', hint: 'Duration question in past', explanation: 'How long had you been waiting = duration before past event.' },
    { type: 'rewrite', question: 'Use past perfect continuous:', original: 'He was exhausted. He had run for 3 hours.', answer: 'He was exhausted because he had been running for 3 hours.', hint: 'had been + verb-ing', explanation: 'Duration before past result = had been running.' },
    { type: 'multiple-choice', sentence: 'They ___ for 2 hours before they reached an agreement.', options: ['discussed', 'had discussed', 'had been discussing', 'were discussing'], correct: 2, explanation: 'Duration before another past event = past perfect continuous.' },
    { type: 'fill-blank', sentence: 'She was crying because she ___ (argue) with her friend.', answer: 'had been arguing', hint: 'Explains visible past result with duration', explanation: 'Had been arguing = duration before past emotional state.' },
  ],

  'reported-speech-tenses': [
    { type: 'multiple-choice', sentence: "'I am studying.' → She said she ___ studying.", options: ['is', 'was', 'has been', 'had been'], correct: 1, explanation: 'Present continuous → past continuous in reported speech.' },
    { type: 'fill-blank', sentence: "'I must leave.' → He said he ___ to leave.", answer: 'had', hint: 'Must → had to (special shift)', explanation: 'Must shifts to had to, not would must or musted.' },
    { type: 'rewrite', question: 'Report with correct tense:', original: "'It may rain.' (she said)", answer: 'She said it might rain.', hint: 'May → might', explanation: 'May shifts to might in reported speech.' },
    { type: 'multiple-choice', sentence: "'I have never tried sushi.' → He said he ___ never tried sushi.", options: ['has', 'had', 'have', 'did'], correct: 1, explanation: 'Present perfect → past perfect in reported speech.' },
    { type: 'multiple-choice', sentence: "'I can help.' → She said she ___ help.", options: ['can', 'could', 'would', 'should'], correct: 1, explanation: 'Can → could in reported speech.' },
  ],

  'past-continuous': [
    { type: 'multiple-choice', sentence: 'I ___ when you called.', options: ['sleep', 'sleeping', 'was sleeping', 'am sleeping'], correct: 2, explanation: 'In progress when interrupted = was/were + verb-ing.' },
    { type: 'fill-blank', sentence: 'They ___ (play) all afternoon.', answer: 'were playing', hint: 'They = were + verb-ing', explanation: 'They → were + verb-ing.' },
    { type: 'multiple-choice', sentence: 'Which is correct?', options: ['She was sleep', 'She sleeping', 'She was sleeping', 'She is slept'], correct: 2, explanation: 'Past continuous = was/were + verb-ing.' },
    { type: 'rewrite', question: 'Make a question:', original: 'She was working.', answer: 'Was she working?', hint: 'Move was to the front', explanation: 'Question: Was/Were + subject + verb-ing?' },
    { type: 'fill-blank', sentence: 'What ___ you doing at 8pm yesterday?', answer: 'were', hint: 'You = were', explanation: 'Past continuous question: were + subject + verb-ing.' },
  ],

  'future-simple': [
    { type: 'multiple-choice', sentence: 'I think it ___ rain tomorrow.', options: ['is going to', 'will', 'would', 'is'], correct: 1, explanation: 'Prediction without evidence = will.' },
    { type: 'fill-blank', sentence: 'I ___ (call) you back in 5 minutes.', answer: 'will call', hint: 'Promise = will', explanation: 'Promise about future = will + base verb.' },
    { type: 'rewrite', question: 'Make negative:', original: 'She will come to the party.', answer: 'She will not come to the party.', hint: 'will + not (or won\'t)', explanation: 'Negative: will not or won\'t + base verb.' },
    { type: 'multiple-choice', sentence: 'Look at those clouds — it ___ rain.', options: ['will', 'is going to', 'would', 'shall'], correct: 1, explanation: 'Visible evidence = going to.' },
    { type: 'fill-blank', sentence: 'He ___ never take that job. (strong prediction)', answer: 'will', hint: 'Will = prediction/certainty', explanation: 'Will for certain predictions about the future.' },
  ],

  'future-going-to': [
    { type: 'multiple-choice', sentence: 'Look! It ___ rain — the clouds are black.', options: ['will', 'is going to', 'would', 'shall'], correct: 1, explanation: 'Visible evidence right now = going to.' },
    { type: 'fill-blank', sentence: 'We ___ (visit) Paris next month. (planned)', answer: 'are going to visit', hint: 'am/is/are + going to + base verb', explanation: 'Pre-made plan = going to.' },
    { type: 'multiple-choice', sentence: 'I\'ve bought the tickets. I ___ fly to Rome.', options: ['will', 'am going to', 'would', 'shall'], correct: 1, explanation: 'Tickets already bought = pre-made plan = going to.' },
    { type: 'rewrite', question: 'Make negative:', original: 'She is going to call.', answer: 'She is not going to call.', hint: 'is + not + going to', explanation: 'Negative: is/am/are + not + going to + base verb.' },
    { type: 'multiple-choice', sentence: 'Spontaneous decision (just decided) = ___', options: ['going to', 'will', 'would', 'was going to'], correct: 1, explanation: 'Decision made at moment of speaking = will.' },
  ],

  'future-continuous': [
    { type: 'fill-blank', sentence: 'At 9pm I ___ (watch) the game.', answer: 'will be watching', hint: 'will + be + verb-ing', explanation: 'Action in progress at future moment = will be + verb-ing.' },
    { type: 'multiple-choice', sentence: 'Polite question form:', options: ['Will you use the car?', 'Will you be using the car?', 'Do you use the car?', 'Are you using the car?'], correct: 1, explanation: 'Future continuous sounds more polite in requests.' },
    { type: 'rewrite', question: 'Make negative:', original: 'She will be working on Sunday.', answer: 'She will not be working on Sunday.', hint: 'will + not + be + verb-ing', explanation: 'Negative: will not be (won\'t be) + verb-ing.' },
    { type: 'multiple-choice', sentence: 'This time next week, we ___ on the beach.', options: ['lie', 'will lie', 'will be lying', 'are lying'], correct: 2, explanation: 'In progress at a future point = will be + verb-ing.' },
    { type: 'fill-blank', sentence: '___ he be joining us for dinner?', answer: 'Will', hint: 'Future continuous question starts with will', explanation: 'Question: Will + subject + be + verb-ing?' },
  ],

  'present-perfect-continuous': [
    { type: 'fill-blank', sentence: 'I ___ (study) for 3 hours.', answer: 'have been studying', hint: 'have/has + been + verb-ing', explanation: 'Duration up to now = have been + verb-ing.' },
    { type: 'multiple-choice', sentence: 'She has been crying. Her eyes are ___', options: ['red', 'redness', 'will be red', 'were red'], correct: 0, explanation: 'Present result visible now — eyes are red.' },
    { type: 'fill-blank', sentence: 'How long ___ you been waiting here?', answer: 'have', hint: 'You → have', explanation: 'How long have + subject + been + verb-ing?' },
    { type: 'multiple-choice', sentence: 'Which is WRONG?', options: ['I have been working', 'She has been sleeping', 'He has been knowing', 'They have been playing'], correct: 2, explanation: 'Know = state verb. Cannot use continuous form.' },
    { type: 'rewrite', question: 'Make negative:', original: 'They have been sleeping.', answer: 'They have not been sleeping.', hint: 'have + not + been + verb-ing', explanation: 'Negative: have not (haven\'t) been + verb-ing.' },
  ],

  'past-perfect': [
    { type: 'fill-blank', sentence: 'When I arrived, she ___ (already/leave).', answer: 'had already left', hint: 'had + already + past participle', explanation: 'The earlier past action = had + past participle.' },
    { type: 'multiple-choice', sentence: '"When I came, she had left." — Who left first?', options: ['I came first', 'She left first', 'Both at same time', 'Can\'t tell'], correct: 1, explanation: 'Had left = happened before "came". She left first.' },
    { type: 'rewrite', question: 'Use past perfect for the earlier action:', original: 'By the time we arrived, dinner finished.', answer: 'By the time we arrived, dinner had finished.', hint: 'had + past participle', explanation: 'The action that finished first = past perfect.' },
    { type: 'fill-blank', sentence: 'He ___ never ___ (see) snow before that day.', answer: 'had / seen', hint: 'had + past participle', explanation: 'First experience before a past point = had never seen.' },
    { type: 'multiple-choice', sentence: 'Which is WRONG?', options: ['He had went there', 'She had gone home', 'They had seen it', 'I had eaten already'], correct: 0, explanation: 'Had always uses past participle: go → gone, not went.' },
  ],

  'mixed-tenses': [
    { type: 'multiple-choice', sentence: 'I ___ him yesterday.', options: ['have seen', 'saw', 'had seen', 'see'], correct: 1, explanation: 'Yesterday = specific past time → Past Simple.' },
    { type: 'fill-blank', sentence: 'She ___ (live) here since she was born.', answer: 'has lived', hint: 'since = Present Perfect', explanation: 'From past to now + since = Present Perfect.' },
    { type: 'multiple-choice', sentence: 'By tomorrow I ___.', options: ['finish', 'will finish', 'will have finished', 'am finishing'], correct: 2, explanation: 'Completed before a future deadline = Future Perfect.' },
    { type: 'rewrite', question: 'Correct the tense:', original: 'I have seen him yesterday.', answer: 'I saw him yesterday.', hint: 'Yesterday = specific time → Past Simple', explanation: 'Specific past time word = Past Simple, not Perfect.' },
    { type: 'fill-blank', sentence: 'When I arrived, she already ___ (leave).', answer: 'had left', hint: 'Earlier past action = Past Perfect', explanation: 'Action before another past action = had + past participle.' },
  ],

  'tenses-review': [
    { type: 'multiple-choice', sentence: '"She works." — Which tense?', options: ['Present Continuous', 'Present Simple', 'Past Simple', 'Present Perfect'], correct: 1, explanation: 'No time marker, no be + ing = Present Simple.' },
    { type: 'multiple-choice', sentence: '"She has worked." — Which tense?', options: ['Present Simple', 'Past Simple', 'Present Perfect', 'Past Perfect'], correct: 2, explanation: 'have/has + past participle = Present Perfect.' },
    { type: 'fill-blank', sentence: 'She ___ (work) right now.', answer: 'is working', hint: 'Right now = continuous', explanation: 'Right now = Present Continuous: is + verb-ing.' },
    { type: 'rewrite', question: 'Change to Present Perfect:', original: 'She worked hard.', answer: 'She has worked hard.', hint: 'have/has + past participle', explanation: 'Present Perfect = have/has + past participle.' },
    { type: 'multiple-choice', sentence: 'I ___ to Paris three times.', options: ['went', 'have been', 'was', 'had gone'], correct: 1, explanation: 'Life experience (three times, no specific time) = Present Perfect.' },
  ],

  /* ── ARTICLES ──────────────────────────────────────────────────── */
  'article-a': [
    { type: 'multiple-choice', sentence: 'She is ___ engineer.', options: ['a', 'an', 'the', '—'], correct: 1, explanation: 'Engineer starts with vowel sound "e" → an engineer.' },
    { type: 'fill-blank', sentence: 'I want ___ coffee please.', answer: 'a', hint: 'One coffee, consonant k-sound', explanation: 'Coffee starts with consonant "k" sound → a.' },
    { type: 'multiple-choice', sentence: 'He has ___ university degree.', options: ['a', 'an', 'the', '—'], correct: 0, explanation: 'University = "yoo-niversity" = consonant "y" sound → a.' },
    { type: 'rewrite', question: 'Add the correct article:', original: 'She is doctor.', answer: 'She is a doctor.', hint: 'Job titles need an article', explanation: 'Always use a/an before job/profession.' },
    { type: 'multiple-choice', sentence: 'I saw ___ interesting movie last night.', options: ['a', 'an', 'the', '—'], correct: 1, explanation: 'Interesting starts with vowel sound "i" → an.' },
  ],

  'article-an': [
    { type: 'fill-blank', sentence: 'I waited for ___ hour.', answer: 'an', hint: 'Hour has a silent h → vowel sound', explanation: 'Hour starts with vowel sound (silent h) → an.' },
    { type: 'multiple-choice', sentence: 'She is ___ honest person.', options: ['a', 'an', 'the', '—'], correct: 1, explanation: 'Honest has a silent h → vowel sound → an.' },
    { type: 'multiple-choice', sentence: 'He has ___ MBA.', options: ['a', 'an', 'the', '—'], correct: 1, explanation: 'M is pronounced "em" — vowel sound → an MBA.' },
    { type: 'rewrite', question: 'Correct the article:', original: 'It was a amazing experience.', answer: 'It was an amazing experience.', hint: 'Amazing starts with vowel a', explanation: 'Vowel sound → an.' },
    { type: 'multiple-choice', sentence: 'an ___ (which word fits?)', options: ['car', 'book', 'umbrella', 'chair'], correct: 2, explanation: 'Umbrella starts with vowel sound "u" → an umbrella.' },
  ],

  'article-the': [
    { type: 'multiple-choice', sentence: '___ sun rises in the east.', options: ['A', 'An', 'The', '—'], correct: 2, explanation: 'Only one sun exists → the.' },
    { type: 'fill-blank', sentence: 'I bought a shirt. ___ shirt is blue.', answer: 'The', hint: 'Second mention = specific', explanation: 'Already mentioned → now specific → the.' },
    { type: 'multiple-choice', sentence: 'She is ___ best student in class.', options: ['a', 'an', 'the', '—'], correct: 2, explanation: 'Superlative always uses the.' },
    { type: 'rewrite', question: 'Correct the article:', original: 'I love the music.', answer: 'I love music.', hint: 'General concept = no article', explanation: 'Music in general = no article needed.' },
    { type: 'multiple-choice', sentence: 'Can you close ___ window?', options: ['a', 'an', 'the', '—'], correct: 2, explanation: 'Both speaker and listener know which window → the.' },
  ],

  'no-article': [
    { type: 'multiple-choice', sentence: 'I love ___ music.', options: ['the', 'a', '—', 'an'], correct: 2, explanation: 'General uncountable noun = no article.' },
    { type: 'fill-blank', sentence: 'She speaks ___ French.', answer: '', hint: 'Languages = no article', explanation: 'Languages never take an article.' },
    { type: 'multiple-choice', sentence: '___ life is beautiful.', options: ['A', 'An', 'The', '—'], correct: 3, explanation: 'Life in general = no article.' },
    { type: 'rewrite', question: 'Remove the wrong article:', original: 'I play the tennis.', answer: 'I play tennis.', hint: 'Sports = no article', explanation: 'Sports never use an article.' },
    { type: 'multiple-choice', sentence: 'She had ___ breakfast at 8am.', options: ['a', 'an', 'the', '—'], correct: 3, explanation: 'Meal names (breakfast, lunch, dinner) = no article.' },
  ],

  'articles-places': [
    { type: 'multiple-choice', sentence: 'I live in ___ France.', options: ['the', 'a', 'an', '—'], correct: 3, explanation: 'Most country names = no article.' },
    { type: 'fill-blank', sentence: '___ Amazon is the longest river.', answer: 'The', hint: 'Rivers always use the', explanation: 'Rivers always use the.' },
    { type: 'multiple-choice', sentence: 'She swam in ___ Atlantic.', options: ['a', 'an', 'the', '—'], correct: 2, explanation: 'Oceans always use the.' },
    { type: 'fill-blank', sentence: 'I visited ___ United States last year.', answer: 'the', hint: 'Plural country name = the', explanation: 'Plural country names use the.' },
    { type: 'multiple-choice', sentence: 'She climbed ___ Everest.', options: ['a', 'an', 'the', '—'], correct: 3, explanation: 'Single mountain names = no article.' },
  ],

  'articles-review': [
    { type: 'multiple-choice', sentence: 'She gave me ___ useful tip.', options: ['a', 'an', 'the', '—'], correct: 0, explanation: 'Useful = "yoo-seful" = consonant y sound → a.' },
    { type: 'fill-blank', sentence: 'He is ___ best player in the team.', answer: 'the', hint: 'Superlative = the', explanation: 'Superlatives always need the.' },
    { type: 'multiple-choice', sentence: 'I saw a dog. ___ dog was friendly.', options: ['A', 'An', 'The', '—'], correct: 2, explanation: 'Second mention of a specific dog = the.' },
    { type: 'rewrite', question: 'Correct the article mistake:', original: 'The love is important.', answer: 'Love is important.', hint: 'General abstract noun = no article', explanation: 'Love in general = no article.' },
    { type: 'multiple-choice', sentence: 'I had ___ egg for breakfast.', options: ['a', 'an', 'the', '—'], correct: 1, explanation: 'Egg starts with vowel sound → an.' },
  ],

  /* ── PREPOSITIONS ───────────────────────────────────────────────── */
  'prep-time-at-on-in': [
    { type: 'multiple-choice', sentence: 'The meeting is ___ 3pm.', options: ['in', 'on', 'at', 'by'], correct: 2, explanation: 'Exact time = at.' },
    { type: 'multiple-choice', sentence: 'I was born ___ July.', options: ['at', 'on', 'in', 'by'], correct: 2, explanation: 'Month = in.' },
    { type: 'fill-blank', sentence: 'She arrives ___ Monday.', answer: 'on', hint: 'Day of week', explanation: 'Days of week = on.' },
    { type: 'rewrite', question: 'Correct the preposition:', original: 'See you in Friday.', answer: 'See you on Friday.', hint: 'Friday is a day', explanation: 'Days = on, not in.' },
    { type: 'multiple-choice', sentence: 'I exercise ___ the morning.', options: ['at', 'in', 'on', 'by'], correct: 1, explanation: 'Parts of day (morning/afternoon/evening) = in.' },
  ],

  'prep-place-at-on-in': [
    { type: 'multiple-choice', sentence: 'The keys are ___ the table.', options: ['in', 'on', 'at', 'by'], correct: 1, explanation: 'Surface = on.' },
    { type: 'multiple-choice', sentence: 'She is ___ the bus.', options: ['in', 'on', 'at', 'by'], correct: 1, explanation: 'Public transport = on.' },
    { type: 'fill-blank', sentence: 'I\'ll meet you ___ the station.', answer: 'at', hint: 'Meeting point', explanation: 'Specific location/meeting point = at.' },
    { type: 'multiple-choice', sentence: 'He lives ___ London.', options: ['at', 'on', 'in', 'by'], correct: 2, explanation: 'City = in.' },
    { type: 'rewrite', question: 'Fix the preposition:', original: 'She is in the bus.', answer: 'She is on the bus.', hint: 'Public transport = on', explanation: 'Bus (public transport) = on.' },
  ],

  'prep-movement': [
    { type: 'fill-blank', sentence: 'She walked ___ the building.', answer: 'into', hint: 'Entering enclosed space = into', explanation: 'Entering an enclosed space = into.' },
    { type: 'multiple-choice', sentence: 'He drove ___ the airport.', options: ['into', 'from', 'to', 'at'], correct: 2, explanation: 'Destination = to.' },
    { type: 'fill-blank', sentence: 'I come ___ Belgrade.', answer: 'from', hint: 'Origin/starting point = from', explanation: 'Origin = from.' },
    { type: 'rewrite', question: 'Fix the mistake:', original: 'She went to home.', answer: 'She went home.', hint: 'Home never takes "to"', explanation: 'Home is an adverb — no "to" needed.' },
    { type: 'multiple-choice', sentence: 'The cat jumped ___ the table.', options: ['in', 'to', 'onto', 'at'], correct: 2, explanation: 'Movement to a surface = onto.' },
  ],

  'prep-by-with-without': [
    { type: 'multiple-choice', sentence: 'I go to work ___ bus.', options: ['with', 'in', 'by', 'on'], correct: 2, explanation: 'Transport method = by.' },
    { type: 'fill-blank', sentence: 'Finish the report ___ Friday.', answer: 'by', hint: 'Deadline', explanation: 'Deadline = by.' },
    { type: 'multiple-choice', sentence: 'She drinks coffee ___ milk.', options: ['by', 'with', 'of', 'from'], correct: 1, explanation: 'Accompaniment/ingredient = with.' },
    { type: 'rewrite', question: 'Use correct preposition:', original: 'Send it until tomorrow.', answer: 'Send it by tomorrow.', hint: 'Deadline not duration', explanation: 'Deadline = by. Until = continuous up to a point.' },
    { type: 'fill-blank', sentence: 'She left the meeting ___ saying goodbye.', answer: 'without', hint: 'Absence of action', explanation: 'Absence = without.' },
  ],

  'prep-about-of-for': [
    { type: 'fill-blank', sentence: 'We talked ___ the project.', answer: 'about', hint: 'Topic = about', explanation: 'Topic/subject = about.' },
    { type: 'multiple-choice', sentence: 'Give me a glass ___ water please.', options: ['about', 'of', 'for', 'from'], correct: 1, explanation: 'Contents/belonging = of.' },
    { type: 'fill-blank', sentence: 'This gift is ___ you.', answer: 'for', hint: 'Recipient = for', explanation: 'Recipient = for.' },
    { type: 'rewrite', question: 'Fix the preposition:', original: 'A cup from tea.', answer: 'A cup of tea.', hint: 'Contents = of', explanation: 'Contents/ingredients = of, not from.' },
    { type: 'multiple-choice', sentence: 'I\'ve been waiting ___ 2 hours.', options: ['since', 'from', 'for', 'during'], correct: 2, explanation: 'Duration = for.' },
  ],

  'prep-phrasal': [
    { type: 'multiple-choice', sentence: 'Can you ___ my dog this weekend? (care for)', options: ['look at', 'look for', 'look after', 'look into'], correct: 2, explanation: 'Look after = care for.' },
    { type: 'fill-blank', sentence: 'The plane ___ two hours late.', answer: 'took off', hint: 'Phrasal verb: become airborne', explanation: 'Take off = become airborne/depart.' },
    { type: 'multiple-choice', sentence: 'I can\'t ___ this noise. (tolerate)', options: ['put off', 'put up with', 'put on', 'put down'], correct: 1, explanation: 'Put up with = tolerate.' },
    { type: 'rewrite', question: 'Fix the phrasal verb order:', original: 'I\'ll think about it over.', answer: 'I\'ll think it over.', hint: 'Separable phrasal verb — object in the middle', explanation: 'Think over is separable: think it over.' },
    { type: 'multiple-choice', sentence: 'Let\'s ___ the meeting until next week. (postpone)', options: ['put on', 'put off', 'put away', 'put up'], correct: 1, explanation: 'Put off = postpone.' },
  ],

  'prep-adjective-collocations': [
    { type: 'fill-blank', sentence: 'She is very good ___ languages.', answer: 'at', hint: 'Good = always at', explanation: 'Good at = fixed collocation for skills.' },
    { type: 'multiple-choice', sentence: 'I\'m not interested ___ politics.', options: ['of', 'in', 'at', 'with'], correct: 1, explanation: 'Interested in = fixed collocation.' },
    { type: 'fill-blank', sentence: 'He is proud ___ his children.', answer: 'of', hint: 'Proud = always of', explanation: 'Proud of = fixed combination.' },
    { type: 'rewrite', question: 'Fix the preposition:', original: 'She is good in math.', answer: 'She is good at math.', hint: 'Skills = good at', explanation: 'Good at — always at, never in for skills.' },
    { type: 'multiple-choice', sentence: 'Are you familiar ___ this software?', options: ['of', 'in', 'with', 'at'], correct: 2, explanation: 'Familiar with = fixed combination.' },
  ],

  'prep-review': [
    { type: 'multiple-choice', sentence: 'I was born ___ July 4th, ___ 1990.', options: ['in/on', 'on/in', 'at/on', 'in/at'], correct: 1, explanation: 'Date = on. Year = in.' },
    { type: 'fill-blank', sentence: 'She traveled ___ car.', answer: 'by', hint: 'Method of transport', explanation: 'Method = by (no article).' },
    { type: 'multiple-choice', sentence: 'I\'ll meet you ___ the cinema.', options: ['in', 'on', 'at', 'by'], correct: 2, explanation: 'Meeting point/location = at.' },
    { type: 'fill-blank', sentence: 'We have been waiting ___ 2 hours.', answer: 'for', hint: 'Duration = for', explanation: 'Duration = for.' },
    { type: 'rewrite', question: 'Fix the prepositions:', original: 'I\'ll see you in Friday at the morning.', answer: 'I\'ll see you on Friday in the morning.', hint: 'Days = on, parts of day = in', explanation: 'Days = on. Morning/afternoon/evening = in.' },
  ],

  /* ── CONDITIONALS ───────────────────────────────────────────────── */
  'zero-conditional': [
    { type: 'fill-blank', sentence: 'If you heat water to 100°C, it ___.', answer: 'boils', hint: 'Present Simple in both clauses', explanation: 'Zero conditional: If + Present Simple, Present Simple.' },
    { type: 'multiple-choice', sentence: 'Zero conditional uses:', options: ['Present + Future', 'Past + Present', 'Present + Present', 'Past + Past'], correct: 2, explanation: 'Both clauses use Present Simple.' },
    { type: 'rewrite', question: 'Change to zero conditional:', original: 'If you heat water, it will boil.', answer: 'If you heat water, it boils.', hint: 'Both clauses = Present Simple', explanation: 'Zero conditional: no will — both Present Simple.' },
    { type: 'multiple-choice', sentence: 'If plants ___ water, they die.', options: ['get no', 'don\'t get', 'not get', 'didn\'t get'], correct: 1, explanation: 'Negative in zero conditional = don\'t/doesn\'t + base verb.' },
    { type: 'fill-blank', sentence: 'When it rains, the ground ___ (get) wet.', answer: 'gets', hint: 'The ground = he/she/it → add -s', explanation: 'Zero conditional: when = if. Gets (3rd person singular).' },
  ],

  'first-conditional': [
    { type: 'fill-blank', sentence: 'If it ___ tomorrow, we\'ll stay inside.', answer: 'rains', hint: 'Present Simple in if-clause', explanation: 'First conditional: If + Present Simple (never will).' },
    { type: 'multiple-choice', sentence: 'If you ___, you will pass.', options: ['will study', 'study', 'studied', 'had studied'], correct: 1, explanation: 'If-clause = Present Simple (not will).' },
    { type: 'rewrite', question: 'Fix the mistake:', original: 'If it will rain, we\'ll stay inside.', answer: 'If it rains, we\'ll stay inside.', hint: 'Never use will in the if-clause', explanation: 'NEVER use will in the if-clause of first conditional.' },
    { type: 'multiple-choice', sentence: '___ you hurry, you\'ll miss the bus.', options: ['Unless', 'If', 'When', 'Though'], correct: 0, explanation: 'Unless = if not. Unless you hurry = if you don\'t hurry.' },
    { type: 'fill-blank', sentence: 'Unless she ___ (call), he won\'t know.', answer: 'calls', hint: 'Unless + Present Simple', explanation: 'Unless = if not → Present Simple (not will).' },
  ],

  'second-conditional': [
    { type: 'fill-blank', sentence: 'If I ___ more money, I would travel.', answer: 'had', hint: 'Past Simple in if-clause (hypothetical)', explanation: 'Second conditional: If + Past Simple (not would).' },
    { type: 'multiple-choice', sentence: 'Second conditional uses Past Simple in the if-clause because:', options: ['It happened in the past', 'It\'s hypothetical/imaginary', 'It\'s a fact', 'It\'s in the future'], correct: 1, explanation: 'Past form signals hypothetical — not a real expectation.' },
    { type: 'multiple-choice', sentence: 'If I ___ you, I wouldn\'t do that.', options: ['am', 'was', 'were', 'had been'], correct: 2, explanation: '"If I were you" — were preferred for all persons in second conditional.' },
    { type: 'rewrite', question: 'Fix the mistake:', original: 'If I would have money, I would travel.', answer: 'If I had money, I would travel.', hint: 'Never would in the if-clause', explanation: 'NEVER use would in the if-clause.' },
    { type: 'fill-blank', sentence: 'What would you do if you ___ (win) the lottery?', answer: 'won', hint: 'Past Simple in if-clause', explanation: 'Hypothetical: if + Past Simple.' },
  ],

  'third-conditional': [
    { type: 'fill-blank', sentence: 'If I ___ (study) harder, I would have passed.', answer: 'had studied', hint: 'Past Perfect in if-clause', explanation: 'Third conditional: If + Past Perfect.' },
    { type: 'multiple-choice', sentence: 'Third conditional describes:', options: ['Future events', 'Unreal past situations', 'Present habits', 'General facts'], correct: 1, explanation: 'Third conditional = imaginary past that didn\'t happen.' },
    { type: 'rewrite', question: 'Fix the mistake:', original: 'If I would have studied, I would have passed.', answer: 'If I had studied, I would have passed.', hint: 'Never would in the if-clause', explanation: 'If-clause needs Past Perfect: had + past participle.' },
    { type: 'fill-blank', sentence: 'She ___ (come) if she had known about it.', answer: 'would have come', hint: 'would + have + past participle', explanation: 'Result clause: would have + past participle.' },
    { type: 'multiple-choice', sentence: 'I would have ___ if you had asked.', options: ['help', 'helped', 'helping', 'have helped'], correct: 1, explanation: 'Would have + past participle (helped).' },
  ],

  'mixed-conditionals': [
    { type: 'multiple-choice', sentence: 'If I had studied medicine, I ___ be a doctor now.', options: ['would', 'had', 'will', 'am'], correct: 0, explanation: 'Past condition → present result: would + base verb.' },
    { type: 'fill-blank', sentence: 'If I ___ (not/meet) him, I wouldn\'t be living here.', answer: 'hadn\'t met', hint: 'Past condition = Past Perfect', explanation: 'Past condition (didn\'t happen) = hadn\'t + past participle.' },
    { type: 'multiple-choice', sentence: 'Mixed conditional means:', options: ['It mixes grammar rules randomly', 'Condition and result are in different time frames', 'It\'s incorrect grammar', 'It uses two if-clauses'], correct: 1, explanation: 'Mixed = the condition and result come from different time frames.' },
    { type: 'rewrite', question: 'Fix the form:', original: 'If I was more careful I wouldn\'t have made that mistake.', answer: 'If I were more careful, I wouldn\'t have made that mistake.', hint: '"Were" preferred for all persons in conditionals', explanation: 'Were preferred over was in conditional if-clauses.' },
    { type: 'fill-blank', sentence: 'If she were taller, she ___ have become a model.', answer: 'could', hint: 'could / would for mixed conditional result', explanation: 'Past result of present hypothetical: could/would have + pp.' },
  ],

  /* ── MODAL VERBS ────────────────────────────────────────────────── */
  'can-could': [
    { type: 'multiple-choice', sentence: '___ you help me please?', options: ['Can', 'Could', 'Must', 'Should'], correct: 1, explanation: 'Could = more polite request than can.' },
    { type: 'fill-blank', sentence: 'She ___ speak French when she was 5.', answer: 'could', hint: 'Past ability = could', explanation: 'Past ability = could.' },
    { type: 'rewrite', question: 'Make more polite:', original: 'Can you open the door?', answer: 'Could you open the door?', hint: 'Could = more polite than can', explanation: 'Could makes requests more polite.' },
    { type: 'multiple-choice', sentence: 'Which is WRONG?', options: ['I can swim', 'She can drive', 'I can to swim', 'He could come'], correct: 2, explanation: 'Modal verbs are NEVER followed by "to".' },
    { type: 'fill-blank', sentence: 'It ___ be true — I\'m not sure.', answer: 'could', hint: 'Possibility, not certain', explanation: 'Uncertain possibility = could.' },
  ],

  'should-ought': [
    { type: 'fill-blank', sentence: 'You ___ see a doctor.', answer: 'should', hint: 'Advice = should', explanation: 'Advice/recommendation = should.' },
    { type: 'multiple-choice', sentence: 'I ___ called earlier. Sorry. (regret)', options: ['should have', 'would have', 'could have', 'must have'], correct: 0, explanation: 'Regret about past = should have + past participle.' },
    { type: 'rewrite', question: 'Fix the mistake:', original: 'You should to go.', answer: 'You should go.', hint: 'No "to" after modal', explanation: 'Modal verbs never followed by "to".' },
    { type: 'fill-blank', sentence: 'I should have ___ (go) earlier.', answer: 'gone', hint: 'Should have + past participle', explanation: 'Should have + past participle (gone, not went).' },
    { type: 'multiple-choice', sentence: 'Ought to vs Should:', options: ['Opposite meanings', 'Ought to is more formal', 'Should is wrong', 'They can\'t be used the same way'], correct: 1, explanation: 'Both express advice — ought to is slightly more formal.' },
  ],

  'must-have-to': [
    { type: 'multiple-choice', sentence: 'You ___ smoke here. It\'s forbidden.', options: ['don\'t have to', 'must', 'mustn\'t', 'should'], correct: 2, explanation: 'Mustn\'t = prohibition/forbidden.' },
    { type: 'multiple-choice', sentence: 'You ___ come if you\'re busy. It\'s optional.', options: ['mustn\'t', 'must not', 'don\'t have to', 'shouldn\'t'], correct: 2, explanation: 'Don\'t have to = no obligation. Your choice.' },
    { type: 'fill-blank', sentence: 'I ___ finish this today. (self-imposed deadline)', answer: 'must', hint: 'Internal strong obligation = must', explanation: 'Self-imposed obligation = must.' },
    { type: 'rewrite', question: 'Express external obligation (law):', original: 'The law says wear a seatbelt.', answer: 'You have to wear a seatbelt.', hint: 'External rule = have to', explanation: 'Rules/laws = have to, not must.' },
    { type: 'multiple-choice', sentence: 'Which one means FORBIDDEN?', options: ['Don\'t have to', 'Must not', 'Shouldn\'t', 'Don\'t need to'], correct: 1, explanation: 'Must not = forbidden. Don\'t have to = optional.' },
  ],

  'may-might': [
    { type: 'multiple-choice', sentence: '~60% likely → use ___', options: ['might', 'may', 'must', 'could'], correct: 1, explanation: 'May = higher probability (~50-60%). Might = lower.' },
    { type: 'fill-blank', sentence: 'It ___ rain — I\'m not sure at all.', answer: 'might', hint: 'Very uncertain = might', explanation: 'Low certainty = might.' },
    { type: 'multiple-choice', sentence: 'Formal permission: "___ you leave early?"', options: ['Can', 'Could', 'May', 'Might'], correct: 2, explanation: 'May = formal permission request.' },
    { type: 'rewrite', question: 'Fix the confusion:', original: 'May be I\'ll go to the party.', answer: 'Maybe I\'ll go to the party.', hint: 'Maybe (one word) = adverb', explanation: 'Maybe (adverb) = perhaps. May be (verb phrase) = might be.' },
    { type: 'fill-blank', sentence: 'She ___ missed the bus. (past possibility)', answer: 'might have', hint: 'Past possibility = might have + pp', explanation: 'Past possibility = might have + past participle.' },
  ],

  'will-would': [
    { type: 'fill-blank', sentence: 'I ___ call you back in 5 minutes.', answer: 'will', hint: 'Promise about future = will', explanation: 'Promise = will + base verb.' },
    { type: 'multiple-choice', sentence: '___ you like some tea?', options: ['Will', 'Would', 'Should', 'Could'], correct: 1, explanation: 'Would you like = polite offer.' },
    { type: 'fill-blank', sentence: 'If I had money, I ___ travel the world.', answer: 'would', hint: 'Conditional = would', explanation: 'Hypothetical/conditional result = would.' },
    { type: 'rewrite', question: 'Fix the tense:', original: 'I would go there yesterday.', answer: 'I would have gone there.', hint: 'Past hypothetical = would have + pp', explanation: 'Unreal past = would have + past participle.' },
    { type: 'multiple-choice', sentence: 'Spontaneous decision uses:', options: ['would', 'will', 'might', 'could'], correct: 1, explanation: 'Decision made at moment of speaking = will.' },
  ],

  'modals-passive': [
    { type: 'fill-blank', sentence: 'This form ___ be completed in full.', answer: 'must', hint: 'Rule/obligation = must', explanation: 'Rule: must + be + past participle.' },
    { type: 'multiple-choice', sentence: 'Modal + passive structure:', options: ['modal + pp', 'modal + be + pp', 'modal + been + pp', 'be + modal + pp'], correct: 1, explanation: 'Modal + be + past participle for passive.' },
    { type: 'rewrite', question: 'Fix the mistake:', original: 'It must be solve.', answer: 'It must be solved.', hint: 'Always past participle after be', explanation: 'Passive: be + past participle (solved, not solve).' },
    { type: 'fill-blank', sentence: 'Mistakes ___ have been avoided.', answer: 'could', hint: 'Past possibility = could have been + pp', explanation: 'Past passive modal: could have been + pp.' },
    { type: 'multiple-choice', sentence: '"Should ___ done yesterday."', options: ['be', 'been', 'have been', 'are'], correct: 2, explanation: 'Past passive modal: should have been + pp.' },
  ],

  'modals-review': [
    { type: 'multiple-choice', sentence: 'Ability → use ___', options: ['must', 'can', 'should', 'may'], correct: 1, explanation: 'Can/could = ability.' },
    { type: 'multiple-choice', sentence: 'Prohibition → use ___', options: ['don\'t have to', 'must not', 'should', 'might'], correct: 1, explanation: 'Must not = forbidden/prohibited.' },
    { type: 'fill-blank', sentence: 'I ___ go. (obligation)', answer: 'must', hint: 'No "to" after modal', explanation: 'Must + base verb (never must to go).' },
    { type: 'rewrite', question: 'Fix the mistake:', original: 'She cans sing.', answer: 'She can sing.', hint: 'Modals never take -s', explanation: 'Modal verbs NEVER take -s (no "cans", "musts", "wills").' },
    { type: 'multiple-choice', sentence: 'Advice → use ___', options: ['must', 'can', 'should', 'will'], correct: 2, explanation: 'Should/ought to = advice and recommendation.' },
  ],

  /* ── PASSIVE VOICE ──────────────────────────────────────────────── */
  'passive-intro': [
    { type: 'multiple-choice', sentence: 'The cake ___ by my mother.', options: ['made', 'was made', 'is making', 'makes'], correct: 1, explanation: 'Past simple passive: was/were + past participle.' },
    { type: 'fill-blank', sentence: 'English ___ all over the world. (speak)', answer: 'is spoken', hint: 'General fact = is/are + past participle', explanation: 'Present simple passive for general facts: is/are + past participle.' },
    { type: 'rewrite', question: 'Make passive:', original: 'Someone broke the window.', answer: 'The window was broken.', hint: 'Object becomes subject + was/were + pp', explanation: 'The object (window) becomes the subject; agent can be omitted.' },
    { type: 'multiple-choice', sentence: 'Which sentence is passive?', options: ['She writes the report.', 'The report was written by her.', 'She is writing the report.', 'She wrote the report.'], correct: 1, explanation: 'Passive = subject receives the action (was written).' },
    { type: 'fill-blank', sentence: 'The letter ___ (send) yesterday.', answer: 'was sent', hint: 'Past simple passive = was/were + pp', explanation: 'Past simple passive: was/were + past participle.' },
  ],

  'passive-present-past': [
    { type: 'fill-blank', sentence: 'This product ___ (make) in Germany.', answer: 'is made', hint: 'General fact = is/are + pp', explanation: 'Present simple passive: is/are + past participle.' },
    { type: 'multiple-choice', sentence: 'In progress RIGHT NOW (passive):', options: ['is made', 'is being made', 'has been made', 'was made'], correct: 1, explanation: 'In progress = is/are + being + past participle.' },
    { type: 'fill-blank', sentence: 'Three people ___ (injure) in the accident.', answer: 'were injured', hint: 'Past = was/were + pp', explanation: 'Past simple passive: was/were + past participle.' },
    { type: 'rewrite', question: 'Fix the mistake:', original: 'The car is been repaired.', answer: 'The car is being repaired.', hint: 'Continuous passive = is + being + pp', explanation: 'Present continuous passive: is + BEING + past participle.' },
    { type: 'multiple-choice', sentence: '"The building ___ destroyed in 2001."', options: ['is', 'was', 'has', 'had'], correct: 1, explanation: 'Past simple passive: was/were + past participle.' },
  ],

  'passive-other-tenses': [
    { type: 'multiple-choice', sentence: 'The road ___ right now. (repair)', options: ['is repaired', 'is repairing', 'is being repaired', 'has repaired'], correct: 2, explanation: 'Present continuous passive: is/are + being + past participle.' },
    { type: 'fill-blank', sentence: 'My phone ___. (steal — present perfect)', answer: 'has been stolen', hint: 'Present perfect passive = have/has + been + pp', explanation: 'Present perfect passive: have/has + been + past participle.' },
    { type: 'rewrite', question: 'Future passive:', original: 'They will announce the results tomorrow.', answer: 'The results will be announced tomorrow.', hint: 'will + be + past participle', explanation: 'Future passive: will + be + past participle.' },
    { type: 'multiple-choice', sentence: 'The project ___ finished by next week.', options: ['will', 'will be', 'is being', 'has been'], correct: 1, explanation: 'Future passive: will + be + past participle.' },
    { type: 'fill-blank', sentence: 'By the time we arrived, the decision ___ (already/make).', answer: 'had already been made', hint: 'Past perfect passive = had been + pp', explanation: 'Past perfect passive: had been + past participle.' },
  ],

  'passive-reporting': [
    { type: 'multiple-choice', sentence: 'Reporting verb passive: "It ___ that he is innocent."', options: ['says', 'is said', 'said', 'has said'], correct: 1, explanation: 'Reporting passive: It + is/are + said/believed/thought + that...' },
    { type: 'fill-blank', sentence: 'He ___ to be the best in his field. (consider)', answer: 'is considered', hint: 'Subject + is/are + past participle + to infinitive', explanation: 'Subject-fronted reporting passive: is/are + pp + to infinitive.' },
    { type: 'rewrite', question: 'Convert to reporting passive:', original: 'People believe that she is talented.', answer: 'It is believed that she is talented.', hint: 'It + is believed + that...', explanation: 'It is believed/said/thought + that clause.' },
    { type: 'multiple-choice', sentence: '"Scientists ___ to have discovered a new planet."', options: ['say', 'are said', 'said', 'have said'], correct: 1, explanation: 'Subject-fronted: Scientists are said + to + infinitive.' },
    { type: 'fill-blank', sentence: 'It ___ (report) that the economy is improving.', answer: 'is reported', hint: 'It + is + past participle', explanation: 'Impersonal reporting passive: It + is reported/said/believed.' },
  ],

  'passive-review': [
    { type: 'multiple-choice', sentence: 'Which is correct causative?', options: ['I cut my hair.', 'I had my hair cut.', 'My hair was cutting.', 'My hair cuts.'], correct: 1, explanation: 'Causative have: have + object + past participle.' },
    { type: 'fill-blank', sentence: 'We ___ the house painted last summer. (have — causative)', answer: 'had', hint: 'Causative past = had + object + pp', explanation: 'Causative past: had + object + past participle.' },
    { type: 'rewrite', question: 'Make passive (keep the agent):', original: 'Shakespeare wrote Hamlet.', answer: 'Hamlet was written by Shakespeare.', hint: 'by + agent at the end', explanation: 'Passive with agent: was/were + pp + by + agent.' },
    { type: 'multiple-choice', sentence: 'This must ___ immediately.', options: ['fix', 'be fixed', 'be fixing', 'fixed'], correct: 1, explanation: 'Modal passive: modal + be + past participle.' },
    { type: 'fill-blank', sentence: 'The mistake ___ have been avoided. (could)', answer: 'could', hint: 'Past modal passive = could have been + pp', explanation: 'Past modal passive: could + have been + past participle.' },
  ],

  /* ── REPORTED SPEECH ─────────────────────────────────────────────── */
  'rs-intro': [
    { type: 'multiple-choice', sentence: "'I am tired.' → She said she ___ tired.", options: ['is', 'was', 'were', 'be'], correct: 1, explanation: 'Present simple → past simple in reported speech.' },
    { type: 'fill-blank', sentence: "'I will help you.' → He said he ___ help me.", answer: 'would', hint: 'will → would in reported speech', explanation: 'Will shifts to would.' },
    { type: 'rewrite', question: 'Report this statement:', original: "'I have finished my homework.' (she said)", answer: 'She said she had finished her homework.', hint: 'present perfect → past perfect', explanation: 'Have finished → had finished in reported speech.' },
    { type: 'multiple-choice', sentence: "'We are leaving tomorrow.' → They said they ___ leaving the next day.", options: ['are', 'were', 'will be', 'have been'], correct: 1, explanation: 'Present continuous → past continuous.' },
    { type: 'fill-blank', sentence: "'I can swim.' → She said she ___ swim.", answer: 'could', hint: 'can → could', explanation: 'Can shifts to could in reported speech.' },
  ],

  'rs-tense-backshift': [
    { type: 'multiple-choice', sentence: "'I work in London.' → She said she ___ in London.", options: ['work', 'worked', 'works', 'has worked'], correct: 1, explanation: 'Present simple shifts to past simple.' },
    { type: 'fill-blank', sentence: "'I have never been to Japan.' → He said he ___ never been to Japan.", answer: 'had', hint: 'have → had (past perfect)', explanation: 'Present perfect shifts to past perfect.' },
    { type: 'rewrite', question: 'Report with correct backshift:', original: "'It may rain.' (he said)", answer: 'He said it might rain.', hint: 'may → might', explanation: 'May shifts to might in reported speech.' },
    { type: 'multiple-choice', sentence: "'I can help.' → She said she ___ help.", options: ['can', 'could', 'may', 'will'], correct: 1, explanation: 'Can shifts to could.' },
    { type: 'fill-blank', sentence: "'I went to Paris last year.' → She said she ___ gone to Paris the year before.", answer: 'had', hint: 'past simple → past perfect', explanation: 'Went → had gone in reported speech.' },
  ],

  'rs-say-tell': [
    { type: 'multiple-choice', sentence: 'She ___ me that she was busy.', options: ['said', 'told', 'spoke', 'talked'], correct: 1, explanation: "Tell + person + that. Never 'said me'." },
    { type: 'multiple-choice', sentence: 'He ___ that he would be late.', options: ['told', 'said', 'spoke', 'told to'], correct: 1, explanation: 'Say + (that) — no person directly after.' },
    { type: 'rewrite', question: 'Correct the mistake:', original: 'She said me she was tired.', answer: 'She told me she was tired.', hint: 'said me → told me', explanation: 'Tell + person. Say has no person directly after.' },
    { type: 'fill-blank', sentence: 'Can you ___ me the time please?', answer: 'tell', hint: 'Fixed expression', explanation: 'Tell the time — fixed expression.' },
    { type: 'multiple-choice', sentence: 'He ___ to me that he was sorry.', options: ['told', 'said', 'spoke', 'talked'], correct: 1, explanation: "Said TO me — with 'to' we use say." },
  ],

  'rs-questions': [
    { type: 'multiple-choice', sentence: "'Are you ready?' → She asked ___ I was ready.", options: ['that', 'if', 'what', 'which'], correct: 1, explanation: 'Yes/no question → if/whether.' },
    { type: 'fill-blank', sentence: "'Where do you live?' → He asked where I ___.", answer: 'lived', hint: 'No auxiliary do, tense shifts back', explanation: 'Remove do, shift present→past.' },
    { type: 'rewrite', question: 'Report this question:', original: "'What time is it?' (she asked)", answer: 'She asked what time it was.', hint: 'No inversion, no question mark', explanation: 'Normal order: what time it was (not was it).' },
    { type: 'multiple-choice', sentence: "'Have you eaten?' → He asked if I ___.", options: ['have eaten', 'had eaten', 'ate', 'eat'], correct: 1, explanation: 'Present perfect → past perfect in reported question.' },
    { type: 'fill-blank', sentence: "'Where does she work?' → He asked where she ___.", answer: 'worked', hint: 'Remove does, shift tense', explanation: 'Does work → worked. No auxiliary in reported questions.' },
  ],

  'rs-commands': [
    { type: 'multiple-choice', sentence: "'Sit down!' → The teacher told the students ___ down.", options: ['sit', 'to sit', 'sitting', 'sat'], correct: 1, explanation: 'Commands: told + person + TO + base verb.' },
    { type: 'fill-blank', sentence: "'Please help me.' → She asked him ___ her.", answer: 'to help', hint: 'Requests: asked + person + to + verb', explanation: 'Request: asked + person + to + base verb.' },
    { type: 'rewrite', question: 'Report this command:', original: "'Don't touch that!' (he told me)", answer: 'He told me not to touch that.', hint: 'Negative: told + person + not to', explanation: 'Negative command: not to + base verb.' },
    { type: 'multiple-choice', sentence: "'You should rest.' → The doctor advised her ___ rest.", options: ['to', 'that', 'for to', 'on'], correct: 0, explanation: 'Advised + person + TO + base verb.' },
    { type: 'fill-blank', sentence: "'Clean your room!' → Mom told me ___ my room.", answer: 'to clean', hint: 'told + person + to + base verb', explanation: 'Command becomes: told + person + TO + base verb.' },
  ],

  'rs-no-backshift': [
    { type: 'multiple-choice', sentence: "The teacher said water ___ at 100°C. (scientific fact)", options: ['boiled', 'boils', 'has boiled', 'would boil'], correct: 1, explanation: 'Scientific/permanent facts — no backshift needed.' },
    { type: 'fill-blank', sentence: 'She says she ___ be here at 8. (present reporting = no shift)', answer: 'will', hint: 'Present reporting verb = no backshift', explanation: 'Present tense reporting verb means no backshift required.' },
    { type: 'multiple-choice', sentence: 'Which sentence correctly avoids unnecessary backshift?', options: ["He said the sun rose in the east.", "He said the sun rises in the east.", "He said the sun has risen in the east.", "He said the sun would rise in the east."], correct: 1, explanation: 'Permanent truth = present tense kept.' },
    { type: 'rewrite', question: 'Report WITHOUT backshift (scientific fact):', original: "'Water consists of hydrogen and oxygen.' (she said)", answer: 'She said water consists of hydrogen and oxygen.', hint: 'Scientific fact = no backshift', explanation: 'Permanent facts stay in present tense.' },
    { type: 'fill-blank', sentence: 'He said he ___ already left when it happened. (past perfect = no further shift)', answer: 'had', hint: 'Already past perfect — stays', explanation: 'Past perfect cannot shift further back.' },
  ],

  'rs-review': [
    { type: 'multiple-choice', sentence: "'I will call you tomorrow.' → She said she ___ call me the next day.", options: ['will', 'would', 'shall', 'can'], correct: 1, explanation: 'Will → would. Tomorrow → next day.' },
    { type: 'fill-blank', sentence: "'Where have you been?' → He asked where I ___ been.", answer: 'had', hint: 'Question: normal order + past perfect', explanation: 'Present perfect → past perfect. Normal word order.' },
    { type: 'rewrite', question: "Report: 'Don't open that door!' (she told us)", original: "'Don't open that door!' (she told us)", answer: 'She told us not to open that door.', hint: 'Negative command = told + not to', explanation: 'Negative command: told + person + not to + base verb.' },
    { type: 'multiple-choice', sentence: 'He ___ me where I lived. (reported question)', options: ['said', 'asked', 'told', 'spoke'], correct: 1, explanation: 'Reported questions use asked.' },
    { type: 'fill-blank', sentence: "'Can you help me?' → She asked if I ___ help her.", answer: 'could', hint: 'Can → could in reported questions', explanation: 'Can shifts to could, if for yes/no question.' },
  ],

  /* ── CONDITIONALS: WISH + ALTERNATIVES ──────────────────────────── */
  'wish-conditionals': [
    { type: 'multiple-choice', sentence: 'I wish I ___ the answer. (= I don\'t know it now)', options: ['know', 'knew', 'had known', 'will know'], correct: 1, explanation: 'Wish + past simple for present regret.' },
    { type: 'fill-blank', sentence: 'If only I ___ (study) harder! (= I didn\'t study, past regret)', answer: 'had studied', hint: 'Past regret = past perfect', explanation: 'Past regret = wish/if only + past perfect (had + pp).' },
    { type: 'multiple-choice', sentence: 'I wish you ___ stop talking! (annoying habit)', options: ['stop', 'stopped', 'would stop', 'had stopped'], correct: 2, explanation: 'Annoying habit/request = wish + would.' },
    { type: 'rewrite', question: 'Express present regret with wish:', original: "I don't speak French. (regret)", answer: 'I wish I spoke French.', hint: 'Wish + past simple for present', explanation: 'Present regret: wish + past simple.' },
    { type: 'multiple-choice', sentence: 'She wishes she ___ taller. (formal)', options: ['is', 'was', 'were', 'had been'], correct: 2, explanation: 'After wish, \'were\' is used for all persons in formal English.' },
  ],

  'unless-alternatives': [
    { type: 'multiple-choice', sentence: '___ you could be anyone for a day, who would you be?', options: ['Although', 'Supposing', 'Despite', 'However'], correct: 1, explanation: 'Supposing = imagine if, hypothetical.' },
    { type: 'fill-blank', sentence: '___ the project is approved, we can start next week.', answer: 'Assuming', hint: 'If we assume = assuming', explanation: 'Assuming (that) = if we assume this is true.' },
    { type: 'multiple-choice', sentence: "'___ we took a different route?' — informal hypothetical", options: ['Suppose', 'What if', 'Given that', 'Unless'], correct: 1, explanation: 'What if = informal way to suggest hypothetical.' },
    { type: 'rewrite', question: "Use 'given that':", original: 'She is experienced, so she will manage.', answer: 'Given that she is experienced, she will manage.', hint: 'Given that = considering/since', explanation: 'Given that introduces a known fact as a condition.' },
    { type: 'multiple-choice', sentence: '___ she has experience, she should handle it fine.', options: ['What if', 'Supposing', 'Given that', 'Unless'], correct: 2, explanation: 'Given that = considering/since — introduces a reason/condition.' },
  ],

  /* ── RELATIVE CLAUSES ────────────────────────────────────────────── */
  'rc-intro': [
    { type: 'multiple-choice', sentence: 'The man ___ called me is my uncle.', options: ['which', 'who', 'whose', 'where'], correct: 1, explanation: 'Person = who.' },
    { type: 'multiple-choice', sentence: 'The book ___ I bought was expensive.', options: ['who', 'whose', 'which', 'where'], correct: 2, explanation: 'Thing = which or that.' },
    { type: 'fill-blank', sentence: 'The girl ___ bag was stolen called the police.', answer: 'whose', hint: 'Possession', explanation: 'Possession = whose.' },
    { type: 'rewrite', question: 'Combine with relative clause:', original: 'I met a woman. She speaks 5 languages.', answer: 'I met a woman who speaks 5 languages.', hint: 'Use who for person', explanation: 'Join with who — person.' },
    { type: 'multiple-choice', sentence: "That's the city ___ I was born.", options: ['which', 'who', 'where', 'when'], correct: 2, explanation: 'Place = where.' },
  ],

  'rc-defining': [
    { type: 'multiple-choice', sentence: 'The student ___ works hardest will get an A.', options: ['which', 'who', 'where', 'whom'], correct: 1, explanation: 'Person = who in defining clause.' },
    { type: 'fill-blank', sentence: 'The film ___ we watched last night was amazing.', answer: 'that', hint: 'Defining clause, thing — that or which', explanation: 'Defining + thing = which or that.' },
    { type: 'rewrite', question: 'Make defining relative clause:', original: 'I lost the keys. You gave them to me.', answer: 'I lost the keys that you gave me.', hint: 'that/which for things', explanation: 'Keys = thing → which/that.' },
    { type: 'multiple-choice', sentence: "Can I omit 'that' in: 'The book that I read was great'?", options: ['Yes — that is the object', 'No — that is the subject', 'Never omit that', 'Only in formal English'], correct: 0, explanation: 'I = subject of read, that = object → can omit.' },
    { type: 'fill-blank', sentence: 'People ___ exercise regularly live longer.', answer: 'who', hint: 'Person = who or that', explanation: 'Defining clause about people = who or that.' },
  ],

  'rc-non-defining': [
    { type: 'multiple-choice', sentence: 'My brother, ___ lives in Paris, is a chef.', options: ['that', 'which', 'who', 'whom'], correct: 2, explanation: "Non-defining + person = who (never that)." },
    { type: 'rewrite', question: 'Add non-defining relative clause:', original: 'The Eiffel Tower attracts millions. It was built in 1889.', answer: 'The Eiffel Tower, which was built in 1889, attracts millions.', hint: 'Use which + commas for things', explanation: 'Non-defining thing = which, with commas.' },
    { type: 'multiple-choice', sentence: 'Which sentence is correct?', options: ['My mother, that is a nurse, works hard.', 'My mother who is a nurse works hard.', 'My mother, who is a nurse, works hard.', 'My mother which is a nurse works hard.'], correct: 2, explanation: 'Non-defining: who + commas. Never that.' },
    { type: 'fill-blank', sentence: 'She gave me this book, ___ I found really useful.', answer: 'which', hint: 'Non-defining, thing = which', explanation: 'Non-defining clause about a thing = which.' },
    { type: 'rewrite', question: 'Correct the mistake:', original: 'My father, that won an award, was proud.', answer: 'My father, who won an award, was proud.', hint: 'Non-defining cannot use that', explanation: 'Non-defining clauses never use that.' },
  ],

  'rc-whose-where-when': [
    { type: 'multiple-choice', sentence: 'The house ___ roof is red belongs to my uncle.', options: ['who', 'which', 'whose', 'that'], correct: 2, explanation: 'Possession (house) = whose.' },
    { type: 'fill-blank', sentence: "That's the hotel ___ we stayed last summer.", answer: 'where', hint: 'Place = where', explanation: 'Place = where (= in which).' },
    { type: 'multiple-choice', sentence: "Whose vs Who's — 'The man ___ car was stolen was upset.'", options: ["who's", 'whose', 'which', 'that'], correct: 1, explanation: "Whose = possession. Who's = who is." },
    { type: 'rewrite', question: 'Use where:', original: 'I visited the town. My grandfather was born there.', answer: 'I visited the town where my grandfather was born.', hint: 'Place = where', explanation: 'There → where in relative clause.' },
    { type: 'fill-blank', sentence: "That's the reason ___ she quit.", answer: 'why', hint: 'Reason = why', explanation: 'Reason = why (= for which).' },
  ],

  'rc-omitting': [
    { type: 'multiple-choice', sentence: "Can you omit 'which' in: 'The book which I bought is great'?", options: ['Yes — which is the object', 'No — which is the subject', 'Never omit which', 'Only in formal style'], correct: 0, explanation: 'I = subject, which = object → can omit.' },
    { type: 'rewrite', question: 'Remove the pronoun if possible:', original: 'The film that we watched was boring.', answer: 'The film we watched was boring.', hint: 'We = subject → that is object → omit', explanation: 'Object pronoun in defining clause can be omitted.' },
    { type: 'multiple-choice', sentence: "Can you omit 'who' in: 'The woman who called me was angry'?", options: ['Yes', 'No — who is the subject'], correct: 1, explanation: 'Who = subject of called → cannot omit.' },
    { type: 'fill-blank', sentence: "Is this the bag ___ you were looking for? (omit if possible)", answer: 'that', hint: 'Object pronoun — can omit or keep', explanation: 'That is the object here — can be omitted or kept.' },
    { type: 'rewrite', question: 'Correct the mistake:', original: 'The man called me was rude.', answer: 'The man who called me was rude.', hint: 'Cannot omit subject pronoun', explanation: 'Subject relative pronoun cannot be omitted.' },
  ],

  'rc-review': [
    { type: 'multiple-choice', sentence: 'The place ___ I was born is beautiful.', options: ['which', 'who', 'where', 'when'], correct: 2, explanation: 'Place = where.' },
    { type: 'fill-blank', sentence: 'My mother, ___ is a nurse, works night shifts.', answer: 'who', hint: 'Non-defining + person = who', explanation: 'Non-defining clause about a person = who (never that).' },
    { type: 'rewrite', question: 'Combine sentences (non-defining):', original: 'The Louvre is in Paris. It is the most visited museum in the world.', answer: 'The Louvre, which is the most visited museum in the world, is in Paris.', hint: 'which + commas', explanation: 'Non-defining: which with commas for things.' },
    { type: 'multiple-choice', sentence: "London, ___ I lived for 5 years, is amazing.", options: ['that', 'which', 'where', 'when'], correct: 2, explanation: 'Place (non-defining) = where.' },
    { type: 'fill-blank', sentence: 'The teacher ___ taught me English was inspiring.', answer: 'who', hint: 'Person = who or that', explanation: 'Person in defining clause = who or that.' },
  ],

  /* ── GERUNDS & INFINITIVES ───────────────────────────────────────── */
  'gi-intro': [
    { type: 'multiple-choice', sentence: 'I enjoy ___ to music.', options: ['to listen', 'listen', 'listening', 'listened'], correct: 2, explanation: 'Enjoy + gerund (-ing).' },
    { type: 'multiple-choice', sentence: 'She decided ___ a new job.', options: ['finding', 'find', 'to finding', 'to find'], correct: 3, explanation: 'Decide + infinitive (to+verb).' },
    { type: 'fill-blank', sentence: 'Would you mind ___ (close) the window?', answer: 'closing', hint: 'Mind + gerund', explanation: 'Mind always takes gerund (-ing).' },
    { type: 'rewrite', question: 'Correct the verb form:', original: 'I suggest to go to the cinema.', answer: 'I suggest going to the cinema.', hint: 'Suggest + gerund', explanation: 'Suggest always takes -ing, never infinitive.' },
    { type: 'multiple-choice', sentence: 'After prepositions, use ___.', options: ['infinitive', 'gerund', 'base verb', 'past participle'], correct: 1, explanation: 'After ANY preposition = always gerund.' },
  ],

  'gi-gerund-verbs': [
    { type: 'multiple-choice', sentence: 'She avoided ___ eye contact.', options: ['to make', 'make', 'making', 'made'], correct: 2, explanation: 'Avoid + gerund (-ing).' },
    { type: 'fill-blank', sentence: "I'm interested ___ learning more about this.", answer: 'in', hint: 'Interested in + gerund', explanation: 'Interested in = preposition in → gerund follows.' },
    { type: 'rewrite', question: 'Correct the form:', original: 'He admitted to steal the money.', answer: 'He admitted stealing the money.', hint: 'Admit + gerund', explanation: 'Admit always takes gerund (-ing).' },
    { type: 'multiple-choice', sentence: 'She is good ___ cooking Italian food.', options: ['to', 'for', 'at', 'in'], correct: 2, explanation: 'Good at — preposition at + gerund.' },
    { type: 'fill-blank', sentence: 'I finished ___ (write) the report an hour ago.', answer: 'writing', hint: 'Finish + gerund', explanation: 'Finish always takes gerund (-ing).' },
  ],

  'gi-infinitive-verbs': [
    { type: 'multiple-choice', sentence: 'She managed ___ finish on time.', options: ['finishing', 'finish', 'to finish', 'finished'], correct: 2, explanation: 'Manage + infinitive (to+verb).' },
    { type: 'fill-blank', sentence: 'He refused ___ (apologize) to her.', answer: 'to apologize', hint: 'Refuse + infinitive', explanation: 'Refuse always takes to + infinitive.' },
    { type: 'rewrite', question: 'Correct the mistake:', original: 'I want that you come with me.', answer: 'I want you to come with me.', hint: 'Want + object + to + verb', explanation: "Want + person + to + verb. Never 'that'." },
    { type: 'multiple-choice', sentence: 'They expected her ___ the race.', options: ['winning', 'win', 'to win', 'won'], correct: 2, explanation: 'Expect + object + to + infinitive.' },
    { type: 'fill-blank', sentence: 'She seems ___ (know) everyone here.', answer: 'to know', hint: 'Seem + infinitive', explanation: 'Seem always takes to + infinitive.' },
  ],

  'gi-both': [
    { type: 'multiple-choice', sentence: 'I remember ___ her at the party. (memory)', options: ['to meet', 'meet', 'meeting', 'met'], correct: 2, explanation: 'Memory of past = remember + gerund.' },
    { type: 'multiple-choice', sentence: 'Remember ___ your homework tonight! (reminder)', options: ['doing', 'do', 'to do', 'done'], correct: 2, explanation: 'Future reminder = remember + infinitive.' },
    { type: 'fill-blank', sentence: 'He stopped ___ (smoke) last year. (= quit)', answer: 'smoking', hint: 'Stop + gerund = quit the habit', explanation: 'Stop smoking = quit. Stop to smoke = pause to smoke.' },
    { type: 'multiple-choice', sentence: "'She tried calling him.' This means:", options: ['She attempted but failed', 'She experimented to see if it would help', 'She stopped to call him', 'She remembered calling him'], correct: 1, explanation: 'Try + gerund = experiment/test something.' },
    { type: 'multiple-choice', sentence: "'I tried to open the door' means:", options: ['She experimented with opening', 'She attempted but maybe failed', 'She stopped to open it', 'She remembered opening it'], correct: 1, explanation: 'Try + infinitive = attempt, possibly with difficulty or failure.' },
  ],

  'gi-gerund-subject': [
    { type: 'multiple-choice', sentence: '___ every day improves your vocabulary.', options: ['To read', 'Read', 'Reading', 'Reads'], correct: 2, explanation: 'Gerund as subject is more natural in everyday English.' },
    { type: 'fill-blank', sentence: 'Her biggest fear is ___ (speak) in public.', answer: 'speaking', hint: 'After is/be = gerund', explanation: 'Gerund as complement after the verb be.' },
    { type: 'rewrite', question: 'Use gerund as subject:', original: 'To swim every day is healthy.', answer: 'Swimming every day is healthy.', hint: 'Gerund preferred as subject', explanation: 'Gerund (not infinitive) preferred as subject in modern English.' },
    { type: 'multiple-choice', sentence: "I don't mind ___ for you.", options: ['to wait', 'wait', 'waiting', 'waited'], correct: 2, explanation: "Mind + gerund. 'I don't mind waiting' is correct." },
    { type: 'fill-blank', sentence: 'Would you like to use the ___ pool? (swim)', answer: 'swimming', hint: 'Gerund in compound noun', explanation: 'Compound noun: swimming pool — gerund + noun.' },
  ],

  'gi-infinitive-purpose': [
    { type: 'multiple-choice', sentence: 'I study every day ___ improve my English.', options: ['for', 'so', 'to', 'in order'], correct: 2, explanation: 'Purpose = to + infinitive.' },
    { type: 'fill-blank', sentence: 'She left early ___ not to miss the bus.', answer: 'in order', hint: 'Negative purpose = in order not to', explanation: 'Negative purpose: in order not to + verb.' },
    { type: 'rewrite', question: "Correct: 'I went to the shop for buy milk.'", original: 'I went to the shop for buy milk.', answer: 'I went to the shop to buy milk.', hint: 'Human purpose = to + verb', explanation: 'Human purpose uses to + infinitive, not for + verb.' },
    { type: 'multiple-choice', sentence: 'This knife is ___ cutting bread.', options: ['to', 'for', 'in order to', 'so'], correct: 1, explanation: "Purpose of a thing = for + gerund. 'For cutting' describes what the knife is used for." },
    { type: 'fill-blank', sentence: "I took notes ___ that I wouldn't forget.", answer: 'so', hint: 'So that + clause = purpose', explanation: 'So that + clause expresses purpose.' },
  ],

  'gi-review': [
    { type: 'multiple-choice', sentence: 'I finished ___ and then decided ___ it.', options: ['writing / to send', 'to write / sending', 'write / send', 'writing / sending'], correct: 0, explanation: 'Finish + gerund. Decide + infinitive.' },
    { type: 'fill-blank', sentence: 'She stopped ___ (worry) and started ___ (enjoy) her holiday.', answer: 'worrying', hint: 'Stop + gerund = quit the habit', explanation: 'Stop + gerund = stop the action.' },
    { type: 'rewrite', question: 'Fix both errors:', original: 'I suggest to go and I want going there tomorrow.', answer: 'I suggest going and I want to go there tomorrow.', hint: 'Suggest = gerund, want = infinitive', explanation: 'Suggest → going (gerund). Want → to go (infinitive).' },
    { type: 'multiple-choice', sentence: 'After any preposition, always use ___.', options: ['infinitive', 'gerund', 'base verb', 'past participle'], correct: 1, explanation: 'After prepositions (at, in, of, for, about...) = always gerund.' },
    { type: 'fill-blank', sentence: 'She managed ___ (finish) the project despite the problems.', answer: 'to finish', hint: 'Manage + infinitive', explanation: 'Manage always takes to + infinitive.' },
  ],

  /* ── CONJUNCTIONS ────────────────────────────────────────────────── */
  'conj-coordinating': [
    { type: 'multiple-choice', sentence: 'I wanted to go, ___ I was too tired.', options: ['so', 'but', 'or', 'nor'], correct: 1, explanation: 'But = contrast between two clauses.' },
    { type: 'fill-blank', sentence: 'Study hard, ___ you will fail the exam.', answer: 'or', hint: 'Alternative/warning', explanation: 'Or = alternative consequence warning.' },
    { type: 'rewrite', question: 'Join with correct FANBOYS:', original: 'It was raining. We stayed home.', answer: 'It was raining, so we stayed home.', hint: 'So = result', explanation: 'So joins cause → result.' },
    { type: 'multiple-choice', sentence: 'She is neither rich ___ famous.', options: ['or', 'and', 'nor', 'but'], correct: 2, explanation: 'Neither...nor = negative addition.' },
    { type: 'fill-blank', sentence: 'I was tired, ___ I continued working.', answer: 'yet', hint: 'Yet = contrast (= but, formal)', explanation: 'Yet = contrast, slightly more formal than but.' },
  ],

  'conj-contrast': [
    { type: 'multiple-choice', sentence: '___ it was raining, we went for a walk.', options: ['Despite', 'However', 'Although', 'Because of'], correct: 2, explanation: 'Although + clause (subject + verb).' },
    { type: 'multiple-choice', sentence: '___ the rain, we went for a walk.', options: ['Although', 'Despite', 'However', 'Even though'], correct: 1, explanation: 'Despite + noun/gerund (not clause).' },
    { type: 'fill-blank', sentence: 'She is young. ___, she is very experienced.', answer: 'However', hint: 'Contrast, starts new sentence', explanation: 'However = contrast, starts new sentence, followed by comma.' },
    { type: 'rewrite', question: 'Correct the mistake:', original: 'Although she was tired, but she kept working.', answer: 'Although she was tired, she kept working.', hint: 'Never although + but together', explanation: 'Although and but both show contrast — never use both.' },
    { type: 'multiple-choice', sentence: 'He earns a lot, ___ his sister earns very little.', options: ['despite', 'although', 'whereas', 'however'], correct: 2, explanation: 'Whereas = direct contrast between two parallel things.' },
  ],

  'conj-cause-effect': [
    { type: 'multiple-choice', sentence: 'We stayed home ___ the bad weather.', options: ['because', 'because of', 'although', 'despite'], correct: 1, explanation: 'Because of + noun. Because + clause.' },
    { type: 'fill-blank', sentence: 'She failed the exam. ___, she had to retake it.', answer: 'Consequently', hint: 'Formal result connector', explanation: 'Consequently = as a result, formal.' },
    { type: 'rewrite', question: 'Use because of:', original: 'Because the traffic was heavy, we were late.', answer: 'Because of the heavy traffic, we were late.', hint: 'Because of + noun phrase', explanation: 'Because + clause → Because of + noun phrase.' },
    { type: 'multiple-choice', sentence: "___ you're here, let's start the meeting.", options: ['Because of', 'So', 'Since', 'Therefore'], correct: 2, explanation: 'Since = because (formal), used when reason is known.' },
    { type: 'fill-blank', sentence: 'It was ___ a good film that I watched it twice.', answer: 'such', hint: 'Such...that = degree + result', explanation: 'Such + noun phrase + that = result of degree.' },
  ],

  'conj-condition': [
    { type: 'multiple-choice', sentence: "___ you apologize, I won't talk to you.", options: ['If not', 'Unless', 'Even if', 'Provided'], correct: 1, explanation: 'Unless = if not (no double negative).' },
    { type: 'fill-blank', sentence: "Take a jacket ___ it gets cold later.", answer: 'in case', hint: 'Precaution, not condition', explanation: 'In case = precaution. Not the same as if.' },
    { type: 'rewrite', question: "Replace 'if not' with unless:", original: "If you don't hurry, we'll miss the train.", answer: "Unless you hurry, we'll miss the train.", hint: 'Unless = if not', explanation: "Unless replaces if...not. Don't add another negative!" },
    { type: 'multiple-choice', sentence: 'You can borrow my car ___ you drive carefully.', options: ['unless', 'in case', 'provided that', 'even if'], correct: 2, explanation: 'Provided that = on condition that.' },
    { type: 'fill-blank', sentence: "___ if it rains, I'll go to the concert.", answer: 'Even', hint: 'Even if = regardless of outcome', explanation: 'Even if = condition regardless of result.' },
  ],

  'conj-addition': [
    { type: 'multiple-choice', sentence: 'The hotel was expensive. ___, the service was terrible.', options: ['However', 'Furthermore', 'Despite', 'Although'], correct: 1, explanation: 'Furthermore = adds a stronger/new point.' },
    { type: 'rewrite', question: 'Use not only...but also:', original: 'She won. She also broke the record.', answer: 'Not only did she win, but she also broke the record.', hint: 'Inversion after not only', explanation: "Not only at start requires inversion: Not only DID she..." },
    { type: 'fill-blank', sentence: 'He speaks English ___ French and German.', answer: 'as well as', hint: 'In addition to', explanation: 'As well as = in addition to (connects nouns).' },
    { type: 'multiple-choice', sentence: "Not only ___ she win, but she also broke the record.", options: ['did', 'does', 'has', 'was'], correct: 0, explanation: 'Not only at start = subject-auxiliary inversion.' },
    { type: 'fill-blank', sentence: '___, wash the vegetables. ___, chop them. ___, cook.', answer: 'Firstly', hint: 'Sequence listing', explanation: 'Firstly, Secondly, Finally — sequence listing connectors.' },
  ],

  'conj-review': [
    { type: 'multiple-choice', sentence: '___ she studied hard, she failed. (contrast)', options: ['Because', 'Despite', 'Although', 'Therefore'], correct: 2, explanation: 'Although + clause = contrast.' },
    { type: 'fill-blank', sentence: '___ the rain, we continued. (despite + noun)', answer: 'Despite', hint: 'Despite + noun, not clause', explanation: 'Despite + noun/gerund for contrast.' },
    { type: 'rewrite', question: 'Connect formally:', original: 'She worked hard. She succeeded.', answer: 'She worked hard. Consequently, she succeeded.', hint: 'Formal result connector', explanation: 'Consequently = as a result — formal connector.' },
    { type: 'multiple-choice', sentence: "___ we act now, the problem will worsen.", options: ['If', 'Unless', 'Although', 'Because'], correct: 1, explanation: 'Unless = if not — condition.' },
    { type: 'multiple-choice', sentence: 'BECAUSE OF always requires ___.', options: ['a clause (subject + verb)', 'a noun or gerund', 'an infinitive', 'an adjective'], correct: 1, explanation: 'Because of + noun/gerund. Because + clause. Never mix them.' },
  ],

  /* ── WORD FORMATION ──────────────────────────────────────────────── */
  'wf-intro': [
    { type: 'multiple-choice', sentence: "'Un-' in 'unhappy' is a ___.", options: ['suffix', 'root word', 'prefix', 'compound'], correct: 2, explanation: 'Prefix = added BEFORE the root word.' },
    { type: 'fill-blank', sentence: "happy → ___ (add -ness to make a noun)", answer: 'happiness', hint: '-ness = noun suffix', explanation: 'Happy + ness = happiness (noun).' },
    { type: 'multiple-choice', sentence: "'Employment' contains which suffix?", options: ['-tion', '-ment', '-ness', '-ity'], correct: 1, explanation: 'Employ + ment = employment. -ment creates nouns.' },
    { type: 'rewrite', question: 'Give 4 forms of the word CARE:', original: 'care (verb)', answer: 'care (v), careful (adj), carefully (adv), carelessness (n)', hint: 'Noun, verb, adjective, adverb', explanation: 'Word family: all 4 forms.' },
    { type: 'fill-blank', sentence: "employ → employer → employee → ___ (noun of process)", answer: 'employment', hint: '-ment suffix', explanation: 'Employment = noun form with -ment suffix.' },
  ],

  'wf-prefixes-negative': [
    { type: 'fill-blank', sentence: 'The instructions were ___ (not clear).', answer: 'unclear', hint: 'UN- prefix', explanation: 'UN- + clear = unclear.' },
    { type: 'multiple-choice', sentence: "It's ___ to drive without a seatbelt.", options: ['unlegal', 'illegal', 'inlegal', 'nolegal'], correct: 1, explanation: 'IL- before L: illegal.' },
    { type: 'fill-blank', sentence: 'He ___ (understood wrongly) what she said.', answer: 'misunderstood', hint: 'MIS- prefix = wrongly', explanation: 'MIS- + understood = misunderstood.' },
    { type: 'multiple-choice', sentence: 'Choose the correct negative form of \'possible\':', options: ['unpossible', 'impractical', 'unavailable', 'impossible'], correct: 3, explanation: 'IM- before P: impossible.' },
    { type: 'rewrite', question: 'Add correct negative prefix to each:', original: 'He was honest about his regular, responsible behaviour.', answer: 'He was dishonest about his irregular, irresponsible behaviour.', hint: 'dis- / ir- / ir-', explanation: 'Dishonest (dis-), irregular (ir-), irresponsible (ir-).' },
  ],

  'wf-noun-suffixes': [
    { type: 'fill-blank', sentence: 'She showed great kind___ to everyone.', answer: 'kindness', hint: '-ness suffix for adjectives', explanation: 'Kind (adj) + ness = kindness (noun).' },
    { type: 'multiple-choice', sentence: 'The ___ of the project took three years. (develop)', options: ['developer', 'developing', 'development', 'developed'], correct: 2, explanation: 'Develop + ment = development (noun).' },
    { type: 'fill-blank', sentence: 'We need better communica___ between teams.', answer: 'communication', hint: '-tion suffix', explanation: 'Communicate → communication (-tion).' },
    { type: 'rewrite', question: 'Use correct noun form:', original: 'She is very creative and has a lot of creative.', answer: 'She is very creative and has a lot of creativity.', hint: '-ity suffix', explanation: 'Creative (adj) → creativity (noun, -ity).' },
    { type: 'fill-blank', sentence: 'His ___ (achieve) was recognised with an award.', answer: 'achievement', hint: 'Achieve + ment', explanation: 'Achieve → achievement (-ment noun).' },
  ],

  'wf-adjective-suffixes': [
    { type: 'multiple-choice', sentence: 'The situation is very danger___.', options: ['-ful', '-ous', '-less', '-al'], correct: 1, explanation: 'Danger + ous = dangerous.' },
    { type: 'fill-blank', sentence: 'His help was very use___.', answer: 'useful', hint: '-ful = with/having', explanation: 'Use + ful = useful.' },
    { type: 'multiple-choice', sentence: 'She is care___ — she always makes mistakes.', options: ['careful', 'careless', 'caring', 'cared'], correct: 1, explanation: 'Care + less = careless (without care).' },
    { type: 'rewrite', question: 'Add correct suffix:', original: 'The task is manage (can be done).', answer: 'The task is manageable.', hint: '-able = can be done', explanation: 'Manage + able = manageable.' },
    { type: 'fill-blank', sentence: 'The performance was power___ and emotion___.', answer: 'powerful', hint: 'Power + ful', explanation: 'Powerful (-ful) and emotional (-al) — adjective suffixes.' },
  ],

  'wf-verb-suffixes': [
    { type: 'multiple-choice', sentence: 'We need to ___ the system. (= make it modern)', options: ['modern', 'modernity', 'modernize', 'modernly'], correct: 2, explanation: 'Modern + ize = modernize (verb).' },
    { type: 'fill-blank', sentence: 'We need to ___ (short) the text.', answer: 'shorten', hint: '-en suffix makes verbs from adjectives', explanation: 'Short (adj) + en = shorten (verb).' },
    { type: 'rewrite', question: 'Correct the error:', original: 'She apologized for misunderstand him.', answer: 'She apologized for misunderstanding him.', hint: "After 'for' = gerund", explanation: "After preposition 'for' = gerund (-ing)." },
    { type: 'multiple-choice', sentence: "Don't ___ your abilities — you're better than you think.", options: ['overestimate', 'underestimate', 'misestimate', 'reestimate'], correct: 1, explanation: 'Under- = too little: underestimate your abilities.' },
    { type: 'fill-blank', sentence: 'He ___ (re + write) the report from scratch.', answer: 'rewrote', hint: 'Re- = again, past tense', explanation: 'Re- (again) + wrote = rewrote.' },
  ],

  'wf-word-families': [
    { type: 'multiple-choice', sentence: 'She is a ___ person. (= she has success)', options: ['success', 'succeed', 'successfully', 'successful'], correct: 3, explanation: 'Adjective before noun = successful.' },
    { type: 'fill-blank', sentence: 'The scientist made an important ___. (discover)', answer: 'discovery', hint: 'Noun form of discover', explanation: 'Discover → discovery (noun, -ery).' },
    { type: 'multiple-choice', sentence: 'He spoke very ___ about the issue. (= with emotion)', options: ['emotion', 'emotional', 'emotionally', 'emotive'], correct: 2, explanation: "Adverb modifying verb 'spoke' = emotionally." },
    { type: 'rewrite', question: 'Use correct word family member:', original: 'She is a very success businesswoman.', answer: 'She is a very successful businesswoman.', hint: 'Adjective before noun', explanation: 'Success = noun. Successful = adjective needed here.' },
    { type: 'fill-blank', sentence: "His ___ (creative) led to an important ___ (invent).", answer: 'creativity', hint: 'Noun form of creative', explanation: 'Creativity (-ity) and invention (-tion) — noun forms.' },
  ],

  'wf-review': [
    { type: 'multiple-choice', sentence: 'His ___ attempt to reorganize failed. (= not successful)', options: ['unsuccess', 'unsuccessfully', 'unsuccessful', 'unsuccessed'], correct: 2, explanation: 'Un- + success + ful = unsuccessful (adjective).' },
    { type: 'fill-blank', sentence: 'The ___ (develop) of renewable energy is important.', answer: 'development', hint: 'Develop + ment', explanation: 'Development = noun form (-ment).' },
    { type: 'multiple-choice', sentence: "The employees showed great ___ with management. (= not satisfied)", options: ['unsatisfied', 'dissatisfaction', 'missatisfaction', 'nonsatisfaction'], correct: 1, explanation: 'Dis- + satisfaction = dissatisfaction (noun).' },
    { type: 'rewrite', question: 'Fix the word form errors:', original: 'She is a success person who acts very success.', answer: 'She is a successful person who acts very successfully.', hint: 'Adjective + adverb', explanation: 'Successful (adjective before noun). Successfully (adverb modifying verb).' },
    { type: 'fill-blank', sentence: 'Scientists work ___ (= in a scientific way) to make new ___. (discover)', answer: 'scientifically', hint: 'Science → scientific → scientifically', explanation: 'Adverb form: scientifically. Noun: discoveries.' },
  ],
}
