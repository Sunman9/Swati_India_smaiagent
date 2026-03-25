"use client";

import React, { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import {
  LayoutDashboard, LineChart as ChartIcon, Users, KanbanSquare, Search, Bell,
  Sparkles, Clock, Target, ArrowRight, CheckCircle2, Zap, Eye, MapPin, Activity
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const partnerLeads = [
  { LeadID: "lead-titan-eye-01", PartnerName: "Titan Eye+ Flagship", PartnerCategory: "Premium Optical", Tier: "Tier 1", PipelineStage: "Sample Requested", TargetMargin: "40%", LastAIAction: "Intelligent Sequence #2 Sent", MatchScore: 98, location: "Mumbai" },
  { LeadID: "lead-nykaa-02", PartnerName: "Nykaa Luxe", PartnerCategory: "Premium Retail", Tier: "Tier 1", PipelineStage: "Active Negotiation", TargetMargin: "45%", LastAIAction: "Margin Terms Proposed", MatchScore: 95, location: "Bengaluru" },
  { LeadID: "lead-sephora-03", PartnerName: "Sephora India", PartnerCategory: "Premium Retail", Tier: "Tier 1", PipelineStage: "Discovered", TargetMargin: "50%", LastAIAction: "Initial Pitch Scheduled", MatchScore: 92, location: "Delhi" },
  { LeadID: "lead-dr-agarwal-04", PartnerName: "Dr. Agarwal's Eye Hospital", PartnerCategory: "Clinical/Medical", Tier: "Tier 2", PipelineStage: "Outreach Sent", TargetMargin: "35%", LastAIAction: "Email 1: Clinical Safety Sent", MatchScore: 88, location: "Hyderabad" },
  { LeadID: "lead-lenskart-05", PartnerName: "Lenskart Premium Lounge", PartnerCategory: "Premium Optical", Tier: "Tier 1", PipelineStage: "Closed Won", TargetMargin: "42%", LastAIAction: "Contract Executed", MatchScore: 97, location: "Bengaluru" },
];

const funnelData = [
  { stage: "Discovered", count: 1200 },
  { stage: "Outreach", count: 450 },
  { stage: "Sample Req", count: 85 },
  { stage: "Active Pipeline", count: 45 },
  { stage: "Closed Won", count: 12 },
];

const demandHeatmap = [
  { city: "Bengaluru", demand: 98, sector: "Lifestyle" },
  { city: "Mumbai", demand: 95, sector: "Fashion" },
  { city: "Delhi", demand: 91, sector: "Fashion" },
  { city: "Pune", demand: 82, sector: "Lifestyle" },
  { city: "Hyderabad", demand: 78, sector: "Clinical" },
];

const activityFeed = [
  { id: 1, time: "10 mins ago", title: "AI Discovered Tier 1 Partner", desc: "Titan Eye+ Flagship identified in Mumbai. Match score: 98%." },
  { id: 2, time: "45 mins ago", title: "Automated Outreach Sent", desc: "Sequence 'Runway Glamour Pitch' dispatched to Nykaa Luxe." },
  { id: 3, time: "2 hrs ago", title: "Sample Kit Requested", desc: "Dr. Agarwal's requested clinical safety certifications." },
];

const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm", className)}>
    {children}
  </div>
);

const Badge = ({ children, className, variant = "default" }: { children: React.ReactNode; className?: string; variant?: "default" | "success" | "ai" }) => {
  const variants = { default: "bg-zinc-800 text-zinc-300", success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", ai: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" };
  return <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>{children}</span>;
};

const Button = ({ children, onClick, className, variant = "primary" }: { children: React.ReactNode; onClick?: () => void; className?: string; variant?: "primary" | "outline" }) => {
  const variants = { primary: "bg-zinc-100 text-zinc-900 hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)]", outline: "border border-zinc-700 text-zinc-300 hover:bg-zinc-800" };
  return <button onClick={onClick} className={cn("px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2", variants[variant], className)}>{children}</button>;
};

function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={64} /></div>
          <h3 className="text-zinc-400 text-sm font-medium">Time-to-Launch</h3>
          <div className="mt-4"><span className="text-4xl font-bold text-zinc-100">14 Days</span></div>
          <div className="mt-4 w-full bg-zinc-800 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="mt-2 text-xs text-emerald-400 flex items-center gap-1"><ArrowRight size={12} className="rotate-90" /> Accelerated vs traditional 6mo.</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-zinc-400 text-sm font-medium">Active Leads (Retail/Clinical)</h3>
          <div className="mt-4"><span className="text-4xl font-bold text-zinc-100">45</span></div>
          <p className="mt-4 text-xs text-zinc-500">+12 acquired this week by AI Agent</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-zinc-400 text-sm font-medium">Sample Kits Deployed</h3>
          <div className="mt-4"><span className="text-4xl font-bold text-zinc-100">85</span></div>
          <p className="mt-4 text-xs text-zinc-500">Tracking active trials across Tier 1 cities</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-zinc-100 font-semibold flex items-center gap-2"><Activity size={18} className="text-indigo-400" /> Live Sales Funnel</h3>
            <Badge variant="ai">AI Monitored</Badge>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={funnelData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="stage" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} itemStyle={{ color: '#e4e4e7' }} />
                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-zinc-100 font-semibold mb-6">Recent System Activity</h3>
          <div className="space-y-6">
            {activityFeed.map((a) => (
              <div key={a.id} className="relative pl-6 border-l border-zinc-800 last:border-0 pb-6 last:pb-0">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-zinc-900 border-2 border-indigo-500 rounded-full"></div>
                <div className="text-xs text-zinc-500 mb-1">{a.time}</div>
                <div className="text-sm font-medium text-zinc-200">{a.title}</div>
                <div className="text-xs text-zinc-400 mt-1">{a.desc}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MarketIntelView() {
  const [isGenerating, setIsGenerating] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Market Intelligence Hub</h2>
          <p className="text-zinc-400 text-sm mt-1">SWATI Cosmetics vs. Indian Market Index</p>
        </div>
        <Button onClick={() => { setIsGenerating(true); setTimeout(() => setIsGenerating(false), 2000); }} variant="primary">
          {isGenerating ? <span className="animate-pulse flex items-center gap-2"><Sparkles size={16} /> Compiling...</span> : <span className="flex items-center gap-2"><Sparkles size={16} /> Generate Brand Localisation</span>}
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-zinc-100 font-semibold mb-4">Pricing & Positioning Benchmarks</h3>
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-900 border-b border-zinc-800">
              <tr><th className="px-4 py-3">Category</th><th className="px-4 py-3">Est. Price</th><th className="px-4 py-3">Consumer Perception</th></tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50"><td className="px-4 py-4 text-zinc-300">Unregulated Imports</td><td className="px-4 py-4 text-zinc-400">₹400 - ₹800</td><td className="px-4 py-4 text-red-400">Low Trust, Safety Concerns</td></tr>
              <tr className="border-b border-zinc-800/50"><td className="px-4 py-4 text-zinc-300">Premium K-Beauty</td><td className="px-4 py-4 text-zinc-400">₹1,200 - ₹1,800</td><td className="px-4 py-4 text-yellow-400">High Trend, Low Medical Cred</td></tr>
              <tr className="bg-indigo-500/5 border-b border-indigo-500/20"><td className="px-4 py-4 font-bold text-indigo-400">SWATI Cosmetics</td><td className="px-4 py-4 font-bold text-indigo-400">₹2,000+</td><td className="px-4 py-4 text-emerald-400">Premium Safety + Vogue Fashion</td></tr>
            </tbody>
          </table>
          <div className="mt-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
            <p className="text-sm text-zinc-300"><strong className="text-zinc-100">Strategic Counter:</strong> Climate discomfort is the #1 complaint in India. Emphasize Layered Lens Technology & Vegan formulation in all outbound campaigns.</p>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-zinc-100 font-semibold mb-4">Consumer Demand Index</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandHeatmap} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="city" type="category" stroke="#e4e4e7" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#27272a' }} contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                <Bar dataKey="demand" fill="#10b981" radius={[0, 4, 4, 0]}>
                  {demandHeatmap.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.sector === 'Clinical' ? '#6366f1' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-4 text-xs text-zinc-400 justify-center">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Lifestyle/Fashion</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-indigo-500 rounded-sm"></div> Clinical/Medical</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

function PartnersView() {
  const [filter, setFilter] = useState("All");
  const filteredLeads = filter === "All" ? partnerLeads : partnerLeads.filter(l => l.PartnerCategory.includes(filter));
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-zinc-100">Partner Discovery Engine</h2>
        <div className="flex gap-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          {["All", "Premium Retail", "Clinical"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={cn("px-4 py-1.5 text-sm rounded-md transition-colors", filter === f ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:text-zinc-200")}>{f}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <Card key={lead.LeadID} className="flex flex-col">
            <div className="p-5 border-b border-zinc-800/50 flex justify-between items-start">
              <div>
                <Badge className="mb-2" variant={lead.MatchScore > 94 ? "success" : "default"}>{lead.MatchScore}% AI Match</Badge>
                <h3 className="text-lg font-semibold text-zinc-100">{lead.PartnerName}</h3>
                <p className="text-sm text-zinc-400 flex items-center gap-1 mt-1"><MapPin size={12} /> {lead.location} • {lead.Tier}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 border border-zinc-700">
                {lead.PartnerCategory.includes("Clinical") ? <Eye size={18} /> : <Target size={18} />}
              </div>
            </div>
            <div className="p-5 flex-grow bg-zinc-900/20 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-zinc-500">Category</span><span className="text-zinc-300 font-medium">{lead.PartnerCategory}</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-500">Target Margin</span><span className="text-zinc-300 font-medium">{lead.TargetMargin}</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-500">Current Stage</span><span className="text-indigo-400 font-medium">{lead.PipelineStage}</span></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CRMView() {
  const stages = ["Discovered", "Outreach Sent", "Active Negotiation", "Closed Won"];
  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {stages.map(stage => (
          <div key={stage} className="w-80 flex-shrink-0 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-zinc-300">{stage}</h3>
              <Badge>{partnerLeads.filter(l => l.PipelineStage === stage).length}</Badge>
            </div>
            <div className="flex-1 space-y-3">
              {partnerLeads.filter(l => l.PipelineStage === stage).map(lead => (
                <Card key={lead.LeadID} className="p-4 cursor-grab hover:border-zinc-700 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-indigo-400">{lead.PartnerCategory}</span>
                    <span className="text-xs text-zinc-500">{lead.Tier}</span>
                  </div>
                  <h4 className="text-zinc-100 font-medium mb-3">{lead.PartnerName}</h4>
                  <div className="text-xs text-zinc-400 border-t border-zinc-800 pt-3 flex items-center gap-2">
                    <Clock size={12} /> {lead.LastAIAction}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-80 flex-shrink-0 border-l border-zinc-800 pl-6 flex-col hidden lg:flex">
        <h3 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2"><Sparkles size={18} className="text-indigo-400" /> AI Sequence Builder</h3>
        <div className="flex-1 relative">
          <div className="absolute left-3.5 top-0 bottom-0 w-px bg-zinc-800"></div>
          <div className="relative pl-10 pb-8">
            <div className="absolute left-0 w-7 h-7 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-500 z-10"><CheckCircle2 size={14} /></div>
            <h4 className="text-sm font-medium text-zinc-200">Email 1: Runway Glamour</h4>
            <p className="text-xs text-zinc-500 mt-1">Focus on Vogue aesthetics. Sent immediately.</p>
          </div>
          <div className="relative pl-10 pb-8">
            <div className="absolute left-0 w-7 h-7 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 z-10 text-[10px]">Wait</div>
            <div className="text-xs text-zinc-500 mt-1 italic">Wait 4 Days for engagement...</div>
          </div>
          <div className="relative pl-10 pb-8">
            <div className="absolute left-0 w-7 h-7 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 z-10"><Sparkles size={12} /></div>
            <h4 className="text-sm font-medium text-zinc-200">Email 2: Clinical Safety</h4>
            <p className="text-xs text-zinc-500 mt-1">ISO Certs & Vegan formulation pitch.</p>
          </div>
          <Button variant="outline" className="w-full justify-center mt-4">+ Add Action</Button>
        </div>
      </div>
    </div>
  );
}

export default function AppShell() {
  const [currentView, setCurrentView] = useState("dashboard");
  const navigation = [
    { id: "dashboard", name: "Command Center", icon: LayoutDashboard },
    { id: "market", name: "Market Intel", icon: ChartIcon },
    { id: "partners", name: "Partner Discovery", icon: Users },
    { id: "crm", name: "Automated Outreach", icon: KanbanSquare },
  ];
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex font-sans">
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-zinc-800/60 bg-zinc-950 z-20 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800/60">
          <div className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center mr-3">
            <span className="text-black font-bold text-xl leading-none">S</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">SWATI Agent</span>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button key={item.id} onClick={() => setCurrentView(item.id)} className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200", isActive ? "bg-zinc-800/50 text-zinc-100" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50")}>
                <Icon size={18} className={isActive ? "text-indigo-400" : ""} />
                {item.name}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-zinc-800/60">
          <div className="bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 border border-zinc-800 rounded-lg p-4">
            <p className="text-xs text-zinc-400">System Status</p>
            <div className="flex items-center gap-2 mt-2 text-sm font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              India Modules Active
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col md:pl-64 min-h-screen relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        <header className="h-16 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
          <div className="flex items-center text-zinc-400 text-sm">
            <span className="hidden sm:inline-block">India Market Entry</span>
            <span className="mx-2 hidden sm:inline-block">/</span>
            <span className="text-zinc-100 font-medium">{navigation.find(n => n.id === currentView)?.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="text" placeholder="Search market intel, partners..." className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-full pl-9 pr-4 py-1.5 focus:outline-none focus:border-indigo-500/50 w-64 transition-all" />
            </div>
            <button className="relative text-zinc-400 hover:text-zinc-100 transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border border-zinc-950"></span>
            </button>
            <div className="w-8 h-8 bg-zinc-800 rounded-full border border-zinc-700 flex items-center justify-center">
              <span className="text-xs font-medium">SC</span>
            </div>
          </div>
        </header>
        <div className="p-8 flex-1">
          {currentView === "dashboard" && <DashboardView />}
          {currentView === "market" && <MarketIntelView />}
          {currentView === "partners" && <PartnersView />}
          {currentView === "crm" && <CRMView />}
        </div>
      </main>
    </div>
  );
}
