import { motion } from "framer-motion";
import { ArrowRight, Users, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router";
import Button from "../../Components/Shared/Buttons";

import React from 'react';

const Banner = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            <div className="container relative px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
                    >
                        <Sparkles className="h-4 w-4" />
                        Connect with your community
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                    >
                        Discover & Join
                        <br />
                        <span className="text-gradient">Local Clubs</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                    >
                        Connect with like-minded people in your area. From photography to hiking,
                        book clubs to tech meetups — find your tribe and grow together.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button variant="hero" size="xl" asChild>
                            <Link to="/clubs">
                                <Users className="h-5 w-5 mr-2" />
                                Explore Clubs
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Link>
                        </Button>
                        <Button variant="heroOutline" size="xl" asChild>
                            <Link to="/register">
                                <Calendar className="h-5 w-5 mr-2" />
                                Create Your Club
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-16 pt-8 border-t border-border"
                    >
                        {[
                            { value: "500+", label: "Active Clubs" },
                            { value: "10k+", label: "Members" },
                            { value: "1,200+", label: "Events Monthly" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="font-heading text-3xl sm:text-4xl font-bold text-gradient">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Banner;