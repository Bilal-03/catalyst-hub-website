import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { notesData } from './notes-data.js'; // Import notes from the local file

// --- Helper Components ---
const Icon = ({ path, className = "w-6 h-6", children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        {path && <path strokeLinecap="round" strokeLinejoin="round" d={path} />}
        {children}
    </svg>
);
const BookOpenIcon = () => <Icon path="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
const ArrowDownTrayIcon = () => <Icon path="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />;
const ZapIcon = () => <Icon path="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />;
const DollarSignIcon = () => <Icon path="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.09-.659-1.172-.879-1.172-2.303 0-3.182s3.07-.879 4.242 0l.879.659" />;
const CheckBadgeIcon = () => <Icon path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;

const InstagramIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform duration-300 group-hover:scale-110">
    <title>Instagram</title>
    <defs>
      <radialGradient id="instagram-gradient" r="150%" cx="30%" cy="107%">
        <stop stopColor="#fdf497" offset="0" />
        <stop stopColor="#fdf497" offset="0.05" />
        <stop stopColor="#fd5949" offset="0.45" />
        <stop stopColor="#d6249f" offset="0.6" />
        <stop stopColor="#285AEB" offset="0.9" />
      </radialGradient>
    </defs>
    <path fill="url(#instagram-gradient)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.784.305-1.455.718-2.126 1.387C1.333 2.72 1.03 3.388.722 4.163.42 4.92.218 5.78.16 7.048.102 8.333.088 8.74.088 12s.015 3.667.072 4.947c.06 1.267.26 2.132.558 2.898.308.776.718 1.447 1.387 2.126.67.67 1.35.962 2.126 1.267.765.3 1.63.5 2.898.558C8.333 23.985 8.74 24 12 24s3.667-.015 4.947-.072c1.267-.06 2.132-.26 2.898-.558.776-.305 1.447-.718 2.126-1.267.67-.67.962-1.35 1.267-2.126.3-.765.5-1.63.558-2.898.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.267-.26-2.132-.558-2.898-.308-.776-.718-1.447-1.387-2.126C21.282 1.333 20.614 1.03 19.84.722c-.765-.3-1.63-.5-2.898-.558C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.07 1.17.055 1.805.248 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.248 1.805-.413 2.227-.217.562-.477.96-.896 1.381-.42.419-.82.679-1.38.896-.423.164-1.06.36-2.23.413-1.27.057-1.649.07-4.85.07-3.203 0-3.585-.015-4.85-.07-1.17-.06-1.805-.248-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.82-1.381-.896-.164-.423-.36-1.06-.413-2.23-.057-1.265-.07-1.646-.07-4.85s.015-3.585.07-4.85c.06-1.17.248-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413C8.415 2.175 8.797 2.16 12 2.16zm0 5.48c-3.556 0-6.44 2.884-6.44 6.44s2.884 6.44 6.44 6.44 6.44-2.884 6.44-6.44-2.884-6.44-6.44-6.44zm0 10.76c-2.387 0-4.32-1.933-4.32-4.32s1.933-4.32 4.32-4.32 4.32 1.933 4.32 4.32-1.933 4.32-4.32 4.32zm6.406-11.845c-.796 0-1.44.645-1.44 1.44s.645 1.44 1.44 1.44 1.44-.645 1.44-1.44-.645-1.44-1.44-1.44z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform duration-300 group-hover:scale-110">
    <title>WhatsApp</title>
    <path fill="#25D366" d="M12.04 2.16C6.57 2.16 2.16 6.57 2.16 12.04c0 1.8.46 3.49 1.22 4.96L2 22l5.33-1.38c1.4.74 3.02 1.18 4.71 1.18h.01c5.47 0 9.88-4.41 9.88-9.88 0-5.47-4.41-9.88-9.89-9.88zm0 18.02h-.01c-1.54 0-3.04-.4-4.39-1.15l-.31-.18-3.26.84.86-3.18-.2-.33c-.83-1.43-1.34-3.09-1.34-4.88 0-4.51 3.66-8.17 8.18-8.17 4.51 0 8.17 3.66 8.17 8.17 0 4.51-3.66 8.18-8.17 8.18zm4.49-5.83c-.26-.13-1.55-.77-1.79-.85-.24-.08-.42-.13-.59.13-.17.26-.68.85-.83 1.02-.15.17-.3.19-.55.06-.25-.13-1.07-.39-2.04-1.26-.75-.67-1.26-1.5-1.4-1.76-.15-.26 0-.4.12-.52.1-.11.24-.28.36-.42.12-.14.16-.24.24-.41.08-.17.04-.31-.02-.44-.06-.13-.59-1.42-.81-1.95-.22-.53-.44-.45-.59-.46-.14-.01-.32-.01-.49-.01-.17 0-.45.06-.68.31-.23.26-.88.86-.88 2.09 0 1.23.9 2.42 1.03 2.59.13.17 1.77 2.7 4.29 3.78 2.52 1.08 2.52.72 2.98.69.45-.03 1.55-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.12-.25-.19-.5-.32z" />
  </svg>
);

