function App() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Test DaisyUI */}
      <div className="hero min-h-screen bg-gradient-to-r from-primary to-secondary">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-md">
            {/* Alert test */}
            <div className="alert alert-success mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>DaisyUI fonctionne ! 🎉</span>
            </div>

            {/* Badges test */}
            <div className="flex gap-2 justify-center mb-4">
              <div className="badge badge-primary">Primary</div>
              <div className="badge badge-secondary">Secondary</div>
              <div className="badge badge-accent">Accent</div>
            </div>

            <h1 className="mb-5 text-5xl font-bold">Mon Portfolio</h1>
            <p className="mb-5">Test de DaisyUI avec Tailwind CSS</p>

            {/* Buttons test */}
            <div className="flex gap-4 justify-center">
              <button className="btn btn-accent">Projets</button>
              <button className="btn btn-outline btn-accent">Contact</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
