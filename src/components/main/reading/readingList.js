import maxaldingCover from "../../../assets/images/book-covers/maxalding.png";
import vibeCodingCover from "../../../assets/images/book-covers/vibe-coding.png";
import understandingDistributedSystemsCover from "../../../assets/images/book-covers/understanding-distributed-systems.png";
import namingThingsCover from "../../../assets/images/book-covers/naming-things.png";
import engineersSurvivalGuideCover from "../../../assets/images/book-covers/engineers-survival-guide.png";
import developSelfConfidenceCover from "../../../assets/images/book-covers/develop-self-confidence.png";
import simpleSqlCover from "../../../assets/images/book-covers/simple-sql.png";
import startingAStartupCover from "../../../assets/images/book-covers/starting-a-startup.png";
import chakrasBeyondBeginnersCover from "../../../assets/images/book-covers/chakras-beyond-beginners.png";
import qigongForBeginnersCover from "../../../assets/images/book-covers/qigong-for-beginners.png";
import soulDnaCover from "../../../assets/images/book-covers/soul-dna.png";

// Most cover images are sourced from the Open Library Covers API; a few are
// bundled locally (above). Books without a match fall back to a generic
// placeholder cover in the UI (see BookCover).
const cover = (id) => `https://covers.openlibrary.org/b/id/${id}-M.jpg`;

// Books currently in progress (shown pinned at the top of the Reading section).
export const currentlyReading = [
  {
    author: "Saldo, Monte",
    title: "Maxalding",
    publisher: "CreateSpace Independent Publishing Platform",
    year: "2011 (orig. 1909)",
    cover: maxaldingCover,
  },
];

// Completed reading grouped by year, newest first. Each year renders as a
// collapsible accordion that is expanded by default.
// To add a new year, drop a new object at the top of this array.
export const readingByYear = [
  {
    year: 2025,
    books: [
      {
        author: "Kim, Gene and Steve Yegge",
        title: "Vibe Coding",
        publisher: "IT Revolution",
        year: 2025,
        cover: vibeCodingCover,
      },
      {
        author: "Sinclair, James",
        title: "Starting A Startup",
        publisher: "Page Two",
        year: 2025,
        cover: startingAStartupCover,
      },
      {
        author: "Martin, Robert",
        title:
          "The Clean Coder: A Code of Conduct for Professional Programmers",
        publisher: "Pearson",
        year: 2011,
        cover: cover(7318893),
      },
      {
        author: "Pond, David",
        title: "Chakras Beyond Beginners: Awakening to the Divine Within",
        publisher: "Llewellyn Publishing",
        year: 2021,
        cover: chakrasBeyondBeginnersCover,
      },
      {
        author: "Chandler, Todd",
        title: "Hands-On Guide to Google ADK",
        publisher: "Self-published",
        year: 2025,
        cover: null,
      },
      {
        author: "O'Neil, Jennifer",
        title: "Soul DNA",
        publisher: "Self Published",
        year: 2012,
        cover: soulDnaCover,
      },
      {
        author: "Song, Chen",
        title: "Qigong for Beginners: Chinese Healing Energy from Within",
        publisher: "Self-published",
        year: 2022,
        cover: qigongForBeginnersCover,
      },
      {
        author: "Cohen, Ken",
        title: "Taoism: Essential Teaching of The Way and Its Power",
        publisher: "Sounds True",
        year: 2015,
        cover: cover(865042),
      },
      {
        author: "Cohen, Ken",
        title: "Native Wisdom: Seven Keys to Health & Happiness",
        publisher: "Sounds True",
        year: 1999,
        cover: cover(864946),
      },
      {
        author: "Weist, Brianna",
        title: "The Mountain Is You",
        publisher: "Thought Catalog Books",
        year: 2022,
        cover: cover(13838236),
      },
      {
        author: "Cohen, Ken",
        title:
          "Qigong Healing Meditations: Taoist Healing Exercises with Ken Cohen",
        publisher: "Sounds True",
        year: 2014,
        cover: cover(208344),
      },
      {
        author: "Little, John and Joanne Sharkey",
        title:
          "The Wisdom of Mike Mentzer: The Art, Science and Philosophy of a Bodybuilding Legend",
        publisher: "McGraw Hill",
        year: 2005,
        cover: cover(1079977),
      },
      {
        author: "Bradberry, Dr. Travis",
        title: "Emotional Intelligence Habits",
        publisher: "TalentSmart",
        year: 2023,
        cover: cover(15100928),
      },
    ],
  },
  {
    year: 2024,
    books: [
      {
        author: "Dimnet, Ernest",
        title: "The Art of Thinking",
        publisher: "Dead Authors Society",
        year: 2023,
        cover: cover(762085),
      },
      {
        author: "Wade, Dane",
        title: "Simple SQL",
        publisher: "Self-published",
        year: 2022,
        cover: simpleSqlCover,
      },
      {
        author: "Kishimi, Ichiro and Fumitake Koga",
        title:
          "The Courage to Be Disliked: How to Free Yourself, Change Your Life, and Achieve Real Happiness",
        publisher: "Simon & Schuster Audio",
        year: 2018,
        cover: cover(10873626),
      },
      {
        author: "Willink, Jocko, and Leif Babin",
        title: "Extreme Ownership: How US Navy Seals Lead and Win",
        publisher: "Macmillan Audio",
        year: 2015,
        cover: cover(12835042),
      },
      {
        author: "Knight, Kam",
        title: "Speed Reading: Learn to Read a 200+ Page Book in 1 Hour",
        publisher: "MindLily",
        year: 2018,
        cover: cover(10839827),
      },
      {
        author: "Kleppmann, Martin",
        title: "Designing Data-Intensive Applications",
        publisher: "O'Reilly Media",
        year: 2017,
        cover: cover(8434671),
      },
      {
        author: "Vitillo, Roberto",
        title:
          "Understanding Distributed Systems: What every developer should know about large distributed applications",
        publisher: "Self-published",
        year: 2021,
        cover: understandingDistributedSystemsCover,
      },
      {
        author: "Mentzer, Mike, and John Little",
        title: "High-Intensity Training the Mike Mentzer Way",
        publisher: "McGraw Hill",
        year: 2003,
        cover: cover(57750),
      },
      {
        author: "Bennett, Arnold",
        title: "How to Live on Twenty-Four Hours a Day",
        publisher: "George H. Doran Company",
        year: 1910,
        cover: cover(13215555),
      },
      {
        author: "Carnegie, Dale",
        title:
          "How to Develop Self-Confidence and Influence People by Public Speaking",
        publisher: "Pocket Books",
        year: 1956,
        cover: developSelfConfidenceCover,
      },
      {
        author: "Seemann, Mark",
        title: "Code That Fits in Your Head",
        publisher: "Addison-Wesley Professional",
        year: 2021,
        cover: cover(12848531),
      },
      {
        author: "Benner, Tom",
        title: "Naming Things: The hardest problem in software engineering",
        publisher: "Self-published",
        year: 2023,
        cover: namingThingsCover,
      },
      {
        author: "Taze, Merih",
        title: "Engineers' Survival Guide",
        publisher: "Self-published",
        year: 2021,
        cover: engineersSurvivalGuideCover,
      },
    ],
  },
];
