// Wedding content — shared by every design variation.
export const couple = {
  bride: "Alexandra",
  groom: "Carlo",
  initials: "A & C",
  date: "January 9, 2027",
  day: "Saturday",
  iso: "2027-01-09T14:30:00+08:00",
  city: "Malolos, Bulacan",
};

export const story = [
  {
    year: "2012",
    title: "How we met",
    body: "We met in college at FEU East Asia. We started talking because our peers kept teasing the two of us — ironically, that is exactly how it began.",
  },
  {
    year: "2022",
    title: "Talking again",
    body: "Ten years later a friend forced the connection back into place. We started talking again, and the rest is history.",
  },
  {
    year: "2025",
    title: "The proposal",
    body: "On the twentieth of December, Carlo asked. Thirteen years after a joke at our expense, we are making it permanent.",
  },
];

export const dress = {
  code: "Semi-formal · Strictly black",
  ladies: [
    "Long dress, midi dress or elegant separates in solid black",
    "Nude, gold or silver accessories only",
    "Heels or dressy flats — there is lawn and cobblestone",
  ],
  gentlemen: [
    "Black suit, or black barong with black slacks",
    "Black tie optional; no patterns or bold colours",
    "Black leather shoes",
  ],
  avoid: ["White, ivory or cream", "Burgundy, mauve or gray — reserved for the party", "Denim, shorts, rubber shoes"],
};

// Per-role attire, straight from the couple's moodboard.
export const attire = [
  { role: "Guests", ladies: "Semi-formal black attire", gents: "Semi-formal black attire" },
  { role: "Parents of the couple", ladies: "Mauve Rose", gents: "Gray suit" },
  { role: "Principal Sponsors", ladies: "Deep Burgundy", gents: "Black suit" },
  { role: "Secondary Sponsors", ladies: "Old Mauve", gents: "Black suit" },
  { role: "Bridesmaids & Groomsmen", ladies: "Burgundy", gents: "Burgundy suit" },
];

export const palette = [
  { name: "Mauve Rose", hex: "#C08290" },
  { name: "Old Mauve", hex: "#6E3B4E" },
  { name: "Burgundy", hex: "#7A0C1E" },
  { name: "Deep Burgundy", hex: "#4A0D18" },
  { name: "IronClad Gray", hex: "#4B5257" },
  { name: "Black", hex: "#0A0A0A" },
];

export const principal = [
  ["Orlando Dela Paz", "Elizabeth Dela Paz"],
  ["Jessie Concepcion", "Aida Concepcion"],
  ["Zenaida Lucena", "Ruben Lucena"],
  ["Jap Concepcion", "Adele Concepcion"],
  ["Jhun Santos", "Mhac Santos"],
  ["Ate Cristy", "Kuya Art"],
  ["Alice Guererro", "Joey Guerrero"],
  ["Ariel Dones", "Liezel Dones"],
  ["Elizabeth Balano", "Eric Balano"],
  ["Buboy Medina", "Beng Medina"],
  ["Boyboy Arillo", "Edwina Nolasco"],
  ["John Doe *", "Lina Cabrera"],
];

export const groups = [
  { role: "Best Man", names: ["Benedick Bautista", "Sean Ashley Ortega"] },
  { role: "Maid of Honour", names: ["Claudine Villa", "Sheen Malaran"] },
  {
    role: "Groomsmen",
    names: ["Karl Sulit", "Justin Evangelista", "Paulo Concepcion", "Richard Santos", "Bobby Jallores", "Francis Decano", "John Paul Favoreal"],
  },
  {
    role: "Bridesmaids",
    names: ["April Hernandez", "Jhazel Estrella", "Mika Hara", "Aira Candoleta", "Micah Morta", "Christine Buenaventura", "Orveen Calderon", "Joan Estrella"],
  },
  { role: "Walang Papel", names: ["John Doe *", "Jane Doe *"] },
];

export const secondary = [
  { role: "Flower Girls", names: "Ryelin Gonzales · Caira Gonzales · Aryanna Gonzales · Freya Dones" },
  { role: "Ring Bearer", names: "Cailee Gonzales" },
  { role: "Cord Sponsors", names: "Alanah Guerrero & Ernest Balano" },
  { role: "Candle Sponsor", names: "Alyssa Guerrero" },
  { role: "Veil Sponsors", names: "DJ Cristino & Lianne Cristino" },
  { role: "Bible Bearer", names: "Maximus Lucena" },
  { role: "Coin Bearer", names: "John Doe *" },
];

export const entourageNote = "* Names marked with an asterisk are still to be confirmed.";

