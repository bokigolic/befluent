export const SCENARIOS = [
  {
    id: 'cafe', emoji: '☕', title: 'At a Café', subtitle: 'Order drinks and food',
    level: 'A2', color: '#f59e0b',
    setting: 'You are a customer at a busy London café.',
    aiRole: 'friendly barista named Sam',
    phrases: [
      "I'd like a... please", "Could I have...", "What do you recommend?",
      "How much is that?", "Can I pay by card?", "For here or to go?",
      "Could I get the WiFi password?", "Keep the change",
    ],
  },
  {
    id: 'airport', emoji: '✈️', title: 'At the Airport', subtitle: 'Check-in, security, boarding',
    level: 'B1', color: '#3b82f6',
    setting: 'You are checking in for a flight at Heathrow Airport.',
    aiRole: 'airline check-in agent',
    phrases: [
      "I'd like to check in for flight...", "I have one bag to check",
      "Is my flight on time?", "Which gate is it?", "I'd like a window seat please",
      "Can I upgrade?", "My baggage is lost", "Where is the departure lounge?",
    ],
  },
  {
    id: 'job-interview', emoji: '💼', title: 'Job Interview', subtitle: 'Professional English practice',
    level: 'B2', color: '#8b5cf6',
    setting: 'You are being interviewed for a marketing position.',
    aiRole: 'professional HR manager named Emma',
    phrases: [
      "I have X years of experience in...", "My greatest strength is...",
      "I'm particularly interested in...", "Could you tell me more about...",
      "I work well under pressure", "I'm a fast learner",
      "What are the next steps?", "When can I expect to hear back?",
    ],
  },
  {
    id: 'doctor', emoji: '🏥', title: 'At the Doctor', subtitle: 'Describe symptoms, understand advice',
    level: 'B1', color: '#ef4444',
    setting: 'You have a cold and are visiting a GP clinic.',
    aiRole: 'friendly doctor named Dr. Johnson',
    phrases: [
      "I've been feeling...", "It started about X days ago",
      "I have a pain in my...", "I'm allergic to...",
      "Do I need a prescription?", "How often should I take it?",
      "Should I come back for a follow-up?", "Is it serious?",
    ],
  },
  {
    id: 'shopping', emoji: '🛍️', title: 'Shopping', subtitle: 'Ask for help, sizes, returns',
    level: 'A2', color: '#10b981',
    setting: 'You are shopping for clothes in a department store.',
    aiRole: 'helpful shop assistant',
    phrases: [
      "Do you have this in a size...?", "Can I try this on?",
      "Where are the changing rooms?", "Do you have this in another colour?",
      "Is this on sale?", "Can I return this?",
      "I'll take it", "Do you accept card payments?",
    ],
  },
  {
    id: 'hotel', emoji: '🏨', title: 'Hotel Check-in', subtitle: 'Reservations, requests, problems',
    level: 'B1', color: '#06b6d4',
    setting: 'You are checking into a 4-star hotel in New York.',
    aiRole: 'professional hotel receptionist',
    phrases: [
      "I have a reservation under...", "Could I have a room with a view?",
      "Is breakfast included?", "What time is check-out?",
      "Could I have an extra pillow?", "The wifi isn't working",
      "Could you call me a taxi?", "I'd like to extend my stay",
    ],
  },
  {
    id: 'restaurant', emoji: '🍽️', title: 'At a Restaurant', subtitle: 'Order food, make requests',
    level: 'A2', color: '#f97316',
    setting: 'You are dining at an upscale restaurant in the city.',
    aiRole: 'attentive waiter named Marco',
    phrases: [
      "I'd like to reserve a table for...", "Could we see the menu?",
      "What do you recommend?", "I'm allergic to...",
      "Could I have it without...?", "How would you like it cooked?",
      "Could we have the bill please?", "Everything was delicious",
    ],
  },
  {
    id: 'directions', emoji: '🗺️', title: 'Asking Directions', subtitle: 'Navigate an unfamiliar city',
    level: 'A2', color: '#84cc16',
    setting: 'You are lost in central London and need to find the train station.',
    aiRole: 'helpful local resident',
    phrases: [
      "Excuse me, could you help me?", "I'm looking for...",
      "How far is it?", "Is it within walking distance?",
      "Which direction is...?", "Should I take the tube?",
      "How long will it take?", "Thank you so much",
    ],
  },
  {
    id: 'phone-call', emoji: '📞', title: 'Phone Call', subtitle: 'Make appointments, handle calls',
    level: 'B1', color: '#ec4899',
    setting: 'You need to call a dentist to book an appointment.',
    aiRole: 'dental receptionist',
    phrases: [
      "Hello, I'd like to make an appointment", "My name is...",
      "I'm a patient of Dr...", "It's quite urgent",
      "What times are available?", "Could I have a morning appointment?",
      "Could you repeat that please?", "Could you spell that for me?",
    ],
  },
  {
    id: 'flatmate', emoji: '🏠', title: 'Flatmate Discussion', subtitle: 'Everyday conversation, problems',
    level: 'B1', color: '#a78bfa',
    setting: 'You are discussing household rules with your new flatmate.',
    aiRole: 'friendly flatmate named Alex',
    phrases: [
      "We need to talk about...", "Would you mind...?",
      "I'd prefer if we could...", "That works for me",
      "I'm not comfortable with...", "Can we split the cost of...?",
      "I'll be home late tonight", "Could you keep the noise down?",
    ],
  },
  {
    id: 'bank', emoji: '🏦', title: 'At the Bank', subtitle: 'Financial English, formal requests',
    level: 'B2', color: '#64748b',
    setting: 'You need to open a bank account and ask about services.',
    aiRole: 'bank advisor named Sarah',
    phrases: [
      "I'd like to open an account", "What documents do I need?",
      "What are the fees?", "I'd like to transfer money to...",
      "My card has been blocked", "What's the interest rate?",
      "I need to report a lost card", "What are your opening hours?",
    ],
  },
  {
    id: 'debate', emoji: '🎤', title: 'Casual Debate', subtitle: 'Express opinions, argue politely',
    level: 'C1', color: '#dc2626',
    setting: 'You are having a friendly debate about whether social media is good for society.',
    aiRole: 'debate partner who disagrees with your views',
    phrases: [
      "I believe that...", "In my opinion...",
      "That's an interesting point, however...", "I see your point but...",
      "The evidence suggests...", "I strongly disagree because...",
      "To be fair...", "Let me give you an example",
    ],
  },
]

export const SCENARIO_MAP = Object.fromEntries(SCENARIOS.map(s => [s.id, s]))

export const LEVEL_ORDER = { A2: 0, B1: 1, B2: 2, C1: 3 }
