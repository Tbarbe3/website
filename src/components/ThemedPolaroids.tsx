import {motion, useScroll, useTransform} from "framer-motion";
import React, {useRef} from "react";

export const ThemedPolaroids = () => {
    const ref = useRef(null);

    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const leftX = useTransform(scrollYProgress, [0, 0.4], [-400, 0]);
    const leftX2 = useTransform(scrollYProgress, [0, 0.45], [-350, 0]);
    const leftX3 = useTransform(scrollYProgress, [0, 0.5], [-300, 0]);

    const rightX = useTransform(scrollYProgress, [0, 0.4], [400, 0]);
    const rightX2 = useTransform(scrollYProgress, [0, 0.45], [350, 0]);
    const rightX3 = useTransform(scrollYProgress, [0, 0.5], [300, 0]);

    return (
        <div ref={ref} className="w-full relative">
            <svg
                width="1500"
                height="800"
                viewBox="0 0 1500 800"
                fill="none"
                className="w-full h-auto object-cover"
            >
                <defs>
                    <filter id="filter0_d_42_2" x="-194" y="275" width="489.7" height="519.584"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="3.2"/>
                        <feGaussianBlur stdDeviation="9.6"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_42_2"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_42_2" result="shape"/>
                    </filter>
                    <filter id="filter1_d_42_2" x="132" y="308" width="438.142" height="478.7"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="3.2"/>
                        <feGaussianBlur stdDeviation="9.6"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_42_2"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_42_2" result="shape"/>
                    </filter>
                    <filter id="filter2_d_42_2" x="-11.9574" y="35.4644" width="449.516" height="488.028"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="3.2"/>
                        <feGaussianBlur stdDeviation="9.6"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_42_2"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_42_2" result="shape"/>
                    </filter>
                    <filter id="filter3_d_42_2" x="1253.45" y="339.37" width="438.142" height="478.7"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="3.2"/>
                        <feGaussianBlur stdDeviation="9.6"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_42_2"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_42_2" result="shape"/>
                    </filter>
                    <filter id="filter4_d_42_2" x="933" y="259" width="460.372" height="496.791"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="3.2"/>
                        <feGaussianBlur stdDeviation="9.6"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_42_2"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_42_2" result="shape"/>
                    </filter>
                    <filter id="filter5_d_42_2" x="1102" y="65" width="420.139" height="463.673"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="3.2"/>
                        <feGaussianBlur stdDeviation="9.6"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_42_2"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_42_2" result="shape"/>
                    </filter>
                    <filter id="filter6_d_42_2" x="563" y="188" width="374" height="424" filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="3.2"/>
                        <feGaussianBlur stdDeviation="9.6"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_42_2"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_42_2" result="shape"/>
                    </filter>
                    <clipPath id="clip1_42_2">
                        <rect width="350" height="400" fill="var(--polaroid)"
                              transform="translate(-45.192 287) rotate(20)"/>
                    </clipPath>
                    <clipPath id="clip2_42_2">
                        <rect width="350" height="400" fill="var(--polaroid)"
                              transform="translate(144 380.777) rotate(-10)"/>
                    </clipPath>
                    <clipPath id="clip3_42_2">
                        <rect width="350" height="400" fill="var(--polaroid)"
                              transform="translate(83.2073 47.4644) rotate(12)"/>
                    </clipPath>
                    <clipPath id="clip4_42_2">
                        <rect width="350" height="400" fill="var(--polaroid)"
                              transform="translate(1334.91 351.37) rotate(10)"/>
                    </clipPath>
                    <clipPath id="clip5_42_2">
                        <rect width="350" height="400" fill="var(--polaroid)"
                              transform="translate(945 355.673) rotate(-14)"/>
                    </clipPath>
                    <clipPath id="clip6_42_2">
                        <rect width="350" height="400" fill="var(--polaroid)"
                              transform="translate(1114 119.654) rotate(-7)"/>
                    </clipPath>
                    <clipPath id="photoCrop3">
                        <rect x="25" y="25" width="300" height="300"/>
                    </clipPath>
                </defs>
                <g clip-path="url(#clip0_42_2)">
                    <path
                        d="M564.436 650.472C549.715 629.651 535.678 609.794 512.03 596.809C476.577 577.341 450.254 575.454 426.273 573.737C401.424 571.956 379.088 570.356 351.71 549.561C321.449 526.576 309.23 504.803 296.672 482.423C286.904 465.016 276.931 447.243 258.1 428.247C223.271 393.112 187.087 381 144.048 381H0.943726V799.848H1503V381H1359.89C1316.85 381 1280.68 393.112 1245.84 428.247C1227.01 447.243 1217.04 465.016 1207.27 482.423C1194.71 504.802 1182.49 526.576 1152.23 549.561C1124.85 570.356 1102.52 571.956 1077.67 573.737C1053.69 575.454 1027.37 577.341 991.912 596.809C968.264 609.794 954.227 629.651 939.506 650.472C909.35 693.125 876.33 739.83 751.971 739.83C627.612 739.83 594.592 693.125 564.436 650.472Z"
                        fill="var(--polaroid-grey)" style={{transform: "translateY(1px)"}}/>
                    <motion.g style={{x: leftX}}>
                        <g filter="url(#filter0_d_42_2)">
                            <g clip-path="url(#clip1_42_2)" className="item">
                                <g transform="translate(-45.192 287) rotate(20)" className="polaroid">
                                    <rect width="350" height="400" fill="var(--polaroid)"/>
                                    <image href="/projects/forum-emplois-stages_icon.png" x="25" y="25" width="300"
                                           height="300" preserveAspectRatio="xMidYMid slice"/>
                                    <text x="175" y="360" textAnchor="middle" fill="var(--foreground)"
                                          className="caption">

                                    </text>
                                </g>
                            </g>
                        </g>
                    </motion.g>
                    <motion.g style={{x: leftX3}}>
                        <g filter="url(#filter1_d_42_2)">
                            <g clip-path="url(#clip2_42_2)" className="item">
                                <g transform="translate(144 380.777) rotate(-10)" className="polaroid">
                                    <rect width="350" height="400" fill="var(--polaroid)"/>
                                    <image href="/projects/dressing_icon.png" x="25" y="25" width="300" height="300"
                                           preserveAspectRatio="xMidYMid slice"/>
                                    <text x="175" y="360" textAnchor="middle" fill="var(--foreground)"
                                          className="caption">

                                    </text>
                                </g>
                            </g>
                        </g>
                    </motion.g>
                    <motion.g style={{x: leftX2}}>
                        <g filter="url(#filter2_d_42_2)">
                            <g clip-path="url(#clip3_42_2)" className="item">
                                <g transform="translate(83.2073 47.4644) rotate(12)" className="polaroid">
                                    <rect width="350" height="400" fill="var(--polaroid)"/>
                                    <image href="/projects/dmk-wiki_icon.png" x="25" y="25" width="300" height="300"
                                           preserveAspectRatio="xMidYMid slice"/>
                                    <text x="175" y="360" textAnchor="middle" fill="var(--foreground)"
                                          className="caption">

                                    </text>
                                </g>
                            </g>
                        </g>
                    </motion.g>
                    <motion.g style={{x: rightX}}>
                        <g filter="url(#filter3_d_42_2)">
                            <g clip-path="url(#clip4_42_2)" className="item">
                                <g transform="translate(1334.91 351.37) rotate(10)" className="polaroid">
                                    <rect width="350" height="400" fill="var(--polaroid)"/>
                                    <image href="/projects/home-viewer_icon.png" x="25" y="25" width="300" height="300"
                                           preserveAspectRatio="xMidYMid slice"/>
                                    <text x="175" y="360" textAnchor="middle" fill="var(--foreground)"
                                          className="caption">

                                    </text>
                                </g>
                            </g>
                        </g>
                    </motion.g>
                    <motion.g style={{x: rightX3}}>
                        <g filter="url(#filter4_d_42_2)">
                            <g clip-path="url(#clip5_42_2)" className="item">
                                <g transform="translate(945 355.673) rotate(-14)" className="polaroid">
                                    <rect width="350" height="400" fill="var(--polaroid)"/>
                                    <image href="/projects/prekar_icon.png" x="25" y="25" width="300" height="300"
                                           preserveAspectRatio="xMidYMid slice"/>
                                    <text x="175" y="360" textAnchor="middle" fill="var(--foreground)"
                                          className="caption">

                                    </text>
                                </g>
                            </g>
                        </g>
                    </motion.g>
                    <motion.g style={{x: rightX2}}>
                        <g filter="url(#filter5_d_42_2)">
                            <g clip-path="url(#clip6_42_2)" className="item">
                                <g transform="translate(1114 119.654) rotate(-7)" className="polaroid">
                                    <rect width="350" height="400" fill="var(--polaroid)"/>
                                    <image href="/projects/ponct-ul_icon.png" x="25" y="25" width="300" height="300"
                                           preserveAspectRatio="xMidYMid slice"/>
                                    <text x="175" y="360" textAnchor="middle" fill="var(--foreground)"
                                          className="caption">

                                    </text>
                                </g>
                            </g>
                        </g>
                    </motion.g>
                </g>
            </svg>
        </div>
    );
};
