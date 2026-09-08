// التطبيق الرئيسي
const App = {
  currentLevel: null,
  currentCase: null,
  asked: new Set(),
  solvedIds: new Set(JSON.parse(localStorage.getItem('solvedCases') || '[]')),

  levelNames: {
    easy: 'سهل',
    medium: 'متوسط',
    hard: 'صعب',
    expert: 'خبير'
  },

  questionLabels: {
    camera: 'كاميرات المراقبة',
    witness: 'شهادة شاهد',
    records: 'سجلات ووثائق',
    lab: 'التحليل المخبري / الأدلة المادية',
    phone: 'تحليل الهاتف والاتصالات'
  },

  async init() {
    await CaseData.loadAll();
    this.updateStats();
    this.bindEvents();
  },

  updateStats() {
    document.getElementById('solved-count').textContent = this.solvedIds.size;
    document.getElementById('total-cases').textContent = CaseData.totalCount();

    ['easy', 'medium', 'hard', 'expert'].forEach(level => {
      const count = CaseData.getLevel(level).length;
      const el = document.getElementById(`count-${level}`);
      if (el) el.textContent = `${count} قضية`;
    });
  },

  bindEvents() {
    // اختيار المستوى
    document.querySelectorAll('.level-card').forEach(card => {
      card.addEventListener('click', () => {
        this.currentLevel = card.dataset.level;
        this.showCasesList();
      });
    });

    document.getElementById('back-to-home').addEventListener('click', () => this.showScreen('home-screen'));
    document.getElementById('back-to-cases').addEventListener('click', () => this.showCasesList());
    document.getElementById('random-case').addEventListener('click', () => this.openRandomCase());
    document.getElementById('submit-solution').addEventListener('click', () => this.checkSolution());
    document.getElementById('next-case').addEventListener('click', () => this.openRandomCase());
    document.getElementById('back-home-from-result').addEventListener('click', () => this.showScreen('home-screen'));
  },

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  },

  showCasesList() {
    document.getElementById('level-title').textContent = `مستوى: ${this.levelNames[this.currentLevel]}`;
    const list = document.getElementById('cases-list');
    list.innerHTML = '';

    const cases = CaseData.getLevel(this.currentLevel);
    cases.forEach(c => {
      const item = document.createElement('div');
      item.className = 'case-item' + (this.solvedIds.has(c.id) ? ' solved' : '');
      item.innerHTML = `
        <div>
          <h3>${c.title}</h3>
          <p>${c.summary}</p>
        </div>
        <div class="case-meta">${this.solvedIds.has(c.id) ? '✓ محلولة' : c.id}</div>
      `;
      item.addEventListener('click', () => this.openCase(c));
      list.appendChild(item);
    });

    this.showScreen('cases-screen');
  },

  openRandomCase() {
    const c = CaseData.getRandom(this.currentLevel);
    if (c) this.openCase(c);
  },

  openCase(c) {
    this.currentCase = c;
    this.asked = new Set();

    document.getElementById('case-title').textContent = c.title;
    document.getElementById('case-diff').textContent = this.levelNames[this.currentLevel];
    document.getElementById('case-description').textContent = c.description;
    document.getElementById('questions-log').innerHTML = '';
    document.getElementById('answer-culprit').value = '';
    document.getElementById('answer-method').value = '';
    document.getElementById('answer-motive').value = '';

    // أزرار الأسئلة
    const qContainer = document.getElementById('question-buttons');
    qContainer.innerHTML = '';
    Object.keys(c.questions).forEach(key => {
      const btn = document.createElement('button');
      btn.className = 'q-btn';
      btn.textContent = this.questionLabels[key] || key;
      btn.dataset.key = key;
      btn.addEventListener('click', () => this.askQuestion(key, btn));
      qContainer.appendChild(btn);
    });

    this.showScreen('investigation-screen');
  },

... 
