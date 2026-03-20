import { motion } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["10 messages per day", "Basic AI responses", "Chat history"],
    cta: "Current Plan",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "₹99",
    period: "/month",
    features: ["Unlimited messages", "Faster responses", "Advanced AI", "Priority support"],
    cta: "Upgrade Now",
    highlighted: true,
  },
];

const Pricing = () => {
  const { profile } = useAuth();

  const handleUpgrade = () => {
    toast.info("Payment integration coming soon! Contact support to upgrade.");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-border/50">
        <Link to="/" className="text-muted-foreground hover:text-foreground animate-ease-out">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="text-xl font-bold tracking-tighter text-gradient-primary">Aivora</span>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tighter">Simple, transparent pricing</h1>
          <p className="text-muted-foreground mt-3">Choose the plan that fits your needs.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
              className={`rounded-xl p-6 border ${
                plan.highlighted
                  ? "border-primary/50 glow-primary bg-surface"
                  : "border-border bg-card"
              }`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tighter">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={plan.highlighted ? handleUpgrade : undefined}
                disabled={!plan.highlighted || profile?.plan === "premium"}
                className={`mt-6 w-full py-2.5 rounded-lg text-sm font-medium animate-ease-out ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-secondary text-secondary-foreground"
                } disabled:opacity-50`}
              >
                {profile?.plan === "premium" && plan.highlighted ? "Active" : plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
