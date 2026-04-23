/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Seed script for Wahaj's portfolio database.
 * Run: npx tsx scripts/seed.ts
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const categories = [
  { name: 'Full Stack', slug: 'full-stack', icon: '💻', color: '#FF6B6B', type: 'project' },
  { name: 'Machine Learning', slug: 'machine-learning', icon: '🤖', color: '#A78BFA', type: 'project' },
  { name: 'Frontend', slug: 'frontend', icon: '🎨', color: '#4ECDC4', type: 'project' },
  { name: 'Mobile', slug: 'mobile', icon: '📱', color: '#02569B', type: 'project' },
  { name: 'Academic', slug: 'academic', icon: '📚', color: '#FFD93D', type: 'project' },
  { name: 'Tech', slug: 'tech', icon: '⚡', color: '#FF6B6B', type: 'blog' },
  { name: 'Career', slug: 'career', icon: '🚀', color: '#4ECDC4', type: 'blog' },
  { name: 'Tutorials', slug: 'tutorials', icon: '📖', color: '#FFD93D', type: 'blog' },
  { name: 'Work', slug: 'work', icon: '💼', color: '#FF9F43', type: 'experience' },
  { name: 'Education', slug: 'education', icon: '🎓', color: '#A78BFA', type: 'experience' },
  { name: 'Volunteering', slug: 'volunteering', icon: '🌱', color: '#4ECDC4', type: 'experience' },
  { name: 'Award', slug: 'award', icon: '🏆', color: '#FFD93D', type: 'experience' },
  { name: 'Updates', slug: 'updates', icon: '📣', color: '#FF6B6B', type: 'post' },
  { name: 'Projects', slug: 'projects-post', icon: '🛠️', color: '#4ECDC4', type: 'post' },
  { name: 'Life', slug: 'life', icon: '✨', color: '#FF9F43', type: 'post' },
];

const skills = [
  { name: 'React.js', color: '#61DAFB', category: 'frontend', proficiency: 90, is_featured: true },
  { name: 'Next.js', color: '#000000', category: 'frontend', proficiency: 88, is_featured: true },
  { name: 'TypeScript', color: '#3178C6', category: 'frontend', proficiency: 85, is_featured: true },
  { name: 'Tailwind CSS', color: '#06B6D4', category: 'frontend', proficiency: 92 },
  { name: 'Figma', color: '#F24E1E', category: 'design', proficiency: 78 },
  { name: 'Node.js', color: '#339933', category: 'backend', proficiency: 82, is_featured: true },
  { name: 'Python', color: '#3776AB', category: 'backend', proficiency: 85, is_featured: true },
  { name: 'Flask', color: '#000000', category: 'backend', proficiency: 80 },
  { name: 'PostgreSQL', color: '#336791', category: 'backend', proficiency: 78 },
  { name: 'MongoDB', color: '#47A248', category: 'backend', proficiency: 75 },
  { name: 'Scikit-learn', color: '#F7931E', category: 'ml', proficiency: 78, is_featured: true },
  { name: 'NLP', color: '#A78BFA', category: 'ml', proficiency: 72 },
  { name: 'Docker', color: '#2496ED', category: 'devops', proficiency: 75 },
  { name: 'Git/GitHub', color: '#181717', category: 'devops', proficiency: 90 },
  { name: 'Linux', color: '#FCC624', category: 'devops', proficiency: 72 },
  { name: 'Flutter', color: '#02569B', category: 'mobile', proficiency: 80, is_featured: true },
  { name: 'Dart', color: '#0175C2', category: 'mobile', proficiency: 78 },
  { name: 'C++', color: '#00599C', category: 'tools', proficiency: 75 },
  { name: 'SQL', color: '#4479A1', category: 'tools', proficiency: 80 },
];

