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
}
