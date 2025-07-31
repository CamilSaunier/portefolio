const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-100 dark:bg-[#1f2937]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">À propos de moi</h2>
          <div className="w-20 h-1 mx-auto bg-[#3b82f6] dark:bg-[#f59e42]"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="card bg-white dark:bg-[#1f2937] shadow-xl">
              <figure className="px-10 pt-10">
                <img src="https://via.placeholder.com/400x300/4338ca/ffffff?text=Coding" alt="Coding" className="rounded-xl" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Passion pour le développement</h3>
                <p>Toujours en quête d'apprendre de nouvelles technologies et d'améliorer mes compétences.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Développeur Full Stack</h3>
            <p className="text-lg">
              Passionné par le développement web depuis plus de 3 ans, je crée des applications modernes et performantes en utilisant les dernières
              technologies. Mon objectif est de transformer des idées en solutions digitales innovantes.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="stat bg-white dark:bg-[#1f2937] rounded-lg shadow">
                <div className="stat-value text-[#3b82f6] dark:text-[#f59e42]">1+</div>
                <div className="stat-title">Années d'expérience</div>
              </div>
              <div className="stat bg-white dark:bg-[#1f2937] rounded-lg shadow">
                <div className="stat-value text-[#06b6d4] dark:text-[#ef4444]">3+</div>
                <div className="stat-title">Projets</div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="/cv.pdf" className="btn bg-[#3b82f6] dark:bg-[#f59e42] hover:bg-blue-600 dark:hover:bg-orange-500 text-white border-none">
                Télécharger CV
              </a>
              <a
                href="#contact"
                className="btn border-[#3b82f6] dark:border-[#f59e42] text-[#3b82f6] dark:text-[#f59e42] hover:bg-[#3b82f6] hover:text-white dark:hover:bg-[#f59e42] dark:hover:text-white"
              >
                Me contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
