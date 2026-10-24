function Attribution({colorText="text-slate-500", colorLink="text-blue-800"}) {
  return (
    <footer className={`font-body text-center text-xs ${colorText}`}>
      Challenge by{' '}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        className={`${colorLink} hover:underline focus-ring`}
      >
        Frontend Mentor <span
          aria-hidden="true" className="external-icon">🔗</span>
      </a>
      . Coded by{' '}
      <a
        href="https://github.com/berefire"
        className={`${colorLink} hover:underline focus-ring`}
      >
        Berefire
      </a>
      .
    </footer>
  );
}

export default Attribution;