// --- Main App Component ---
export default function App() {
    const [page, setPage] = useState('home');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sortedNotes = [...notesData].sort((a, b) => b.id - a.id);
        setNotes(sortedNotes);
        setLoading(false);
    }, []);

    const NotesSection = ({ notes, loading, title }) => (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8 fade-in-up">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 capitalize">
                    {title}
                </h2>
            </div>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => <NoteCardSkeleton key={i} />)}
                </div>
            ) : notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {notes.map((note, index) => <NoteCard key={note.id} note={note} index={index} />)}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/50 rounded-2xl shadow-lg fade-in-up">
                    <div className="mx-auto h-12 w-12 text-indigo-400"><BookOpenIcon /></div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-900">No notes found</h3>
                    <p className="mt-2 text-base text-slate-600">
                        This section is empty. Check back later!
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Header setPage={setPage} activePage={page} />
            {page === 'home' ? (
                <>
                    <HeroSection />
                    <BrowseSections setPage={setPage} />
                    <FeaturesSection />
                    <div className="bg-slate-50">
                        <NotesSection notes={notes.slice(0, 6)} loading={loading} title="Latest Notes" />
                    </div>
                </>
            ) : (
                <NotesSection notes={notes.filter(note => note.section === page)} loading={loading} title={`${page.toUpperCase()} Section`} />
            )}
            <Footer />
            <Analytics />
        </div>
    );
}

