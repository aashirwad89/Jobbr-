"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Code2,
  BarChart3,
  Cpu,
  Building2,
  Scale,
  FlaskConical,
  Globe,
  DollarSign,
  Shield,
  Megaphone,
  Search,
  Bell,
  ExternalLink,
  MapPin,
  Clock,
  TrendingUp,
  Database,
  Network,
  Microscope,
  Pill,
  LineChart,
  Layers,
  ServerCrash,
  Atom,
  Leaf,
  Activity,
  Zap,
  Users,
  PieChart,
  Binary,
  Boxes,
  ScanLine,
  Dna,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Job {
  id: number;
  title: string;
  company: string;
  field: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  icon: React.ReactNode;
  color: string;
  badge: string;
  careerUrl: string;
  degree: string[];
}

const jobs: Job[] = [
  // ─── B.Tech / Engineering ───────────────────────────────────────────────
  {
    id: 1,
    title: "Software Development Engineer II",
    company: "Amazon",
    field: "Software Engineering",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹35L – ₹65L",
    posted: "1h ago",
    icon: <Code2 size={20} />,
    color: "#F97316",
    badge: "🔥 Hot",
    careerUrl: "https://amazon.jobs/en/search#?offset=0&result_limit=10&sort=relevant",
    degree: ["B.Tech", "M.Tech"],
  },
  {
    id: 2,
    title: "Software Engineer – Frontend",
    company: "Google",
    field: "Software Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹40L – ₹80L",
    posted: "3h ago",
    icon: <Code2 size={20} />,
    color: "#3B82F6",
    badge: "🔥 Hot",
    careerUrl: "https://careers.google.com/jobs/results/?employment_type=FULL_TIME&location=India",
    degree: ["B.Tech"],
  },
  {
    id: 3,
    title: "Data Engineer",
    company: "Flipkart",
    field: "Data & Analytics",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹20L – ₹40L",
    posted: "5h ago",
    icon: <Database size={20} />,
    color: "#06B6D4",
    badge: "New",
    careerUrl: "https://www.flipkartcareers.com/#!/joblist",
    degree: ["B.Tech", "M.Tech"],
  },
  {
    id: 4,
    title: "Machine Learning Engineer",
    company: "Microsoft",
    field: "AI / ML",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹30L – ₹60L",
    posted: "2h ago",
    icon: <Cpu size={20} />,
    color: "#8B5CF6",
    badge: "In Demand",
    careerUrl: "https://careers.microsoft.com/v2/global/en/search?lc=India",
    degree: ["B.Tech", "M.Tech"],
  },
  {
    id: 5,
    title: "DevOps / Cloud Engineer",
    company: "Infosys",
    field: "Cloud & DevOps",
    location: "Pune, India",
    type: "Full-time",
    salary: "₹12L – ₹28L",
    posted: "4h ago",
    icon: <ServerCrash size={20} />,
    color: "#10B981",
    badge: "Popular",
    careerUrl: "https://career.infosys.com/joblist",
    degree: ["B.Tech"],
  },
  {
    id: 6,
    title: "Embedded Systems Engineer",
    company: "Bosch India",
    field: "Electronics & Embedded",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹10L – ₹22L",
    posted: "1d ago",
    icon: <Zap size={20} />,
    color: "#EAB308",
    badge: "Stable",
    careerUrl: "https://www.bosch.in/careers/",
    degree: ["B.Tech (ECE / EEE)"],
  },
  {
    id: 7,
    title: "Network Security Engineer",
    company: "Cisco India",
    field: "Cybersecurity",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹15L – ₹35L",
    posted: "6h ago",
    icon: <Shield size={20} />,
    color: "#6366F1",
    badge: "In Demand",
    careerUrl: "https://jobs.cisco.com/jobs/SearchJobs/India",
    degree: ["B.Tech (CS / IT / ECE)"],
  },
  {
    id: 8,
    title: "VLSI Design Engineer",
    company: "Qualcomm India",
    field: "Electronics & Embedded",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹20L – ₹45L",
    posted: "2d ago",
    icon: <Binary size={20} />,
    color: "#EF4444",
    badge: "Niche",
    careerUrl: "https://careers.qualcomm.com/careers/search?location=India",
    degree: ["B.Tech (ECE)", "M.Tech (VLSI)"],
  },
  {
    id: 9,
    title: "Full-Stack Developer",
    company: "Razorpay",
    field: "Software Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹18L – ₹40L",
    posted: "8h ago",
    icon: <Layers size={20} />,
    color: "#3B82F6",
    badge: "🔥 Hot",
    careerUrl: "https://razorpay.com/jobs/",
    degree: ["B.Tech"],
  },
  {
    id: 10,
    title: "Robotics / Automation Engineer",
    company: "ABB India",
    field: "Robotics & Automation",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹10L – ₹24L",
    posted: "3d ago",
    icon: <Network size={20} />,
    color: "#14B8A6",
    badge: "Future Tech",
    careerUrl: "https://careers.abb.com/global/en/search-results?keywords=&country=IN",
    degree: ["B.Tech (Mech / ECE / EEE)"],
  },
  {
    id: 11,
    title: "Data Scientist",
    company: "PhonePe",
    field: "Data & Analytics",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹25L – ₹55L",
    posted: "5h ago",
    icon: <BarChart3 size={20} />,
    color: "#7C3AED",
    badge: "🔥 Hot",
    careerUrl: "https://www.phonepe.com/careers/",
    degree: ["B.Tech", "M.Tech"],
  },
  {
    id: 12,
    title: "Site Reliability Engineer (SRE)",
    company: "Swiggy",
    field: "Cloud & DevOps",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹22L – ₹48L",
    posted: "1d ago",
    icon: <Activity size={20} />,
    color: "#F97316",
    badge: "Popular",
    careerUrl: "https://careers.swiggy.com/#/",
    degree: ["B.Tech"],
  },
  {
    id: 13,
    title: "Product Engineer – Fintech",
    company: "Zerodha",
    field: "Fintech",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹15L – ₹35L",
    posted: "2d ago",
    icon: <LineChart size={20} />,
    color: "#22C55E",
    badge: "Startup",
    careerUrl: "https://zerodha.com/careers/",
    degree: ["B.Tech"],
  },
  {
    id: 14,
    title: "AI Research Engineer",
    company: "Samsung R&D India",
    field: "AI / ML",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹20L – ₹45L",
    posted: "3d ago",
    icon: <Atom size={20} />,
    color: "#1D4ED8",
    badge: "R&D",
    careerUrl: "https://www.samsung.com/in/aboutsamsung/samsungelectronics/india/careers/",
    degree: ["B.Tech", "M.Tech", "PhD"],
  },

  // ─── MBA Roles ───────────────────────────────────────────────────────────
  {
    id: 15,
    title: "Product Manager",
    company: "Meesho",
    field: "Product Management",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹30L – ₹60L",
    posted: "4h ago",
    icon: <Boxes size={20} />,
    color: "#EC4899",
    badge: "🔥 Hot",
    careerUrl: "https://meesho.io/jobs",
    degree: ["MBA", "B.Tech + MBA"],
  },
  {
    id: 16,
    title: "Investment Banking Analyst",
    company: "Goldman Sachs India",
    field: "Investment Banking",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹30L – ₹80L",
    posted: "1d ago",
    icon: <DollarSign size={20} />,
    color: "#22C55E",
    badge: "Top Pay",
    careerUrl: "https://www.goldmansachs.com/careers/students/programs/india/",
    degree: ["MBA (Finance)"],
  },
  {
    id: 17,
    title: "Management Consultant",
    company: "McKinsey & Company",
    field: "Consulting",
    location: "Delhi / Mumbai",
    type: "Full-time",
    salary: "₹30L – ₹70L",
    posted: "6h ago",
    icon: <Briefcase size={20} />,
    color: "#0EA5E9",
    badge: "Prestigious",
    careerUrl: "https://www.mckinsey.com/careers/search-jobs#",
    degree: ["MBA"],
  },
  {
    id: 18,
    title: "Strategy & Operations Associate",
    company: "Bain & Company",
    field: "Consulting",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹28L – ₹60L",
    posted: "2d ago",
    icon: <TrendingUp size={20} />,
    color: "#6366F1",
    badge: "Top Tier",
    careerUrl: "https://www.bain.com/careers/find-a-role/",
    degree: ["MBA"],
  },
  {
    id: 19,
    title: "Brand Manager",
    company: "HUL (Hindustan Unilever)",
    field: "Marketing & Brand",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹20L – ₹40L",
    posted: "3d ago",
    icon: <Megaphone size={20} />,
    color: "#F59E0B",
    badge: "FMCG",
    careerUrl: "https://careers.unilever.com/global/en/india-jobs",
    degree: ["MBA (Marketing)"],
  },
  {
    id: 20,
    title: "Business Analyst – Tech",
    company: "Accenture India",
    field: "Business Analysis",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹12L – ₹25L",
    posted: "1d ago",
    icon: <PieChart size={20} />,
    color: "#A855F7",
    badge: "Popular",
    careerUrl: "https://www.accenture.com/in-en/careers",
    degree: ["MBA", "B.Tech + MBA"],
  },
  {
    id: 21,
    title: "Equity Research Analyst",
    company: "Kotak Securities",
    field: "Finance & Research",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹10L – ₹22L",
    posted: "4d ago",
    icon: <LineChart size={20} />,
    color: "#10B981",
    badge: "Finance",
    careerUrl: "https://www.kotak.com/en/about-us/careers.html",
    degree: ["MBA (Finance)", "CFA"],
  },
  {
    id: 22,
    title: "Supply Chain Manager",
    company: "Asian Paints",
    field: "Supply Chain",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹15L – ₹30L",
    posted: "2d ago",
    icon: <Globe size={20} />,
    color: "#F97316",
    badge: "Ops",
    careerUrl: "https://www.asianpaints.com/more/careers.html",
    degree: ["MBA (Ops)", "B.Tech + MBA"],
  },
  {
    id: 23,
    title: "Human Resources Business Partner",
    company: "Deloitte India",
    field: "Human Resources",
    location: "Delhi, India",
    type: "Full-time",
    salary: "₹12L – ₹24L",
    posted: "5d ago",
    icon: <Users size={20} />,
    color: "#06B6D4",
    badge: "Stable",
    careerUrl: "https://apply.deloitte.com/careers/SearchJobs/India",
    degree: ["MBA (HR)"],
  },
  {
    id: 24,
    title: "Growth & Marketing Manager",
    company: "CRED",
    field: "Marketing & Brand",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹20L – ₹45L",
    posted: "9h ago",
    icon: <TrendingUp size={20} />,
    color: "#EF4444",
    badge: "Startup",
    careerUrl: "https://careers.cred.club/",
    degree: ["MBA"],
  },
  {
    id: 25,
    title: "Private Equity Analyst",
    company: "KKR India",
    field: "Investment Banking",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹40L – ₹1Cr+",
    posted: "7d ago",
    icon: <DollarSign size={20} />,
    color: "#16A34A",
    badge: "Elite",
    careerUrl: "https://kkr.com/careers",
    degree: ["MBA (Finance)"],
  },

  // ─── Biotech / Life Sciences ─────────────────────────────────────────────
  {
    id: 26,
    title: "Research Scientist – Molecular Biology",
    company: "Biocon",
    field: "Biotech / Life Sciences",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹8L – ₹20L",
    posted: "2d ago",
    icon: <Dna size={20} />,
    color: "#22C55E",
    badge: "R&D",
    careerUrl: "https://www.biocon.com/careers/",
    degree: ["B.Tech (Biotech)", "M.Sc", "PhD"],
  },
  {
    id: 27,
    title: "Regulatory Affairs Specialist",
    company: "Dr. Reddy's Laboratories",
    field: "Pharma & Regulatory",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹8L – ₹18L",
    posted: "3d ago",
    icon: <Scale size={20} />,
    color: "#EF4444",
    badge: "Pharma",
    careerUrl: "https://www.drreddys.com/careers/",
    degree: ["B.Tech (Biotech)", "M.Pharm", "M.Sc"],
  },
  {
    id: 28,
    title: "Bioinformatics Scientist",
    company: "Strand Life Sciences",
    field: "Bioinformatics",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹10L – ₹22L",
    posted: "4d ago",
    icon: <ScanLine size={20} />,
    color: "#8B5CF6",
    badge: "Niche",
    careerUrl: "https://www.strandls.com/careers/",
    degree: ["B.Tech (Biotech / CS)", "M.Sc Bioinformatics"],
  },
  {
    id: 29,
    title: "Clinical Research Associate",
    company: "Syngene International",
    field: "Clinical Research",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹7L – ₹16L",
    posted: "1d ago",
    icon: <Microscope size={20} />,
    color: "#F59E0B",
    badge: "CRO",
    careerUrl: "https://www.syngeneintl.com/careers/",
    degree: ["B.Tech (Biotech)", "M.Sc Life Sciences"],
  },
  {
    id: 30,
    title: "Process Development Scientist",
    company: "Serum Institute of India",
    field: "Biotech / Life Sciences",
    location: "Pune, India",
    type: "Full-time",
    salary: "₹9L – ₹20L",
    posted: "5d ago",
    icon: <FlaskConical size={20} />,
    color: "#10B981",
    badge: "Vaccine R&D",
    careerUrl: "https://seruminstitute.com/career.php",
    degree: ["B.Tech (Biotech)", "M.Tech", "PhD"],
  },
  {
    id: 31,
    title: "Pharmacovigilance Analyst",
    company: "Sun Pharmaceutical",
    field: "Pharma & Regulatory",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹7L – ₹14L",
    posted: "2d ago",
    icon: <Pill size={20} />,
    color: "#DC2626",
    badge: "Pharma",
    careerUrl: "https://www.sunpharma.com/careers",
    degree: ["B.Tech (Biotech)", "M.Pharm", "MBBS"],
  },
  {
    id: 32,
    title: "Agricultural Biotechnologist",
    company: "Mahyco (Mahindra)",
    field: "Agri-Biotech",
    location: "Jalna, Maharashtra",
    type: "Full-time",
    salary: "₹6L – ₹14L",
    posted: "6d ago",
    icon: <Leaf size={20} />,
    color: "#16A34A",
    badge: "Agri-Tech",
    careerUrl: "https://www.mahyco.com/careers",
    degree: ["B.Tech (Biotech)", "M.Sc Botany / Genetics"],
  },
  {
    id: 33,
    title: "Medical Affairs Manager",
    company: "Abbott India",
    field: "Medical Affairs",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹15L – ₹30L",
    posted: "3d ago",
    icon: <Activity size={20} />,
    color: "#0EA5E9",
    badge: "MedTech",
    careerUrl: "https://www.jobs.abbott/india/en",
    degree: ["MBA + B.Tech (Biotech)", "MBBS + MBA"],
  },
  {
    id: 34,
    title: "QA / QC Scientist – Biologics",
    company: "Cipla",
    field: "Biotech / Life Sciences",
    location: "Goa / Mumbai",
    type: "Full-time",
    salary: "₹7L – ₹16L",
    posted: "4d ago",
    icon: <FlaskConical size={20} />,
    color: "#A855F7",
    badge: "Quality",
    careerUrl: "https://www.cipla.com/careers",
    degree: ["B.Tech (Biotech / Pharma)", "M.Sc"],
  },
  {
    id: 35,
    title: "Genomics / NGS Scientist",
    company: "MedGenome Labs",
    field: "Genomics & Diagnostics",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹8L – ₹18L",
    posted: "5d ago",
    icon: <Dna size={20} />,
    color: "#06B6D4",
    badge: "Cutting Edge",
    careerUrl: "https://www.medgenome.com/careers",
    degree: ["M.Sc Genetics", "B.Tech (Biotech)", "PhD"],
  },
];

