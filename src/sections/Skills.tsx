import {useLanguage} from '@/hooks/LanguageContext.tsx';
import {Card} from '@/components/ui/card.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import React from "react";

export const Skills = () => {
    const {t} = useLanguage();

    const categories = ['frontend', 'backend', 'tools', 'other'];

    return (
        <section id="skills" className="px-0 relative overflow-hidden bg-polaroid-grey">
            <div className="container mx-auto pt-14 pb-5 px-8">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('skills.title')}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {categories.map((category, index) => (
                        <Card
                            className="bg-background hover-lift"
                            style={{animationDelay: `${index * 0.1}s`}}
                        >
                            <h4 className="text-2xl font-semibold mb-5 text-foreground">
                                {t(`skills.categories.${category}`)}
                            </h4>

                            <div className="flex flex-wrap gap-2.5">
                                {(Array.isArray(t(`skills.items.${category}`))
                                        ? t(`skills.items.${category}`) as string[]
                                        : []
                                ).map((skill, idx) => (
                                    <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="text-sm px-3.5 py-1.5 border border-base-inv/60 text-foreground"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="w-full relative flex justify-end items-baseline">
                <svg className="pictureWave w-full relative" width="1440" height="92"
                     viewBox="0 0 1440 92" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 0C252.637 65.5178 414.692 79.0342 720 84.64H0V0Z"
                        fill="var(--background)"/>
                    <path
                        d="M1440 0C1187.36 65.5178 1025.31 79.0342 720 84.64H1440V0Z"
                        fill="var(--background)"/>
                    <rect y="83.64" width="1440" height="7.36" fill="var(--background)"/>
                </svg>
            </div>
        </section>
    );
};
