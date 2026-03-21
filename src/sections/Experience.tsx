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
        <Card key={index}
              className="hover-lift"
              style={{animationDelay: `${index * 0.06}s`, ...style}}>
            <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                    <div
                        className="w-12 h-12 rounded-full bg-base-inv text-muted flex items-center justify-center">
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
                        <p className="font-semibold text-grey">{exp.company}</p>
                        <p className="text-sm text-grey">{exp.period}</p>
                    </div>

                    <p className="text-muted-foreground">{exp.description}</p>

                    <ul className="space-y-2">
                        {exp.achievements.map((achievement: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2
                                    className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5"/>
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

export const Experience = () => {
    const {t} = useLanguage();
    const [expanded, setExpanded] = useState(false);
    const [showRest, setShowRest] = useState(false);

    const items = Array.isArray(t('experience.items')) ? t('experience.items') as ExperienceType[] : [];

    const VISIBLE_COUNT = 2;
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
        <section id="experience" className="px-0 bg-background relative overflow-hidden">
            <div className="container mx-auto space-y-8 py-14 px-8">
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
                            className="bg-base-inv hover:opacity-60 text-base shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300"
                            onClick={handleToggle}
                            aria-expanded={expanded}
                        >
                            {!expanded ? <Eye className="mr-2 h-5 w-5"/> : <EyeClosed className="mr-2 h-5 w-5"/>}
                            {!expanded ? `${t("nav.more")} (${remaining})` : t("nav.less")}
                        </Button>
                    </div>
                )}
            </div>

            <div className="w-full relative flex justify-center items-center gap-6 py-6 px-12">
                {/* Ligne gauche */}
                <div className="flex-1 h-0.5 bg-gradient-to-r from-background to-black opacity-50"></div>
                
                {/* Icône au centre */}
                <svg className="w-12 h-12 flex-shrink-0 opacity-50" width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="91" height="91" rx="45.5" fill="black"/>
                    <path d="M52.1375 31.4875C51.6871 31.947 51.4348 32.5649 51.4348 33.2083C51.4348 33.8518 51.6871 34.4696 52.1375 34.9292L56.0708 38.8625C56.5304 39.3129 57.1482 39.5652 57.7917 39.5652C58.4351 39.5652 59.053 39.3129 59.5125 38.8625L67.1481 31.2294C67.9348 30.4378 69.2696 30.6885 69.5646 31.7653C70.3074 34.4667 70.2654 37.3238 69.4436 40.0022C68.6218 42.6806 67.0542 45.0696 64.9242 46.8895C62.7943 48.7095 60.19 49.8853 57.4162 50.2792C54.6423 50.6731 51.8137 50.2688 49.2613 49.1138L29.8158 68.5592C28.8379 69.5368 27.5116 70.0859 26.1287 70.0857C24.7459 70.0855 23.4197 69.5359 22.4421 68.5579C21.4644 67.5799 20.9153 66.2536 20.9155 64.8708C20.9158 63.4879 21.4653 62.1618 22.4433 61.1842L41.8887 41.7388C40.7336 39.1863 40.3294 36.3577 40.7233 33.5838C41.1172 30.81 42.2929 28.2058 44.1129 26.0758C45.9329 23.9458 48.3219 22.3782 51.0003 21.5564C53.6787 20.7346 56.5358 20.6926 59.2372 21.4354C60.3139 21.7304 60.5647 23.0628 59.7755 23.8544L52.1375 31.4875Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                
                {/* Ligne droite */}
                <div className="flex-1 h-0.5 bg-gradient-to-l from-background to-black opacity-50"></div>
            </div>
        </section>
    );
};