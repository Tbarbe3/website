import {SchoolType} from "@/sections/School.tsx";
import {ExperienceType} from "@/sections/Experience.tsx";
import {ProjectType} from "@/sections/Projects.tsx";

export const fr = {
    nav: {
        home: 'Accueil',
        school: 'Parcours',
        experience: 'Expériences',
        projects: 'Projets',
        skills: 'Compétences',
        contact: 'Contact',
        more: 'Voir plus',
        less: 'Voir moins',
    },

    hero: {
        greeting: 'Bonjour et bienvenue, je suis',
        title: 'Étudiant en Master Informatique',
        age: 'ans',
        description: "Curieux, sérieux et motivé, je suis convaincu de pouvoir vous accompagner efficacement dans les missions que vous pourriez me confier seul ou en équipe.",
        cta: 'Voir mes projets',
        contact: 'Me contacter',
    },

    school: {
        title: 'Mon Parcours Scolaire',
        items: [
            {
                formation: 'Master en Informatique (Ingénierie des Logiciels)',
                school: 'Faculté des Sciences et Technologies - Université de Lorraine',
                period: 'Nancy (54000 France) / Septembre 2025 - aujourd\'hui',
                current: true,
                achievements: [
                    'Algorithmique distribuée, Intelligence artificielle',
                    'Droit Informatique, Conception centrée utilisateurs',
//                    'XML',
                ],
            } as SchoolType,
            {
                formation: 'Mobilité d\'échange Erasmus+ (Sciences Informatiques)',
                school: 'Faculté des Sciences et de l\'Ingénierie - Université de Linköping',
                period: 'Linköping (Suède) / Septembre 2025 - Janvier 2026 / Grade 4',
                achievements: [
                    'Computer Networks, Computer Security',
                    'Software Design & Construction, Software Testing',
                    'Interaction Programming',
                ],
            } as SchoolType,
            {
                formation: 'Licence en Informatique',
                school: 'Faculté des Sciences et Technologies - Université de Lorraine',
                period: 'Nancy (54000 France) / Septembre 2023 - Juin 2025 / Mention Bien',
                achievements: [
                    'Bases de données, Interfaces graphiques, Ergonomie, Developpement d\'applications Mobile et Web',
                    'Programmation et Conception Objet, Programmation Avancée, Optimisation',
                    'Système et Reseaux Informatiques, Mathématiques et Statistiques',
                ],
            } as SchoolType,
            {
                formation: 'Parcours Accès Spécialité Santé (Spécialisation Pharmacie)',
                school: 'Campus Brabois Santé - Université de Lorraine',
                period: 'Nancy (54000 France) / Septembre 2022 - Juin 2023',
                achievements: [
                    'Initiation aux médicaments et autres thérapeutiques',
                    'Santé publique, Professionnels de Santé et Société',
                    'Biochimie, Biologie cellulaire',
                ],
            } as SchoolType,
            {
                formation: 'Baccalauréat Général',
                school: 'Lycée Saint-Louis',
                period: 'Bar-le-Duc (55000 France) / Septembre 2019 - Juillet 2022 / Mention Bien',
                achievements: [
                    'Physique-Chimie, Sciences de la Vie et de la Terre, Mathématiques',
                    'Section Européenne, Certification Cambridge',
                    'Latin, Grec',
                ],
            } as SchoolType,
        ],
    },

    experience: {
        title: 'Mes Expériences Professionnelles',
        items: [
            {
                type: 'Stage',
                position: 'Stage en développement web',
                company: 'ENSTIB, Ecole Nationale Supérieure des Technologies et Industries du Bois',
                period: 'Epinal (88000 France) / Avril 2025 - Juillet 2025',
                description: 'Conception et développement total d\'une application de contrôle des présences des étudiants, développement du frontend d\'une application de forum métier',
                achievements: [
                    'Gestion de Projets, Travail d\'équipe',
                    'Conception, production et deploiement d\'applications',
                    'Developpement web fullstack (frontend et backend)',
                ],
            } as ExperienceType,
        ],
    },

    projects: {
        title: 'Mes Projets',
        items: [
            {
                title: 'Ponct\'UL',
                subtitle: 'Application web de pointage des présences des étudiants alternants et de gestion de missions.',
                technologies: ['React', 'NestJS', 'PostgreSQL'],
                header: 'Complet - Fullstack',
                link: 'https://ponctul.enstib.univ-lorraine.fr/etu/home',
            } as ProjectType,
            {
                title: 'Forum Emplois-Stages',
                subtitle: 'Application web de présentation et gestion de rendez-vous entre étudiants et entreprises.',
                technologies: ['Vue.js', 'TypeScript', 'JavaScript'],
                link: 'https://forum-emploi.enstib.univ-lorraine.fr/',
            } as ProjectType,
            {
                title: 'DMK Wiki',
                subtitle: 'Site web à propos jeu Disney Magic Kingdoms de Gameloft, regroupant plusieurs fonctionnalités diverses.',
                header: 'Benevolat',
                technologies: ['MediaWiki', 'Lua', 'JavaScript'],
                link: 'https://dmk.fandom.com/wiki/',
            } as ProjectType,
            {
                title: 'Shake-It Up',
                subtitle: 'Application web de présentation de recettes de cocktail, accompagné de fonctionnalités de recherches.',
                technologies: ['PHP', 'JavaScript'],
                link: 'http://shakeitup.thomasbarbe.com/',
            } as ProjectType,
            {
                title: 'Home Viewer',
                subtitle: 'Application mobile permettant de cartographier l\'interrieur d\'un batiment.',
                header: 'Application Android',
                technologies: ['Java', 'Gradle', 'Twig'],
            } as ProjectType,
            {
                title: 'Dressing+',
                subtitle: 'Concept d\'application mobile proposant des tenues en fonction de ses habitudes et de la météo.',
                technologies: ['Figma', 'UX Devil'],
                link: 'https://www.figma.com/proto/y79gR1FpCdy7C0NbHl6sDB/Conception?node-id=101-716&p=f&t=DJj4PwjygIhfNVLn-0&scaling=scale-down&content-scaling=fixed&page-id=101%3A713&starting-point-node-id=101%3A716',
            } as ProjectType,
            {
                title: 'Prékar',
                subtitle: 'Application web permettant de réserver des voitures entre propriétaires et particuliers.',
                technologies: ['Symphony', 'PHP', 'Twig'],
                link: 'http://prekar.thomasbarbe.com/home',
            } as ProjectType,
        ],
        seeMore: 'En savoir plus',
        viewProject: 'Voir le projet',
        technologies: 'Compétences utilisées',
    },

    skills: {
        title: 'Technologies et Compétences Maîtrisées',
        categories: {
            frontend: 'Frontend',
            backend: 'Backend',
            tools: 'Outils',
            other: 'Autres',
        },
        items: {
            frontend: ['React', 'TypeScript', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
            backend: ['Node.js', 'NestJS', 'PostgreSQL', 'MongoDB', 'Lua'],
            tools: ['Git', 'Docker', 'VS Code', 'Figma'],
            other: ['CI/CD', 'UI/UX', 'Mutation Testing', 'GUI'],
        },
    },

    contact: {
        title: 'Contacts',
        info: {
            email: 'Email',
            phone: 'Téléphone',
            location: 'Localisation',
            socials: 'Autres réseaux',
        },
        form: {
            name: 'Nom',
            email: 'Email',
            subject: 'Sujet',
            message: 'Message',
            send: 'Envoyer',
            sending: 'Envoi en cours...',
            success: 'Message envoyé avec succès !',
            error: 'Une erreur est survenue. Veuillez réessayer.',
            namePlaceholder: 'Votre nom',
            emailPlaceholder: 'votre@email.com',
            subjectPlaceholder: 'Sujet de votre message',
            messagePlaceholder: 'Votre message...',
        },
    },

    footer: {
        policy: 'Ce site applique les principes d’accessibilité et de respecte les préférences utilisateur',
        rights: 'Tous droits réservés',
    },
};