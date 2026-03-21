import {useLanguage} from '@/hooks/LanguageContext.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import {ExternalLink, ChevronLeft, ChevronRight, X} from 'lucide-react';
import React, {useEffect, useRef, useState, useMemo} from 'react';

export type ProjectType = {
    title: string,
    subtitle: string,
    header?: string,
    link: string,
    description?: string,
    technologies: string[],
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
    // Est-ce que la zone du carousel est visible à l'écran ?
    const [isInView, setIsInView] = useState<boolean>(true);
    const [visibleCount, setVisibleCount] = useState<number>(1);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);

    // Modal state
    const [modalMounted, setModalMounted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null); // index in `projects` array

    // New: capture origin rect and modal ref to animate from clicked card
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [modalOriginRect, setModalOriginRect] = useState<DOMRect | null>(null);
    const [modalOriginEl, setModalOriginEl] = useState<HTMLElement | null>(null);
    const [modalOriginPrevVisibility, setModalOriginPrevVisibility] = useState<string | null>(null);
    const [modalInitialTransform, setModalInitialTransform] = useState<string | null>(null);
    // Per-card flip state (stores extended list index)
    const [flippedExtIndex, setFlippedExtIndex] = useState<number | null>(null);

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

    // Observer la visibilité du viewport (autoplay seulement quand visible)
    useEffect(() => {
        const el = viewportRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            // si pas d'élément ou pas de support, considérer visible pour compatibilité
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    setIsInView(entry.isIntersecting);
                });
            },
            {threshold: 0.5} // considérer visible quand au moins 50% visible
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [viewportRef]);

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

    // Autoplay: ne se déclenche que si non en pause, >1 projet, zone visible et pas de modal ouvert
    useEffect(() => {
        if (isPaused || projects.length <= 1 || !isInView || modalMounted) return;
        const id = setInterval(() => {
            // use functional update to avoid referencing `current` in deps
            setIsTransitionEnabled(true);
            setCurrent(c => c + 1);
        }, 3500);
        return () => clearInterval(id);
    }, [isPaused, projects.length, isInView, modalMounted]);

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

    function openModal(extIndex: number, originEl?: HTMLElement | null) {
        if (projects.length === 0) return;

        const realIndex = toRealIndex(extIndex);
        const sourceEl = originEl ?? null;

        setActiveProjectIndex(realIndex);
        setFlippedExtIndex(null);
        setIsPaused(true);

        if (sourceEl) {
            setModalOriginRect(sourceEl.getBoundingClientRect());
            setModalOriginPrevVisibility(sourceEl.style.visibility || '');
            setModalOriginEl(sourceEl);
        } else {
            setModalOriginRect(null);
            setModalOriginPrevVisibility(null);
            setModalOriginEl(null);
        }

        setModalMounted(true);
    }

    // Hide the original card when the overlay is visible and restore it when overlay closes
    useEffect(() => {
        if (!modalOriginEl) return;

        if (modalVisible) {
            // hide immediately so it seems to disappear behind the flipping overlay
            modalOriginEl.style.visibility = 'hidden';
        } else {
            // when overlay starts closing, restore after the flip animation finishes
            const id = setTimeout(() => {
                if (modalOriginEl) {
                    modalOriginEl.style.visibility = modalOriginPrevVisibility ?? '';
                }
                setModalOriginEl(null);
                setModalOriginPrevVisibility(null);
            }, 420);
            return () => clearTimeout(id);
        }
    }, [modalVisible, modalOriginEl, modalOriginPrevVisibility]);

    // After modal mounts, compute initial transform (translate + scale) so it appears coming from the card
    useEffect(() => {
        if (!modalMounted) {
            setModalInitialTransform(null);
            return;
        }

        // compute initial transform only when we have an origin rect and the modal element
        const modalEl = modalRef.current;
        if (!modalEl || !modalOriginRect) return;

        const modalRect = modalEl.getBoundingClientRect();

        const cardCenterX = modalOriginRect.left + modalOriginRect.width / 2;
        const cardCenterY = modalOriginRect.top + modalOriginRect.height / 2;

        const modalCenterX = modalRect.left + modalRect.width / 2;
        const modalCenterY = modalRect.top + modalRect.height / 2;

        const dx = cardCenterX - modalCenterX;
        const dy = cardCenterY - modalCenterY;

        const scale = modalOriginRect.width / modalRect.width || 0.84;

        const initial = `translate(${dx}px, ${dy}px) rotateY(160deg) scale(${scale})`;
        setModalInitialTransform(initial);

        // Ensure modalVisible starts as false to show the initial transform, then set to true next frame
        setModalVisible(false);
        requestAnimationFrame(() => requestAnimationFrame(() => setModalVisible(true)));
    }, [modalMounted, modalOriginRect]);

    function closeModal() {
        setModalVisible(false);
        // wait for animation to finish before unmount
        setTimeout(() => {
            setModalMounted(false);
            setActiveProjectIndex(null);
            setModalOriginRect(null);
            setModalInitialTransform(null);
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

    // Lock page scroll while modal is mounted
    useEffect(() => {
        if (!modalMounted) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev || '';
        };
    }, [modalMounted]);

    const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;

    return (
        <section id="projects" className="px-0 bg-muted/50 relative overflow-hidden">
            <div className="container mx-auto px-4 pt-10 pb-2">
                <div className="text-center mb-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('projects.title')}</h2>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Carousel viewport */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}>

                        {/* viewport sans padding pour que l'overflow clip correctement les cartes */}
                        <div className="overflow-hidden p-6" ref={viewportRef}>
                            <div
                                ref={trackRef}
                                onTransitionEnd={handleTransitionEnd}
                                className="flex gap-6"
                                style={{
                                    transition: isTransitionEnabled ? `transform 400ms ease` : 'none',
                                    transform: `translateX(${translateX}px)`,
                                }}>
                                {extended.map((project, index) => (
                                    <div
                                        data-project-card
                                        data-ext-index={index}
                                        key={index}
                                        ref={index === clones ? cardRef : null}
                                        className="scene"
                                        onClick={(e) => {
                                            e.stopPropagation(); /* toggle flip */
                                            setFlippedExtIndex(prev => (prev === index ? null : index));
                                            setIsPaused(true);
                                        }}>

                                        <div className={`card ${flippedExtIndex === index ? 'is-flipped' : ''}`}>
                                            {/* Front face: existing card visual (compact) */}
                                            <div
                                                className="card__face card__face--front flex flex-col flex-grow relative bg-card rounded-2xl w-72 min-h-80 m-auto pb-6 hover-lift animate-slide-up shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                                                style={{animationDelay: `${index * 0.05}s`}}>
                                                <div
                                                    className="flex justify-between z-10 absolute -top-2 -left-1 w-full">
                                                    {project.header ?
                                                        <span className="flex relative max-w-9/10">
                                                            <span className="card__banner bg-gradient-to-tr from-primary to-primary-dark h-8 relative font-bold text-sm|1 text-center text-white whitespace-nowrap rounded-tl-xl rounded-br-xl mr-1">
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
                                                                src={`/projects/${project.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}_banner.png`}
                                                                alt={project.title}
                                                                className="block w-full h-full object-cover"/>
                                                        </picture>
                                                        <svg className="pictureWave" width="1440" height="92"
                                                             viewBox="0 0 1440 92" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M0 0C252.637 65.5178 414.692 79.0342 720 84.64H0V0Z"
                                                                fill="var(--card)"/>
                                                            <path
                                                                d="M1440 0C1187.36 65.5178 1025.31 79.0342 720 84.64H1440V0Z"
                                                                fill="var(--card)"/>
                                                        </svg>
                                                    </div>
                                                    <div className="px-6 mt-4 grow">
                                                        <h3 className="text-lg|1 font-black text-base-inv whitespace-pre-wrap mb-3">{project.title}</h3>
                                                        <p className="block text-sm mb-6">{project.subtitle}</p>
                                                        <div
                                                            className="flex flex-wrap gap-2">{(project.technologies).map((tech: string, idx: number) => (
                                                            <Badge key={idx} variant="secondary">{tech}</Badge>))}</div>
                                                    </div>
                                                    <div className="flex flex-col justify-end grow px-4">
                                                        {project.link ?
                                                            <Button className="mt-4 w-full" variant="outline" asChild><a
                                                                href={project.link} target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}>{t('projects.viewProject')}<ExternalLink
                                                                className="ml-2 h-4 w-4"/></a></Button>
                                                            : ""}
                                                        <Button className="mt-4 w-full"
                                                                variant="outline"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    const cardEl = (e.currentTarget as HTMLElement).closest('[data-project-card]') as HTMLElement | null;
                                                                    openModal(index, cardEl);
                                                                }}>{t('projects.seeMore')}</Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Back face: details */}
                                            <div className="card__face card__face--back flex flex-col flex-grow relative w-72 min-h-80 m-auto rotate-y-180">
                                                <div
                                                    className="flex justify-end z-10 absolute -top-2 -right-1 w-full">
                                                    {project.header ?
                                                        <span className="flex relative max-w-9/10">
                                                            <span className="card__banner bg-gradient-to-tr from-primary to-primary-dark h-8 relative font-bold text-sm|1 text-center text-white whitespace-nowrap rounded-bl-xl rounded-tr-xl ml-1">
                                                                {project.header}
                                                            </span>
                                                        </span>
                                                        : ""}
                                                </div>
                                                <div className="flex flex-col flex-1 bg-card rounded-2xl p-4 z-10">
                                                    <div className="flex justify-between mb-3">
                                                        <h3 className="text-lg|1 font-black text-base-inv whitespace-pre-wrap">{project.title}</h3>
                                                        <button aria-label="close" onClick={(e) => {
                                                            e.stopPropagation();
                                                            setFlippedExtIndex(null);
                                                            setIsPaused(false);
                                                        }} style={{
                                                            border: 'none',
                                                            background: 'transparent',
                                                            color: 'inherit'
                                                        }}><X/></button>
                                                    </div>
                                                        <p className="mt-0">{project.description || project.subtitle}</p>
                                                        {project.link && (
                                                            <div style={{marginTop: 12}}><a href={project.link}
                                                                                            target="_blank" rel="noreferrer"
                                                                                            onClick={(e) => e.stopPropagation()}
                                                                                            className="inline-flex items-center gap-2 underline">{t('projects.viewProject')}<ExternalLink
                                                                className="ml-1 h-4 w-4"/></a></div>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* Left / Right masks pour cacher les cartes partielles sous les chevrons */}
                        <div
                            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-background from-10% to-transparent"/>
                        <div
                            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-background from-10% to-transparent"/>

                        {/* Controls */}
                        {projects.length > 1 && (
                            <>
                                <button
                                    aria-label="prev"
                                    onClick={prev}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 z-20">
                                    <ChevronLeft className="h-5 w-5"/>
                                </button>
                                <button
                                    aria-label="next"
                                    onClick={next}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 z-20">
                                    <ChevronRight className="h-5 w-5"/>
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
                                    aria-label={`go-to-${idx + 1}`}
                                    onClick={() => goTo(idx + clones)}
                                    className={`h-2 w-2 rounded-full ${visibleIndex === idx + 1 ? 'bg-primary-dark' : 'bg-muted-foreground'}`}>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full relative flex justify-end items-baseline">
                <svg className="pictureWave w-full relative" width="1440" height="92"
                     viewBox="0 0 1440 92" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 0C252.637 65.5178 414.692 79.0342 720 84.64H0V0Z"
                        fill="var(--polaroid-grey)"/>
                    <path
                        d="M1440 0C1187.36 65.5178 1025.31 79.0342 720 84.64H1440V0Z"
                        fill="var(--polaroid-grey)"/>
                    <rect y="83.64" width="1440" height="7.36" fill="var(--polaroid-grey)"/>
                </svg>
            </div>

            {/* Modal (flip on the card) */}
            {modalMounted && (
                // If we have the origin rect, position the overlay exactly on top of the card and flip it
                modalOriginRect ? (
                    <>
                        {/* Backdrop: full screen; clicking it will start the flip-back */}
                        <div
                            aria-hidden
                            className="fixed inset-0"
                            onClick={() => closeModal()}
                            style={{
                                background: 'rgba(0,0,0,0.35)',
                                transition: 'opacity 240ms ease',
                                opacity: modalVisible ? 1 : 0,
                                pointerEvents: modalVisible ? 'auto' : 'none',
                                zIndex: 40,
                            }}
                        />

                        <div
                            role="dialog"
                            aria-modal="true"
                            className="fixed z-50"
                            style={{
                                left: modalOriginRect.left,
                                top: modalOriginRect.top,
                                width: modalOriginRect.width,
                                height: modalOriginRect.height,
                                perspective: 1000,
                                zIndex: 50,
                            }}>
                            <div
                                ref={modalRef}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    transformStyle: 'preserve-3d',
                                    transition: 'transform 420ms cubic-bezier(.2,.9,.2,1)',
                                    transform: modalVisible ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                    willChange: 'transform',
                                    position: 'relative',
                                }}>

                                {/* Front face: clone simplifiée de la carte */}
                                <div
                                    aria-hidden={modalVisible}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: 16,
                                        overflow: 'hidden',
                                        backfaceVisibility: 'hidden',
                                        background: 'var(--card)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                    <div style={{flex: 1, position: 'relative', minHeight: 0}}>
                                        <img
                                            src={`/projects/${activeProject?.title
                                                .toLowerCase()
                                                .normalize('NFD')
                                                .replace(/[\u0300-\u036f]/g, '')
                                                .replace(/[^a-z0-9]+/g, '-')
                                                .replace(/(^-|-$)/g, '')
                                            }_banner.png`}
                                            alt={activeProject?.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'block'
                                            }}
                                        />
                                    </div>
                                    <div style={{padding: '12px'}}>
                                        <h3 style={{margin: 0, fontWeight: 800}}>{activeProject?.title}</h3>
                                    </div>
                                </div>

                                {/* Back face: détails */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: 16,
                                        overflow: 'auto',
                                        backfaceVisibility: 'hidden',
                                        background: 'var(--card)',
                                        transform: 'rotateY(180deg)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                    <div style={{
                                        padding: 12,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <h3 style={{margin: 0, fontWeight: 800}}>{activeProject?.title}</h3>
                                        <button aria-label="close" onClick={closeModal}
                                                style={{border: 'none', background: 'transparent', color: 'inherit'}}>
                                            <X/>
                                        </button>
                                    </div>
                                    <div style={{padding: 12}}>
                                        <p style={{marginTop: 0}}>{activeProject?.description || activeProject?.subtitle}</p>

                                        <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8}}>
                                            {activeProject?.technologies.map((tech, i) => (
                                                <span key={i}
                                                      className="inline-flex items-center px-2 py-1 text-sm rounded bg-muted/60">{tech}</span>
                                            ))}
                                        </div>

                                        {activeProject?.link && (
                                            <div style={{marginTop: 12}}>
                                                <a href={activeProject.link} target="_blank" rel="noreferrer"
                                                   className="inline-flex items-center gap-2 underline">
                                                    {t('projects.viewProject')}
                                                    <ExternalLink className="ml-1 h-4 w-4"/>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // Fallback: center modal (previous behavior) if we couldn't read the card rect
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
                            ref={modalRef}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-4xl w-full mx-auto bg-card rounded-2xl shadow-lg overflow-hidden"
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: modalVisible ? 'translate(0, 0) rotateY(0deg) scale(1)' : (modalInitialTransform ?? 'rotateY(160deg) scale(0.84)'),
                                transition: 'transform 420ms cubic-bezier(.2,.9,.2,1)',
                                willChange: 'transform',
                                transformOrigin: 'center center',
                            }}>
                            <div className="relative flex w-full h-64 md:h-96 z-1 overflow-hidden justify-center">
                                <picture>
                                    <img
                                        src={`/projects/${
                                            activeProject?.title
                                                .toLowerCase()
                                                .normalize('NFD')
                                                .replace(/[\u0300-\u036f]/g, '')
                                                .replace(/[^a-z0-9]+/g, '-')
                                                .replace(/(^-|-$)/g, '')
                                        }_banner.png`
                                        }
                                        alt={activeProject?.title}
                                        className="block w-full h-full object-cover"
                                    />
                                </picture>
                                <svg className="pictureWave" width="1440" height="92" viewBox="0 0 1440 92"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0C252.637 65.5178 414.692 79.0342 720 84.64H0V0Z"
                                          fill="var(--card)"/>
                                    <path d="M1440 0C1187.36 65.5178 1025.31 79.0342 720 84.64H1440V0Z"
                                          fill="var(--card)"/>
                                    <rect y="83.64" width="1440" height="7.36" fill="var(--card)"/>
                                </svg>
                                <button
                                    aria-label="close"
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-white hover:bg-white/70 hover:text-black rounded-full p-2 z-40">
                                    <X className="h-5 w-5 "/>
                                </button>
                            </div>

                            <div className="p-6 pt-3">
                                <div className="flex gap-3 mb-3 items-center">
                                    <h3 className="text-2xl font-bold">{activeProject?.title}</h3>
                                    {activeProject?.link && (
                                        <Button variant="ghost" asChild>
                                            <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                                                {t('projects.viewProject')}
                                                <ExternalLink className="ml-1 h-4 w-4"/>
                                            </a>
                                        </Button>
                                    )}
                                </div>
                                <p className="mb-4">{activeProject?.description || activeProject?.subtitle}</p>

                                <div className="flex flex-wrap gap-2 mt-6">
                                    <p className="text-sm">
                                        {t('projects.technologies') + " : "}
                                    </p>
                                    {activeProject?.technologies.map((tech, i) => (
                                        <Badge key={i} variant="secondary">{tech}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </section>
    );
};
