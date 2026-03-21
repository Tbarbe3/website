import {useLanguage} from '@/hooks/LanguageContext.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import {cn} from '@/hooks/utils.ts';
import {ChevronLeft, ChevronRight, ExternalLink, X} from 'lucide-react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

export type ProjectType = {
    title: string,
    subtitle: string,
    header?: string,
    link: string,
    description?: string,
    technologies: string[],
}

type ModalBox = {
    left: number,
    top: number,
    width: number,
    height: number,
}

type ProjectFrontFaceProps = {
    project: ProjectType,
    index?: number,
    viewProjectLabel: string,
    seeMoreLabel: string,
    onSeeMore?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onViewProjectClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void,
    seeMoreDisabled?: boolean,
    ariaHidden?: boolean,
}

const getProjectBannerSrc = (title: string) => `/projects/${title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}_banner.png`;

function ProjectFrontFace({
                              project,
                              index = 0,
                              viewProjectLabel,
                              seeMoreLabel,
                              onSeeMore,
                              onViewProjectClick,
                              seeMoreDisabled = false,
                              ariaHidden,
                          }: ProjectFrontFaceProps) {
    return (
        <div
            aria-hidden={ariaHidden}
            className='card__face--front absolute inset-0 m-auto flex h-full w-full flex-col rounded-2xl bg-card pb-6 hover-lift animate-slide-up shadow-[0_8px_20px_rgba(0,0,0,0.12)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0.5px)] [will-change:transform]'
            style={{animationDelay: `${index * 0.05}s`}}>
            <div className="flex justify-between z-10 absolute -top-2 -left-1 w-full">
                {project.header ? (
                    <span className="relative flex max-w-[90%]">
                        <span
                            className="card__banner relative mr-1 h-8 whitespace-nowrap rounded-tl-xl rounded-br-xl bg-gradient-to-tr from-primary to-primary-dark px-3 py-1 text-center text-sm font-bold leading-none text-white">
                            {project.header}
                        </span>
                    </span>
                ) : null}
            </div>

            <div className="flex flex-col flex-1 min-h-0">
                <div className="relative block z-[1] h-32 max-h-32 w-full overflow-hidden rounded-t-2xl"
                     title={project.title}>
                    <picture>
                        <img src={getProjectBannerSrc(project.title)} alt={project.title}
                             className="block w-full h-full object-cover"/>
                    </picture>
                    <svg className="pictureWave" width="1440" height="92" viewBox="0 0 1440 92" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0C252.637 65.5178 414.692 79.0342 720 84.64H0V0Z" fill="var(--card)"/>
                        <path d="M1440 0C1187.36 65.5178 1025.31 79.0342 720 84.64H1440V0Z" fill="var(--card)"/>
                    </svg>
                </div>

                <div className="px-6 mt-4 grow min-h-0">
                    <h3 className="mb-3 whitespace-pre-wrap text-lg font-black leading-none text-base-inv">{project.title}</h3>
                    <p className="block text-sm mb-6">{project.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary">{tech}</Badge>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-end grow px-4">
                    {project.link ? (
                        <Button className="mt-4 w-full" variant="outline" asChild>
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                               onClick={onViewProjectClick}>
                                {viewProjectLabel}<ExternalLink className="ml-2 h-4 w-4"/>
                            </a>
                        </Button>
                    ) : null}
                    <Button className="mt-4 w-full" variant="outline" onClick={onSeeMore} disabled={seeMoreDisabled}>
                        {seeMoreLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}

const MODAL_ANIM_MS = 700;

export const Projects = () => {
    const {t} = useLanguage();
    const viewProjectLabel = t('projects.viewProject');
    const seeMoreLabel = t('projects.seeMore');

    const projects = useMemo(() => {
        return Array.isArray(t('projects.items'))
            ? (t('projects.items') as ProjectType[])
            : [];
    }, [t]);

    const [cardWidth, setCardWidth] = useState<number>(288); // default matching w-80 (20rem -> 320px)
    const [current, setCurrent] = useState<number>(0); // will initialize after clones calculation
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitionEnabled, setIsTransitionEnabled] = useState<boolean>(true);
    const [isInView, setIsInView] = useState<boolean>(true);
    const [visibleCount, setVisibleCount] = useState<number>(1);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);

    const [modalMounted, setModalMounted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFlipped, setModalFlipped] = useState(false);
    const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

    const [modalOriginRect, setModalOriginRect] = useState<ModalBox | null>(null);
    const [modalTargetRect, setModalTargetRect] = useState<ModalBox | null>(null);
    const [modalOriginEl, setModalOriginEl] = useState<HTMLElement | null>(null);
    const [modalOriginPrevVisibility, setModalOriginPrevVisibility] = useState<string | null>(null);
    const [hiddenExtIndex, setHiddenExtIndex] = useState<number | null>(null);

    useEffect(() => {
        const el = cardRef.current;
        if (el) {
            const w = el.getBoundingClientRect().width;
            if (w && w > 0) setCardWidth(w + 24); // gap-6 => 1.5rem = 24px
        }
    }, [projects]);

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
            {threshold: 0.5} // considéré visible à 50%
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [viewportRef]);

    const clones = projects.length <= 1 ? 0 : Math.max(1, visibleCount + 1);
    const extended = useMemo(() => {
        if (projects.length === 0) return [];
        if (projects.length === 1) return [...projects];

        const repeated = [...projects];
        while (repeated.length < clones) {
            repeated.push(...projects);
        }

        const frontClones = repeated.slice(-clones).map((p) => ({...p}));
        const endClones = repeated.slice(0, clones).map((p) => ({...p}));

        return [...frontClones, ...projects, ...endClones];
    }, [projects, clones]);

    useEffect(() => {
        if (projects.length > 0) {
            setCurrent(clones);
        } else {
            setCurrent(0);
        }
    }, [projects.length, clones]);

    useEffect(() => {
        if (isPaused || projects.length <= 1 || !isInView || modalMounted) return;
        const id = setInterval(() => {
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

    const visibleIndex = projects.length > 0
        ? ((current - clones) % projects.length + projects.length) % projects.length + 1
        : 0;

    function getTargetRect(origin: ModalBox): ModalBox {
        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;
        const maxW = Math.max(320, viewportW - 40);
        const maxH = Math.max(360, viewportH - 40);

        // Uniform scale to preserve proportions and avoid deformation.
        const widthRatio = maxW / Math.max(origin.width, 1);
        const heightRatio = maxH / Math.max(origin.height, 1);
        const scale = Math.max(1, Math.min(widthRatio, heightRatio));

        const width = origin.width * scale;
        const height = origin.height * scale;

        return {
            left: (viewportW - width) / 2,
            top: (viewportH - height) / 2,
            width,
            height,
        };
    }

    function openModal(extIndex: number, originEl?: HTMLElement | null) {
        if (modalMounted) return;
        if (projects.length === 0) return;

        const realIndex = ((extIndex - clones) % projects.length + projects.length) % projects.length;
        const sourceEl = originEl ?? null;

        setActiveProjectIndex(realIndex);
        setHiddenExtIndex(extIndex);
        setIsPaused(true);

        const rawOrigin = sourceEl
            ? sourceEl.getBoundingClientRect()
            : new DOMRect((window.innerWidth - 288) / 2, (window.innerHeight - 360) / 2, 288, 360);

        const origin = {
            left: rawOrigin.left,
            top: rawOrigin.top,
            width: rawOrigin.width,
            height: rawOrigin.height,
        };
        setModalOriginRect(origin);
        setModalTargetRect(getTargetRect(origin));

        if (sourceEl) {
            setModalOriginPrevVisibility(sourceEl.style.visibility || '');
            setModalOriginEl(sourceEl);
            sourceEl.style.visibility = 'hidden';
        } else {
            setModalOriginPrevVisibility(null);
            setModalOriginEl(null);
        }

        // Start flip + expand at the same time for both card click and button click.
        setModalMounted(true);
        setModalVisible(false);
        setModalFlipped(false);
        requestAnimationFrame(() => requestAnimationFrame(() => {
            setModalVisible(true);
            setModalFlipped(true);
        }));
    }

    // Keep source card hidden while modal is mounted, restore it when modal closes.
    useEffect(() => {
        if (!modalOriginEl) return;

        if (!modalMounted) {
            modalOriginEl.style.visibility = modalOriginPrevVisibility ?? '';
            setModalOriginEl(null);
            setModalOriginPrevVisibility(null);
        }
    }, [modalMounted, modalOriginEl, modalOriginPrevVisibility]);

    const closeModal = useCallback(() => {
        setModalVisible(false);
        setModalFlipped(false);
        setTimeout(() => {
            setModalMounted(false);
            setModalFlipped(false);
            setActiveProjectIndex(null);
            setModalOriginRect(null);
            setModalTargetRect(null);
            setHiddenExtIndex(null);
            setIsPaused(false);
        }, MODAL_ANIM_MS);
    }, []);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (!modalMounted) return;
            if (e.key === 'Escape') closeModal();
        }

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [modalMounted, closeModal]);

    useEffect(() => {
        if (!modalMounted) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev || '';
        };
    }, [modalMounted]);

    const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;
    const modalBox = modalVisible && modalTargetRect ? modalTargetRect : modalOriginRect;

    return (
        <section id="projects" className="px-0 bg-muted/50 relative overflow-hidden">
            <div className="container mx-auto px-4 pt-10 pb-2">
                <div className="text-center mb-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('projects.title')}</h2>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="relative"
                         onMouseEnter={() => setIsPaused(true)}
                         onMouseLeave={() => setIsPaused(false)}>

                        <div className="overflow-hidden p-6" ref={viewportRef}>
                            <div
                                onTransitionEnd={handleTransitionEnd}
                                className="flex gap-6"
                                style={{
                                    transition: isTransitionEnabled ? `transform 400ms ease` : 'none',
                                    transform: `translateX(${-current * cardWidth}px)`,
                                }}>
                                {extended.map((project, index) => (
                                    <div
                                        data-project-card
                                        data-ext-index={index}
                                        key={index}
                                        ref={index === clones ? cardRef : null}
                                        className={cn(
                                            'relative inline-block h-[27rem] w-[90%] shrink-0 basis-[90%] [perspective:800px] min-[641px]:w-[16rem] min-[641px]:basis-[16rem] min-[1025px]:w-[18rem] min-[1025px]:basis-[18rem]',
                                            hiddenExtIndex === index && 'invisible',
                                        )}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const cardEl = e.currentTarget as HTMLElement;
                                            openModal(index, cardEl);
                                        }}>

                                        <ProjectFrontFace
                                            project={project}
                                            index={index}
                                            viewProjectLabel={viewProjectLabel}
                                            seeMoreLabel={seeMoreLabel}
                                            onViewProjectClick={(e) => e.stopPropagation()}
                                            onSeeMore={(e) => {
                                                e.stopPropagation();
                                                const cardEl = (e.currentTarget as HTMLElement).closest('[data-project-card]') as HTMLElement | null;
                                                openModal(index, cardEl);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-background from-10% to-transparent"/>
                        <div
                            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-background from-10% to-transparent"/>

                        {/* Controls */}
                        {projects.length > 1 && (
                            <>
                                <button
                                    aria-label="prev"
                                    onClick={() => goTo(current - 1)}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 z-20">
                                    <ChevronLeft className="h-5 w-5"/>
                                </button>
                                <button
                                    aria-label="next"
                                    onClick={() => goTo(current + 1)}
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
                                    className={`h-2 w-2 rounded-full ${visibleIndex === idx + 1 ? 'bg-primary' : 'bg-polaroid-grey'}`}>
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

            {modalMounted && modalOriginRect && modalTargetRect && (
                <>
                    <div
                        aria-hidden
                        className={cn(
                            'fixed inset-0 z-40 bg-black/35 transition-opacity duration-200 ease-out',
                            modalVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
                        )}
                        onClick={() => closeModal()}
                    />

                    <div
                        role="dialog"
                        aria-modal="true"
                        className="fixed z-50 [perspective:1000px]"
                        style={{
                            left: modalBox?.left ?? modalOriginRect.left,
                            top: modalBox?.top ?? modalOriginRect.top,
                            width: modalBox?.width ?? modalOriginRect.width,
                            height: modalBox?.height ?? modalOriginRect.height,
                            transition: `left ${MODAL_ANIM_MS}ms cubic-bezier(.2,.9,.2,1), top ${MODAL_ANIM_MS}ms cubic-bezier(.2,.9,.2,1), width ${MODAL_ANIM_MS}ms cubic-bezier(.2,.9,.2,1), height ${MODAL_ANIM_MS}ms cubic-bezier(.2,.9,.2,1)`,
                        }}>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                                'relative h-full w-full transition-transform [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]',
                                modalFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]',
                            )}
                            style={{
                                transitionDuration: `${MODAL_ANIM_MS}ms`,
                                transitionTimingFunction: 'cubic-bezier(.2,.9,.2,1)'
                            }}>
                            {activeProject ? (
                                <ProjectFrontFace
                                    project={activeProject}
                                    viewProjectLabel={viewProjectLabel}
                                    seeMoreLabel={seeMoreLabel}
                                    onViewProjectClick={(e) => e.stopPropagation()}
                                    seeMoreDisabled
                                    ariaHidden={modalVisible}
                                />
                            ) : null}

                            <div
                                className="absolute inset-0 flex h-full w-full flex-col overflow-auto rounded-2xl bg-card shadow-[0_8px_20px_rgba(0,0,0,0.12)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(0.5px)] [will-change:transform]">
                                <div className="flex items-center justify-between p-3">
                                    <h3 className="m-0 font-extrabold">{activeProject?.title}</h3>
                                    <button aria-label="close" onClick={closeModal}
                                            className="border-0 bg-transparent p-0 text-inherit">
                                        <X/>
                                    </button>
                                </div>
                                <div className="p-3">
                                    <p className="mt-0">{activeProject?.description || activeProject?.subtitle}</p>

                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {activeProject?.technologies.map((tech, i) => (
                                            <span key={i}
                                                  className="inline-flex items-center px-2 py-1 text-sm rounded bg-muted/60">{tech}</span>
                                        ))}
                                    </div>

                                    {activeProject?.link && (
                                        <div className="mt-3">
                                            <a href={activeProject.link} target="_blank" rel="noreferrer"
                                               className="inline-flex items-center gap-2 underline">
                                                {viewProjectLabel}
                                                <ExternalLink className="ml-1 h-4 w-4"/>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};
