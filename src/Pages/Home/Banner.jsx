import { motion } from "framer-motion";
import { ArrowRight, Users, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router";
import Button from "../../Components/Shared/Buttons";
import { Heart, Search, Droplets, Shield, Clock, MapPin, Bell, Phone, Mail, Send } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";

const Banner = () => {
    const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });

    // Stats data
    const stats = [
        { icon: Users, value: "10K+", label: "Active Donors" },
        { icon: Droplets, value: "25K+", label: "Lives Saved" },
        { icon: Heart, value: "500+", label: "Daily Donations" },
    ];
    // Features data
    const features = [
        { icon: Heart, title: "Easy Registration", description: "Quick and simple donor registration process." },
        { icon: MapPin, title: "Location Search", description: "Find donors near you quickly." },
        { icon: Bell, title: "Notifications", description: "Get notified when someone needs your blood type." },
        { icon: Shield, title: "Verified Donors", description: "All donors are verified for safety." },
        { icon: Clock, title: "24/7 Available", description: "Access the platform anytime." },
        { icon: Users, title: "Community", description: "Join a caring community of donors." },
    ];
    // Handle contact form
    function handleContactSubmit(e) {
        e.preventDefault();
        toast({ title: "Message Sent!", description: "We'll get back to you soon." });
        setContactForm({ name: "", email: "", subject: "", message: "" });
    }
    return (
        <div>
            {/* Hero Section */}
            <section className="gradient-warm py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Heart className="h-4 w-4 fill-primary" />
                            Save Lives, Donate Blood
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Your Blood Can <span className="text-gradient">Save Lives</span>
                        </h1>

                        <p className="text-lg text-muted-foreground mb-8">
                            Join our community of heroes. Connect with those in need and make a difference.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link to="/register">
                                    <Heart className="h-5 w-5 mr-2" />
                                    Join as a Donor
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link to="/search">
                                    <Search className="h-5 w-5 mr-2" />
                                    Search Donors
                                </Link>
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12">
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <stat.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Making Blood Donation <span className="text-gradient">Simple</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div key={feature.title} className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
                        <Heart className="h-12 w-12 text-primary-foreground mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                            Ready to Become a Lifesaver?
                        </h2>
                        <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                            Your single donation can save up to three lives.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" asChild>
                                <Link to="/register">
                                    Become a Donor
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                                <Link to="/donation-requests">View Requests</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 md:py-24 gradient-warm">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            Get in Touch
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Contact <span className="text-gradient">Our Team</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border/50">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Call Us</h3>
                                    <p className="text-foreground">+880 1234 567 890</p>
                                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border/50">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Email Us</h3>
                                    <p className="text-foreground">info@bloodlink.com</p>
                                    <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border/50">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Visit Us</h3>
                                    <p className="text-foreground">123 Health Avenue, Dhaka</p>
                                    <p className="text-sm text-muted-foreground">Mon-Sat: 9AM - 6PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        {/* <div className="bg-card rounded-xl p-6 border border-border/50">
                            <h3 className="text-xl font-semibold text-foreground mb-6">Send us a Message</h3>
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Your Name"
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                        required
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <Input
                                    placeholder="Subject"
                                    value={contactForm.subject}
                                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                    required
                                />
                                <Textarea
                                    placeholder="Your message..."
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    required
                                    className="min-h-[120px]"
                                />
                                <Button type="submit" className="w-full">
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </div> */}
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Banner;