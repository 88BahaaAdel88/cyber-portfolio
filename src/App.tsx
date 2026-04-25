import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'react-hot-toast';
import {
  Terminal,
  Shield,
  Network,
  Cpu,
  Code,
  Search,
  Lock,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  Globe,
  Flag,
  Swords,
  Database,
  MessageSquare,
  BookOpen,
  Bug,
  Activity,
  ArrowLeft,
  Calendar,
  User,
  Tag
} from 'lucide-react';

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
);

const blogFiles = (import.meta as any).glob('./blogs/*.md', { query: '?raw', eager: true });

const parseFrontmatter = (content: any) => {
  if (typeof content !== 'string') return { data: {}, content: '' };
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = content.match(frontmatterRegex);

  if (!match) return { data: {}, content };

  const yamlBlock = match[1];
  const markdownContent = content.replace(frontmatterRegex, '').trim();

  const data: any = {};
  yamlBlock.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key.trim()] = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      } else {
        data[key.trim()] = value;
      }
    }
  });

  return { data, content: markdownContent };
};

const allPosts = Object.entries(blogFiles).map(([path, module]) => {
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  const rawContent = (module as any).default || (module as string);
  const { data, content } = parseFrontmatter(rawContent);
  return {
    slug,
    title: data.title || slug,
    date: data.date || 'Unknown Date',
    author: data.author || 'B4HAA7',
    description: data.description || '',
    tags: data.tags || [],
    content
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// --- Components ---

const Navbar = ({ isHome = true }: { isHome?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: isHome ? '#about' : '/#about' },
    { name: 'Blogs', href: isHome ? '#blogs' : '/blogs' },
    { name: 'Journey', href: isHome ? '#journey' : '/#journey' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-cyber-bg/90 backdrop-blur-lg border-b border-cyber-red/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/" className="text-white font-mono font-bold text-xl flex items-center gap-2 group">
            <Terminal className="text-cyber-red w-6 h-6 group-hover:animate-pulse" />
            <span className="glitch" data-text="B4HAA7">B4HAA7</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith('#') ? (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono text-slate-400 hover:text-cyber-red transition-colors uppercase tracking-[0.2em]"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs font-mono text-slate-400 hover:text-cyber-red transition-colors uppercase tracking-[0.2em]"
              >
                {link.name}
              </Link>
            )
          ))}
          <motion.a
            href="#footer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-cyber-red/10 border border-cyber-red/50 text-cyber-red text-xs font-mono uppercase tracking-widest rounded-sm hover:bg-cyber-red hover:text-black transition-all"
          >
            Connect
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cyber-card border-b border-cyber-red/20 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-mono text-slate-400 hover:text-cyber-red transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-mono text-slate-400 hover:text-cyber-red transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "SOC Analyst in Training | Malware Analysis Enthusiast";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-cyber-red) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Static Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyber-red/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyber-red/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 bg-cyber-red/10 border border-cyber-red/30 text-cyber-red text-[10px] font-mono uppercase tracking-[0.3em] mb-8 rounded-full">
            Status: Alert & Learning
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            I analyze threats to <br />
            <span className="glitch" data-text="Secure the Perimeter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-red via-red-500 to-cyber-red">
                Secure the Perimeter
              </span>
            </span>
          </h1>

          <div className="min-h-[2rem] mb-8">
            <p className="text-lg md:text-2xl font-mono text-slate-400">
              {text}<span className="animate-pulse text-cyber-red">_</span>
            </p>
          </div>

          <p className="max-w-2xl mx-auto text-slate-400 mb-12 text-base md:text-lg leading-relaxed">
            Focused on SOC operations and deep-dive malware analysis.
            Developing a keen eye for indicators of compromise and adversary tactics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="https://github.com/88BahaaAdel88"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-cyber-red text-white font-mono font-bold uppercase tracking-widest rounded-sm flex items-center gap-2 group shadow-sm hover:shadow-md hover:shadow-cyber-red/20 transition-all"
            >
              View My Work
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#footer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-cyber-red/30 text-white font-mono uppercase tracking-widest rounded-sm hover:bg-cyber-red/5 transition-all"
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-cyber-card/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
              <span className="text-cyber-red">01.</span> About Me
              <div className="h-[1px] flex-grow bg-cyber-red/20 ml-4" />
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                Hello! I'm <span className="text-white font-medium">B4HAA7</span>, a cybersecurity enthusiast from <span className="text-white font-medium">Egypt</span>.
                My transition into security was driven by a fascination with the "why" behind system behaviors.
              </p>
              <p>
                Currently, I am immersing myself in <span className="text-cyber-red font-medium">SOC Operations</span> and <span className="text-cyber-red font-medium">Malware Analysis</span>.
                I enjoy the detective work of hunting for threats and dissecting malicious code to understand its intent.
              </p>
              <p>
                I'm a dedicated <span className="text-white font-medium">Arch Linux</span> user, which provides the perfect environment for my technical experiments.
                When I'm not monitoring logs or analyzing samples, I'm likely solving CTF challenges or refining my networking knowledge.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm font-mono text-cyber-red">
                  <ChevronRight className="w-4 h-4" /> Arch Linux User
                </div>
                <div className="flex items-center gap-2 text-sm font-mono text-cyber-red">
                  <ChevronRight className="w-4 h-4" /> SOC Analyst Trainee
                </div>
                <div className="flex items-center gap-2 text-sm font-mono text-cyber-red">
                  <ChevronRight className="w-4 h-4" /> Malware Researcher
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyber-red to-red-900 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />
            <div className="relative glass p-8 rounded-sm border-cyber-red/10 aspect-square flex flex-col justify-center items-center text-center">
              <div className="w-24 h-24 bg-cyber-red/10 rounded-full flex items-center justify-center mb-6 border border-cyber-red/20">
                <Shield className="w-12 h-12 text-cyber-red" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Defense Strategy</h3>
              <p className="text-slate-400 italic">
                "To defend a kingdom, you must first know the mind of the invader. Security is the art of anticipating the unseen."
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                <div className="p-4 bg-white/5 rounded-sm border border-white/5">
                  <div className="text-2xl font-bold text-white">SOC</div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">Operations</div>
                </div>
                <div className="p-4 bg-white/5 rounded-sm border border-white/5">
                  <div className="text-2xl font-bold text-white">MA</div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">Malware Analyst</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Blogs = () => {
  const displayPosts = allPosts.slice(0, 3);

  return (
    <section id="blogs" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-4">
            <span className="text-cyber-red">02.</span> Blogs & Writeups
            <div className="h-[1px] w-32 bg-cyber-red/10 ml-4 hidden sm:block" />
          </h2>
          <Link
            to="/blogs"
            className="text-xs font-mono text-cyber-red uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform"
          >
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((blog, index) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-sm border-white/5 hover:border-cyber-red/30 transition-all group"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono text-cyber-red uppercase tracking-widest">{blog.date}</span>
                <BookOpen className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-cyber-red transition-colors">{blog.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">{blog.description}</p>
              <Link to={`/blogs/${blog.slug}`} className="text-xs font-mono text-white hover:text-cyber-red transition-colors flex items-center gap-2">
                Read More <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Journey = () => {
  const steps = [
    {
      year: "2023",
      title: "The Genesis",
      desc: "Started learning networking fundamentals and Linux basics. Installed Arch Linux for the first time."
    },
    {
      year: "2024",
      title: "Security Deep Dive",
      desc: "Began studying cybersecurity concepts, OWASP Top 10, and network security protocols."
    },
    {
      year: "2025",
      title: "SOC & Malware Focus",
      desc: "Pivoted focus to SOC operations and Malware analysis. Building specialized labs for threat hunting."
    },
    {
      year: "Present",
      title: "Continuous Growth",
      desc: "Improving technical skills daily, contributing to open source, and preparing for professional certifications."
    }
  ];

  return (
    <section id="journey" className="py-24 bg-cyber-card/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
          <span className="text-cyber-red">03.</span> Learning Path
          <div className="h-[1px] flex-grow bg-cyber-red/10 ml-4" />
        </h2>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-cyber-red/20 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-cyber-red rounded-full -translate-x-1/2 z-10 glow-red hidden md:block" />

                <div className="w-full md:w-1/2 px-0 md:px-12">
                  <div className={`glass p-6 rounded-sm border-white/5 hover:border-cyber-red/20 transition-all ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-cyber-red font-mono text-sm mb-2 block">{step.year}</span>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="footer" className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-500 text-xs font-mono">
          © {new Date().getFullYear()} B4HAA7. ALL TRANSMISSIONS ENCRYPTED.
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <a href="mailto:bahaaadel47880@outlook.com" aria-label="Email">
              <Mail className="w-5 h-5 text-slate-500 hover:text-cyber-red transition-colors cursor-pointer" />
            </a>
            <a href="https://github.com/88BahaaAdel88" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5 text-slate-500 hover:text-cyber-red transition-colors cursor-pointer" />
            </a>
            <a href="https://discord.com/users/ienjoycaffeine" target="_blank" rel="noreferrer" aria-label="Discord">
              <DiscordIcon className="w-5 h-5 text-slate-500 hover:text-cyber-red transition-colors cursor-pointer" />
            </a>
            <a href="https://www.linkedin.com/in/b4haa7/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 text-slate-500 hover:text-cyber-red transition-colors cursor-pointer" />
            </a>
            <a href="https://link.clashofclans.com/en?action=OpenPlayerProfile&tag=8L29JGCJ2" target="_blank" rel="noreferrer" aria-label="Clash of Clans">
              <Swords className="w-5 h-5 text-slate-500 hover:text-cyber-red transition-colors cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-cyber-red z-[60] origin-left"
      style={{ scaleX }}
    />
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Blogs />
      <Journey />
    </>
  );
};

const BlogArchive = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <Link to="/" className="text-cyber-red flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:gap-4 transition-all mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Base
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            The <span className="text-cyber-red">Archives</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl font-mono">
            A collection of technical writeups, malware analysis reports, and SOC operation logs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-sm border-white/5 hover:border-cyber-red/30 transition-all group flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-cyber-red font-mono text-[10px] uppercase tracking-widest">
                  <Calendar className="w-3 h-3" /> {post.date}
                </div>
                <div className="flex gap-2">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[8px] font-mono px-2 py-0.5 bg-cyber-red/10 text-cyber-red rounded-full border border-cyber-red/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-cyber-red transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed flex-grow">
                {post.description}
              </p>
              <Link to={`/blogs/${post.slug}`} className="text-xs font-mono text-white hover:text-cyber-red transition-colors flex items-center gap-2 mt-auto">
                Decrypt Content <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = allPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) {
      navigate('/blogs');
    }
  }, [post, navigate]);

  if (!post) return null;

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/blogs" className="text-cyber-red flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:gap-4 transition-all mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Archives
        </Link>

        <header className="mb-16">
          <div className="flex flex-wrap gap-4 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono px-3 py-1 bg-cyber-red/10 text-cyber-red rounded-full border border-cyber-red/20">
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-8 text-slate-500 font-mono text-xs uppercase tracking-widest border-y border-white/5 py-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyber-red" /> {post.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-cyber-red" /> {post.author}
            </div>
          </div>
        </header>

        <div className="prose prose-invert prose-red max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
          prose-p:text-slate-400 prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-cyber-red prose-code:bg-cyber-red/5 prose-code:px-1 prose-code:rounded
          prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/5
          prose-img:rounded-sm prose-img:border prose-img:border-white/10
          prose-a:text-cyber-red prose-a:no-underline hover:prose-a:underline
          prose-li:text-slate-400
        ">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-8">End of Transmission</p>
          <Link to="/blogs" className="inline-flex items-center gap-2 px-8 py-4 border border-cyber-red/30 text-white font-mono uppercase tracking-widest rounded-sm hover:bg-cyber-red/5 transition-all">
            Return to Archives
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen selection:bg-cyber-red/30 overflow-x-hidden">
        <Toaster position="bottom-right" />
        <ScrollProgress />
        <Routes>
          <Route path="/" element={<><Navbar isHome={true} /><main><Home /></main></>} />
          <Route path="/blogs" element={<><Navbar isHome={false} /><BlogArchive /></>} />
          <Route path="/blogs/:slug" element={<><Navbar isHome={false} /><BlogView /></>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