// --- UI Components ---
const Header = ({ setPage, activePage }) => {
    const navItems = ['home', 'varc', 'dilr', 'qa'];
    return (
        <header className="bg-white/60 backdrop-blur-lg shadow-sm sticky top-0 z-50 transition-all duration-300">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setPage('home')} className="flex items-center space-x-2 group">
                            <BookOpenIcon className="w-8 h-8 text-indigo-600 group-hover:text-indigo-500 transition-colors" />
                            <div className="flex flex-col items-start">
                                <span className="text-2xl font-bold text-slate-800 group-hover:text-slate-700 transition-colors">CATalyst Hub</span>
                                <span className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors">Designed by Bilal</span>
                            </div>
                        </button>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center space-x-2 bg-slate-100 p-1 rounded-full">
                            {navItems.map(item => (
                                <button 
                                    key={item} 
                                    onClick={() => setPage(item)} 
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activePage === item ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-600 hover:bg-white/60'}`}
                                >
                                    {item.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4 ml-4">
                            <a href="https://instagram.com/bilalll.2012" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors group">
                                <InstagramIcon />
                            </a>
                            <a href="https://wa.me/9560090624" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors group">
                                <WhatsAppIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

const HeroSection = () => (
    <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2728&auto=format&fit=crop')" }} aria-hidden="true"></div>
        <div className="absolute inset-0 bg-indigo-900/40 z-10"></div>
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight fade-in-up drop-shadow-lg">
                Unlock Your CAT Potential.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-indigo-100 fade-in-up delay-100 drop-shadow-md">
                A curated, community-driven platform to share and access high-quality CAT preparation notes, completely free.
            </p>
        </div>
    </div>
);

const BrowseSections = ({ setPage }) => {
    const sections = [
        { name: 'VARC', value: 'varc', description: 'Verbal Ability & Reading Comprehension', color: 'from-indigo-500 to-blue-500' },
        { name: 'DILR', value: 'dilr', description: 'Data Interpretation & Logical Reasoning', color: 'from-purple-500 to-pink-500' },
        { name: 'QA', value: 'qa', description: 'Quantitative Aptitude', color: 'from-sky-500 to-cyan-500' },
    ];
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-10 fade-in-up">Browse by Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {sections.map((section, index) => (
                        <button
                            key={section.value}
                            onClick={() => setPage(section.value)}
                            className={`p-8 rounded-2xl text-white text-left shadow-lg transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br ${section.color} fade-in-up`}
                            style={{ animationDelay: `${index * 100 + 100}ms` }}
                        >
                            <h3 className="text-2xl font-bold">{section.name}</h3>
                            <p className="mt-2 opacity-90">{section.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FeaturesSection = () => {
    const features = [
        { icon: <DollarSignIcon />, title: "Completely Free", description: "Access all notes and materials without any fees or subscriptions." },
        { icon: <CheckBadgeIcon />, title: "High-Quality Content", description: "Curated notes from reliable sources to ensure you get the best." },
        { icon: <ZapIcon />, title: "Simple & Fast", description: "A clean, ad-free interface designed for a seamless learning experience." },
    ];
    return (
        <div className="py-16 bg-white/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    {features.map((feature, index) => (
                        <div key={feature.title} className="fade-in-up" style={{ animationDelay: `${index * 100 + 300}ms` }}>
                            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                {feature.icon}
                            </div>
                            <h3 className="mt-5 text-xl font-semibold text-slate-800">{feature.title}</h3>
                            <p className="mt-2 text-slate-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const NoteCard = ({ note, index }) => {
    const sectionColors = {
        varc: 'from-indigo-500 to-blue-500',
        dilr: 'from-purple-500 to-pink-500',
        qa: 'from-sky-500 to-cyan-500',
    };
    const animationDelay = `${index * 100}ms`;

    return (
        <div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 fade-in-up"
            style={{ animationDelay }}
        >
            <div className="p-6 flex flex-col h-full">
                <div className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-white bg-gradient-to-r ${sectionColors[note.section] || 'from-slate-500 to-gray-500'} self-start`}>
                    {note.section.toUpperCase()}
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{note.title}</h3>
                <p className="mt-2 text-slate-600 text-sm line-clamp-3 flex-grow">{note.description}</p>
                <div className="mt-6">
                    <a
                        href={process.env.PUBLIC_URL + note.fileURL}
                        download
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform group-hover:scale-105"
                    >
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        <span className="text-sm font-semibold">Download</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

const NoteCardSkeleton = () => (
    <div className="bg-white/50 rounded-2xl shadow-md overflow-hidden animate-pulse">
        <div className="p-6">
            <div className="h-5 bg-slate-200 rounded-full w-1/4"></div>
            <div className="mt-5 h-6 bg-slate-300 rounded w-3/4"></div>
            <div className="mt-3 space-y-2">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
        </div>
        <div className="p-6">
            <div className="h-12 bg-slate-300 rounded-lg w-full"></div>
        </div>
    </div>
);

const Footer = () => (
    <footer className="bg-transparent mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-600">
            <p>&copy; {new Date().getFullYear()} The CATalyst Hub. Your free resource for CAT success.</p>
        </div>
    </footer>
);