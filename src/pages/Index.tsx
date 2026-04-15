import { useState } from "react";
import {
  Search, Bell, ChevronDown, Plus, MoreHorizontal, Filter,
  Users, BarChart3, Zap, ArrowUpRight, ArrowDownRight,
  CheckCircle2, Clock, AlertCircle, Home, Settings, Layers,
  Calendar, MessageSquare, FileText, Star, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

// ─── Navbar ──────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b bg-card px-6 py-3 shadow-card">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">workOS</span>
        </div>
        <div className="hidden items-center gap-1 md:flex">
          {[
            { icon: Home, label: "Home" },
            { icon: Layers, label: "Boards" },
            { icon: Calendar, label: "Calendar" },
            { icon: BarChart3, label: "Analytics" },
          ].map((item) => (
            <Button key={item.label} variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-9 w-64 rounded-lg bg-secondary pl-9" placeholder="Search anything..." />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-status-stuck" />
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-status-purple text-xs font-semibold text-primary-foreground">JD</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}

// ─── Stat Cards ──────────────────────────────────────────
const stats = [
  { label: "Total Projects", value: "247", change: "+12%", up: true, icon: Layers, color: "bg-primary/10 text-primary" },
  { label: "Active Users", value: "1,849", change: "+8.2%", up: true, icon: Users, color: "bg-status-done/10 text-status-done" },
  { label: "Revenue", value: "$48.2K", change: "+23%", up: true, icon: TrendingUp, color: "bg-status-purple/10 text-status-purple" },
  { label: "Open Issues", value: "32", change: "-5%", up: false, icon: AlertCircle, color: "bg-status-working/10 text-status-working" },
];

function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div key={s.label} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
          <Card className="border bg-card shadow-card transition-shadow hover:shadow-card-hover">
            <CardContent className="flex items-start justify-between p-5">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <div className="flex items-center gap-1 text-xs font-medium">
                  {s.up ? (
                    <ArrowUpRight className="h-3 w-3 text-status-done" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-status-done" />
                  )}
                  <span className="text-status-done">{s.change}</span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Board Table ─────────────────────────────────────────
const tasks = [
  { id: 1, name: "Redesign homepage hero", owner: "AS", status: "Done", priority: "High", date: "Apr 12", progress: 100 },
  { id: 2, name: "Implement auth flow", owner: "MK", status: "Working", priority: "Critical", date: "Apr 14", progress: 65 },
  { id: 3, name: "Setup CI/CD pipeline", owner: "JD", status: "Stuck", priority: "High", date: "Apr 10", progress: 30 },
  { id: 4, name: "Design system tokens", owner: "LR", status: "Done", priority: "Medium", date: "Apr 11", progress: 100 },
  { id: 5, name: "API rate limiting", owner: "TC", status: "Working", priority: "Medium", date: "Apr 15", progress: 45 },
  { id: 6, name: "Onboarding email sequence", owner: "AS", status: "Not Started", priority: "Low", date: "Apr 18", progress: 0 },
];

const statusBadgeVariant = (status: string) => {
  switch (status) {
    case "Done": return "done" as const;
    case "Working": return "working" as const;
    case "Stuck": return "stuck" as const;
    default: return "secondary" as const;
  }
};

const priorityBadgeVariant = (priority: string) => {
  switch (priority) {
    case "Critical": return "stuck" as const;
    case "High": return "info" as const;
    case "Medium": return "purple" as const;
    default: return "secondary" as const;
  }
};

const avatarColors = ["bg-primary", "bg-status-done", "bg-status-purple", "bg-status-working", "bg-status-stuck"];

function BoardTable() {
  return (
    <Card className="overflow-hidden border bg-card shadow-card">
      <CardHeader className="flex-row items-center justify-between space-y-0 border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <CardTitle className="text-base font-semibold">Sprint Board</CardTitle>
          <Badge variant="info" className="text-xs">{tasks.length} items</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" /> Filter
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New Item
          </Button>
        </div>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b bg-secondary/50 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-3 text-left">Task</th>
              <th className="px-4 py-3 text-left">Owner</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Due</th>
              <th className="px-4 py-3 text-left">Progress</th>
              <th className="w-10 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <motion.tr
                key={task.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="group border-b transition-colors last:border-0 hover:bg-surface-hover"
              >
                <td className="px-6 py-3.5 text-sm font-medium text-foreground">{task.name}</td>
                <td className="px-4 py-3.5">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className={`${avatarColors[i % avatarColors.length]} text-xs font-semibold text-primary-foreground`}>
                      {task.owner}
                    </AvatarFallback>
                  </Avatar>
                </td>
                <td className="px-4 py-3.5">
                  <Badge variant={statusBadgeVariant(task.status)}>{task.status}</Badge>
                </td>
                <td className="px-4 py-3.5">
                  <Badge variant={priorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                </td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{task.date}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Progress value={task.progress} className="h-1.5 w-20" />
                    <span className="text-xs text-muted-foreground">{task.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ─── Component Showcase ──────────────────────────────────
function ComponentShowcase() {
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Buttons */}
      <Card className="border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Buttons</CardTitle>
          <CardDescription>All button variants and sizes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="premium">Premium</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
            <Button size="icon"><Plus className="h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Badges & Status</CardTitle>
          <CardDescription>Status indicators and labels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="done">Done</Badge>
            <Badge variant="working">Working</Badge>
            <Badge variant="stuck">Stuck</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="purple">Purple</Badge>
          </div>
          <div className="space-y-2 pt-2">
            <p className="text-sm font-medium text-foreground">Status Indicators</p>
            <div className="flex items-center gap-3">
              {[
                { color: "bg-status-done", label: "Complete" },
                { color: "bg-status-working", label: "In Progress" },
                { color: "bg-status-stuck", label: "Blocked" },
                { color: "bg-status-info", label: "Review" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inputs & Forms */}
      <Card className="border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Forms & Inputs</CardTitle>
          <CardDescription>Input fields and form controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input placeholder="name@company.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search projects..." />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground">Receive email updates</p>
            </div>
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
          </div>
        </CardContent>
      </Card>

      {/* Avatars & User List */}
      <Card className="border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Team Members</CardTitle>
          <CardDescription>Avatar groups and user lists</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex -space-x-2">
            {["AS", "MK", "JD", "LR", "TC"].map((initials, i) => (
              <Avatar key={initials} className="h-9 w-9 border-2 border-card">
                <AvatarFallback className={`${avatarColors[i]} text-xs font-semibold text-primary-foreground`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
            ))}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-secondary text-xs font-semibold text-muted-foreground">
              +4
            </div>
          </div>
          <div className="space-y-2">
            {[
              { name: "Alice Smith", role: "Product Manager", initials: "AS", i: 0 },
              { name: "Mark Kim", role: "Engineer", initials: "MK", i: 1 },
              { name: "Jane Doe", role: "Designer", initials: "JD", i: 2 },
            ].map((user) => (
              <div key={user.name} className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-surface-hover">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={`${avatarColors[user.i]} text-xs font-semibold text-primary-foreground`}>
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tabs Section ────────────────────────────────────────
function TabsSection() {
  return (
    <Card className="border bg-card shadow-card">
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b px-6">
            <TabsList className="h-12 w-full justify-start gap-1 rounded-none bg-transparent p-0">
              {[
                { value: "overview", icon: BarChart3, label: "Overview" },
                { value: "tasks", icon: CheckCircle2, label: "Tasks" },
                { value: "files", icon: FileText, label: "Files" },
                { value: "messages", icon: MessageSquare, label: "Messages" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="gap-1.5 rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value="overview" className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Tasks Completed", value: "127", total: "180", pct: 71 },
                { label: "Hours Tracked", value: "342", total: "400", pct: 86 },
                { label: "Bugs Fixed", value: "45", total: "52", pct: 87 },
              ].map((metric) => (
                <div key={metric.label} className="space-y-2 rounded-lg bg-secondary/50 p-4">
                  <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-foreground">{metric.value}</span>
                    <span className="text-sm text-muted-foreground">/ {metric.total}</span>
                  </div>
                  <Progress value={metric.pct} className="h-1.5" />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tasks" className="p-6">
            <p className="text-sm text-muted-foreground">Task management view goes here.</p>
          </TabsContent>
          <TabsContent value="files" className="p-6">
            <p className="text-sm text-muted-foreground">File browser goes here.</p>
          </TabsContent>
          <TabsContent value="messages" className="p-6">
            <p className="text-sm text-muted-foreground">Team messages go here.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// ─── Quick Actions / Feature Cards ───────────────────────
const features = [
  { icon: Layers, title: "Boards", description: "Manage projects with customizable boards", color: "bg-primary/10 text-primary" },
  { icon: BarChart3, title: "Dashboards", description: "Real-time data visualization & insights", color: "bg-status-done/10 text-status-done" },
  { icon: Zap, title: "Automations", description: "Automate workflows and save time", color: "bg-status-purple/10 text-status-purple" },
  { icon: Calendar, title: "Timeline", description: "Plan and track project milestones", color: "bg-status-working/10 text-status-working" },
  { icon: MessageSquare, title: "Updates", description: "Communicate with your team in context", color: "bg-status-info/10 text-status-info" },
  { icon: Star, title: "Favorites", description: "Quick access to your most-used items", color: "bg-status-stuck/10 text-status-stuck" },
];

function FeatureCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <motion.div key={f.title} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
          <Card className="group cursor-pointer border bg-card shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5">
            <CardContent className="flex items-start gap-4 p-5">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${f.color}`}>
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{f.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{f.description}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────
export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Design System</h1>
            <p className="text-sm text-muted-foreground">monday.com-inspired SaaS component library</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-1.5">
              <Settings className="h-4 w-4" /> Settings
            </Button>
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" /> New Project
            </Button>
          </div>
        </div>

        {/* Stats */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Dashboard Stats</h2>
          <StatCards />
        </section>

        {/* Feature Cards */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Actions</h2>
          <FeatureCards />
        </section>

        {/* Tabs */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Project Overview</h2>
          <TabsSection />
        </section>

        {/* Board Table */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Sprint Board</h2>
          <BoardTable />
        </section>

        {/* Component Showcase */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Component Library</h2>
          <ComponentShowcase />
        </section>
      </main>
    </div>
  );
}
