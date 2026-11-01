'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  RotateCw, 
  Share2, 
  Wand2, 
  Upload, 
  ShieldAlert, 
  ChevronRight, 
  Info, 
  Zap, 
  ExternalLink,
  Laptop,
  Coffee,
  Terminal,
  Cpu,
  Flame,
  Award,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import RelatedTools from '@/components/RelatedTools';

type BoxTheme = 'retro-hasbro' | 'cyberpunk-neon' | 'minimalist-tech' | 'comic-book' | 'gold-edition';

interface Preset {
  id: string;
  name: string;
  role: string;
  series: string;
  image: string;
  theme: BoxTheme;
  outfit: string;
  accessories: string[];
  stats: {
    coding: number;
    architecture: number;
    caffeine: number;
    charisma: number;
    grit: number;
  };
  bio: string;
}

const PRESETS: Preset[] = [
  {
    id: 'tech-founder',
    name: 'Alex Chen',
    role: 'Tech Founder & Solo Hacker',
    series: 'Startup Series Vol. 1',
    image: '/images/tools/action-figure-founder.jpg',
    theme: 'retro-hasbro',
    outfit: 'black minimalist founder hoodie, dark jeans, and clean sneakers',
    accessories: ['MacBook Pro M3', 'Cold Brew Tumbler', 'Series A Term Sheet', 'Mechanical Keyboard'],
    stats: { coding: 96, architecture: 92, caffeine: 99, charisma: 88, grit: 95 },
    bio: 'Pushes code to production on Friday night without fear. Converts caffeine directly into ARR and scalable database schemas.'
  },
  {
    id: 'cyberpunk-ai',
    name: 'Kairo-7',
    role: 'Cybernetic AI Architect',
    series: 'Cyber Frontier 2077',
    image: '/images/tools/action-figure-cyberpunk.jpg',
    theme: 'cyberpunk-neon',
    outfit: 'neon cybernetic tactical jacket with glowing blue neural visor and robotic arm',
    accessories: ['Holographic Data Cube', 'Cyberdeck Terminal', 'Neural EMP Jack', 'Quantum Co-Processor'],
    stats: { coding: 99, architecture: 98, caffeine: 85, charisma: 76, grit: 99 },
    bio: 'Orchestrates 50+ autonomous AI agents in high-concurrency neural meshes. Legend of the underground silicon darknets.'
  },
  {
    id: 'tech-innovator',
    name: 'Sarah Chen',
    role: 'Tech Architect & Product Lead',
    series: 'Innovator Collection',
    image: '/images/tools/action-figure-innovator.jpg',
    theme: 'comic-book',
    outfit: 'stylish navy bomber jacket, striped tee, and white designer sneakers',
    accessories: ['Custom Wireless Keyboard', 'Tech Fuel Coffee Cup', 'Smartphone with Live Metrics', 'Figma Pro Mouse'],
    stats: { coding: 94, architecture: 97, caffeine: 90, charisma: 95, grit: 93 },
    bio: 'Reduces software bloat by 80% before breakfast. Champions clean microservices and frictionless user interfaces.'
  },
  {
    id: 'silicon-vc',
    name: 'Chad Sterling',
    role: 'General Partner',
    series: 'Sand Hill Legends',
    image: '/images/tools/action-figure-founder.jpg',
    theme: 'gold-edition',
    outfit: 'Patagonia fleece vest, tailored dress shirt, and Allbirds wool runners',
    accessories: ['Uncapped SAFE Note', 'AirPods Max', 'Equinox Pass', 'Cold Pressed Green Juice'],
    stats: { coding: 45, architecture: 60, caffeine: 88, charisma: 98, grit: 82 },
    bio: 'Requests deck updates via WhatsApp voice notes. Believes every B2B problem can be solved with a 100x seed round.'
  }
];

const ACCESSORY_OPTIONS = [
  'MacBook Pro M3 Max',
  'Cold Brew Quad-Shot',
  'Mechanical Keyboard',
  'Series A Term Sheet',
  'AirPods Max Noise-Canceling',
  'Red Bull 24-Pack',
  'Emergency Deploy Button',
  'Figma Laser Pointer',
  'GPU Cluster Keycard',
  'Starlink Mini Terminal',
  'Rubber Duck Debugger',
  'Holographic Data Cube',
  'Patagonia Fleece Vest',
  'Smart Ring Biometric Tracker',
  'OLED Portable Monitor',
  'Slack Notification Snooze'
];

