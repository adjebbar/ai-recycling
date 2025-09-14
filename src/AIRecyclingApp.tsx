import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, Trophy, Scan } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AIRecyclingApp() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Smart Scanning",
      description: "Scan and identify recyclable materials instantly.",
      icon: Scan,
      action: () => navigate("/scanner"),
    },
    {
      title: "Rewards System",
      description: "Earn eco-points and exchange them for real rewards.",
      icon: Trophy,
      action: () => navigate("/rewards"),
    },
    {
      title: "Eco Challenges",
      description: "Participate in challenges and climb the leaderboard.",
      icon: Recycle,
      action: () => navigate("/challenges"),
    },
    {
      title: "Your Impact",
      description: "Track your recycling contribution to the planet.",
      icon: Leaf,
      action: () => navigate("/profile"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold text-emerald-700 dark:text-emerald-400">
          AI Recycling
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          Join the green revolution 🌍 — scan, recycle, and earn rewards while
          making the world a cleaner place.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="shadow-xl border border-emerald-200 dark:border-emerald-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
              <CardHeader className="flex items-center space-x-4">
                <feature.icon className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <Button
                  onClick={feature.action}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md"
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
