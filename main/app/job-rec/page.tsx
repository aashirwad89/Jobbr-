/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Code,
  Server,
  Cloud,
  Palette,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Zap,
  Target,
  Users,
  Building2,
  GitBranch,
  Database,
  Smartphone,
  Shield,
  Brain,
  BarChart3,
  Briefcase,
  Award,
  Lightbulb,
  Cpu,
  Layout,
  FileText,
  ArrowRight,
  GraduationCap,
  ArrowLeft,
  Clock,
} from 'lucide-react';

type DegreeType = 'btech' | 'mba' | 'bba' | 'sales';
type RoadmapCategory = 'Technical' | 'Management' | 'Business' | 'Sales';

interface RoadmapPath {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  category: RoadmapCategory;
  degreeMatch: DegreeType[];
  skills: string[];
  roles: string[];
  timeline: string;
  salary_range: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: {
    phase: string;
    duration: string;
    skills: string[];
    resources: string[];
  }[];
}

const roadmaps: RoadmapPath[] = [
  {
    id: 'sde',
    title: 'Software Development Engineer (SDE)',
    icon: <Code className="w-6 h-6" />,
    description: 'Build scalable applications and solve complex problems through code',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['Data Structures', 'Algorithms', 'System Design', 'OOP'],
    roles: ['Junior SDE', 'Senior SDE', 'Staff Engineer'],
    timeline: '2-3 years to Senior',
    salary_range: '₹8L - ₹50L+ LPA',
    difficulty: 'Advanced',
    steps: [
      {
        phase: 'Foundation (6 months)',
        duration: '6 months',
        skills: ['DSA', 'OOP', 'One Language (Java/Python/C++)'],
        resources: ['LeetCode', 'GeeksforGeeks', 'Take U Forward'],
      },
      {
        phase: 'Intermediate (6-12 months)',
        duration: '6-12 months',
        skills: ['Web Development', 'Databases', 'System Design Basics'],
        resources: ['System Design Primer', 'HLD Videos', 'Project Building'],
      },
      {
        phase: 'Advanced (12-24 months)',
        duration: '12-24 months',
        skills: ['Advanced System Design', 'Distributed Systems', 'Scaling'],
        resources: ['DDIA Book', 'Production Code', 'Open Source'],
      },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    icon: <Layout className="w-6 h-6" />,
    description: 'Master both frontend and backend development for complete application ownership',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['Frontend (React/Vue)', 'Backend (Node/Python)', 'Databases', 'APIs'],
    roles: ['Junior Full Stack', 'Full Stack Developer', 'Lead Developer'],
    timeline: '2-3 years to Mid-level',
    salary_range: '₹6L - ₹40L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Frontend Mastery (4 months)',
        duration: '4 months',
        skills: ['HTML/CSS/JS', 'React/Vue', 'State Management'],
        resources: ['FreeCodeCamp', 'Scrimba', 'Build Projects'],
      },
      {
        phase: 'Backend Foundations (4 months)',
        duration: '4 months',
        skills: ['Node.js/Python', 'Express/Django', 'REST APIs'],
        resources: ['The Net Ninja', 'Udemy', 'Mini Projects'],
      },
      {
        phase: 'Database & Deployment (3 months)',
        duration: '3 months',
        skills: ['SQL/NoSQL', 'Docker', 'Vercel/Heroku/AWS'],
        resources: ['MongoDB University', 'Docker Docs', 'Deploying Apps'],
      },
      {
        phase: 'Real-world Application (Ongoing)',
        duration: 'Ongoing',
        skills: ['Authentication', 'Performance Optimization', 'Security'],
        resources: ['Production Projects', 'Code Reviews', 'Open Source'],
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    icon: <Server className="w-6 h-6" />,
    description: 'Automate deployments and manage infrastructure for seamless operations',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
    roles: ['Junior DevOps', 'DevOps Engineer', 'Platform Engineer'],
    timeline: '2-3 years to Mid-level',
    salary_range: '₹7L - ₹45L+ LPA',
    difficulty: 'Advanced',
    steps: [
      {
        phase: 'Linux Mastery (2 months)',
        duration: '2 months',
        skills: ['Linux Commands', 'Shell Scripting', 'System Administration'],
        resources: ['Linux Academy', 'Bash Scripting', 'Practice on VM'],
      },
      {
        phase: 'Containerization (3 months)',
        duration: '3 months',
        skills: ['Docker', 'Container Orchestration Basics', 'Networking'],
        resources: ['Docker Documentation', 'Play with Docker', 'Real Projects'],
      },
      {
        phase: 'Kubernetes (3 months)',
        duration: '3 months',
        skills: ['K8s Basics', 'Helm', 'Service Mesh (Istio)'],
        resources: ['Kubernetes.io', 'KodeKloud', 'Minikube Practice'],
      },
      {
        phase: 'CI/CD & Monitoring (4 months)',
        duration: '4 months',
        skills: ['Jenkins/GitHub Actions', 'GitLab CI', 'Prometheus/ELK'],
        resources: ['Jenkins Docs', 'GitHub Actions', 'Monitoring Setup'],
      },
    ],
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    icon: <Cloud className="w-6 h-6" />,
    description: 'Design and manage scalable cloud infrastructure for enterprises',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['AWS/Azure/GCP', 'System Design', 'Cost Optimization', 'Security'],
    roles: ['Cloud Engineer', 'Solutions Architect', 'Enterprise Architect'],
    timeline: '4-5 years from Junior',
    salary_range: '₹10L - ₹60L+ LPA',
    difficulty: 'Advanced',
    steps: [
      {
        phase: 'Cloud Platform Basics (3 months)',
        duration: '3 months',
        skills: ['AWS Fundamentals', 'EC2, S3, RDS Basics', 'Networking'],
        resources: ['AWS Free Tier', 'A Cloud Guru', 'AWS Docs'],
      },
      {
        phase: 'AWS Solutions Architect Associate (3 months)',
        duration: '3 months',
        skills: ['Design Solutions', 'Best Practices', 'Migration Strategies'],
        resources: ['AWS SAA Course', 'Hands-on Labs', 'Exam Practice'],
      },
      {
        phase: 'Advanced Services (4 months)',
        duration: '4 months',
        skills: ['Lambda, API Gateway', 'RDS Advanced', 'Security Best Practices'],
        resources: ['AWS Advanced Services', 'Architecture Patterns', 'Case Studies'],
      },
      {
        phase: 'Professional Architect (6 months)',
        duration: '6 months',
        skills: ['Large Scale Design', 'Cost Optimization', 'Disaster Recovery'],
        resources: ['AWS SAP Course', 'Enterprise Projects', 'Architecture Reviews'],
      },
    ],
  },
  {
    id: 'uiux',
    title: 'UI/UX Designer',
    icon: <Palette className="w-6 h-6" />,
    description: 'Create beautiful and intuitive user experiences that delight users',
    category: 'Technical',
    degreeMatch: ['btech', 'mba', 'bba'],
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    roles: ['UI Designer', 'UX Designer', 'Product Designer', 'Design Lead'],
    timeline: '2-3 years to Mid-level',
    salary_range: '₹5L - ₹35L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Design Fundamentals (2 months)',
        duration: '2 months',
        skills: ['Color Theory', 'Typography', 'Layout Principles'],
        resources: ['Design Course', 'Books: Non-Designer\'s Design', 'Dribbble Study'],
      },
      {
        phase: 'Tools & Software (2 months)',
        duration: '2 months',
        skills: ['Figma', 'Adobe XD/Sketch', 'Prototyping'],
        resources: ['Figma Tutorials', 'Design Twitter', 'Practice Designs'],
      },
      {
        phase: 'UX Research & Strategy (3 months)',
        duration: '3 months',
        skills: ['User Testing', 'Personas', 'User Journeys', 'Information Architecture'],
        resources: ['Don Norman Books', 'User Testing Platforms', 'Case Studies'],
      },
      {
        phase: 'Portfolio & Real Projects (Ongoing)',
        duration: 'Ongoing',
        skills: ['Design Systems', 'Accessibility', 'Motion Design'],
        resources: ['Build 5-10 Projects', 'Open Source Design', 'Freelance Work'],
      },
    ],
  },
  {
    id: 'sales-exec',
    title: 'Sales Executive',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Build relationships and drive revenue growth through strategic selling',
    category: 'Business',
    degreeMatch: ['bba', 'sales', 'mba'],
    skills: ['Communication', 'Negotiation', 'CRM', 'Sales Strategy', 'Relationship Building'],
    roles: ['Sales Executive', 'Account Executive', 'Sales Manager', 'Sales Director'],
    timeline: '2-3 years to Manager',
    salary_range: '₹3L - ₹30L+ LPA (with incentives)',
    difficulty: 'Beginner',
    steps: [
      {
        phase: 'Product Knowledge (1 month)',
        duration: '1 month',
        skills: ['Product Mastery', 'Market Understanding', 'Competitor Analysis'],
        resources: ['Company Training', 'Product Docs', 'Industry Reports'],
      },
      {
        phase: 'Sales Fundamentals (2 months)',
        duration: '2 months',
        skills: ['CRM Systems', 'Sales Process', 'Objection Handling', 'Negotiation'],
        resources: ['HubSpot Academy', 'Sales Books', 'Mentorship'],
      },
      {
        phase: 'Lead Generation & Prospecting (3 months)',
        duration: '3 months',
        skills: ['LinkedIn Outreach', 'Cold Calling', 'Email Campaigns', 'Account Research'],
        resources: ['LinkedIn Learning', 'Sales Playbooks', 'Role Plays'],
      },
      {
        phase: 'Client Relationships (Ongoing)',
        duration: 'Ongoing',
        skills: ['Account Management', 'Upselling', 'Customer Retention', 'Territory Expansion'],
        resources: ['Customer Feedback', 'Sales Analytics', 'Continuous Learning'],
      },
    ],
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    icon: <Target className="w-6 h-6" />,
    description: 'Drive product strategy and vision while managing cross-functional teams',
    category: 'Management',
    degreeMatch: ['bba', 'mba'],
    skills: ['Product Strategy', 'Data Analysis', 'User Research', 'Leadership', 'Technical Acumen'],
    roles: ['Associate PM', 'Product Manager', 'Senior PM', 'Director of Product'],
    timeline: '3-4 years from Associate',
    salary_range: '₹8L - ₹50L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Product Fundamentals (2 months)',
        duration: '2 months',
        skills: ['Product Thinking', 'Product Lifecycle', 'Market Analysis'],
        resources: ['Cracking PM Interview', 'Product Hunt', 'Case Studies'],
      },
      {
        phase: 'Analytics & Metrics (3 months)',
        duration: '3 months',
        skills: ['SQL', 'Analytics Tools', 'Metric Definition', 'A/B Testing'],
        resources: ['Mode Analytics', 'Google Analytics', 'Mixpanel Docs'],
      },
      {
        phase: 'User Research & Design (3 months)',
        duration: '3 months',
        skills: ['User Interviews', 'Personas', 'Wireframing', 'Roadmap Planning'],
        resources: ['Jobs to be Done', 'Design Sprint', 'Customer Development'],
      },
      {
        phase: 'Leadership & Strategy (Ongoing)',
        duration: 'Ongoing',
        skills: ['Stakeholder Management', 'Roadmap Execution', 'Vision Setting'],
        resources: ['Real PM Role', 'Mentorship', 'Industry Trends'],
      },
    ],
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    icon: <BarChart3 className="w-6 h-6" />,
    description: 'Analyze business processes and data to drive strategic improvements',
    category: 'Business',
    degreeMatch: ['bba', 'mba'],
    skills: ['Data Analysis', 'SQL', 'Business Process Mapping', 'Excel', 'Reporting'],
    roles: ['Junior BA', 'Senior BA', 'Analytics Manager', 'Data Analyst'],
    timeline: '2-3 years to Senior',
    salary_range: '₹4L - ₹25L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Excel Mastery (1 month)',
        duration: '1 month',
        skills: ['Advanced Formulas', 'Pivot Tables', 'Data Visualization'],
        resources: ['Excel YouTube', 'LinkedIn Learning', 'Practice Datasets'],
      },
      {
        phase: 'SQL Fundamentals (2 months)',
        duration: '2 months',
        skills: ['SELECT/WHERE', 'JOINs', 'Aggregations', 'Subqueries'],
        resources: ['Mode SQL Tutorial', 'DataCamp', 'W3Schools'],
      },
      {
        phase: 'Business Analysis (2 months)',
        duration: '2 months',
        skills: ['Requirements Gathering', 'Process Mapping', 'Stakeholder Management'],
        resources: ['BA Institute', 'BABOK Guide', 'Real Projects'],
      },
      {
        phase: 'Advanced Analytics (3 months)',
        duration: '3 months',
        skills: ['Advanced SQL', 'Tableau/Power BI', 'Statistical Analysis'],
        resources: ['Tableau Public', 'Power BI Course', 'Data Visualization'],
      },
    ],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    icon: <Brain className="w-6 h-6" />,
    description: 'Use data and machine learning to solve complex business problems',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization'],
    roles: ['Junior Data Scientist', 'Data Scientist', 'Senior Data Scientist', 'ML Engineer'],
    timeline: '2-3 years to Senior',
    salary_range: '₹6L - ₹45L+ LPA',
    difficulty: 'Advanced',
    steps: [
      {
        phase: 'Python & Statistics (3 months)',
        duration: '3 months',
        skills: ['Python Basics', 'Pandas/NumPy', 'Statistics', 'Probability'],
        resources: ['Python for Data Analysis', 'StatQuest', 'Kaggle Learn'],
      },
      {
        phase: 'Machine Learning (4 months)',
        duration: '4 months',
        skills: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'],
        resources: ['Andrew Ng ML Course', 'Scikit-learn', 'Kaggle Competitions'],
      },
      {
        phase: 'Deep Learning & Advanced ML (4 months)',
        duration: '4 months',
        skills: ['Neural Networks', 'TensorFlow/PyTorch', 'NLP', 'Computer Vision'],
        resources: ['Fast.ai', 'Deep Learning Specialization', 'Research Papers'],
      },
      {
        phase: 'Production ML (3 months)',
        duration: '3 months',
        skills: ['Model Deployment', 'MLOps', 'A/B Testing', 'Monitoring'],
        resources: ['Made With ML', 'MLflow', 'Production Projects'],
      },
    ],
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Create responsive and interactive user interfaces with modern frameworks',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['React/Vue/Angular', 'HTML/CSS/JavaScript', 'Responsive Design', 'Performance Optimization'],
    roles: ['Junior Frontend Dev', 'Frontend Developer', 'Senior Frontend Dev', 'Tech Lead'],
    timeline: '2-3 years to Senior',
    salary_range: '₹5L - ₹40L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'HTML/CSS/JavaScript (3 months)',
        duration: '3 months',
        skills: ['Semantic HTML', 'CSS Flexbox/Grid', 'Vanilla JS', 'DOM Manipulation'],
        resources: ['MDN Web Docs', 'FreeCodeCamp', 'Build Projects'],
      },
      {
        phase: 'React/Vue Fundamentals (3 months)',
        duration: '3 months',
        skills: ['Components', 'State Management', 'Hooks', 'Routing'],
        resources: ['React Official', 'React Documentation', 'Todo Projects'],
      },
      {
        phase: 'Advanced Frontend (3 months)',
        duration: '3 months',
        skills: ['Performance Optimization', 'Testing', 'TypeScript', 'Build Tools'],
        resources: ['Web Vitals', 'Jest/React Testing', 'TypeScript Handbook'],
      },
      {
        phase: 'Production & Design Systems (Ongoing)',
        duration: 'Ongoing',
        skills: ['Accessibility', 'Design Collaboration', 'Component Libraries'],
        resources: ['A11y Project', 'Storybook', 'Real Projects'],
      },
    ],
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    icon: <Database className="w-6 h-6" />,
    description: 'Build robust server-side applications and manage databases',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['Node.js/Python/Java', 'APIs', 'Databases', 'Server Management'],
    roles: ['Junior Backend Dev', 'Backend Developer', 'Senior Backend Dev', 'Architect'],
    timeline: '2-3 years to Senior',
    salary_range: '₹6L - ₹42L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Language Mastery (3 months)',
        duration: '3 months',
        skills: ['Node.js/Python', 'Async Programming', 'Error Handling'],
        resources: ['Node.js Official', 'Python Docs', 'Build CLI Tools'],
      },
      {
        phase: 'Databases (3 months)',
        duration: '3 months',
        skills: ['SQL (PostgreSQL)', 'NoSQL (MongoDB)', 'Indexing', 'Optimization'],
        resources: ['PostgreSQL Docs', 'MongoDB University', 'Design Patterns'],
      },
      {
        phase: 'APIs & Authentication (2 months)',
        duration: '2 months',
        skills: ['REST APIs', 'GraphQL', 'JWT/OAuth', 'API Design'],
        resources: ['API Design Guide', 'GraphQL Course', 'Security Best Practices'],
      },
      {
        phase: 'System Design (Ongoing)',
        duration: 'Ongoing',
        skills: ['Scalability', 'Caching', 'Message Queues', 'Microservices'],
        resources: ['System Design Primer', 'DDIA', 'Production Code'],
      },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Engineer',
    icon: <Shield className="w-6 h-6" />,
    description: 'Protect systems and data from security threats and vulnerabilities',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['Network Security', 'Penetration Testing', 'Cryptography', 'Incident Response'],
    roles: ['Security Engineer', 'Penetration Tester', 'Security Architect', 'Chief Security Officer'],
    timeline: '3-4 years to Senior',
    salary_range: '₹6L - ₹50L+ LPA',
    difficulty: 'Advanced',
    steps: [
      {
        phase: 'Networking Fundamentals (2 months)',
        duration: '2 months',
        skills: ['OSI Model', 'TCP/IP', 'Firewalls', 'VPNs'],
        resources: ['Cisco CCNA', 'NetworkPlus', 'Wireshark Practice'],
      },
      {
        phase: 'Security Fundamentals (3 months)',
        duration: '3 months',
        skills: ['Cryptography', 'Authentication', 'Authorization', 'OWASP'],
        resources: ['Security+ Cert', 'OWASP Top 10', 'Practice Labs'],
      },
      {
        phase: 'Penetration Testing (3 months)',
        duration: '3 months',
        skills: ['Scanning', 'Exploitation', 'Vulnerability Assessment', 'Reporting'],
        resources: ['CEH Cert', 'HackTheBox', 'TryHackMe'],
      },
      {
        phase: 'Advanced Security (Ongoing)',
        duration: 'Ongoing',
        skills: ['Incident Response', 'SIEM', 'Threat Intelligence', 'Security Architecture'],
        resources: ['CISSP Preparation', 'Real Incidents', 'Security Research'],
      },
    ],
  },
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    icon: <Zap className="w-6 h-6" />,
    description: 'Lead marketing campaigns and strategies to achieve business objectives',
    category: 'Business',
    degreeMatch: ['bba', 'mba', 'sales'],
    skills: ['Marketing Strategy', 'Digital Marketing', 'Analytics', 'Campaign Management', 'Content Strategy'],
    roles: ['Marketing Executive', 'Marketing Manager', 'Senior Marketing Manager', 'Director of Marketing'],
    timeline: '2-3 years to Manager',
    salary_range: '₹4L - ₹30L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Marketing Fundamentals (2 months)',
        duration: '2 months',
        skills: ['4Ps of Marketing', 'Market Research', 'Consumer Psychology'],
        resources: ['Kotler Marketing', 'Google Skillshop', 'Marketing Blogs'],
      },
      {
        phase: 'Digital Marketing (2 months)',
        duration: '2 months',
        skills: ['SEO/SEM', 'Social Media Marketing', 'Email Marketing', 'Content Strategy'],
        resources: ['HubSpot Academy', 'Google Ads Course', 'SEMrush Academy'],
      },
      {
        phase: 'Analytics & Tools (2 months)',
        duration: '2 months',
        skills: ['Google Analytics', 'Campaign Tracking', 'A/B Testing', 'Excel/BI Tools'],
        resources: ['Google Analytics Cert', 'Mixpanel', 'Marketing Analytics'],
      },
      {
        phase: 'Campaign Execution (Ongoing)',
        duration: 'Ongoing',
        skills: ['Campaign Management', 'Brand Strategy', 'Budget Optimization', 'Reporting'],
        resources: ['Real Campaigns', 'Marketing Metrics', 'Industry Trends'],
      },
    ],
  },
  {
    id: 'operations-manager',
    title: 'Operations Manager',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Optimize business processes and ensure efficient operations',
    category: 'Management',
    degreeMatch: ['bba', 'mba'],
    skills: ['Process Optimization', 'Lean/Six Sigma', 'Supply Chain', 'Project Management'],
    roles: ['Operations Executive', 'Operations Manager', 'Sr. Operations Manager', 'Chief Operating Officer'],
    timeline: '2-3 years to Manager',
    salary_range: '₹4L - ₹28L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Operations Fundamentals (2 months)',
        duration: '2 months',
        skills: ['Process Mapping', 'KPIs', 'Quality Management', 'Inventory Basics'],
        resources: ['Operations Management', 'Process Optimization', 'Case Studies'],
      },
      {
        phase: 'Lean & Six Sigma (2 months)',
        duration: '2 months',
        skills: ['Lean Principles', 'Six Sigma', 'Continuous Improvement', 'Root Cause Analysis'],
        resources: ['Lean Six Sigma Course', 'DMAIC', 'Tools & Techniques'],
      },
      {
        phase: 'Project Management (2 months)',
        duration: '2 months',
        skills: ['PMP/CAPM', 'Agile', 'Risk Management', 'Stakeholder Communication'],
        resources: ['PMP Course', 'Agile Manifesto', 'Project Management Tools'],
      },
      {
        phase: 'Strategic Operations (Ongoing)',
        duration: 'Ongoing',
        skills: ['Supply Chain Management', 'Technology Implementation', 'Cost Reduction'],
        resources: ['Real Projects', 'Industry Benchmarking', 'Strategic Planning'],
      },
    ],
  },
  {
    id: 'hr-manager',
    title: 'HR Manager',
    icon: <Users className="w-6 h-6" />,
    description: 'Build high-performing teams through recruitment, development, and culture',
    category: 'Management',
    degreeMatch: ['bba', 'mba'],
    skills: ['Recruitment', 'Employee Development', 'Compensation & Benefits', 'Labor Laws'],
    roles: ['HR Executive', 'HR Manager', 'Senior HR Manager', 'Chief People Officer'],
    timeline: '2-3 years to Manager',
    salary_range: '₹4L - ₹28L+ LPA',
    difficulty: 'Beginner',
    steps: [
      {
        phase: 'HR Fundamentals (2 months)',
        duration: '2 months',
        skills: ['Indian Labor Laws', 'HR Policies', 'Organizational Behavior'],
        resources: ['HR Basics Course', 'Labor Law Books', 'SHRM Foundation'],
      },
      {
        phase: 'Recruitment & Selection (2 months)',
        duration: '2 months',
        skills: ['Job Analysis', 'Sourcing', 'Interviewing', 'Screening'],
        resources: ['Recruitment Training', 'LinkedIn Recruiter', 'Interview Techniques'],
      },
      {
        phase: 'Employee Development (2 months)',
        duration: '2 months',
        skills: ['Training Programs', 'Performance Management', 'Career Development'],
        resources: ['Learning & Development', 'Coaching Skills', 'Performance Appraisal'],
      },
      {
        phase: 'Strategic HR (Ongoing)',
        duration: 'Ongoing',
        skills: ['Organizational Culture', 'Compensation Strategy', 'Employee Engagement'],
        resources: ['Real HR Initiatives', 'Industry Standards', 'Continuous Learning'],
      },
    ],
  },
  {
    id: 'business-dev',
    title: 'Business Development Manager',
    icon: <Briefcase className="w-6 h-6" />,
    description: 'Identify growth opportunities and develop strategic business partnerships',
    category: 'Business',
    degreeMatch: ['bba', 'mba', 'sales'],
    skills: ['Strategic Planning', 'Market Analysis', 'Negotiation', 'Sales Acumen'],
    roles: ['BD Executive', 'Business Development Manager', 'Senior BD Manager', 'VP Business Development'],
    timeline: '3-4 years from Sales',
    salary_range: '₹5L - ₹40L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Market Research & Analysis (2 months)',
        duration: '2 months',
        skills: ['Market Sizing', 'Competitor Analysis', 'Industry Trends', 'Data Analysis'],
        resources: ['Market Research Reports', 'SWOT Analysis', 'Industry Databases'],
      },
      {
        phase: 'Strategic Planning (2 months)',
        duration: '2 months',
        skills: ['Business Strategy', 'Growth Hacking', 'Opportunity Identification', 'Scenario Planning'],
        resources: ['Strategy Books', 'Case Studies', 'Strategic Planning Frameworks'],
      },
      {
        phase: 'Partnerships & Negotiations (2 months)',
        duration: '2 months',
        skills: ['Partnership Development', 'Negotiation', 'Contract Management', 'Win-Win Deals'],
        resources: ['Negotiation Skills', 'Deal Structures', 'Partnership Management'],
      },
      {
        phase: 'Execution & Growth (Ongoing)',
        duration: 'Ongoing',
        skills: ['Project Management', 'Stakeholder Communication', 'Metrics & Analytics'],
        resources: ['Real Partnerships', 'Growth Initiatives', 'Strategic Reviews'],
      },
    ],
  },
  {
    id: 'account-manager',
    title: 'Account Manager',
    icon: <Award className="w-6 h-6" />,
    description: 'Manage client relationships and ensure satisfaction and growth',
    category: 'Business',
    degreeMatch: ['bba', 'sales', 'mba'],
    skills: ['Client Management', 'Communication', 'Problem Solving', 'Sales Skills'],
    roles: ['Account Manager', 'Senior Account Manager', 'Account Director', 'VP Accounts'],
    timeline: '2-3 years to Senior',
    salary_range: '₹4L - ₹32L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Client Onboarding (1 month)',
        duration: '1 month',
        skills: ['Product Knowledge', 'Client Understanding', 'Communication', 'Documentation'],
        resources: ['Onboarding Training', 'Client Profiles', 'Product Documentation'],
      },
      {
        phase: 'Account Management (2 months)',
        duration: '2 months',
        skills: ['Client Relationship Building', 'Issue Resolution', 'Regular Check-ins', 'Feedback Collection'],
        resources: ['CRM Training', 'Client Communication', 'Relationship Building'],
      },
      {
        phase: 'Growth & Retention (3 months)',
        duration: '3 months',
        skills: ['Upselling', 'Cross-selling', 'Renewal Management', 'Expansion Planning'],
        resources: ['Sales Techniques', 'Product Knowledge Deep Dive', 'Success Stories'],
      },
      {
        phase: 'Strategic Account Development (Ongoing)',
        duration: 'Ongoing',
        skills: ['Strategic Planning', 'Executive Relationships', 'Business Impact Analysis'],
        resources: ['Real Accounts', 'Strategic Reviews', 'Industry Knowledge'],
      },
    ],
  },
  {
    id: 'sales-manager',
    title: 'Sales Manager',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Lead sales teams and drive revenue targets through effective management',
    category: 'Management',
    degreeMatch: ['bba', 'sales', 'mba'],
    skills: ['Team Leadership', 'Sales Strategy', 'Coaching', 'Performance Management'],
    roles: ['Sales Manager', 'Senior Sales Manager', 'Regional Manager', 'VP Sales'],
    timeline: '3-4 years from Sales',
    salary_range: '₹6L - ₹45L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Sales Excellence (3 months)',
        duration: '3 months',
        skills: ['Advanced Sales Techniques', 'Complex Deals', 'Top Performer Skills'],
        resources: ['Sales Mastery', 'Real Sales Experience', 'Mentor Guidance'],
      },
      {
        phase: 'Leadership Fundamentals (2 months)',
        duration: '2 months',
        skills: ['Management Basics', 'Team Building', 'Communication', 'Motivation'],
        resources: ['Leadership Course', 'Coaching Skills', 'Management Books'],
      },
      {
        phase: 'Sales Management (3 months)',
        duration: '3 months',
        skills: ['Sales Forecasting', 'Team Coaching', 'Pipeline Management', 'Performance Reviews'],
        resources: ['Sales Management', 'Forecasting Tools', 'Team Development'],
      },
      {
        phase: 'Strategic Leadership (Ongoing)',
        duration: 'Ongoing',
        skills: ['Strategic Planning', 'Territory Management', 'Cultural Leadership', 'Scaling Teams'],
        resources: ['Strategic Sales', 'Real Management Role', 'Executive Coaching'],
      },
    ],
  },
  {
    id: 'consultant',
    title: 'Management Consultant',
    icon: <Lightbulb className="w-6 h-6" />,
    description: 'Help organizations solve complex problems and drive transformation',
    category: 'Business',
    degreeMatch: ['mba', 'bba'],
    skills: ['Problem Solving', 'Analysis', 'Communication', 'Business Acumen'],
    roles: ['Analyst', 'Consultant', 'Senior Consultant', 'Manager/Partner'],
    timeline: '2-3 years to Senior',
    salary_range: '₹5L - ₹50L+ LPA',
    difficulty: 'Advanced',
    steps: [
      {
        phase: 'Consulting Fundamentals (2 months)',
        duration: '2 months',
        skills: ['Problem Framing', 'Hypothesis Driven', 'Analysis Skills', 'Business Acumen'],
        resources: ['Cracking Consulting', 'Case Interview Prep', 'Business Books'],
      },
      {
        phase: 'Frameworks & Tools (2 months)',
        duration: '2 months',
        skills: ['MECE Principle', 'Porter Five Forces', 'Value Chain', 'Financial Analysis'],
        resources: ['Consulting Frameworks', 'Excel Mastery', 'Real Case Studies'],
      },
      {
        phase: 'Communication & Presentation (2 months)',
        duration: '2 months',
        skills: ['Executive Communication', 'Data Visualization', 'Storytelling', 'Deck Creation'],
        resources: ['Presentation Skills', 'Design Thinking', 'PowerPoint Mastery'],
      },
      {
        phase: 'Client Engagement (Ongoing)',
        duration: 'Ongoing',
        skills: ['Client Management', 'Team Leadership', 'Project Management', 'Industry Expertise'],
        resources: ['Real Engagements', 'Mentorship', 'Industry Deep Dives'],
      },
    ],
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    icon: <Database className="w-6 h-6" />,
    description: 'Build data pipelines and infrastructure to support analytics and ML',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['Python/Scala', 'SQL', 'Big Data Tools', 'ETL', 'Data Warehousing'],
    roles: ['Junior Data Engineer', 'Data Engineer', 'Senior Data Engineer', 'Data Architect'],
    timeline: '2-3 years to Senior',
    salary_range: '₹6L - ₹48L+ LPA',
    difficulty: 'Advanced',
    steps: [
      {
        phase: 'SQL & Database Design (2 months)',
        duration: '2 months',
        skills: ['Advanced SQL', 'Database Design', 'Indexing', 'Query Optimization'],
        resources: ['SQL Advanced', 'Database Theory', 'Practice Problems'],
      },
      {
        phase: 'ETL & Data Pipelines (3 months)',
        duration: '3 months',
        skills: ['ETL Concepts', 'Apache Airflow', 'Data Validation', 'Error Handling'],
        resources: ['Airflow Tutorial', 'ETL Best Practices', 'Real Pipelines'],
      },
      {
        phase: 'Big Data Technologies (3 months)',
        duration: '3 months',
        skills: ['Spark', 'Hadoop', 'Kafka', 'Data Warehousing'],
        resources: ['Spark Documentation', 'Databricks Academy', 'Big Data Courses'],
      },
      {
        phase: 'Production Data Systems (3 months)',
        duration: '3 months',
        skills: ['Data Quality', 'Monitoring', 'Scaling', 'Cloud Platforms'],
        resources: ['Data Engineering Books', 'Real Projects', 'Architecture Patterns'],
      },
    ],
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    icon: <Cpu className="w-6 h-6" />,
    description: 'Design and deploy machine learning models to production systems',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['Python', 'ML Algorithms', 'Deep Learning', 'MLOps', 'Deployment'],
    roles: ['ML Engineer', 'Senior ML Engineer', 'ML Architect', 'Head of ML'],
    timeline: '3-4 years from Data Science',
    salary_range: '₹8L - ₹55L+ LPA',
    difficulty: 'Advanced',
    steps: [
      {
        phase: 'ML Fundamentals (3 months)',
        duration: '3 months',
        skills: ['Supervised Learning', 'Unsupervised Learning', 'Evaluation Metrics'],
        resources: ['ML Course', 'Scikit-learn', 'Kaggle Competitions'],
      },
      {
        phase: 'Deep Learning & Advanced ML (4 months)',
        duration: '4 months',
        skills: ['Neural Networks', 'CNNs', 'RNNs', 'Transformers', 'Fine-tuning'],
        resources: ['Deep Learning Course', 'PyTorch/TensorFlow', 'Research Papers'],
      },
      {
        phase: 'MLOps & Production (3 months)',
        duration: '3 months',
        skills: ['Model Versioning', 'ML Pipelines', 'Model Monitoring', 'A/B Testing'],
        resources: ['MLOps Basics', 'MLflow', 'Production ML Systems'],
      },
      {
        phase: 'Scalable ML Systems (Ongoing)',
        duration: 'Ongoing',
        skills: ['Distributed Training', 'Real-time ML', 'Feature Engineering at Scale'],
        resources: ['Production ML', 'System Design', 'ML Research'],
      },
    ],
  },
  {
    id: 'solutions-architect',
    title: 'Solutions Architect',
    icon: <GitBranch className="w-6 h-6" />,
    description: 'Design technical solutions that meet client business requirements',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['System Design', 'Cloud Platforms', 'Technical Communication', 'Business Acumen'],
    roles: ['Solutions Architect', 'Enterprise Architect', 'Principal Architect'],
    timeline: '4-5 years from SDE',
    salary_range: '₹12L - ₹60L+ LPA',
    difficulty: 'Advanced',
    steps: [
      {
        phase: 'System Design Mastery (3 months)',
        duration: '3 months',
        skills: ['Large Scale Design', 'Architecture Patterns', 'Trade-offs'],
        resources: ['System Design Primer', 'DDIA', 'Architecture Patterns'],
      },
      {
        phase: 'Cloud Architecture (3 months)',
        duration: '3 months',
        skills: ['AWS/Azure Architecture', 'Multi-region Design', 'Disaster Recovery'],
        resources: ['AWS Architect Cert', 'Cloud Design Patterns', 'Case Studies'],
      },
      {
        phase: 'Business & Communication (2 months)',
        duration: '2 months',
        skills: ['Stakeholder Communication', 'RFP Responses', 'Proposal Writing'],
        resources: ['Communication Skills', 'Sales Engineering', 'Business Acumen'],
      },
      {
        phase: 'Client Engagement (Ongoing)',
        duration: 'Ongoing',
        skills: ['Discovery', 'Solution Design', 'Implementation Oversight'],
        resources: ['Real Projects', 'Client Work', 'Industry Leadership'],
      },
    ],
  },
  {
    id: 'qa-engineer',
    title: 'QA Engineer',
    icon: <FileText className="w-6 h-6" />,
    description: 'Ensure software quality through comprehensive testing and automation',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['Test Automation', 'SQL', 'API Testing', 'Test Strategy'],
    roles: ['QA Engineer', 'Senior QA', 'QA Lead', 'Test Architect'],
    timeline: '2-3 years to Senior',
    salary_range: '₹4L - ₹28L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'QA Fundamentals (2 months)',
        duration: '2 months',
        skills: ['Testing Types', 'Bug Reporting', 'Test Case Design', 'SDLC'],
        resources: ['QA Basics', 'Testing Principles', 'Industry Standards'],
      },
      {
        phase: 'Automation Testing (3 months)',
        duration: '3 months',
        skills: ['Selenium', 'Test Automation Frameworks', 'CI/CD Integration'],
        resources: ['Selenium Tutorial', 'Automation Frameworks', 'Practice Suites'],
      },
      {
        phase: 'API & Performance Testing (2 months)',
        duration: '2 months',
        skills: ['Postman/RestAssured', 'Performance Testing', 'Load Testing'],
        resources: ['API Testing Course', 'JMeter/LoadRunner', 'Performance Tools'],
      },
      {
        phase: 'Test Strategy & Leadership (Ongoing)',
        duration: 'Ongoing',
        skills: ['Test Planning', 'Team Leadership', 'Quality Metrics', 'Risk-based Testing'],
        resources: ['Real Projects', 'Quality Strategy', 'Industry Trends'],
      },
    ],
  },
  {
    id: 'finance-analyst',
    title: 'Finance Analyst',
    icon: <BarChart3 className="w-6 h-6" />,
    description: 'Analyze financial data and provide insights for business decisions',
    category: 'Business',
    degreeMatch: ['mba', 'bba'],
    skills: ['Financial Analysis', 'Modeling', 'Excel', 'Accounting', 'Valuation'],
    roles: ['Financial Analyst', 'Senior Financial Analyst', 'Finance Manager', 'CFO'],
    timeline: '2-3 years to Senior',
    salary_range: '₹5L - ₹35L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Accounting Fundamentals (2 months)',
        duration: '2 months',
        skills: ['Financial Statements', 'Accounting Principles', 'Journal Entries'],
        resources: ['Accounting Basics', 'Coursera Finance', 'Financial Accounting'],
      },
      {
        phase: 'Financial Analysis (2 months)',
        duration: '2 months',
        skills: ['Ratio Analysis', 'Trend Analysis', 'Cash Flow Analysis'],
        resources: ['Financial Analysis Guide', 'Case Studies', 'Real Statements'],
      },
      {
        phase: 'Financial Modeling (2 months)',
        duration: '2 months',
        skills: ['Excel Modeling', 'Valuation Methods', 'Scenario Analysis'],
        resources: ['Financial Modeling Course', 'Model Templates', 'Practice Problems'],
      },
      {
        phase: 'Advanced Finance (Ongoing)',
        duration: 'Ongoing',
        skills: ['Corporate Finance', 'Investment Analysis', 'Strategic Planning'],
        resources: ['Advanced Finance', 'CFA Level 1', 'Real Financial Projects'],
      },
    ],
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    icon: <Target className="w-6 h-6" />,
    description: 'Lead projects to successful completion within scope, time, and budget',
    category: 'Management',
    degreeMatch: ['bba', 'mba'],
    skills: ['Project Planning', 'Risk Management', 'Leadership', 'Communication'],
    roles: ['Project Coordinator', 'Project Manager', 'Senior PM', 'Program Manager'],
    timeline: '2-3 years to Mid-level',
    salary_range: '₹5L - ₹32L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Project Management Basics (2 months)',
        duration: '2 months',
        skills: ['PMBOK', 'Project Lifecycle', 'Scope Management', 'Planning'],
        resources: ['CAPM Course', 'PMP Prep', 'Project Management Institute'],
      },
      {
        phase: 'Tools & Techniques (2 months)',
        duration: '2 months',
        skills: ['MS Project', 'JIRA', 'Gantt Charts', 'Risk Assessment'],
        resources: ['Project Tools Tutorial', 'PM Software', 'Hands-on Practice'],
      },
      {
        phase: 'Agile & Scrum (2 months)',
        duration: '2 months',
        skills: ['Agile Principles', 'Scrum Framework', 'Sprint Planning', 'Backlog Management'],
        resources: ['Scrum Master Course', 'Agile Manifesto', 'Real Sprints'],
      },
      {
        phase: 'Leadership & Execution (Ongoing)',
        duration: 'Ongoing',
        skills: ['Team Leadership', 'Stakeholder Management', 'Risk Mitigation', 'Quality Assurance'],
        resources: ['Real Projects', 'Mentorship', 'Continuous Learning'],
      },
    ],
  },
  {
    id: 'enterprise-architect',
    title: 'Enterprise Architect',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Design enterprise-level technology strategies and solutions',
    category: 'Technical',
    degreeMatch: ['btech', 'mba'],
    skills: ['Enterprise Architecture', 'Business Strategy', 'Technology Planning', 'Governance'],
    roles: ['Solutions Architect', 'Enterprise Architect', 'Chief Architect', 'CTO'],
    timeline: '8-10 years from SDE',
    salary_range: '₹15L - ₹80L+ LPA',
    difficulty: 'Advanced',
    steps: [
      {
        phase: 'Technical Foundation (3 years)',
        duration: '3 years',
        skills: ['Full-stack Development', 'System Design', 'Cloud Expertise'],
        resources: ['Strong SDE Background', 'Architecture Learning', 'System Design'],
      },
      {
        phase: 'Architecture & Design Patterns (2 years)',
        duration: '2 years',
        skills: ['TOGAF', 'Enterprise Patterns', 'Technology Stack Decisions'],
        resources: ['TOGAF Certification', 'Architecture Patterns', 'Case Studies'],
      },
      {
        phase: 'Business Acumen (1 year)',
        duration: '1 year',
        skills: ['Digital Transformation', 'Technology ROI', 'Strategic Planning'],
        resources: ['Business Strategy', 'Digital Transformation', 'Executive Leadership'],
      },
      {
        phase: 'Enterprise Leadership (Ongoing)',
        duration: 'Ongoing',
        skills: ['Organizational Change', 'Governance', 'Vendor Management', 'Innovation'],
        resources: ['Real Enterprise Work', 'Executive Coaching', 'Industry Leadership'],
      },
    ],
  },
  {
    id: 'content-strategist',
    title: 'Content Strategist',
    icon: <FileText className="w-6 h-6" />,
    description: 'Develop content strategies that drive engagement and business goals',
    category: 'Business',
    degreeMatch: ['bba', 'mba'],
    skills: ['Content Planning', 'SEO', 'Analytics', 'Storytelling', 'Brand Strategy'],
    roles: ['Content Creator', 'Content Strategist', 'Senior Content Strategist', 'Content Director'],
    timeline: '2-3 years to Senior',
    salary_range: '₹4L - ₹25L+ LPA',
    difficulty: 'Intermediate',
    steps: [
      {
        phase: 'Content Fundamentals (2 months)',
        duration: '2 months',
        skills: ['Content Types', 'Brand Voice', 'Writing Skills', 'Publishing Platforms'],
        resources: ['Content Strategy Guide', 'Writing Courses', 'Medium/Blog Practice'],
      },
      {
        phase: 'SEO & Distribution (2 months)',
        duration: '2 months',
        skills: ['SEO Fundamentals', 'Keyword Research', 'Content Distribution', 'Social Media'],
        resources: ['SEO Course', 'Yoast SEO', 'Content Distribution Platforms'],
      },
      {
        phase: 'Analytics & Optimization (2 months)',
        duration: '2 months',
        skills: ['Content Analytics', 'Engagement Metrics', 'A/B Testing', 'Performance Tracking'],
        resources: ['Analytics Tools', 'Content Performance', 'Real Data Analysis'],
      },
      {
        phase: 'Strategic Content Planning (Ongoing)',
        duration: 'Ongoing',
        skills: ['Content Calendar', 'Audience Insights', 'Brand Storytelling', 'Campaign Strategy'],
        resources: ['Real Content Initiatives', 'Trend Analysis', 'Creative Direction'],
      },
    ],
  },
];

