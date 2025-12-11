import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Users, LogIn, UserPlus } from "lucide-react";
import  Button  from "./Shared/Buttons";

const Navbar = () => {

    const links = [
        { href: "/", label: "Home" },
        { href: "/clubs", label: "Clubs" },
        { href: "/events", label: "Events" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="glass mx-4 mt-4 rounded-2xl">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex h-16 items-center justify-between">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="h-9 w-9 rounded-xl hero-gradient flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                <Users className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="font-heading text-xl font-bold text-gradient">
                                ClubSphere
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center gap-1">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <NavLink
                                        to={link.href}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.href
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            }`}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        {/* Desktop Auth */}
                        <div className="hidden md:flex items-center gap-3">
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/login">
                                    <LogIn className="h-4 w-4 mr-1" />
                                    Login
                                </Link>
                            </Button>

                            <Button size="sm" asChild>
                                <Link to="/register">
                                    <UserPlus className="h-4 w-4 mr-1" />
                                    Register
                                </Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden border-t border-border overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-2">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.href
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                <div className="pt-4 border-t border-border space-y-2">
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <Link to="/login" onClick={() => setIsOpen(false)}>
                                            <LogIn className="h-4 w-4 mr-2" />
                                            Login
                                        </Link>
                                    </Button>

                                    <Button className="w-full justify-start" asChild>
                                        <Link to="/register" onClick={() => setIsOpen(false)}>
                                            <UserPlus className="h-4 w-4 mr-2" />
                                            Register
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Navbar;
