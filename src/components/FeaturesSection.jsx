'use client'
import {Magnifier,ChartLineArrowUp,File,Rocket,
    Factory,Bookmark,ArrowUpRight,Sparkles

} from '@gravity-ui/icons';
import { motion } from "motion/react"

const FeaturesSection = () => {

const features = [
  {
    title: "Smart Search",
    desc: "Find your ideal job with advanced filters.",
    icon: Magnifier ,
  },
  {
    title: "Salary Insights",
    desc: "Get real salary data to negotiate confidently.",
    icon: ChartLineArrowUp,
  },
  {
    title: "Top Companies",
    desc: "Apply to verified companies that are hiring.",
    icon: Factory,
  },
  {
    title: "Saved Jobs",
    desc: "Manage apps & favorites on your dashboard.",
    icon: Bookmark,
  },
  {
    title: "One-Click Apply",
    desc: "Simplify your job applications process.",
    icon: Sparkles,
  },
  {
    title: "Resume Builder",
    desc: "Create professional resumes with modern templates.",
    icon: File,
  },
  {
    title: "Skill-Based Matching",
    desc: "Discover jobs that match your skills and experience.",
    icon: Rocket,
  },
  {
    title: "Career Growth",
    desc: "Boost your career with quick interview tips.",
    icon:ArrowUpRight,
  },
];
    return (
        <section className="w-full bg-[#0b0b10] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase">
            Features • Job
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold mt-3">
            Everything you need <br /> to succeed
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
         <motion.div
  key={i}
 
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration:1, delay: i * 0.1 }}
  viewport={{ once: true }}
  whileHover={{ scale: 1.05 }}
  
  className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
>
  {/* icon */}
  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 mb-4 group-hover:bg-purple-500/20 transition">
    <Icon className="w-5 h-5 text-purple-300" />
  </div>

  {/* text */}
  <h3 className="text-lg font-medium">
    {item.title}
  </h3>

  <p className="text-sm text-gray-400 mt-2">
    {item.desc}
  </p>
</motion.div>
            );
          })}
        </div>
      </div>
    </section>
    );
};

export default FeaturesSection;