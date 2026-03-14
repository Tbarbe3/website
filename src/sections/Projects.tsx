import {useLanguage} from '@/hooks/LanguageContext.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import {ExternalLink, ChevronLeft, ChevronRight, X} from 'lucide-react';
import React, {useEffect, useRef, useState, useMemo} from 'react';

export type ProjectType = {
    title: string,
    description: string,
    link: string,
    technologies: string[],
    favorite?: boolean,
    header?: string,
    banner?: string,
    logo?: string,
}

export const Projects = () => {
    const {t} = useLanguage();

    const projects = useMemo(() => {
        return Array.isArray(t('projects.items'))
            ? (t('projects.items') as ProjectType[])
            : [];
    }, [t]);

    const [cardWidth, setCardWidth] = useState<number>(288); // default matching w-80 (20rem -> 320px)
    const [current, setCurrent] = useState<number>(0); // will initialize after clones calculation
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitionEnabled, setIsTransitionEnabled] = useState<boolean>(true);
    const [visibleCount, setVisibleCount] = useState<number>(1);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);

    // Modal state
    const [modalMounted, setModalMounted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null); // index in `projects` array

    // Measure card width from DOM (fallback to default)
    useEffect(() => {
        const el = cardRef.current;
        if (el) {
            const w = el.getBoundingClientRect().width;
            if (w && w > 0) setCardWidth(w + 24); // gap-6 => 1.5rem = 24px
        }
    }, [projects]);

    // Measure viewport width and calculate how many cards are visible
    useEffect(() => {
        function updateVisible() {
            const vp = viewportRef.current;
            if (!vp) return;
            const width = vp.getBoundingClientRect().width;
            if (!width || !cardWidth) return;
            const count = Math.max(1, Math.floor(width / cardWidth));
            setVisibleCount(count);
        }
        updateVisible();
        window.addEventListener('resize', updateVisible);
        return () => window.removeEventListener('resize', updateVisible);
    }, [cardWidth]);

    // Build extended list with clones based on visibleCount so we never see empty space
    const clones = projects.length <= 1 ? 0 : Math.max(1, visibleCount + 1);
    const extended = useMemo(() => {
        if (projects.length === 0) return [];
        if (projects.length === 1) return [...projects];

        // helper to repeat projects if there are fewer items than clones
        const repeated = [...projects];
        while (repeated.length < clones) {
            repeated.push(...projects);
        }

        const frontClones = repeated.slice(-clones).map((p) => ({...p}));
        const endClones = repeated.slice(0, clones).map((p) => ({...p}));

        return [...frontClones, ...projects, ...endClones];
    }, [projects, clones]);

    // Ensure current starts at `clones` (first real project)
    useEffect(() => {
        if (projects.length > 0) {
            setCurrent(clones);
        } else {
            setCurrent(0);
        }
    }, [projects.length, clones]);

    // Autoplay
    useEffect(() => {
        if (isPaused || projects.length <= 1) return;
        const id = setInterval(() => {
            // use functional update to avoid referencing `current` in deps
            setIsTransitionEnabled(true);
            setCurrent(c => c + 1);
        }, 3500);
        return () => clearInterval(id);
    }, [isPaused, projects.length]);

    function goTo(idx: number) {
        if (projects.length <= 1) return;
        setIsTransitionEnabled(true);
        setCurrent(idx);
    }

    function prev() {
        goTo(current - 1);
    }
    function next() {
        goTo(current + 1);
    }

    function handleTransitionEnd() {
        if (projects.length <= 1) return;

        // If we've moved into the left clones (index < clones), jump to the mirrored real items
        if (current < clones) {
            const newIdx = current + projects.length;
            // disable transition and perform immediate jump
            setIsTransitionEnabled(false);
            setCurrent(newIdx);
            // re-enable transition on next frame
            requestAnimationFrame(() => {
                // small timeout to ensure DOM updated
                requestAnimationFrame(() => setIsTransitionEnabled(true));
            });
            return;
        }
        // If we've moved into the right clones (index >= clones + projects.length), jump back
        if (current >= clones + projects.length) {
            const newIdx = current - projects.length;
            setIsTransitionEnabled(false);
            setCurrent(newIdx);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setIsTransitionEnabled(true));
            });
            return;
        }
    }

    const translateX = -current * cardWidth;

    const visibleIndex = projects.length > 0
        ? ((current - clones) % projects.length + projects.length) % projects.length + 1
        : 0;

    // helper pour convertir un index étendu vers l'index réel dans `projects`
    const toRealIndex = (extIdx: number) => {
        if (projects.length === 0) return 0;
        return ((extIdx - clones) % projects.length + projects.length) % projects.length;
    };

    // Modal control
    function openProjectByExtendedIndex(extIdx: number) {
        if (projects.length === 0) return;
        const real = toRealIndex(extIdx);
        setActiveProjectIndex(real);
        setModalMounted(true);
        // start visible on next frame to trigger transition (flip+scale)
        requestAnimationFrame(() => requestAnimationFrame(() => setModalVisible(true)));
    }

    function closeModal() {
        setModalVisible(false);
        // wait for animation to finish before unmount
        setTimeout(() => {
            setModalMounted(false);
            setActiveProjectIndex(null);
        }, 420);
    }

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (!modalMounted) return;
            if (e.key === 'Escape') closeModal();
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [modalMounted]);

    const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;

    return (
        <section id="projects" className="py-20 px-4 bg-muted/50">
            <div className="container mx-auto px-0">
                <div className="text-center mb-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('projects.title')}</h2>
                    <p className="text-xl text-muted-foreground">{t('projects.subtitle')}</p>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Carousel viewport */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}>

                        {/* viewport sans padding pour que l'overflow clip correctement les cartes */}
                        <div className="overflow-hidden px-8 py-4" ref={viewportRef}>
                            <div
                                ref={trackRef}
                                onTransitionEnd={handleTransitionEnd}
                                className="flex gap-6"
                                style={{
                                    transition: isTransitionEnabled ? `transform 400ms ease` : 'none',
                                    transform: `translateX(${translateX}px)`,
                                }}>
                                {extended.map((project, index) => (
                                    <div className="flex flex-col" key={index} ref={index === clones ? cardRef : null}>
                                        <div
                                            className="flex flex-col flex-grow relative bg-card rounded-2xl w-72 min-h-80 m-auto pb-6 hover-lift animate-slide-up"
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                            >
                                            <div className="flex justify-between z-10 absolute -top-2 -left-1 w-full">
                                                {project.header ?
                                                    <span className="flex relative max-w-9/10 kjRpbF">
                                                        <span
                                                            className="banner bg-gradient-to-tr from-primary to-primary-dark h-8 relative font-bold px-1 py-3 text-sm|1 text-center text-white whitespace-nowrap rounded-tl-xl rounded-br-xl mr-1">
                                                            {project.header}
                                                        </span>
                                                    </span>
                                                    : ""}
                                            </div>
                                            <div className="flex flex-col flex-1">
                                                <div
                                                    className="relative block h-32 max-h-32 w-full z-1 overflow-hidden rounded-t-2xl"
                                                    title={project.title}>
                                                    <picture>
                                                        <img
                                                            src={
                                                                project.banner ??
                                                                `/projets/${
                                                                    project.title
                                                                        .toLowerCase()
                                                                        .normalize('NFD')
                                                                        .replace(/[\u0300-\u036f]/g, '')
                                                                        .replace(/[^a-z0-9]+/g, '-')
                                                                        .replace(/(^-|-$)/g, '')
                                                                }.png`
                                                            }
                                                            alt={project.title}
                                                            className="block w-full h-full object-cover"
                                                            ref={(el) => {
                                                                if (!el) return;
                                                                el.onload = () => {
                                                                    const sv = el.parentElement?.querySelector('svg');
                                                                    if (sv) (sv as unknown as HTMLElement).style.display = 'none';
                                                                    el.style.display = '';
                                                                };
                                                                el.onerror = () => {
                                                                    el.style.display = 'none';
                                                                    const sv = el.parentElement?.querySelector('svg');
                                                                    if (sv) (sv as unknown as HTMLElement).style.display = '';
                                                                };
                                                            }}
                                                        />

                                                        {/* logo overlay si présent */}
                                                        {project.logo && (
                                                            <img
                                                                src={project.logo}
                                                                alt={`${project.title} logo`}
                                                                className="absolute top-3 right-3 h-12 w-12 rounded-full bg-white/90 p-1 object-contain shadow-md z-20"
                                                            />
                                                        )}

                                                        <svg
                                                            role="img"
                                                            aria-label={project.title}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 720 280"
                                                            className="w-full h-full object-cover"
                                                            style={{ display: 'none' }}
                                                        >
                                                            <rect width="100%" height="100%" fill="var(--muted-foreground)" />
                                                            <g fill="var(--muted)" opacity="0.9">
                                                                <rect x="32" y="64" width="200" height="120" rx="8" />
                                                                <rect x="256" y="40" width="240" height="88" rx="6" />
                                                                <rect x="520" y="108" width="160" height="92" rx="6" />
                                                            </g>
                                                            <text x="50%" y="86%" fill="var(--muted)" fontSize="32" textAnchor="middle">
                                                                {project.title}
                                                            </text>
                                                        </svg>
                                                    </picture>
                                                    <svg className="pictureWave" width="1440" height="92" viewBox="0 0 1440 92"
                                                         fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 0C252.637 65.5178 414.692 79.0342 720 84.64H0V0Z"
                                                              fill="var(--card)"/>
                                                        <path d="M1440 0C1187.36 65.5178 1025.31 79.0342 720 84.64H1440V0Z"
                                                              fill="var(--card)"/>
                                                    </svg>
                                                </div>
                                                <div className="px-6 mt-4 grow">
                                                    <h3 className="text-lg|1 font-black text-base-inv whitespace-pre-wrap mb-3">{project.title}</h3>
                                                    <p className="block text-sm mb-6">{project.description}</p>

                                                    <div className="flex flex-wrap gap-2">
                                                        {(project.technologies).map((tech: string, idx: number) => (
                                                            <Badge key={idx} variant="secondary">
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-end grow px-4">
                                                <Button className="mt-6 w-full" variant="outline" onClick={() => openProjectByExtendedIndex(index)}>
                                                    {t('projects.seeMore')}
                                                </Button>
                                                {project.link ?
                                                    <Button className="mt-4 w-full" variant="outline" asChild>
                                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                            {t('projects.viewProject')}
                                                            <ExternalLink className="ml-2 h-4 w-4"/>
                                                        </a>
                                                    </Button>
                                                    : ""}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Left / Right masks pour cacher les cartes partielles sous les chevrons */}
                        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-background from-10% to-transparent" />
                        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-background from-10% to-transparent" />

                        {/* Controls */}
                        {projects.length > 1 && (
                            <>
                                <button
                                    aria-label="prev"
                                    onClick={prev}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 z-20">
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    aria-label="next"
                                    onClick={next}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 z-20">
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </>
                        )}

                    </div>

                    <div className="flex items-center justify-center flex-col">
                        <div className="text-sm text-muted-foreground mb-2">{visibleIndex} / {projects.length}</div>
                        <div className="flex gap-2 items-center">
                            {projects.map((_, idx) => (
                                <button
                                    key={idx}
                                    aria-label={`go-to-${idx+1}`}
                                    onClick={() => goTo(idx + clones)}
                                    className={`h-2 w-2 rounded-full ${visibleIndex === idx + 1 ? 'bg-primary-dark' : 'bg-muted-foreground'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal (flip + scale) */}
            {modalMounted && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    onClick={closeModal}
                    style={{
                        background: `rgba(0,0,0,${modalVisible ? 0.45 : 0})`,
                        transition: 'background 320ms ease',
                    }}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-4xl w-full mx-auto bg-card rounded-2xl shadow-lg overflow-hidden"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: modalVisible ? 'rotateY(0deg) scale(1)' : 'rotateY(160deg) scale(0.84)',
                            transition: 'transform 420ms cubic-bezier(.2,.9,.2,1)',
                            willChange: 'transform',
                        }}>
                        <div className="relative w-full h-64 md:h-96">
                            <img
                                src={activeProject?.banner || activeProject?.logo || ''}
                                alt={activeProject?.title || ''}
                                className="w-full h-full object-cover"
                            />
                            {activeProject?.logo && (
                                <img
                                    src={activeProject.logo}
                                    alt={`${activeProject.title} logo`}
                                    className="absolute top-6 right-6 h-16 w-16 rounded-full bg-white/90 p-1 object-cover shadow-md z-30"
                                />
                            )}
                            <button
                                aria-label="close"
                                onClick={closeModal}
                                className="absolute top-4 right-4 bg-card/70 hover:bg-card rounded-full p-2 z-40">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-3">{activeProject?.title}</h3>
                            <p className="text-base text-muted-foreground mb-4">{activeProject?.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {activeProject?.technologies.map((tech, i) => (
                                    <Badge key={i} variant="secondary">{tech}</Badge>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                {activeProject?.link && (
                                    <Button variant="default" asChild>
                                        <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                                            {t('projects.viewProject')}
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                )}
                                <Button variant="ghost" onClick={closeModal}>{t('projects.close') || 'Close'}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
