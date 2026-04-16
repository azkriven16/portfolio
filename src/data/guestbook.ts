export interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  date: string;
}

export const guestbookEntries: GuestbookEntry[] = [
  { id: 1,  name: "Grace Kim",    message: "You've done a fantastic job, keep pushing forward!",         date: "2025-03-15" },
  { id: 2,  name: "Frank Wright", message: "Amazing work! Learned a lot just by browsing around.",       date: "2025-03-12" },
  { id: 3,  name: "Ella Brown",   message: "Love the vibe here. Simple, clean, and fun!",               date: "2025-02-28" },
  { id: 4,  name: "David Lee",    message: "Super cool project 🚀 Excited to see where this goes!",     date: "2025-02-20" },
  { id: 5,  name: "Alice Johnson",message: "Great website! Really enjoying the clean design and UX.",   date: "2025-02-14" },
  { id: 6,  name: "Bob Smith",    message: "Thanks for creating this. Looking forward to more updates!", date: "2025-01-30" },
  { id: 7,  name: "Jack Wilson",  message: "Signed the guestbook 😎 Love what you're doing!",          date: "2025-01-22" },
  { id: 8,  name: "Ivy Martinez", message: "I'll definitely be recommending this to friends.",           date: "2025-01-10" },
  { id: 9,  name: "NPC",          message: "I love the resume hahahaha such a cutieeee <3 Inspired!",   date: "2025-01-20" },
  { id: 10, name: "danskyvich",   message: "mas na inspire ako haha",                                   date: "2025-01-14" },
  { id: 11, name: "samwan",       message: "niceeee 👌👌",                                              date: "2024-12-29" },
  { id: 12, name: "Kuz",          message: "Nice one!",                                                 date: "2024-12-25" },
];
