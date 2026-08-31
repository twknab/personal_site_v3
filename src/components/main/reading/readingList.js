// The reading list. Cover art is resolved by slug through localCovers.js —
// every cover the site shows is a file committed under
// src/assets/images/book-covers/, and the client never hotlinks a remote
// image host. A book whose cover file is missing renders the placeholder.
//
// To add a book: give it a unique `slug`, add its remote source to
// scripts/fetch-covers.mjs, and run `npm run covers:fetch` (or trigger the
// "Fetch book covers" workflow from the Actions tab), then commit the image
// and the regenerated localCovers.js together.

// Books currently in progress (shown pinned at the top of the Reading section).
// An empty array is fine: the group hides itself when nothing is in progress
// (see Reading.js).
export const currentlyReading = [
  {
    slug: "navigation-sea-state-weather",
    author: "Pardy, Michael, JF Marleau, Andrew Woodford and Piper Harris",
    title:
      "Navigation, Sea State and Weather: A Paddler's Manual (Freedom of the Seas, Volume 1)",
    publisher: "SKILS",
    year: "2020 (2nd ed.)",
  },
];

// Completed reading grouped by year, newest first. Each year renders as a
// collapsible accordion that is expanded by default.
// To add a new year, drop a new object at the top of this array.
export const readingByYear = [
  {
    year: 2026,
    books: [
      {
        slug: "clean-craftsmanship",
        author: "Martin, Robert C.",
        title: "Clean Craftsmanship: Disciplines, Standards, and Ethics",
        publisher: "Addison-Wesley Professional",
        year: 2021,
      },
      {
        slug: "maxalding",
        author: "Saldo, Monte",
        title: "Maxalding",
        publisher: "CreateSpace Independent Publishing Platform",
        year: "2011 (orig. 1909)",
      },
      {
        slug: "beachcombers-guide",
        author: "Sept, J. Duane",
        title:
          "The Beachcomber's Guide to Seashore Life in the Pacific Northwest",
        publisher: "Harbour Publishing",
        year: "2019 (rev. ed.)",
      },
      {
        slug: "careless-people",
        author: "Wynn-Williams, Sarah",
        title:
          "Careless People: A Cautionary Tale of Power, Greed, and Lost Idealism",
        publisher: "Flatiron Books",
        year: 2025,
      },
    ],
  },
  {
    year: 2025,
    books: [
      {
        slug: "vibe-coding",
        author: "Kim, Gene and Steve Yegge",
        title: "Vibe Coding",
        publisher: "IT Revolution",
        year: 2025,
      },
      {
        slug: "starting-a-startup",
        author: "Sinclair, James",
        title: "Starting A Startup",
        publisher: "Page Two",
        year: 2025,
      },
      {
        slug: "clean-coder",
        author: "Martin, Robert",
        title:
          "The Clean Coder: A Code of Conduct for Professional Programmers",
        publisher: "Pearson",
        year: 2011,
      },
      {
        slug: "chakras-beyond-beginners",
        author: "Pond, David",
        title: "Chakras Beyond Beginners: Awakening to the Divine Within",
        publisher: "Llewellyn Publishing",
        year: 2021,
      },
      {
        slug: "google-adk",
        author: "Chandler, Todd",
        title: "Hands-On Guide to Google ADK",
        publisher: "Self-published",
        year: 2025,
      },
      {
        slug: "soul-dna",
        author: "O'Neil, Jennifer",
        title: "Soul DNA",
        publisher: "Self Published",
        year: 2012,
      },
      {
        slug: "qigong-for-beginners",
        author: "Song, Chen",
        title: "Qigong for Beginners: Chinese Healing Energy from Within",
        publisher: "Self-published",
        year: 2022,
      },
      {
        slug: "taoism",
        author: "Cohen, Ken",
        title: "Taoism: Essential Teaching of The Way and Its Power",
        publisher: "Sounds True",
        year: 2015,
      },
      {
        slug: "native-wisdom",
        author: "Cohen, Ken",
        title: "Native Wisdom: Seven Keys to Health & Happiness",
        publisher: "Sounds True",
        year: 1999,
      },
      {
        slug: "mountain-is-you",
        author: "Weist, Brianna",
        title: "The Mountain Is You",
        publisher: "Thought Catalog Books",
        year: 2022,
      },
      {
        slug: "qigong-healing-meditations",
        author: "Cohen, Ken",
        title:
          "Qigong Healing Meditations: Taoist Healing Exercises with Ken Cohen",
        publisher: "Sounds True",
        year: 2014,
      },
      {
        slug: "wisdom-of-mike-mentzer",
        author: "Little, John and Joanne Sharkey",
        title:
          "The Wisdom of Mike Mentzer: The Art, Science and Philosophy of a Bodybuilding Legend",
        publisher: "McGraw Hill",
        year: 2005,
      },
      {
        slug: "emotional-intelligence-habits",
        author: "Bradberry, Dr. Travis",
        title: "Emotional Intelligence Habits",
        publisher: "TalentSmart",
        year: 2023,
      },
    ],
  },
  {
    year: 2024,
    books: [
      {
        slug: "art-of-thinking",
        author: "Dimnet, Ernest",
        title: "The Art of Thinking",
        publisher: "Dead Authors Society",
        year: 2023,
      },
      {
        slug: "simple-sql",
        author: "Wade, Dane",
        title: "Simple SQL",
        publisher: "Self-published",
        year: 2022,
      },
      {
        slug: "courage-to-be-disliked",
        author: "Kishimi, Ichiro and Fumitake Koga",
        title:
          "The Courage to Be Disliked: How to Free Yourself, Change Your Life, and Achieve Real Happiness",
        publisher: "Simon & Schuster Audio",
        year: 2018,
      },
      {
        slug: "extreme-ownership",
        author: "Willink, Jocko, and Leif Babin",
        title: "Extreme Ownership: How US Navy Seals Lead and Win",
        publisher: "Macmillan Audio",
        year: 2015,
      },
      {
        slug: "speed-reading",
        author: "Knight, Kam",
        title: "Speed Reading: Learn to Read a 200+ Page Book in 1 Hour",
        publisher: "MindLily",
        year: 2018,
      },
      {
        slug: "designing-data-intensive-applications",
        author: "Kleppmann, Martin",
        title: "Designing Data-Intensive Applications",
        publisher: "O'Reilly Media",
        year: 2017,
      },
      {
        slug: "understanding-distributed-systems",
        author: "Vitillo, Roberto",
        title:
          "Understanding Distributed Systems: What every developer should know about large distributed applications",
        publisher: "Self-published",
        year: 2021,
      },
      {
        slug: "high-intensity-training",
        author: "Mentzer, Mike, and John Little",
        title: "High-Intensity Training the Mike Mentzer Way",
        publisher: "McGraw Hill",
        year: 2003,
      },
      {
        slug: "twenty-four-hours-a-day",
        author: "Bennett, Arnold",
        title: "How to Live on Twenty-Four Hours a Day",
        publisher: "George H. Doran Company",
        year: 1910,
      },
      {
        slug: "develop-self-confidence",
        author: "Carnegie, Dale",
        title:
          "How to Develop Self-Confidence and Influence People by Public Speaking",
        publisher: "Pocket Books",
        year: 1956,
      },
      {
        slug: "code-that-fits-in-your-head",
        author: "Seemann, Mark",
        title: "Code That Fits in Your Head",
        publisher: "Addison-Wesley Professional",
        year: 2021,
      },
      {
        slug: "naming-things",
        author: "Benner, Tom",
        title: "Naming Things: The hardest problem in software engineering",
        publisher: "Self-published",
        year: 2023,
      },
      {
        slug: "engineers-survival-guide",
        author: "Taze, Merih",
        title: "Engineers' Survival Guide",
        publisher: "Self-published",
        year: 2021,
      },
    ],
  },
];
