import { Link } from "react-router";
import { Users, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-card border-t border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="h-9 w-9 rounded-xl hero-gradient flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="font-heading text-xl font-bold text-gradient">
                                ClubSphere
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Connecting communities through shared passions. Discover, join, and manage local clubs with ease.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {["Home", "Clubs", "Events", "Pricing"].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-heading font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            {["Help Center", "Terms of Service", "Privacy Policy", "FAQ"].map(
                                (item) => (
                                    <li key={item}>
                                        <Link
                                            to="#"
                                            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4 text-primary" />
                                hello@clubsphere.com
                            </li>
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                San Francisco, CA
                            </li>
                        </ul>
                        <div className="flex gap-3 mt-4">
                            <a
                                href="#"
                                className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                                <Github className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                                <Linkedin className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} ClubSphere. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;