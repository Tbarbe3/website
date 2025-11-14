export type Language = 'fr' | 'en' | 'es';

interface Translations {
  [key: string]: any;
}

export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      home: 'Accueil',
      experience: 'Expériences',
      projects: 'Projets',
      skills: 'Compétences',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Bonjour, je suis',
      title: 'Développeur Full Stack',
      description: 'Passionné par la création d\'applications web modernes et performantes. Spécialisé en React, TypeScript et Node.js.',
      cta: 'Voir mes projets',
      contact: 'Me contacter',
    },
    experience: {
      title: 'Expériences Professionnelles',
      subtitle: 'Mon parcours professionnel',
      items: [
        {
          position: 'Développeur Full Stack Senior',
          company: 'TechCorp',
          period: '2021 - Présent',
          description: 'Développement d\'applications web complexes avec React, Node.js et PostgreSQL. Lead technique sur plusieurs projets clients.',
          achievements: [
            'Architecture et développement d\'une plateforme SaaS multi-tenant',
            'Amélioration des performances de 40%',
            'Mentorat de 3 développeurs juniors',
          ],
        },
        {
          position: 'Développeur Frontend',
          company: 'StartupXYZ',
          period: '2019 - 2021',
          description: 'Création d\'interfaces utilisateur modernes et responsive avec React et TypeScript.',
          achievements: [
            'Refonte complète de l\'interface utilisateur',
            'Mise en place d\'une bibliothèque de composants réutilisables',
            'Intégration de tests automatisés',
          ],
        },
        {
          position: 'Développeur Web Junior',
          company: 'WebAgency',
          period: '2017 - 2019',
          description: 'Développement de sites web et applications pour divers clients.',
          achievements: [
            'Développement de plus de 15 projets web',
            'Maîtrise des bonnes pratiques de développement',
            'Formation continue sur les nouvelles technologies',
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
      socials: {
        title: 'Réseaux sociaux',
      },
    },
    footer: {
      rights: 'Tous droits réservés',
    },
  },
  en: {
    nav: {
      home: 'Home',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hello, I\'m',
      title: 'Full Stack Developer',
      description: 'Passionate about creating modern and high-performance web applications. Specialized in React, TypeScript and Node.js.',
      cta: 'View my projects',
      contact: 'Contact me',
    },
    experience: {
      title: 'Professional Experience',
      subtitle: 'My professional journey',
      items: [
        {
          position: 'Senior Full Stack Developer',
          company: 'TechCorp',
          period: '2021 - Present',
          description: 'Development of complex web applications with React, Node.js and PostgreSQL. Technical lead on multiple client projects.',
          achievements: [
            'Architecture and development of a multi-tenant SaaS platform',
            '40% performance improvement',
            'Mentoring of 3 junior developers',
          ],
        },
        {
          position: 'Frontend Developer',
          company: 'StartupXYZ',
          period: '2019 - 2021',
          description: 'Creating modern and responsive user interfaces with React and TypeScript.',
          achievements: [
            'Complete redesign of the user interface',
            'Implementation of a reusable component library',
            'Integration of automated tests',
          ],
        },
        {
          position: 'Junior Web Developer',
          company: 'WebAgency',
          period: '2017 - 2019',
          description: 'Development of websites and applications for various clients.',
          achievements: [
            'Development of over 15 web projects',
            'Mastery of development best practices',
            'Continuous training on new technologies',
          ],
        },
      ],
    },
    projects: {
      title: 'Projects',
      subtitle: 'Some achievements I\'m proud of',
      items: [
        {
          title: 'E-commerce Platform',
          description: 'Complete e-commerce platform with online payment, inventory management and admin dashboard.',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          link: 'https://example.com',
        },
        {
          title: 'Task Management App',
          description: 'Real-time collaborative task management application with push notifications.',
          technologies: ['React', 'Firebase', 'Tailwind CSS'],
          link: 'https://example.com',
        },
        {
          title: 'Portfolio Generator',
          description: 'Tool to create a professional portfolio in a few clicks with customizable templates.',
          technologies: ['Next.js', 'TypeScript', 'Prisma'],
          link: 'https://example.com',
        },
      ],
      viewProject: 'View project',
    },
    skills: {
      title: 'Skills',
      subtitle: 'Technologies and tools I master',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Tools',
        other: 'Other',
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
      subtitle: 'Feel free to reach out',
      info: {
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
      },
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'An error occurred. Please try again.',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'your@email.com',
        subjectPlaceholder: 'Subject of your message',
        messagePlaceholder: 'Your message...',
      },
      socials: {
        title: 'Social media',
      },
    },
    footer: {
      rights: 'All rights reserved',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      experience: 'Experiencia',
      projects: 'Proyectos',
      skills: 'Habilidades',
      contact: 'Contacto',
    },
    hero: {
      greeting: 'Hola, soy',
      title: 'Desarrollador Full Stack',
      description: 'Apasionado por crear aplicaciones web modernas y de alto rendimiento. Especializado en React, TypeScript y Node.js.',
      cta: 'Ver mis proyectos',
      contact: 'Contáctame',
    },
    experience: {
      title: 'Experiencia Profesional',
      subtitle: 'Mi trayectoria profesional',
      items: [
        {
          position: 'Desarrollador Full Stack Senior',
          company: 'TechCorp',
          period: '2021 - Presente',
          description: 'Desarrollo de aplicaciones web complejas con React, Node.js y PostgreSQL. Líder técnico en múltiples proyectos de clientes.',
          achievements: [
            'Arquitectura y desarrollo de una plataforma SaaS multi-tenant',
            'Mejora del rendimiento en un 40%',
            'Mentoría de 3 desarrolladores junior',
          ],
        },
        {
          position: 'Desarrollador Frontend',
          company: 'StartupXYZ',
          period: '2019 - 2021',
          description: 'Creación de interfaces de usuario modernas y responsivas con React y TypeScript.',
          achievements: [
            'Rediseño completo de la interfaz de usuario',
            'Implementación de una biblioteca de componentes reutilizables',
            'Integración de pruebas automatizadas',
          ],
        },
        {
          position: 'Desarrollador Web Junior',
          company: 'WebAgency',
          period: '2017 - 2019',
          description: 'Desarrollo de sitios web y aplicaciones para varios clientes.',
          achievements: [
            'Desarrollo de más de 15 proyectos web',
            'Dominio de las mejores prácticas de desarrollo',
            'Formación continua en nuevas tecnologías',
          ],
        },
      ],
    },
    projects: {
      title: 'Proyectos',
      subtitle: 'Algunos logros de los que estoy orgulloso',
      items: [
        {
          title: 'Plataforma E-commerce',
          description: 'Plataforma de comercio electrónico completa con pago en línea, gestión de inventario y panel de administración.',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          link: 'https://example.com',
        },
        {
          title: 'App de Gestión de Tareas',
          description: 'Aplicación colaborativa de gestión de tareas en tiempo real con notificaciones push.',
          technologies: ['React', 'Firebase', 'Tailwind CSS'],
          link: 'https://example.com',
        },
        {
          title: 'Generador de Portafolio',
          description: 'Herramienta para crear un portafolio profesional en pocos clics con plantillas personalizables.',
          technologies: ['Next.js', 'TypeScript', 'Prisma'],
          link: 'https://example.com',
        },
      ],
      viewProject: 'Ver proyecto',
    },
    skills: {
      title: 'Habilidades',
      subtitle: 'Tecnologías y herramientas que domino',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Herramientas',
        other: 'Otros',
      },
      items: {
        frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'],
        backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'],
        tools: ['Git', 'Docker', 'VS Code', 'Figma', 'Postman'],
        other: ['Agile/Scrum', 'CI/CD', 'Testing', 'SEO', 'UI/UX'],
      },
    },
    contact: {
      title: 'Contacto',
      subtitle: 'No dudes en contactarme',
      info: {
        email: 'Correo',
        phone: 'Teléfono',
        location: 'Ubicación',
      },
      form: {
        name: 'Nombre',
        email: 'Correo',
        subject: 'Asunto',
        message: 'Mensaje',
        send: 'Enviar',
        sending: 'Enviando...',
        success: '¡Mensaje enviado con éxito!',
        error: 'Ocurrió un error. Por favor, inténtalo de nuevo.',
        namePlaceholder: 'Tu nombre',
        emailPlaceholder: 'tu@correo.com',
        subjectPlaceholder: 'Asunto de tu mensaje',
        messagePlaceholder: 'Tu mensaje...',
      },
      socials: {
        title: 'Redes sociales',
      },
    },
    footer: {
      rights: 'Todos los derechos reservados',
    },
  },
};
