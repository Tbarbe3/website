import React, {CSSProperties, useState} from 'react';
import {useLanguage} from '@/hooks/LanguageContext.tsx';
import {Card} from '@/components/ui/card.tsx';
import {BriefcaseBusiness, CheckCircle2, Eye, EyeClosed, PencilRuler} from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";

export type ExperienceType = {
    position: string,
    company: string,
    type: "Stage" | "Emploi" | "Autre",
    description: string,
    period: string,
    achievements: string[]
}

const ExperienceCard = ({exp, index, style}: { exp: ExperienceType, index: number, style?: CSSProperties }) => {
    return (
        <Card key={index} className="p-6 bg-base border-2 border-base-inv hover-lift"
              style={{animationDelay: `${index * 0.06}s`, ...style}}>
            <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                    <div
                        className="w-12 h-12 rounded-full bg-base-inv text-base flex items-center justify-center">
                        {exp.type == "Stage" ?
                            <PencilRuler className="h-6 w-6"/>
                            :
                            <BriefcaseBusiness className="h-6 w-6"/>
                        }
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <div>
                        <h3 className="text-xl font-bold text-foreground">{exp.position}</h3>
                        <p className="text-muted-foreground font-semibold">{exp.company}</p>
                        <p className="text-sm text-grey">{exp.period}</p>
                    </div>

                    <p className="text-grey">{exp.description}</p>

                    <ul className="space-y-2">
                        {exp.achievements.map((achievement: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2
                                    className="h-5 w-5 text-grey flex-shrink-0 mt-0.5"/>
                                <span
                                    className="text-sm text-grey">{achievement}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
}

export const Experience = () => {
    const {t} = useLanguage();
    const [expanded, setExpanded] = useState(false);
    const [showRest, setShowRest] = useState(false);

    const items = Array.isArray(t('experience.items')) ? t('experience.items') as ExperienceType[] : [];

    const VISIBLE_COUNT = 3;
    const firstItems = items.slice(0, VISIBLE_COUNT);
    const restItems = items.slice(VISIBLE_COUNT);
    const remaining = restItems.length;

    const ANIM_DURATION = 340; // ms, keep in sync with CSS transitions used below

    const handleToggle = () => {
        if (!expanded) {
            // mount items first, then trigger animation in next frames
            setShowRest(true);
            requestAnimationFrame(() => requestAnimationFrame(() => setExpanded(true)));
        } else {
            // trigger collapse animation, then unmount after animation finishes
            setExpanded(false);
            setTimeout(() => setShowRest(false), ANIM_DURATION + 40);
        }
    };

    return (
        <section id="experience" className="py-20 px-4 bg-experience">
            <div className="container mx-auto space-y-8">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('experience.title')}</h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {firstItems.map((exp, index) => (
                        <ExperienceCard exp={exp} index={index}/>
                    ))}
                </div>

                {/* Rest items: mount only when needed and animate with transform/opacity (GPU compositing) */}
                {showRest && (
                    <div className="max-w-4xl mx-auto space-y-8">
                        {restItems.map((exp, index) => {
                            const globalIndex = index + VISIBLE_COUNT;
                            const delaySec = (globalIndex * 40) / 1000; // stagger 40ms per item
                            const style: React.CSSProperties = {
                                transform: expanded ? 'translateY(0)' : 'translateY(8px)',
                                opacity: expanded ? 1 : 0,
                                transition: `transform ${ANIM_DURATION}ms cubic-bezier(.2,.8,.2,1) ${delaySec}s, opacity ${ANIM_DURATION}ms ease ${delaySec}s`,
                                willChange: 'transform, opacity',
                                pointerEvents: expanded ? undefined : 'none',
                            };

                            return <ExperienceCard exp={exp} index={globalIndex} style={style}/>;
                        })}
                    </div>
                )}

                {/* Voir plus / Voir moins */}
                {remaining > 0 && (
                    <div className="text-center">
                        <Button
                            size="lg"
                            className="bg-base-inv hover:opacity-90 text-base"
                            onClick={handleToggle}
                            aria-expanded={expanded}
                        >
                            {!expanded ? <Eye className="mr-2 h-5 w-5"/> : <EyeClosed className="mr-2 h-5 w-5"/>}
                            {!expanded ? `${t("nav.more")} (${remaining})` : t("nav.less")}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};