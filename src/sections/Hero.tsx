import {Button} from '@/components/ui/button.tsx';
import {useLanguage} from '@/hooks/LanguageContext.tsx';
import {ArrowRight, Mail} from 'lucide-react';
import {ThemedPolaroids} from "@/components/ThemedPolaroids.tsx";
import React from "react";

export const Hero = () => {
    const {t} = useLanguage();

    const calculateAge = (birthDateString: string) => {
        const birthDate = new Date(birthDateString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const age = calculateAge('2004-08-03');

    return (
        <section id="home"
                 className="flex flex-col items-center justify-center pt-28 px-0 relative overflow-hidden">
            <div className="container mx-auto px-0 flex items-center justify-center">
                <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
                    {/* Greeting */}
                    <h3 className="text-lg text-muted-foreground animate-slide-up">
                        {t('hero.greeting')}
                    </h3>

                    {/* Name */}
                    <h1 className="text-5xl md:text-7xl font-bold animate-slide-up" style={{animationDelay: '0.1s'}}>
                        <span className="gradient-text">Thomas BARBÉ</span>
                    </h1>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground animate-slide-up"
                        style={{animationDelay: '0.2s'}}>
                        {t('hero.title') + " (" + age + " " + t('hero.age') + ")"}
                    </h2>

                    {/* Description */}
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
                       style={{animationDelay: '0.3s'}}>
                        {t('hero.description')}
                    </p>

                    {/* Decorative gradient */}
                    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"/>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"/>
                    </div>
                </div>
            </div>

            {/* Frame SVG at the bottom */}
            <div className="w-full relative flex justify-center items-center">
                {/* CTA Buttons */}
                <div
                    className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up absolute top-10 z-10 w-[60%] sm:w-[45%] md:w-[35%] lg:w-[25%] h-auto"
                    style={{animationDelay: '0.4s'}}>
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-white"
                        onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}
                    >
                        {t('hero.cta')}
                        <ArrowRight className="ml-2 h-5 w-5"/>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                    >
                        <Mail className="mr-2 h-5 w-5"/>
                        {t('hero.contact')}
                    </Button>
                </div>

                {/* Profile Picture */}
                <div className="item hidden md:block absolute z-10 w-[45%] sm:w-[45%] md:w-[25%] lg:w-[25%] h-auto object-contain">
                    <div className="polaroid">
                        <img
                            src="/profile.jpeg"
                            alt="Thomas BARBÉ (Me)"
                        />
                        <div className="caption">Bienvenue!</div>
                    </div>
                </div>

                <ThemedPolaroids/>
            </div>
        </section>
    );
};
