import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, Zap, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-xl">Aivora</span>
        </div>
        <Link
          to="/chat"
          className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center pt-24 pb-20 px-6">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-xs text-muted-foreground mb-8">
            <Sparkles className="h-3 w-3 text-primary" />
            Powered by AI
          </div>
          <h1 className="text-5xl sm:text-7xl font-display font-bold mb-6 leading-tight">
            Your Intelligent{' '}
            <span className="gradient-text">AI Assistant</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Experience the next generation of AI conversation. Aivora helps you think, create, and solve problems with unmatched intelligence.
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-base"
          >
            Start Chatting <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: MessageSquare, title: 'Natural Conversations', desc: 'Chat naturally with an AI that understands context and nuance.' },
            { icon: Zap, title: 'Instant Responses', desc: 'Get real-time streaming responses with a smooth typing effect.' },
            { icon: Shield, title: 'Secure & Private', desc: 'Your conversations are private and protected with enterprise security.' },
          ].map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © 2026 Aivora. All rights reserved.
      </footer>
    </div>
  );
}
