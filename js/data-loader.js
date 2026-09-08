// تحميل بيانات القضايا من ملفات JSON
const CaseData = {
  easy: null,
  medium: null,
  hard: null,
  expert: null,

  async loadAll() {
    const levels = ['easy', 'medium', 'hard', 'expert'];
    for (const level of levels) {
      try {
        const res = await fetch(`data/${level}.json`);
        if (!res.ok) throw new Error(`Failed to load ${level}`);
        this[level] = await res.json();
      } catch (err) {
        console.error(err);
        this[level] = [];
      }
    }
    return this;
  },

  getLevel(level) {
    return this[level] || [];
  },

  getCase(level, id) {
    return this.getLevel(level).find(c => c.id === id);
  },

  getRandom(level) {
    const cases = this.getLevel(level);
    if (!cases.length) return null;
    return cases[Math.floor(Math.random() * cases.length)];
  },

  totalCount() {
    return ['easy', 'medium', 'hard', 'expert']
      .reduce((sum, l) => sum + this.getLevel(l).length, 0);
  }
};

