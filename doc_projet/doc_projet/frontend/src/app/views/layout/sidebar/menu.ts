import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Emplois du temps',
    icon: 'calendar',
    link: '/apps/calendar',
    badge: {
      variant: 'primary',
      text: 'Event',
    },
    subItems: [
      {
        label: 'Visualiser',
        link: '/apps/calendar',
      }
    ]
  },
  {
    label: 'Planification',
    icon: 'clock',
    link: '/schedule'
  },
  {
    label: 'Parametres',
    isTitle: true
  },
  {
    label: 'Programmes',
    icon: 'book',
    link: '/program',
    subItems: [
      {
        label: 'Ajouter',
        link: '/program/new'
      },
      {
        label: 'Liste',
        link: '/program',
      },
    ]
  },
  {
    label: 'Cours',
    icon: 'book-open',
    subItems: [
      {
        label: 'Ajouter',
        link: '/course/new'
      },
      {
        label: 'Liste',
        link: '/course',
      },
    ]
  },
  {
    label: 'Salles',
    icon: 'trello',
    subItems: [
      {
        label: 'Ajouter',
        link: '/classroom/new'
      },
      {
        label: 'Liste',
        link: '/classroom',
      },
    ]
  },
  {
    label: 'Utilisateurs',
    isTitle: true
  },
  {
    label: 'Professeur',
    icon: 'user',
    subItems: [
      {
        label: 'Ajouter',
        link: '/professor/new'
      },
      {
        label: 'Liste',
        link: '/professor',
      },
    ]
  },
  {
    label: 'Directeur Etude',
    icon: 'briefcase',
    subItems: [
      {
        label: 'Ajouter',
        link: '/professor/newdir'
      },
      {
        label: 'Liste',
        link: '/professor/dir',
      },
    ]
  },
  {
    label: 'Étudiants',
    icon: 'users',
    subItems: [
      {
        label: 'Liste',
        link: '/professor/etud',
      },
    ]
  },
  {
    label: 'Statistiques',
    isTitle: true
  },
  {
    label: 'Rapports',
    icon: 'download-cloud',
    link: 'professor/rapport'
  },
];
