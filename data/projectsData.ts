interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Gaming Materials',
    description: `This is a mod for Minecraft that adds new materials to the game.`,
    imgSrc: '/static/images/wallpaper_minecraft_java_edition_2560x1440.png',
    href: 'https://github.com/Hashibutogarasu/GamingMaterials',
  },
]

export default projectsData
