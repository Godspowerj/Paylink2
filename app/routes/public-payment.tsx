import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link2, Shield } from "lucide-react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { formatCurrency, mockCollections } from "~/data/mock-data";
import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";

const PublicPayment = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isDemo = slug === "demo";
  const collection = isDemo ? mockCollections[0] : mockCollections[0];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(collection.amountType === "fixed" ? String(collection.fixedAmount || "") : "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!amount || Number(amount) <= 0) errs.amount = "Enter a valid amount";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/payment-success", {
        state: {
          amount: Number(amount),
          collection: collection.name,
          reference: `PAY-${Date.now().toString(36).toUpperCase()}`,
          date: new Date().toISOString(),
        },
      });
    }, 1200);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center text-center">
          <Logo size="large" />
        </div>

        <motion.div
          className="rounded-xl border bg-card p-6 shadow-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <div className="mb-6 border-b pb-4">
            <h1 className="text-xl font-bold text-foreground">{collection.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Organized by {collection.organizer}</p>
            <p className="mt-3 text-sm text-muted-foreground">{collection.description}</p>
            {collection.amountType === "fixed" && (
              <div className="mt-4 rounded-lg bg-primary/5 p-3 text-center">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(collection.fixedAmount || 0)}</p>
              </div>
            )}
          </div>

          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <Label htmlFor="payName">Your Name</Label>
              <Input id="payName" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="payEmail">Your Email</Label>
              <Input id="payEmail" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            {collection.amountType === "flexible" && (
              <div>
                <Label htmlFor="payAmount">Amount (KES)</Label>
                <Input id="payAmount" type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1" />
                {errors.amount && <p className="mt-1 text-xs text-destructive">{errors.amount}</p>}
              </div>
            )}
            <Button type="submit" className="w-full text-base" size="lg" disabled={loading}>
              {loading ? "Processing..." : `Pay ${amount ? formatCurrency(Number(amount)) : ""}`}
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Shield size={12} /> Secured by Paylink
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicPayment;
