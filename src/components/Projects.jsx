const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce App",
      description: "Application e-commerce complète avec panier, paiement et gestion des commandes.",
      image: "",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true,
    },
    {
      id: 2,
      title: "Task Manager",
      description: "Gestionnaire de tâches collaboratif avec authentification et temps réel.",
      image: "",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true,
    },
    {
      id: 3,
      title: "Weather App",
      description: "Application météo avec géolocalisation et prévisions 7 jours.",
      image: "",
      technologies: ["React", "API REST", "Tailwind"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-[#1f2937]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Mes Projets</h2>
          <div className="w-20 h-1 bg-[#3b82f6] dark:bg-[#f59e42] mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto">Découvrez quelques-uns de mes projets récents qui démontrent mes compétences et ma créativité.</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col bg-gray-50 dark:bg-[#27272a] rounded-2xl shadow-lg hover:shadow-2xl border border-transparent hover:border-[#3b82f6] dark:hover:border-[#f59e42] transition-all duration-300"
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-2xl" />
              <div className="flex-1 flex flex-col p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  {project.featured && (
                    <span className="badge bg-[#3b82f6] dark:bg-[#f59e42] text-white px-3 py-1 rounded-lg text-xs font-bold">Featured</span>
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="badge border border-[#06b6d4] dark:border-[#ef4444] text-[#06b6d4] dark:text-[#ef4444] bg-white dark:bg-[#1f2937] px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex gap-2 justify-end">
                  <a
                    href={project.github}
                    className="btn border-[#3b82f6] dark:border-[#f59e42] text-[#3b82f6] dark:text-[#f59e42] hover:bg-[#3b82f6] hover:text-white dark:hover:bg-[#f59e42] dark:hover:text-white btn-sm rounded-lg"
                  >
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="btn bg-[#3b82f6] dark:bg-[#f59e42] hover:bg-blue-600 dark:hover:bg-orange-500 text-white border-none btn-sm rounded-lg"
                  >
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
