const Hero = () => {
  return (
    <div id="home" className="hero min-h-screen bg-montagne-blanche bg-cover bg-center bg-no-repeat">
      <div className="hero-content w-full max-w-md justify-start bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-center rounded-xl shadow-xl mt-32">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
            Bonjour, je suis <span className="text-blue-600 dark:text-orange-400">Camil Saunier</span>
          </h1>
          <p className="py-6 text-lg">
            Développeur Full Stack passionné, créant des expériences web modernes et performantes avec React, Node.js et les dernières technologies.
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="#projects"
              className="btn bg-blue-500 dark:bg-orange-400 hover:bg-blue-600 dark:hover:bg-orange-500 text-white border-none btn-lg"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="btn bg-cyan-400 dark:bg-yellow-400 hover:bg-cyan-500 dark:hover:bg-yellow-500 text-gray-900 border-none btn-lg"
            >
              Me contacter
            </a>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <a
              href="https://github.com"
              className="btn btn-circle border-blue-500 dark:border-orange-400 text-blue-500 dark:text-orange-400 hover:bg-blue-500 hover:text-white dark:hover:bg-orange-400 dark:hover:text-white"
            >
              {/* Icône Github */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              className="btn btn-circle border-cyan-400 dark:border-yellow-400 text-cyan-400 dark:text-yellow-400 hover:bg-cyan-400 hover:text-gray-900 dark:hover:bg-yellow-400 dark:hover:text-gray-900"
            >
              {/* Icône LinkedIn */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