export default function ActionFigureClient() {
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [name, setName] = useState(PRESETS[0].name);
  const [role, setRole] = useState(PRESETS[0].role);
  const [series, setSeries] = useState(PRESETS[0].series);
  const [theme, setTheme] = useState<BoxTheme>(PRESETS[0].theme);
  const [outfit, setOutfit] = useState(PRESETS[0].outfit);
  const [accessories, setAccessories] = useState<string[]>(PRESETS[0].accessories);
  const [bio, setBio] = useState(PRESETS[0].bio);
  const [figureImage, setFigureImage] = useState<string>(PRESETS[0].image);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const boxCardRef = useRef<HTMLDivElement>(null);

  // Apply preset
  const handleSelectPreset = (p: Preset) => {
    setSelectedPreset(p);
    setName(p.name);
    setRole(p.role);
    setSeries(p.series);
    setTheme(p.theme);
    setOutfit(p.outfit);
    setAccessories(p.accessories);
    setBio(p.bio);
    setFigureImage(p.image);
    setCustomPhotoUrl(null);
    toast.success(`Loaded "${p.name}" Action Figure preset!`);
  };

  // Toggle accessory
  const toggleAccessory = (item: string) => {
    if (accessories.includes(item)) {
      if (accessories.length <= 2) {
        toast.error('Action figure needs at least 2 accessories in blister pack!');
        return;
      }
      setAccessories(accessories.filter(a => a !== item));
    } else {
      if (accessories.length >= 4) {
        toast.error('Maximum 4 accessories fit in the plastic blister trays!');
        return;
      }
      setAccessories([...accessories, item]);
    }
  };

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomPhotoUrl(url);
    setFigureImage(url);
    toast.success('Your photo has been loaded into the blister pack!');
  };

  // Build the hyper-detailed Midjourney / Flux / DALL-E prompt
  const getPrompt = () => {
    const themeStyle = {
      'retro-hasbro': '80s and 90s vintage Hasbro toy packaging, bold retro fonts, vibrant cardboard blister card',
      'cyberpunk-neon': 'cyberpunk 2077 high-tech toy packaging, neon glowing grid lines, dark synthwave cardboard card',
      'minimalist-tech': 'minimalist matte white and titanium luxury tech packaging, Apple industrial design, sleek futuristic toy',
      'comic-book': 'vintage Marvel comic book blister pack, halftone dot texture, bold graphic novel illustration',
      'gold-edition': 'luxury black obsidian cardboard with metallic 24K gold foil trim, premium VIP collector edition toy'
    }[theme];

    return `A mint-in-box collectible 3D action figure of "${name}", who is a ${role}, wearing ${outfit}, standing in a heroic confident pose sealed inside a clear molded plastic blister bubble mounted on a printed cardboard toy blister card with a peg hanger cutout at the top. The packaging proudly displays "${series.toUpperCase()}" at the top and "${name.toUpperCase()} - ${role.toUpperCase()}" below. Beside the figure in molded transparent plastic trays are miniature toy accessories: ${accessories.join(', ')}. ${themeStyle}, hyper-detailed plastic figurine with visible toy articulation joints, studio product photography, 4k resolution, crisp commercial packaging lighting, authentic plastic specular reflections.`;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(getPrompt());
    setCopiedPrompt(true);
    toast.success('Prompt copied to clipboard! Ready for Midjourney, Flux, or DALL-E 3.');
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  // Trigger AI generation via backend API
  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/action-figure/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          role,
          series,
          outfit,
          accessories,
          boxTheme: theme
        })
      });

      const data = await res.json();
      if (data.success && data.imageUrl) {
        setFigureImage(data.imageUrl);
        setCustomPhotoUrl(null);
        toast.success('DALL-E 3 action figure packaging generated successfully!');
      } else {
        toast.info('Generated optimized AI prompt. Click "Copy Prompt" to use in Midjourney, Flux, or DALL-E!');
      }
    } catch (err) {
      toast.error('Could not complete API render. Your optimized prompt is ready below!');
    } finally {
      setIsGenerating(false);
    }
  };

  // Canvas-based download of the Action Figure Card
  const handleDownloadBox = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1440;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cardboard Background colors based on theme
    const bgGradient = ctx.createLinearGradient(0, 0, 1080, 1440);
    if (theme === 'cyberpunk-neon') {
      bgGradient.addColorStop(0, '#0a051b');
      bgGradient.addColorStop(0.5, '#180e36');
      bgGradient.addColorStop(1, '#05020d');
    } else if (theme === 'gold-edition') {
      bgGradient.addColorStop(0, '#1c1917');
      bgGradient.addColorStop(0.5, '#0c0a09');
      bgGradient.addColorStop(1, '#000000');
    } else if (theme === 'comic-book') {
      bgGradient.addColorStop(0, '#f97316');
      bgGradient.addColorStop(0.3, '#3b82f6');
      bgGradient.addColorStop(1, '#1d4ed8');
    } else if (theme === 'minimalist-tech') {
      bgGradient.addColorStop(0, '#f1f5f9');
      bgGradient.addColorStop(0.5, '#e2e8f0');
      bgGradient.addColorStop(1, '#cbd5e1');
    } else {
      // retro hasbro
      bgGradient.addColorStop(0, '#0284c7');
      bgGradient.addColorStop(0.3, '#38bdf8');
      bgGradient.addColorStop(1, '#0f172a');
    }

    ctx.fillStyle = bgGradient;
    ctx.roundRect(0, 0, 1080, 1440, 48);
    ctx.fill();

    // Peg hole
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(470, 40, 140, 44, 22);
    ctx.fill();

    // Series Header
    ctx.fillStyle = theme === 'minimalist-tech' ? '#0f172a' : '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(series.toUpperCase(), 540, 140);

    // Name
    ctx.font = '900 68px sans-serif';
    ctx.fillStyle = theme === 'cyberpunk-neon' ? '#38bdf8' : (theme === 'gold-edition' ? '#fbbf24' : (theme === 'minimalist-tech' ? '#1e293b' : '#38bdf8'));
    ctx.fillText(name.toUpperCase(), 540, 220);

    // Subtitle / Role
    ctx.font = 'bold 34px sans-serif';
    ctx.fillStyle = theme === 'minimalist-tech' ? '#64748b' : '#cbd5e1';
    ctx.fillText(role.toUpperCase(), 540, 270);

    // Draw main image if available
    const img = new (window as any).Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Molded plastic bubble outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 12;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(140, 320, 800, 940, 36);
      ctx.stroke();

      // Draw the action figure image inside
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(148, 328, 784, 924, 32);
      ctx.clip();
      ctx.drawImage(img, 148, 328, 784, 924);
      ctx.restore();

      // Blister plastic sheen reflection
      const sheen = ctx.createLinearGradient(140, 320, 940, 1260);
      sheen.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      sheen.addColorStop(0.2, 'rgba(255, 255, 255, 0.05)');
      sheen.addColorStop(0.5, 'transparent');
      sheen.addColorStop(0.8, 'rgba(255, 255, 255, 0.15)');
      ctx.fillStyle = sheen;
      ctx.roundRect(140, 320, 800, 940, 36);
      ctx.fill();

      // Bottom Barcode & Warning
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(140, 1290, 800, 90);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('⚠️ WARNING: CHOKING HAZARD - 100% ARTICULATED COLLECTIBLE', 170, 1345);
      ctx.textAlign = 'right';
      ctx.fillText('AJPR WORLD // 1/12 SCALE', 910, 1345);

      // Trigger download
      const link = document.createElement('a');
      link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-action-figure.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Action Figure box downloaded in high resolution!');
    };

    img.onerror = () => {
      toast.info('Downloading packaging box graphic...');
      const link = document.createElement('a');
      link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-action-figure.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = figureImage;
  };

  // Theme styling helpers for CSS UI
  const getThemeCardStyles = () => {
    switch (theme) {
      case 'cyberpunk-neon':
        return 'from-slate-950 via-purple-950 to-indigo-950 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.25)]';
      case 'gold-edition':
        return 'from-stone-950 via-amber-950/40 to-stone-950 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.2)]';
      case 'comic-book':
        return 'from-blue-600 via-indigo-700 to-amber-500 border-amber-300 shadow-[0_0_40px_rgba(59,130,246,0.3)]';
      case 'minimalist-tech':
        return 'from-slate-100 via-slate-50 to-slate-200 text-slate-900 border-slate-300 shadow-2xl';
      default: // retro-hasbro
        return 'from-sky-700 via-blue-900 to-slate-950 border-sky-400/60 shadow-[0_0_50px_rgba(14,165,233,0.3)]';
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-blue-600 selection:text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-400">AI Action Figure Generator</span>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Viral Collectible Studio // 100% Free
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            AI Action Figure & <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Toy Box Generator
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Turn yourself, your teammates, or your heroes into iconic mint-in-box 3D action figures sealed in vacuum-formed blister packaging with custom collectible accessories.
          </p>
        </div>

        {/* Interactive Studio Workspace */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Live Action Figure Blister Box Preview (Sticky) */}
          <div className="lg:col-span-6 xl:col-span-5 lg:sticky lg:top-28 flex flex-col items-center">
            
            {/* Box Header Toolbar */}
            <div className="w-full flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Mint-in-Box Preview
              </span>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:scale-105"
              >
                <RotateCw className="w-3.5 h-3.5 text-blue-400" />
                {isFlipped ? 'View Front of Box' : 'Flip to Back of Box'}
              </button>
            </div>

            {/* The Physical Cardboard Blister Pack */}
            <div 
              ref={boxCardRef}
              className={`w-full max-w-[440px] rounded-[32px] p-5 sm:p-6 border bg-gradient-to-b transition-all duration-500 relative overflow-hidden group ${getThemeCardStyles()}`}
              style={{ minHeight: '620px' }}
            >
              {/* Peg Hanger Cutout */}
              <div className="w-24 h-7 mx-auto rounded-full bg-slate-950/80 border border-white/20 mb-4 flex items-center justify-center shadow-inner">
                <div className="w-14 h-2 rounded-full bg-black/70" />
              </div>

              {!isFlipped ? (
                /* FRONT OF BOX: THE COLLECTIBLE BLISTER PACK */
                <div className="flex flex-col h-full">
                  {/* Cardboard Header */}
                  <div className="text-center mb-3">
                    <div className="inline-block px-3 py-0.5 rounded-md bg-black/40 border border-white/20 text-[10px] font-extrabold tracking-widest uppercase text-cyan-300 mb-1">
                      {series}
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      {name}
                    </h2>
                    <p className="text-xs font-bold text-slate-300 tracking-wide uppercase">
                      {role}
                    </p>
                  </div>

                  {/* The Molded Plastic Blister Window */}
                  <div className="relative rounded-2xl border-2 border-white/30 bg-slate-900/60 p-2 shadow-[inset_0_2px_15px_rgba(255,255,255,0.25),0_15px_30px_rgba(0,0,0,0.8)] backdrop-blur-xs overflow-hidden flex-1 flex flex-col justify-between">
                    
                    {/* Plastic Specular Sheen Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/25 rounded-2xl z-20" />
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none z-20" />

                    {/* Figure Image Centerpiece */}
                    <div className="relative w-full h-[360px] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                      <Image
                        src={figureImage}
                        alt={`${name} Action Figure`}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        priority
                        unoptimized
                      />
                      
                      {/* Scale Badge */}
                      <div className="absolute top-2 left-2 z-30 px-2 py-0.5 rounded bg-black/70 border border-white/20 text-[10px] font-bold text-white uppercase backdrop-blur-sm">
                        1/12 Scale
                      </div>

                      {/* Try Me / Sound Button Mock */}
                      <div className="absolute top-2 right-2 z-30 px-2 py-0.5 rounded-full bg-red-600/90 border border-red-400 text-[9px] font-black text-white uppercase tracking-wider animate-bounce shadow-md">
                        Try Me!
                      </div>
                    </div>

                    {/* Molded Accessories Blister Tray (Right or Bottom) */}
                    <div className="mt-3 pt-2 border-t border-white/10 relative z-30">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                        <span>Includes {accessories.length} Collector Gear:</span>
                        <span className="text-cyan-400">Authentic Mold</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {accessories.map((acc, idx) => (
                          <div 
                            key={idx}
                            className="bg-black/50 border border-white/20 rounded-lg p-1.5 flex items-center gap-1.5 shadow-inner"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span className="text-[10px] font-bold text-slate-200 truncate">{acc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cardboard Footer: Warning Label & Barcode */}
                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                      <div className="text-[9px] font-bold leading-tight">
                        <span className="text-amber-400">WARNING:</span> CHOKING HAZARD<br />
                        Too many pull requests
                      </div>
                    </div>
                    
                    {/* Simulated Barcode */}
                    <div className="bg-white p-1 rounded border border-black flex flex-col items-center">
                      <div className="flex gap-[2px] h-5 items-end">
                        {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3].map((w, i) => (
                          <div key={i} className="bg-black" style={{ width: `${w}px`, height: '100%' }} />
                        ))}
                      </div>
                      <span className="text-[7px] font-mono font-black text-black">8 12345 67890</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* BACK OF BOX: COMBAT STATS & CHARACTER LORE */
                <div className="flex flex-col h-full text-slate-200">
                  <div className="text-center mb-4">
                    <span className="text-[10px] font-black tracking-widest uppercase text-amber-400">
                      Official Collector Profile
                    </span>
                    <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                      {name}
                    </h3>
                    <p className="text-xs font-bold text-cyan-300 uppercase">{role}</p>
                  </div>

                  {/* Character Bio Card */}
                  <div className="bg-black/50 border border-white/20 rounded-xl p-3 mb-4 shadow-inner">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                      Origin Story:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {bio}
                    </p>
                  </div>

                  {/* Combat / Technical Power Stats */}
                  <div className="bg-black/50 border border-white/20 rounded-xl p-3 mb-4 space-y-2.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Power Stats Matrix:
                    </span>
                    {[
                      { label: 'System Architecture', val: selectedPreset.stats.architecture, icon: Cpu },
                      { label: 'Code Velocity', val: selectedPreset.stats.coding, icon: Terminal },
                      { label: 'Caffeine Absorption', val: selectedPreset.stats.caffeine, icon: Coffee },
                      { label: 'Pitch Charisma', val: selectedPreset.stats.charisma, icon: Sparkles },
                      { label: 'Deployment Grit', val: selectedPreset.stats.grit, icon: Flame }
                    ].map((stat, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="flex items-center gap-1 text-slate-300">
                            <stat.icon className="w-3 h-3 text-cyan-400" />
                            {stat.label}
                          </span>
                          <span className="text-cyan-400 font-mono">{stat.val}/100</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                            style={{ width: `${stat.val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Collect All in Series */}
                  <div className="mt-auto pt-3 border-t border-white/20 text-center">
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">
                      Collect all in Series 01
                    </p>
                    <div className="flex justify-center gap-2">
                      {PRESETS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSelectPreset(p)}
                          className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-transform hover:scale-110 relative ${
                            selectedPreset.id === p.id ? 'border-cyan-400 ring-2 ring-cyan-400/40' : 'border-white/20 opacity-70'
                          }`}
                        >
                          <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Buttons for Box */}
            <div className="w-full max-w-[440px] grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={handleDownloadBox}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download Box PNG
              </button>

              <button
                onClick={handleCopyPrompt}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-95"
              >
                {copiedPrompt ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
                {copiedPrompt ? 'Copied!' : 'Copy AI Prompt'}
              </button>
            </div>
          </div>

          {/* RIGHT: The Studio Customizer Controls */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-8">
            
            {/* Step 1: Choose Archetype Preset */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">1</span>
                Choose a Collectible Archetype
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESETS.map((p) => {
                  const isSelected = selectedPreset.id === p.id && !customPhotoUrl;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPreset(p)}
                      className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden mb-2 bg-slate-900">
                        <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />
                      </div>
                      <h4 className="text-xs font-black text-white truncate">{p.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{p.role}</p>
                    </button>
                  );
                })}
              </div>

              {/* Upload Custom Portrait Option */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  <span className="text-white font-bold block">Want your own face in the box?</span>
                  Upload any photo or portrait to drop yourself into the blister pack.
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold rounded-xl transition-all hover:scale-105"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-400" />
                  Upload Photo
                </button>
              </div>
            </div>

            {/* Step 2: Customize Character & Packaging */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">2</span>
                Action Figure Identity & Box Details
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1.5 block">Character Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aman Joshi"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1.5 block">Professional Title / Subtitle</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Systems Architect"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1.5 block">Series Collection Name</label>
                  <input
                    type="text"
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                    placeholder="e.g. Tech Titans Vol. 1"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1.5 block">Packaging Box Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as BoxTheme)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="retro-hasbro">80s/90s Retro Hasbro</option>
                    <option value="cyberpunk-neon">Cyberpunk 2077 Neon</option>
                    <option value="minimalist-tech">Minimalist Titanium Tech</option>
                    <option value="comic-book">Vintage Comic Book</option>
                    <option value="gold-edition">24K Gold Obsidian VIP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">Outfit & Pose Description</label>
                <input
                  type="text"
                  value={outfit}
                  onChange={(e) => setOutfit(e.target.value)}
                  placeholder="e.g. black minimalist founder hoodie, dark jeans, and clean sneakers"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">Back of Box Bio / Origin Story</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell your character's heroic backstory..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Step 3: Choose Blister Pack Accessories */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">3</span>
                  Select Collectible Accessories ({accessories.length}/4)
                </div>
                <span className="text-[11px] text-slate-400">Picks snap into the plastic trays</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {ACCESSORY_OPTIONS.map((item) => {
                  const isSelected = accessories.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleAccessory(item)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105' 
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: AI Generation & Prompt Output */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-blue-400" />
                    AI Action Figure Generation
                  </h3>
                  <p className="text-xs text-slate-400">
                    Render photorealistic packaging with DALL-E 3 or copy the engineered prompt for Midjourney / Flux.
                  </p>
                </div>

                <button
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'Rendering Action Figure...' : 'Generate with DALL-E 3'}
                </button>
              </div>

              {/* Real Prompt Preview */}
              <div className="mt-4 p-3.5 bg-black/70 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed relative group">
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2 uppercase tracking-wider font-bold">
                  <span>Engineered Midjourney & Flux Prompt:</span>
                  <button 
                    onClick={handleCopyPrompt}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    {copiedPrompt ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedPrompt ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="line-clamp-3 select-all">{getPrompt()}</p>
              </div>
            </div>

          </div>
        </div>

        {/* How It Works & Pro Tips Section */}
        <div className="mt-24 pt-16 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-white mb-3">How to Get Viral AI Action Figures</h3>
            <p className="text-sm text-slate-400">
              Tips on getting the most authentic packaging reflections, toy joints, and collectible box art.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">1. The Blister Pack Formula</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Keywords like &quot;mint-in-box&quot;, &quot;clear molded plastic blister bubble&quot;, and &quot;printed cardboard card with peg hanger&quot; are essential for generating authentic toy store rack aesthetics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">2. Hyper-Specific Accessories</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adding unique professional items (e.g. &quot;M3 Max laptop&quot;, &quot;AirPods Max&quot;, &quot;cold brew cup&quot;) into separate vacuum-molded plastic trays instantly grounds the toy into an iconic collectible.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">3. Studio Lighting & Specular Gloss</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our engine automatically appends &quot;studio product photography&quot; and &quot;authentic plastic reflections&quot; so AI models render convincing shine on the vacuum-formed bubble.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner: Need Custom AI Apps? */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Want to Build Custom AI Tools & Interactive Apps for Your Brand?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8">
            AJPR World engineers viral web tools, custom AI software, and autonomous multi-agent pipelines for high-growth startups and enterprises.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/free-audit"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg hover:scale-105 flex items-center gap-2"
            >
              Get Free Growth Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>

        <RelatedTools currentSlug="/tools/action-figure-generator" />

      </div>
    </div>
  );
}