const experiences = [
  {
    company: 'Glass & Doors UK',
    role: 'Full-Stack Developer',
    company_url: 'https://glassanddoors.vercel.app/',
    start_date: '2024-01-01',
    is_current: true,
    type: 'work',
    description: [
      'Architected and developed a complete e-commerce platform from scratch for the UK\'s leading supplier of aluminium bifold doors.',
      'Implemented a full product catalog with bespoke configurators, mega-menu navigation, and category browsing.',
      'Integrated PayPal payment processing, shopping cart, user authentication, and a quote request system.',
      'Achieved excellent SEO and performance metrics with SSR and optimized images.',
      'Deployed on Vercel with continuous delivery, serving real customers with 4.8/5 Trustpilot ratings.',
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'PayPal', 'Vercel'],
    is_featured: true,
  },
  {
    company: 'CapregSoft (Pvt) Ltd',
    role: 'Frontend Engineer Trainee',
    company_url: 'https://capregsoft.com/',
    start_date: '2024-08-01',
    end_date: '2025-03-01',
    is_current: false,
    type: 'work',
    description: [
      'Collaborated with cross-functional teams to engineer the frontend architecture for "FusionIQX".',
      'Coordinated the development of the "Airport Taxihub" core booking interface.',
      'Managed Docker containerization integration across the team.',
    ],
    technologies: ['React.js', 'Docker', 'GitHub'],
    is_featured: true,
  },
  {
    company: 'Airport Taxihub',
    role: 'Freelance Flutter Developer',
    company_url: 'https://airporttaxihub.com',
    start_date: '2025-01-01',
    is_current: false,
    type: 'work',
    description: [
      'Developed "AeroTaxi" — a cross-platform Flutter mobile app for airport transfer bookings.',
      'Integrated Stripe payment processing, real-time map navigation, and ride tracking.',
      'Built a polished UI with vehicle selection, booking confirmation flow, and animations.',
    ],
    technologies: ['Flutter', 'Dart', 'Stripe', 'Google Maps', 'REST APIs'],
    is_featured: true,
  },
  {
    company: 'Meta (Coursera)',
    role: 'Front-End Developer Trainee',
    company_url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
    start_date: '2024-04-01',
    end_date: '2024-04-30',
    is_current: false,
    type: 'internship',
    description: [
      'Delivered the "Little Lemon" web app with a 98/100 Lighthouse performance score.',
      'Mastered advanced React hooks for responsive design.',
    ],
    technologies: ['React.js', 'UI/UX'],
  },
  {
    company: 'COMSATS Sports Society',
    role: 'Software Engineering Head',
    start_date: '2023-01-01',
    end_date: '2024-12-31',
    is_current: false,
    type: 'volunteering',
    description: [
      'Managed the development and deployment of a custom portal for society operations.',
      'Spearheaded technical workshops for junior students.',
    ],
    technologies: ['Web Development', 'Portal Management'],
  },
  {
    company: 'COMSATS University Islamabad',
    role: 'BS Software Engineering',
    company_url: 'https://www.comsats.edu.pk/',
    start_date: '2022-09-01',
    end_date: '2026-06-01',
    is_current: true,
    type: 'education',
    description: [
      'Pursuing BSc in Software Engineering with a 3.62 CGPA.',
      'Coursework: DSA, Design & Architecture, Information Security, Requirements Engineering.',
      'Recipient of the Prime Minister Laptop Award.',
    ],
    technologies: [],
  },
  {
    company: 'Prime Minister of Pakistan',
    role: 'PM Laptop Award Recipient',
    start_date: '2024-01-01',
    is_current: false,
    type: 'award',
    description: ['Awarded the PM Laptop Scheme for outstanding academic merit at COMSATS University Islamabad.'],
    technologies: [],
  },
];

