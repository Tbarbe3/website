import {SchoolType} from "@/sections/School.tsx";

export const fr = {
    nav: {
        home: 'Accueil',
        school: 'Parcours',
        experience: 'Expériences',
        projects: 'Projets',
        skills: 'Compétences',
        contact: 'Contact',
    },

    hero: {
        greeting: 'Bonjour et bienvenue, je suis',
        title: 'Etudiant en Ingénierie des Logicielles',
        age: 'ans',
        description: "Curieux, sérieux et motivé, je suis convaincu de pouvoir vous accompagner efficacement dans les missions que vous pourriez me confier seul ou en équipe.",
        cta: 'Voir mes projets',
        contact: 'Me contacter',
    },

    school: {
        title: 'Mon Parcours Scolaire',
        items: [
            {
                position: 'Master en Informatique (Ingénierie des Logiciels)',
                company: 'Faculté des Sciences et Technologies - Université de Lorraine',
                period: 'Nancy (54000 France) / Septembre 2025 - aujourd\'hui',
                current: true,
                achievements: [
                    'Algorithmique distribuée, Intelligence artificielle',
                    'Droit Informatique, Conception centrée utilisateurs',
//                    'XML',
                ],
            } as SchoolType,
            {
                position: 'Mobilité d\'échange Erasmus+ (Sciences Informatiques)',
                company: 'Faculté des Sciences et de l\'Ingénierie - Université de Linköping',
                period: 'Linköping (Suède) / Septembre 2025 - Janvier 2026 / Grade 4',
                achievements: [
                    'Computer Networks, Computer Security',
                    'Software Design & Construction, Software Testing',
                    'Interaction Programming',
                ],
            } as SchoolType,
            {
                position: 'Licence en Informatique',
                company: 'Faculté des Sciences et Technologies - Université de Lorraine',
                period: 'Nancy (54000 France) / Septembre 2023 - Juin 2025 / Mention Bien',
                achievements: [
                    'Bases de données, Interfaces graphiques, Ergonomie, Developpement d\'applications Mobile et Web',
                    'Programmation et Conception Objet, Programmation Avancée, Optimisation',
                    'Système et Reseaux Informatiques, Mathématiques et Statistiques',
                ],
            } as SchoolType,
            {
                position: 'Parcours Accès Spécialité Santé (Spécialisation Pharmacie)',
                company: 'Campus Brabois Santé - Université de Lorraine',
                period: 'Nancy (54000 France) / Septembre 2022 - Juin 2023',
                achievements: [
                    'Initiation aux médicaments et autres thérapeutiques',
                    'Santé publique, Professionnels de Santé et Société',
                    'Biochimie, Biologie cellulaire',
                ],
            } as SchoolType,
            {
                position: 'Baccalauréat Général',
                company: 'Lycée Saint-Louis',
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
                position: 'Développeur Full Stack',
                type: 'Stage',
                company: 'ENSTIB, Ecole Nationale Supérieure des Technologies et Industries du Bois',
                period: 'Epinal (88000 France) / Avril 2025 - Juillet 2025',
                description: 'Conception et développement total d\'une application de contrôle des présences des étudiants (full stack), développement d\'une application de forum métier (frontend)',
                achievements: [
                    'Architecture et développement d\'une plateforme SaaS multi-tenant',
                    'Amélioration des performances de 40%',
                    'Mentorat de 3 développeurs juniors',
                ],
            },
        ],
    },
    projects: {
        title: 'Projets',
        subtitle: 'Quelques réalisations dont je suis fier',
        items: [
            {
                title: 'E-commerce Platform',
                description: 'Plateforme e-commerce complète avec paiement en ligne, gestion des stocks et tableau de bord administrateur.',
                technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
                link: 'https://example.com',
            },
            {
                title: 'Task Management App',
                description: 'Application de gestion de tâches collaborative en temps réel avec notifications push.',
                technologies: ['React', 'Firebase', 'Tailwind CSS'],
                link: 'https://example.com',
            },
            {
                title: 'Portfolio Generator',
                description: 'Outil permettant de créer un portfolio professionnel en quelques clics avec des templates personnalisables.',
                technologies: ['Next.js', 'TypeScript', 'Prisma'],
                link: 'https://example.com',
            },
        ],
        viewProject: 'Voir le projet',
    },
    skills: {
        title: 'Compétences',
        subtitle: 'Technologies et outils que je maîtrise',
        categories: {
            frontend: 'Frontend',
            backend: 'Backend',
            tools: 'Outils',
            other: 'Autres',
        },
        items: {
            frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'],
            backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'],
            tools: ['Git', 'Docker', 'VS Code', 'Figma', 'Postman'],
            other: ['Agile/Scrum', 'CI/CD', 'Testing', 'SEO', 'UI/UX'],
        },
    },
    contact: {
        title: 'Contact',
        subtitle: 'N\'hésitez pas à me contacter',
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