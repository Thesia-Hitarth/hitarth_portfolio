/**
 * data/resume.ts
 * ─────────────────────────────────────────────────────────
 * Exact contents of the public/Resume_Thesia_Hitarth.pdf resume.
 * ─────────────────────────────────────────────────────────
 */

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    phone: string;
    email: string;
    location: string;
    github: {
      display: string;
      url: string;
    };
    linkedin: {
      display: string;
      url: string;
    };
    summary: string;
  };
  skills: {
    category: string;
    items: string;
  }[];
  experience: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    location: string;
    techStack: string[];
    bullets: string[];
  }[];
  projects: {
    title: string;
    subtitle: string;
    techStack: string[];
    year: string;
    bullets: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    timeline: string;
    gpaOrPercentage: string;
  }[];
}

export const resumeData: ResumeData = {
  personal: {
    name: "Hitarth Thesia",
    title: "MERN Stack Developer",
    phone: "+91 8980684801",
    email: "hitarththesia123@gmail.com",
    location: "Ahmedabad, Gujarat",
    github: {
      display: "github.com/Thesia-Hitarth",
      url: "https://github.com/Thesia-Hitarth"
    },
    linkedin: {
      display: "linkedin.com/in/hitarth-thesia",
      url: "https://www.linkedin.com/in/hitarth-thesia-2043b0170/"
    },
    summary: "MERN Stack Developer with internship experience building real products — 90+ Lighthouse score, 45% fewer re-renders, and 30% higher user engagement across two live platforms. Comfortable working on both frontend and backend, from UI design to REST APIs and database work. Experienced with TypeScript, Redux Toolkit, and headless CMS tools. Works well in Agile teams and can lead frontend delivery independently."
  },
  skills: [
    {
      category: "Frontend",
      items: "React.js, Next.js, Tailwind CSS"
    },
    {
      category: "Backend",
      items: "Node.js, Express.js, RESTful APIs"
    },
    {
      category: "Database",
      items: "MongoDB, MySQL"
    },
    {
      category: "Tools",
      items: "Git, GitHub, Postman"
    },
    {
      category: "Languages",
      items: "JavaScript, TypeScript, Java, C/C++"
    }
  ],
  experience: [
    {
      company: "Codage Habitation",
      role: "Frontend Developer Intern",
      startDate: "Jan 2026",
      endDate: "Present",
      location: "Ahmedabad, Gujarat",
      techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Sanity", "Strapi"],
      bullets: [
        "Built 25+ UI components in React.js, TypeScript, and Tailwind CSS for a tax-management platform, improving user engagement by 30%",
        "Reduced re-renders by 45% using Redux Toolkit and React Context API, making the app noticeably faster",
        "Achieved 90+ Google Lighthouse score using code splitting, lazy loading, and memoization",
        "Connected Sanity and Strapi CMS so non-technical team members could update content on their own"
      ]
    },
    {
      company: "Zikasha Consultancy LLP",
      role: "Software Developer Intern",
      startDate: "Feb 2025",
      endDate: "Jul 2025",
      location: "Gandhinagar, Gujarat",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "ShadCN/UI"],
      bullets: [
        "Built a full-stack food delivery platform used by 150+ daily users with real-time order tracking and cart management",
        "Built 10+ REST API endpoints in Node.js and Express.js for login, orders, and meal subscriptions",
        "Fixed checkout flow and improved form checks, which reduced user-reported order errors"
      ]
    }
  ],
  projects: [
    {
      title: "Developer Taskflows",
      subtitle: "Interactive Developer Roadmap & Career Guidance",
      techStack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Prisma", "NextAuth"],
      year: "2026",
      bullets: [
        "An open-source developer roadmap and career guidance platform containing structured learning paths, interactive roadmaps, and a personalized recommendation engine.",
        "Designed and structured role-based and skill-based roadmaps covering 30+ career tracks and technologies.",
        "Developed a personalized recommendation engine ('Find My Path' quiz) recommending tailored learning tracks based on user inputs."
      ]
    },
    {
      title: "Querious",
      subtitle: "Community-Driven Q&A Platform",
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Authentication"],
      year: "2024–2025",
      bullets: [
        "A developer Q&A community platform with upvoting, answer ranking, and user profiles — similar to Stack Overflow.",
        "Built a Q&A platform with upvoting, answer ranking using MongoDB aggregation, and Firebase login",
        "Designed REST APIs for questions, answers, and votes with proper error handling"
      ]
    },
    {
      title: "Cartza E-Commerce",
      subtitle: "Full Stack MERN Application",
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Third-party Payment API"],
      year: "2025",
      bullets: [
        "A complete online shopping platform with product browsing, cart management, and secure payment checkout.",
        "Built a complete e-commerce site with product listing, cart, and secure payment integration",
        "Added JWT-based login with protected routes on both frontend and backend"
      ]
    },
    {
      title: "Daily Dose",
      subtitle: "Tiffin Ordering & Subscription Platform",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "ShadCN/UI", "REST APIs"],
      year: "2025",
      bullets: [
        "A live food subscription web app where users can order daily tiffin meals, manage plans, and track orders in real time.",
        "Sole frontend developer; built a component library with consistent UI across 10+ pages for desktop and mobile",
        "Worked with backend team using shared API contracts to reduce integration issues"
      ]
    },
  ],
  education: [
    {
      institution: "Charotar University of Science and Technology (CHARUSAT), Anand",
      degree: "Bachelor of Technology in Computer Engineering",
      timeline: "2022–2025",
      gpaOrPercentage: "CGPA: 7.50"
    },
    {
      institution: "Government Polytechnic, Gandhinagar",
      degree: "Diploma in Computer Engineering",
      timeline: "2019–2022",
      gpaOrPercentage: "CGPA: 8.96"
    },
    {
      institution: "Shree Swaminarayan Gurukul Gyanbag International School, Junagadh",
      degree: "CBSE Secondary School Certificate (SSC)",
      timeline: "2018–2019",
      gpaOrPercentage: "Percentage: 85.60%"
    }
  ]
};