const projects = [
  {
    title: 'ClarityWorks',
    slug: 'clarityworks',
    short_description: 'AI-Powered Readability Analysis Platform using Three-Tier Microservices Architecture.',
    thumbnail_url: '/clarityworks-live.jpg',
    github_url: 'https://github.com/ESE-wahaj/textanalyzer-pro',
    live_url: 'https://textanalyzer-pro.vercel.app',
    technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'Flask', 'PostgreSQL', 'NLP', 'Scikit-learn'],
    is_featured: true,
    status: 'in_progress',
    long_description: 'ClarityWorks is a sophisticated Final Year Project leveraging machine learning and NLP to analyze text readability. Built on a Three-Tier Microservices Architecture with React/TypeScript frontend, Node.js business logic, and Python/Flask ML service.',
  },
  {
    title: 'Glass & Doors UK',
    slug: 'glass-and-doors',
    short_description: "Full e-commerce platform for UK's leading aluminium bifold doors supplier.",
    thumbnail_url: '/glassanddoors.jpg',
    live_url: 'https://glassanddoors.vercel.app/',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'PayPal', 'Vercel'],
    is_featured: true,
    status: 'completed',
  },
  {
    title: 'JAAW - Video Conferencing',
    slug: 'jaaw',
    short_description: 'Real-time web video conferencing app with multi-user support and screen sharing.',
    thumbnail_url: '/jaaw-live.jpg',
    github_url: 'https://github.com/ESE-wahaj/JAAW',
    live_url: 'https://jaaw.netlify.app/login',
    technologies: ['React', 'TypeScript', 'Redux', 'Firebase', 'WebRTC', 'Zego Cloud'],
    is_featured: true,
    status: 'completed',
  },
  {
    title: 'Airport Taxihub',
    slug: 'airport-taxihub',
    short_description: 'Core booking interface for an airport taxi service.',
    thumbnail_url: '/airport-taxi-github.jpg',
    github_url: 'https://github.com/ESE-Wahaj/project-airport-taxi',
    live_url: 'https://frontend-sand-nu-97.vercel.app/',
    technologies: ['React.js', 'CSS', 'REST APIs'],
    status: 'completed',
  },
  {
    title: 'Content Extractor with Gemini OCR',
    slug: 'content-extractor-gemini',
    short_description: 'Tool leveraging Google Gemini OCR to extract content from images and documents.',
    thumbnail_url: '/textanalyzer.jpg',
    github_url: 'https://github.com/ESE-wahaj/content-extractor---with-gemniOCR',
    technologies: ['JavaScript', 'Gemini API', 'OCR'],
    status: 'completed',
  },
  {
    title: 'Fake Job Posting Detection',
    slug: 'fake-job-detection',
    short_description: 'ML project to detect fraudulent job postings using classification algorithms.',
    thumbnail_url: '/fakejob.jpg',
    github_url: 'https://github.com/ESE-wahaj/FakeJobPostingDetection',
    technologies: ['Python', 'ML', 'NLP', 'Scikit-learn'],
    status: 'completed',
  },
  {
    title: 'Airbnb Clone',
    slug: 'airbnb-clone',
    short_description: 'Full-featured Airbnb clone with property listings and booking functionality.',
    thumbnail_url: '/airbnb.jpg',
    github_url: 'https://github.com/ESE-wahaj/airbnb',
    technologies: ['TypeScript', 'Next.js', 'React'],
    status: 'completed',
  },
  {
    title: 'Shell Simulator',
    slug: 'shell-simulator',
    short_description: 'Web-based shell/terminal simulator built with JavaScript.',
    thumbnail_url: '/shellsim-live.jpg',
    github_url: 'https://github.com/ESE-wahaj/ShellSIm',
    live_url: 'https://shellsim-wahaj.vercel.app',
    technologies: ['JavaScript', 'Node.js'],
    status: 'completed',
  },
  {
    title: 'Chat Application',
    slug: 'chat-application',
    short_description: 'Java-based chat program with authentication and real-time messaging.',
    thumbnail_url: '/chatapp.jpg',
    github_url: 'https://github.com/ESE-wahaj/Chat-Application',
    technologies: ['Java', 'MySQL', 'Sockets'],
    status: 'completed',
  },
  {
    title: 'AeroTaxi - Airport Transfer Booking App',
    slug: 'aerotaxi',
    short_description: 'Cross-platform Flutter mobile app for booking airport taxi transfers with real-time maps, Stripe payments, and ride tracking.',
    thumbnail_url: '/aerotaxi-loading.png',
    github_url: 'https://github.com/ESE-Wahaj/aerotaxi-app',
    screenshots: [
      '/aerotaxi-app.png',
      '/aerotaxi-choose-ride.png',
      '/aerotaxi-details1.png',
      '/aerotaxi-details2.png',
      '/aerotaxi-confirmation.png',
      '/aerotaxi-payments.png',
      '/aerotaxi-stripe.png',
      '/aerotaxi-loading.png',
    ],
    technologies: ['Flutter', 'Dart', 'Stripe', 'Google Maps', 'Provider', 'REST APIs'],
    is_featured: true,
    status: 'completed',
    long_description: 'AeroTaxi is a full-featured airport transfer booking mobile application built as freelance work for airporttaxihub.com. It features real-time map integration with flutter_map, Stripe payment processing, ride confirmation flow, vehicle selection, and a polished UI with animations. The app supports both iOS and Android platforms with a single codebase.',
  },
  {
    title: 'Algorithmic Racing Simulation',
    slug: 'racing-simulation',
    short_description: 'Real-time maze-solving simulation implementing graph theory pathfinding.',
    thumbnail_url: '/tardis.png',
    technologies: ['C++', 'Data Structures', 'Graph Theory'],
    status: 'completed',
  },
];

async function seed() {
  console.log('🌱 Seeding database...\n');

  // Categories
  console.log('📁 Seeding categories...');
  const { error: catError } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' });
  if (catError) console.error('  Error:', catError.message);
  else console.log('  ✅ Categories seeded');

  // Skills
  console.log('🎯 Seeding skills...');
  const { error: skillError } = await supabase.from('skills').insert(skills);
  if (skillError) console.error('  Error:', skillError.message);
  else console.log('  ✅ Skills seeded');

  // Experiences
  console.log('💼 Seeding experiences...');
  const { error: expError } = await supabase.from('experiences').insert(experiences);
  if (expError) console.error('  Error:', expError.message);
  else console.log('  ✅ Experiences seeded');

  // Projects
  console.log('🚀 Seeding projects...');
  const { error: projError } = await supabase.from('projects').upsert(projects, { onConflict: 'slug' });
  if (projError) console.error('  Error:', projError.message);
  else console.log('  ✅ Projects seeded');

  // Site Settings
  console.log('⚙️  Seeding settings...');
  const settings = [
    { key: 'site_title', value: 'M. Wahaj Naveed' },
    { key: 'site_tagline', value: 'Software Engineer | Full-Stack, Flutter & ML Developer' },
    { key: 'site_email', value: 'contactwahajnaveed@gmail.com' },
    { key: 'site_phone', value: '+92 313 5347070' },
    { key: 'site_location', value: 'Wah, Islamabad, Pakistan' },
    { key: 'github_url', value: 'https://github.com/ESE-wahaj' },
    { key: 'linkedin_url', value: 'https://www.linkedin.com/in/muhammadwahajnaveed' },
    { key: 'instagram_url', value: 'https://www.instagram.com/wahajnaveed' },
  ];
  const { error: settError } = await supabase.from('site_settings').upsert(settings, { onConflict: 'key' });
  if (settError) console.error('  Error:', settError.message);
  else console.log('  ✅ Settings seeded');

  console.log('\n✨ Seeding complete!');
}

seed().catch(console.error);