const RoadmapCard = ({ roadmap, isExpanded, onToggle }: any) => {
  return (
    <div
      className={`border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/50 cursor-pointer hover:border-gray-700 group ${
        isExpanded ? 'col-span-full' : ''
      }`}
    >
      <div
        onClick={onToggle}
        className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-gray-800 hover:to-gray-900 transition-all duration-300 border-b border-gray-800 group-hover:border-gray-700"
      >
        <div className="flex items-start justify-between">
          <div className="flex gap-4 flex-1">
            <div className="text-blue-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">{roadmap.icon}</div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-white group-hover:text-blue-300 transition-colors">{roadmap.title}</h3>
              <p className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">{roadmap.description}</p>
              <div className="flex gap-3 mt-4 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                  roadmap.difficulty === 'Beginner' ? 'bg-green-900/40 text-green-300 border border-green-700/50' :
                  roadmap.difficulty === 'Intermediate' ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50' :
                  'bg-red-900/40 text-red-300 border border-red-700/50'
                }`}>
                  {roadmap.difficulty}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-900/40 text-purple-300 font-bold border border-purple-700/50">
                  {roadmap.timeline}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-900/40 text-blue-300 font-bold border border-blue-700/50">
                  {roadmap.salary_range}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            {isExpanded ? <ChevronDown className="w-5 h-5 text-blue-400" /> : <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 border-t border-gray-800 bg-gray-900/50">
          <div className="space-y-6">
            <div>
              <h4 className="font-black text-gray-100 mb-3 flex items-center gap-2 uppercase tracking-widest text-sm">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                Suitable Degrees
              </h4>
              <div className="flex gap-2 flex-wrap">
                {roadmap.degreeMatch.map((degree: string) => (
                  <span key={degree} className="text-sm px-3 py-1 rounded-full bg-indigo-900/40 text-indigo-300 font-bold border border-indigo-700/50">
                    {degree.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black text-gray-100 mb-3 flex items-center gap-2 uppercase tracking-widest text-sm">
                <Award className="w-5 h-5 text-blue-400" />
                Key Skills to Develop
              </h4>
              <div className="flex gap-2 flex-wrap">
                {roadmap.skills.map((skill: string, idx: number) => (
                  <span key={idx} className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-700/50 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black text-gray-100 mb-3 flex items-center gap-2 uppercase tracking-widest text-sm">
                <Briefcase className="w-5 h-5 text-blue-400" />
                Career Progression
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                {roadmap.roles.map((role: string, idx: number) => (
                  <React.Fragment key={idx}>
                    <span className="text-sm px-3 py-1 rounded-full bg-green-900/40 text-green-300 font-bold border border-green-700/50">{role}</span>
                    {idx < roadmap.roles.length - 1 && <ArrowRight className="w-4 h-4 text-gray-600" />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black text-gray-100 mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
                <Zap className="w-5 h-5 text-blue-400" />
                Learning Roadmap
              </h4>
              <div className="space-y-4">
                {roadmap.steps.map((step: any, idx: number) => (
                  <div key={idx} className="border-l-4 border-blue-500/50 pl-4 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-100">{step.phase}</p>
                        <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4" />
                          {step.duration}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-bold text-gray-300 mb-2">Skills to Learn:</p>
                      <div className="flex gap-2 flex-wrap">
                        {step.skills.map((skill: string, i: number) => (
                          <span key={i} className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-bold text-gray-300 mb-2">Resources:</p>
                      <div className="flex gap-2 flex-wrap">
                        {step.resources.map((resource: string, i: number) => (
                          <span key={i} className="text-xs px-2 py-1 rounded bg-indigo-900/40 text-indigo-300 border border-indigo-700/50">
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function CareerRoadmapPage() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<DegreeType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<RoadmapCategory | null>(null);

  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    const degreeMatch = !selectedDegree || roadmap.degreeMatch.includes(selectedDegree);
    const categoryMatch = !selectedCategory || roadmap.category === selectedCategory;
    return degreeMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Back Button & Header */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -top-40 right-1/4 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative px-6 pt-8 pb-16">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-white font-semibold transition-all duration-300 border border-gray-700 hover:border-gray-600 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          {/* Main Title & Description */}
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
              Career Roadmap Explorer
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Discover <span className="text-blue-400 font-semibold">30+ career paths</span> tailored for <span className="text-purple-400 font-semibold">MBA, B.Tech, BBA,</span> and <span className="text-pink-400 font-semibold">Sales</span> professionals. Learn what skills you need, how long it takes, and where to start.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 border-y border-gray-800 sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-black mb-4 text-sm uppercase tracking-widest text-gray-300">Filter by Degree</h3>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setSelectedDegree(null)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    !selectedDegree
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/50'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  All Degrees
                </button>
                {[
                  { value: 'btech', label: 'B.Tech', color: 'from-blue-600 to-blue-700' },
                  { value: 'mba', label: 'MBA', color: 'from-purple-600 to-purple-700' },
                  { value: 'bba', label: 'BBA', color: 'from-pink-600 to-pink-700' },
                  { value: 'sales', label: 'Sales Pro', color: 'from-orange-600 to-orange-700' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedDegree(option.value as DegreeType)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      selectedDegree === option.value
                        ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-black mb-4 text-sm uppercase tracking-widest text-gray-300">Filter by Category</h3>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    !selectedCategory
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/50'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  All Categories
                </button>
                {['Technical', 'Management', 'Business', 'Sales'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as RoadmapCategory)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-600/50'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmaps Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {filteredRoadmaps.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl font-medium">No roadmaps found for your selection. Try different filters!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoadmaps.map((roadmap) => (
              <RoadmapCard
                key={roadmap.id}
                roadmap={roadmap}
                isExpanded={expandedId === roadmap.id}
                onToggle={() => setExpandedId(expandedId === roadmap.id ? null : roadmap.id)}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-20 pt-16 border-t border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Platform Statistics</h2>
            <p className="text-gray-400 text-lg">Everything you need to know about our career roadmaps</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-800/50">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">{roadmaps.length}+</div>
              <p className="text-gray-400 mt-3 font-semibold">Career Paths</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-purple-900/10 border border-purple-800/50">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">{new Set(roadmaps.map(r => r.category)).size}</div>
              <p className="text-gray-400 mt-3 font-semibold">Categories</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-pink-900/30 to-pink-900/10 border border-pink-800/50">
              <div className="text-4xl font-black bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent">4</div>
              <p className="text-gray-400 mt-3 font-semibold">Degree Types</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-indigo-900/30 to-indigo-900/10 border border-indigo-800/50">
              <div className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">400+</div>
              <p className="text-gray-400 mt-3 font-semibold">Skills Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 mt-20 py-12 text-center bg-gradient-to-br from-gray-900 to-black">
        <p className="text-gray-400 text-lg font-medium">Start your career journey today. Click on any roadmap to explore detailed learning paths and resources.</p>
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={() => router.back()} className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors border border-gray-700 hover:border-gray-600">
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}