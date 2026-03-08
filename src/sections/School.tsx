import React, {CSSProperties, useState} from 'react';
import {useLanguage} from '@/hooks/LanguageContext.tsx';
import {Card} from '@/components/ui/card.tsx';
import {BookOpen, BookOpenCheck, CheckCircle2, Eye, EyeClosed} from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";

export type SchoolType = {
    position: string,
    company: string,
    description?: string,
    current?: boolean,
    period: string,
    achievements: string[]
}

const SchoolCard = ({exp, index, style}: { exp: SchoolType, index: number, style?: CSSProperties }) => {
    return (
        <Card key={index} className="p-6 bg-background hover-lift"
              style={{animationDelay: `${index * 0.06}s`, ...style}}>
            <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                    <div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                        {exp.current ?
                            <BookOpen className="h-6 w-6 text-white"/>
                            :
                            <BookOpenCheck className="h-6 w-6 text-white"/>
                        }
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <div>
                        <h3 className="text-xl font-bold text-foreground">{exp.position}</h3>
                        <p className="text-accent font-semibold">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                    </div>

                    <p className="text-muted-foreground">{exp.description}</p>

                    <ul className="space-y-2">
                        {exp.achievements.map((achievement: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2
                                    className="h-5 w-5 text-accent flex-shrink-0 mt-0.5"/>
                                <span
                                    className="text-sm text-muted-foreground">{achievement}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
}

export const School = () => {
    const {t} = useLanguage();
    const [expanded, setExpanded] = useState(false);
    const [showRest, setShowRest] = useState(false);

    const schools = Array.isArray(t('school.items')) ? t('school.items') as SchoolType[] : [];

    const VISIBLE_COUNT = 3;
    const firstItems = schools.slice(0, VISIBLE_COUNT);
    const restItems = schools.slice(VISIBLE_COUNT);
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
        <section id="school" className="py-8 px-4 bg-brown">
            <div className="container mx-auto space-y-8">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('school.title')}</h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {firstItems.map((exp, index) => (
                        <SchoolCard exp={exp} index={index}/>
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

                            return <SchoolCard exp={exp} index={globalIndex} style={style}/>;
                        })}
                    </div>
                )}

                {/* Voir plus / Voir moins */}
                {remaining > 0 && (
                    <div className="text-center">
                        <Button
                            size="lg"
                            className="bg-brown-dark hover:opacity-90 text-white"
                            onClick={handleToggle}
                            aria-expanded={expanded}
                        >
                            {!expanded ? <Eye className="mr-2 h-5 w-5"/> : <EyeClosed className="mr-2 h-5 w-5"/>}
                            {!expanded ? `Voir plus (${remaining})` : 'Voir moins'}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};
export default School
