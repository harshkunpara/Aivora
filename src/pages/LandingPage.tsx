import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border/50">
        <span className="text-xl font-bold tracking-tighter text-gradient-primary">Aivora</span>
        <div className="flex items-center gap-4">
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground animate-ease-out">
            Pricing
          </Link>
          {user ? (
            <Link
              to="/chat"
              className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 animate-ease-out"
            >
              Open App
            </Link>
          ) : (
            <Link
              to="/auth"
              className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 animate-ease-out"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gradient-primary leading-tight">
            Intelligence, refined.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Aivora AI is your premium AI assistant. Fast, intelligent, and crafted for those who demand more from their tools.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to={user ? "/chat" : "/auth"}
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:scale-105 animate-ease-out"
            >
              Start Chatting
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full text-foreground hover:bg-surface animate-ease-out"
            >
              View Plans
            </Link>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0, 0, 1] }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
        >
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Responses in milliseconds, not seconds." },
            { icon: Shield, title: "Private & Secure", desc: "Your conversations stay yours. Always." },
            { icon: MessageSquare, title: "Context-Aware", desc: "Remembers your full conversation." },
          ].map((f, i) => (
            <div key={i} className="glass-surface rounded-xl p-6 text-left">
              <f.icon className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-semibold tracking-tight">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      <footer className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © 2026 Aivora AI. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
