import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    });
  }, [navigate]);

  const handleGenerateClick = () => {
    if (isAuthenticated) {
      navigate("/generator");
    } else {
      navigate("/login");
    }
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Suggestions",
      description: "Get creative, engaging newsletter titles tailored to your niche",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Audience-Focused",
      description: "Titles that resonate with your target audience",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Generation",
      description: "Save hours brainstorming the perfect title",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="container px-4 pt-32 pb-20 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-secondary text-primary">
            Newsletter Title Generator
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl text-primary">
            Create Compelling Newsletter Titles That Convert
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Stop struggling with newsletter titles. Our AI-powered generator helps founders create
            engaging titles that attract subscribers and drive growth.
          </p>
          <div className="flex items-center justify-center gap-4 mt-10">
            <Button
              size="lg"
              className="text-lg transition-all duration-200 hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleGenerateClick}
            >
              Start Generating
              <ArrowRight className={`ml-2 transition-transform duration-200 ${isHovered ? "translate-x-1" : ""}`} />
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto mt-20 sm:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 transition-all duration-200 rounded-lg hover:shadow-lg bg-white"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-secondary">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-primary">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Generate engaging newsletter titles in three simple steps
            </p>
          </motion.div>

          <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto mt-16 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Enter Your Topic",
                description: "Tell us about your newsletter's focus and target audience",
              },
              {
                step: "2",
                title: "Generate Titles",
                description: "Our AI generates multiple engaging title options",
              },
              {
                step: "3",
                title: "Choose & Customize",
                description: "Pick your favorite and customize it to perfection",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative p-6 bg-white rounded-lg"
              >
                <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 -mt-4 -ml-4 text-white rounded-full bg-primary">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
              Ready to Create Your Newsletter?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of founders who use our tool to create engaging newsletter titles
            </p>
            <Button
              size="lg"
              className="mt-10 text-lg transition-all duration-200 hover:scale-105"
              onClick={() => navigate("/generator")}
            >
              Get Started Now
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
