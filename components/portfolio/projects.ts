export type Project = {
  id: number
  title: string
  category: string
  views: string
  color: string
  bg: string
  logoSrc?: string
  cardImage?: string
  size?: 'large' | 'normal'
}

// Replace with real project data.
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Detox.vm',
    category: 'Gaming Content',
    views: '334K views',
    color: '#c8f65d',
    bg: '#0d1a00',
    logoSrc: '/sponsors-logo/detox.vm.jpeg',
    cardImage: '/sponsors-logo/detox.vm-2.jpeg',
    size: 'normal',
  },
  {
    id: 2,
    title: 'BIMBO',
    category: 'YouTube Editing',
    views: '450K views',
    color: '#8b5cf6',
    bg: '#1a0a2e',
    logoSrc: '/sponsors-logo/bimbo.jpeg',
    cardImage: '/sponsors-logo/bimbo-2.jpeg',
    size: 'normal',
  },

  {
    id: 3,
    title: 'Aggarwal Ji',
    category: 'Brand Content',
    views: '800K views',
    color: '#ff6b35',
    bg: '#1a0800',
    size: 'normal',
  },
  {
    id: 4,
    title: 'TownTow',
    category: 'Short-form Reels',
    views: '1.2M views',
    color: '#7df9ff',
    bg: '#001a1a',
    size: 'normal',
  },
]

