const Skills = () => {
  const frontendSkills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Tailwind CSS", level: 95 },
    { name: "HTML/CSS", level: 90 },
  ];

  const backendSkills = [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "REST APIs", level: 85 },
  ];

  const SkillBar = ({ skill, colorClass }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-[#27272a] rounded-full h-2">
        <div className={`${colorClass} h-2 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${skill.level}%` }}></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-white dark:bg-[#1f2937]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Mes Compétences</h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-[#3b82f6] dark:bg-[#f59e42]"></div>
          <p className="text-lg max-w-2xl mx-auto">Voici un aperçu de mes compétences techniques et de mon niveau d'expertise dans chaque domaine.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="card bg-gray-50 dark:bg-[#27272a] shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-6 flex items-center">
                <span className="p-2 rounded-lg mr-3 bg-[#3b82f6] dark:bg-[#f59e42] text-white">🎨</span>
                <span className="text-[#3b82f6] dark:text-[#f59e42]">Frontend</span>
              </h3>
              {frontendSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} colorClass="bg-[#3b82f6] dark:bg-[#f59e42]" />
              ))}
            </div>
          </div>

          <div className="card bg-gray-50 dark:bg-[#27272a] shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-6 flex items-center">
                <span className="p-2 rounded-lg mr-3 bg-[#06b6d4] dark:bg-[#ef4444] text-white">⚙️</span>
                <span className="text-[#06b6d4] dark:text-[#ef4444]">Backend</span>
              </h3>
              {backendSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} colorClass="bg-[#06b6d4] dark:bg-[#ef4444]" />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {["Git", "Docker", "AWS", "Figma", "VS Code", "Postman"].map((tool) => (
              <div
                key={tool}
                className="badge badge-lg border border-[#3b82f6] dark:border-[#f59e42] text-[#3b82f6] dark:text-[#f59e42] bg-white dark:bg-[#1f2937]"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