export const places = [
  {
    time: "2:30 PM",
    kicker: "The Ceremony",
    name: "Barasoain Church",
    sub: "Our Lady of Mount Carmel Parish",
    address: "Paseo del Congreso, Malolos, Bulacan",
    note: "Please be seated by 2:00 PM. The processional begins promptly at half past two.",
    link: "https://maps.app.goo.gl/sjGYeUagkC9sWRh8A",
    embed: "https://www.google.com/maps?q=Barasoain+Church+Malolos+Bulacan&output=embed",
    photo: "assets/barasoain-church.jpg",
  },
  {
    time: "5:30 PM",
    kicker: "The Reception",
    name: "Placida Pavillion",
    sub: "Events Place",
    address: "Malolos, Bulacan",
    note: "Doors open at half past five, dinner and programme to follow. Parking is available on site.",
    link: "https://maps.app.goo.gl/JYPcoUsfDagVbKRMA",
    embed: "https://www.google.com/maps?q=Placida+Pavillion+Events+Place+Bulacan&output=embed",
    photo: "assets/placida-pavillion.jpg",
  },
];

export const timeline = [
  { time: "1:45 PM", label: "Guests arrive", note: "Barasoain Church — ushers will seat you" },
  { time: "2:30 PM", label: "The ceremony", note: "Processional, rites and vows" },
  { time: "3:45 PM", label: "Photographs", note: "Family and entourage at the church" },
  { time: "5:30 PM", label: "Reception opens", note: "Placida Pavillion — cocktails" },
  { time: "6:15 PM", label: "Dinner & programme", note: "Toasts from the principal sponsors" },
  { time: "8:30 PM", label: "First dance", note: "Then the floor is yours" },
  { time: "10:00 PM", label: "Last song", note: "Safe drive home" },
];

export const travel = [
  {
    title: "Lawiswis Kawayan Resort",
    kicker: "Recommended stay",
    body: "Our preparation venue and the easiest place to stay the night. Rooms are limited — book early and mention the wedding.",
  },
  {
    title: "Driving from Metro Manila",
    kicker: "Getting there",
    body: "About an hour and a half via NLEX to the Tabang or Balagtas exit, then on to Malolos. Leave earlier on a Saturday afternoon.",
  },
  {
    title: "Parking",
    kicker: "On the day",
    body: "Street and lot parking near Barasoain Church, and on-site parking at Placida Pavillion.",
  },
];

export const gift = {
  title: "On gifts",
  body: "Your presence on the day is what we are really asking for — you travelling to Malolos to stand with us is the gift.",
  emphasis: "If you would like to give something, we would genuinely prefer a cash gift over a physical one.",
  note: "We are building our first home together, and a contribution towards it goes further than anything we could unwrap. A card box will be waiting near the entrance at Placida Pavilion — no envelope is ever expected, and none will be counted.",
};

export const faqs = [
  {
    q: "What does strictly black mean?",
    a: "Solid black, semi-formal attire for all guests — a black dress, or a black suit or barong. Burgundy, mauve and gray are reserved for the wedding party, and please leave white and ivory to the bride.",
  },
  {
    q: "Can I bring my children?",
    a: "We adore your little ones, but this is an adults-only celebration, with the exception of the children in our entourage. Please arrange care for the evening so you can enjoy it fully.",
  },
  {
    q: "Can I bring a plus one?",
    a: "Only if your invitation and your RSVP entry say so. Our guest list is at capacity, so a plus one can only be confirmed through the name on your invitation.",
  },
  {
    q: "Can I bring someone who wasn't invited?",
    a: "Respectfully, no. Every seat is assigned by name, and guests who are not on the list cannot be accommodated at the church or the reception.",
  },
  {
    q: "When should I arrive?",
    a: "Please be at Barasoain Church by 2:00 PM. The reception at Placida Pavillion opens at 5:30 PM.",
  },
  {
    q: "Is there a gift registry?",
    a: "No registry. If you would like to give something, we would honestly prefer a cash gift over a physical one — it goes towards our first home. A card box will be waiting near the entrance at the reception.",
  },
  {
    q: "Can I take photos?",
    a: "Yes, after the ceremony. We are keeping the processional and the vows unplugged so everyone sees it with their own eyes. Please share anything you take with us afterwards.",
  },
  {
    q: "What if my plans change?",
    a: "Let us know by November 30, 2026 so we can adjust the seating. After that date we can no longer make changes with the venue.",
  },
];

export const rsvp = {
  deadline: "November 30, 2026",
  steps: [
    "Type your full name as printed on the invitation",
    "Confirm attendance for the church, the reception, or both",
    "Add your plus one only if your entry allows it",
    "Tell us about any dietary requirements",
  ],
};
