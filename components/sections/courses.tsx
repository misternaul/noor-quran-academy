"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Book, Star, BookOpen, Languages, Sparkles } from "lucide-react";

const coursesData = [
  { id: 1, title: "Noorani Qaida", category: "Quran", level: "Beginner", icon: Book, desc: "Learn the basics of Arabic alphabets and pronunciation. Perfect for beginners and kids." },
  { id: 2, title: "Quran Reading", category: "Quran", level: "Beginner - Intermediate", icon: BookOpen, desc: "Learn to read the Holy Quran fluently with basic rules of pronunciation." },
  { id: 3, title: "Quran with Tajweed", category: "Tajweed", level: "Intermediate", icon: Star, desc: "Master the rules of Tajweed for perfect recitation of the Holy Quran." },
  { id: 4, title: "Hifz-ul-Quran", category: "Hifz", level: "Advanced", icon: Sparkles, desc: "Memorize the Holy Quran with proper Tajweed under the guidance of expert Huffaz." },
  { id: 5, title: "Arabic Language", category: "Arabic", level: "All Levels", icon: Languages, desc: "Learn to speak, read, and write Arabic. Understand the language of the Quran." },
  { id: 6, title: "Islamic Studies", category: "Islamic Studies", level: "All Levels", icon: Book, desc: "Learn about Fiqh, Seerah, Hadith, and essential Islamic knowledge for daily life." },
];

const filters = ["All", "Quran", "Tajweed", "Hifz", "Arabic", "Islamic Studies"];

export function Courses() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCourses = coursesData.filter(
    (course) => activeFilter === "All" || course.category === activeFilter
  );

  return (
    <section className="py-24 bg-background" id="courses">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent font-semibold tracking-wider uppercase text-sm">Our Programs</span>
            <span className="h-[1px] w-8 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Learn at Your <span className="text-primary">Own Pace</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Choose from our comprehensive range of courses designed for students of all ages and levels.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted text-foreground/70 hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-white border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <course.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">{course.title}</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-foreground/70">
                    {course.level}
                  </span>
                </div>
                
                <p className="text-foreground/70 text-sm mb-8 flex-1">
                  {course.desc}
                </p>
                
                <div className="flex gap-3 mt-auto">
                  <Button variant="outline" className="flex-1 border-primary/20 hover:bg-primary/5 hover:text-primary">
                    Learn More
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
                    Free Trial
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