const fields = [
  "All",
  "Software Engineering",
  "AI / ML",
  "Data & Analytics",
  "Cloud & DevOps",
  "Cybersecurity",
  "Electronics & Embedded",
  "Robotics & Automation",
  "Fintech",
  "Product Management",
  "Investment Banking",
  "Consulting",
  "Marketing & Brand",
  "Business Analysis",
  "Finance & Research",
  "Supply Chain",
  "Human Resources",
  "Biotech / Life Sciences",
  "Pharma & Regulatory",
  "Bioinformatics",
  "Clinical Research",
  "Genomics & Diagnostics",
  "Agri-Biotech",
  "Medical Affairs",
];

const degreeFilters = ["All Degrees", "B.Tech", "MBA", "Biotech / Life Sciences"];

export default function JobAlertsPage() {
  const router = useRouter();
  const [selectedField, setSelectedField] = useState("All");
  const [selectedDegree, setSelectedDegree] = useState("All Degrees");
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribedJobs, setSubscribedJobs] = useState<number[]>([]);

  const filteredJobs = jobs.filter((job) => {
    const matchesField = selectedField === "All" || job.field === selectedField;
    const matchesDegree =
      selectedDegree === "All Degrees" ||
      (selectedDegree === "B.Tech" && job.degree.some((d) => d.includes("B.Tech") || d.includes("M.Tech"))) ||
      (selectedDegree === "MBA" && job.degree.some((d) => d.includes("MBA"))) ||
      (selectedDegree === "Biotech / Life Sciences" &&
        job.degree.some((d) =>
          d.includes("Biotech") || d.includes("Life") || d.includes("Genomics") ||
          d.includes("Bioinformatics") || d.includes("Genetics") || d.includes("Pharm") || d.includes("M.Sc")
        ));
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.field.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesField && matchesDegree && matchesSearch;
  });

  const toggleSubscribe = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSubscribedJobs((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen" style={{ background: "#080810", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .job-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 22px;
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .job-card:hover {
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-3px);
          background: rgba(255,255,255,0.045);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .filter-pill {
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 100px;
          padding: 7px 18px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
        }
        .filter-pill:hover { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.8); }
        .filter-pill.active { background: #fff; color: #080810; border-color: #fff; font-weight: 600; }
        .degree-tab {
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
        }
        .degree-tab:hover { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.8); }
        .degree-tab.active { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.25); font-weight: 600; }
        .badge { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 100px; letter-spacing: 0.02em; }
        .apply-btn {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600;
          padding: 8px 16px; border-radius: 10px; border: none;
          cursor: pointer; transition: all 0.18s ease;
          font-family: 'DM Sans', sans-serif; text-decoration: none;
        }
        .apply-btn:hover { opacity: 0.85; transform: scale(0.97); }
        .bell-btn {
          width: 36px; height: 36px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.09);
          background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.18s ease; flex-shrink: 0;
        }
        .bell-btn:hover { border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.04); }
        .bell-btn.active { background: rgba(251,191,36,0.13); border-color: rgba(251,191,36,0.4); }
        .search-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 13px;
          padding: 13px 16px 13px 46px;
          color: #fff; font-size: 14px; width: 100%; outline: none;
          font-family: 'DM Sans', sans-serif; transition: border-color 0.2s;
        }
        .search-input:focus { border-color: rgba(255,255,255,0.22); }
        .search-input::placeholder { color: rgba(255,255,255,0.25); }
        .back-btn {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px; color: rgba(255,255,255,0.65);
          font-size: 14px; font-weight: 500; padding: 9px 16px;
          cursor: pointer; transition: all 0.18s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .back-btn:hover { background: rgba(255,255,255,0.09); color: #fff; border-color: rgba(255,255,255,0.18); }
        .scroll-hide::-webkit-scrollbar { display: none; }
        .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .icon-box { width: 44px; height: 44px; border-radius: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 16px 20px; flex: 1; min-width: 130px; }
        .degree-tag { font-size: 11px; padding: 2px 8px; border-radius: 6px; background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); font-weight: 500; }
        .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 14px 0; }
      `}</style>

      {/* Sticky Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 24px", position: "sticky", top: 0, background: "rgba(8,8,16,0.92)", backdropFilter: "blur(16px)", zIndex: 10 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="back-btn" onClick={() => router.back()}>
            <ArrowLeft size={16} /> Back
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
              {subscribedJobs.length} alert{subscribedJobs.length !== 1 ? "s" : ""} active
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 24px 60px" }}>
        {/* Hero */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Bell size={14} color="#FBBF24" />
            <span style={{ color: "#FBBF24", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Live Job Alerts</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(30px, 4.5vw, 54px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, marginBottom: 14 }}>
            Careers for{" "}
            <span style={{ color: "#60A5FA" }}>B.Tech</span>,{" "}
            <span style={{ color: "#F472B6" }}>MBA</span> &{" "}
            <span style={{ color: "#34D399" }}>Biotech</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 16, maxWidth: 560, lineHeight: 1.65 }}>
            {jobs.length} real openings at top companies — each linking directly to their official careers page. Click 🔔 to track a role.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
          {[
            { label: "Live Jobs", value: `${jobs.length}`, color: "#FBBF24" },
            { label: "B.Tech Roles", value: `${jobs.filter((j) => j.degree.some((d) => d.includes("B.Tech"))).length}`, color: "#60A5FA" },
            { label: "MBA Roles", value: `${jobs.filter((j) => j.degree.some((d) => d.includes("MBA"))).length}`, color: "#F472B6" },
            { label: "Biotech Roles", value: `${jobs.filter((j) => ["Biotech / Life Sciences","Pharma & Regulatory","Genomics & Diagnostics","Bioinformatics","Clinical Research","Agri-Biotech","Medical Affairs"].includes(j.field)).length}`, color: "#34D399" },
          ].map((s) => (
            <div className="stat-card" key={s.label}>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Degree Filter Tabs */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 10 }}>Filter by Degree</div>
          <div className="scroll-hide" style={{ display: "flex", gap: 8, overflowX: "auto" }}>
            {degreeFilters.map((d) => (
              <button key={d} className={`degree-tab ${selectedDegree === d ? "active" : ""}`} onClick={() => setSelectedDegree(d)}>{d}</button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 18 }}>
          <Search size={16} color="rgba(255,255,255,0.25)" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <input className="search-input" placeholder="Search role, company, or field…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        {/* Field Pills */}
        <div className="scroll-hide" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 32 }}>
          {fields.map((f) => (
            <button key={f} className={`filter-pill ${selectedField === f ? "active" : ""}`} onClick={() => setSelectedField(f)}>{f}</button>
          ))}
        </div>

        {/* Count */}
        <div style={{ marginBottom: 20, color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
          Showing <span style={{ color: "#fff", fontWeight: 600 }}>{filteredJobs.length}</span> job{filteredJobs.length !== 1 ? "s" : ""}
          {selectedField !== "All" && <> in <span style={{ color: "#FBBF24" }}>{selectedField}</span></>}
          {selectedDegree !== "All Degrees" && <> · <span style={{ color: "#60A5FA" }}>{selectedDegree}</span></>}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 16 }}>
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card" onClick={() => window.open(job.careerUrl, "_blank")}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                  <div className="icon-box" style={{ background: `${job.color}1A`, color: job.color }}>{job.icon}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 15, marginBottom: 3, lineHeight: 1.3 }}>{job.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 13 }}>{job.company}</div>
                  </div>
                </div>
                <button className={`bell-btn ${subscribedJobs.includes(job.id) ? "active" : ""}`} onClick={(e) => toggleSubscribe(job.id, e)} title="Alert me">
                  <Bell size={15} color={subscribedJobs.includes(job.id) ? "#FBBF24" : "rgba(255,255,255,0.3)"} fill={subscribedJobs.includes(job.id) ? "#FBBF24" : "none"} />
                </button>
              </div>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                <span className="badge" style={{ background: `${job.color}22`, color: job.color }}>{job.badge}</span>
                <span className="badge" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}>{job.field}</span>
              </div>

              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
                {job.degree.map((d) => (<span key={d} className="degree-tag">{d}</span>))}
              </div>

              <div className="divider" />

              <div style={{ display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.35)", fontSize: 12 }}><MapPin size={12} />{job.location}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.35)", fontSize: 12 }}><Clock size={12} />{job.posted}</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginBottom: 3 }}>Salary</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{job.salary}</div>
                </div>
                <a href={job.careerUrl} target="_blank" rel="noopener noreferrer" className="apply-btn" style={{ background: job.color, color: "#fff" }} onClick={(e) => e.stopPropagation()}>
                  Apply <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div style={{ textAlign: "center", padding: "70px 0", color: "rgba(255,255,255,0.25)" }}>
            <Search size={44} style={{ marginBottom: 16, opacity: 0.25, display: "block", margin: "0 auto 16px" }} />
            <div style={{ fontSize: 16, marginBottom: 12 }}>No jobs match your filters.</div>
            <button onClick={() => { setSearchQuery(""); setSelectedField("All"); setSelectedDegree("All Degrees"); }}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 9, color: "rgba(255,255,255,0.45)", padding: "8px 18px", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}