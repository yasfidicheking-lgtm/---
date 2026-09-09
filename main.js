// ===== Main JS - Crime Investigation Site =====

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Case accordion
  document.querySelectorAll('.case-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      body.classList.toggle('open');
    });
  });
});

// ===== Case Solving Logic =====
function selectSuspect(btn, caseId, isCorrect) {
  const container = btn.closest('.case-body');
  const allBtns = container.querySelectorAll('.suspect-btn');
  
  // Reset previous selections
  allBtns.forEach(b => {
    b.classList.remove('selected', 'correct', 'wrong');
    b.disabled = false;
  });

  btn.classList.add('selected');

  // Show result after short delay
  setTimeout(() => {
    allBtns.forEach(b => b.disabled = true);
    
    if (isCorrect) {
      btn.classList.add('correct');
      const solution = container.querySelector('.solution-box');
      if (solution) solution.classList.add('show');
    } else {
      btn.classList.add('wrong');
      // Reveal correct one
      const correctBtn = container.querySelector('[data-correct="true"]');
      if (correctBtn) correctBtn.classList.add('correct');
      const solution = container.querySelector('.solution-box');
      if (solution) solution.classList.add('show');
    }
  }, 400);
}

function revealSolution(caseId) {
  const solution = document.getElementById('solution-' + caseId);
  if (solution) {
    solution.classList.add('show');
  }
}

function resetCase(caseId) {
  const container = document.getElementById('case-' + caseId);
  if (!container) return;

  const btns = container.querySelectorAll('.suspect-btn');
  btns.forEach(b => {
    b.classList.remove('selected', 'correct', 'wrong');
    b.disabled = false;
  });

  const solution = container.querySelector('.solution-box');
  if (solution) solution.classList.remove('show');
}

