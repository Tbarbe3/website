import {Moon, Sun, Menu, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Language} from "@/data/translations.ts";
import fr from '@/assets/icons/fr.svg';
import gb from '@/assets/icons/gb.svg';
import es from '@/assets/icons/es.svg';
import {useTheme} from "@/hooks/ThemeContext.tsx";
import {useLanguage} from "@/hooks/LanguageContext.tsx";
import logoLight from '@/assets/logo.gif';

export const Header = () => {
    const {theme, toggleTheme} = useTheme();
    const {language, setLanguage, t} = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        {key: 'home', href: '#home'},
        {key: 'school', href: '#school'},
        {key: 'experience', href: '#experience'},
        {key: 'projects', href: '#projects'},
        {key: 'skills', href: '#skills'},
        {key: 'contact', href: '#contact'},
    ];

    const languages = [
        {code: 'fr', label: 'FR', icon: fr},
        {code: 'en', label: 'EN', icon: gb},
        {code: 'es', label: 'ES', icon: es},
    ];

    const currentLanguage = languages.find((lang) => lang.code === language);

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-base backdrop-blur-lg border-b border-border">
            <nav className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" className="flex justify-center items-center">
                        <div className="w-full relative">
                            <img src={logoLight} alt={"Logo"} className={`logo-img h-16 my-3`}/>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.key}
                                href={item.href}
                                className="text-foreground hover:text-primary transition-colors"
                            >
                                {t(`nav.${item.key}`)}
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Language Selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    {currentLanguage ? (
                                        <div className="flex items-center transition-opacity duration-300">
                                            <img src={currentLanguage.icon} alt={currentLanguage.label}
                                                 className="w-5 h-5 mr-2"/>
                                            {currentLanguage.label}
                                        </div>
                                    ) : (
                                        language.toUpperCase()
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {languages.map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.code}
                                        onClick={() => setLanguage(lang.code as Language)}
                                    >
                                        <img src={lang.icon} alt={lang.label} className="w-5 h-5 mr-2"/>
                                        {lang.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Theme Toggle */}
                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
                            <div className="relative w-4 h-4">
                                <Sun
                                    className={`absolute transition-all duration-300 ${theme === 'light' ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-0'}`}/>
                                <Moon
                                    className={`absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-0'}`}/>
                            </div>
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5"/>
                            ) : (
                                <Menu className="h-5 w-5"/>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-4 animate-slide-down">
                        {navItems.map((item) => (
                            <a
                                key={item.key}
                                href={item.href}
                                className="block text-foreground hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t(`nav.${item.key}`)}
                            </a>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
};
