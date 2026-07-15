const scenarios = {
  inbound: {
    label: 'Inbound follow-up',
    summary: 'Use AI to assemble a context-rich first response and next-best action without removing seller judgment.',
    signal: 'Lead intent and prior activity are fragmented across the queue.',
    boundary: 'Drafting and prioritization are delegated; commitments and exceptions remain human-owned.',
    build: 'Context assembly, response draft, missing-data flag, and suggested next step.',
    adoption: 'Insert into the existing seller queue; review misses and overrides in the normal operating cadence.',
    evidence: 'Response latency, retained use, completeness, qualified next step, and exception patterns.',
    disposition: 'Prototype',
    core: 'Context-rich follow-up'
  },
  demo: {
    label: 'Demo preparation',
    summary: 'Turn account, product, and buyer context into a concise preparation brief that improves readiness without scripting the seller.',
    signal: 'Preparation time is consumed locating context and reconciling partial notes.',
    boundary: 'AI summarizes and identifies gaps; the seller owns the talk track, claims, and commitments.',
    build: 'Account brief, likely questions, proof gaps, and a human-reviewed demo objective.',
    adoption: 'Deliver inside the existing meeting workflow with a two-minute usefulness check after the call.',
    evidence: 'Preparation cycle time, retained use, missing-context rate, and seller-reported usefulness.',
    disposition: 'Integrate',
    core: 'Prepared human conversation'
  },
  crm: {
    label: 'CRM handoff',
    summary: 'Convert call context into a verified handoff so the next action, record, and owner remain continuous.',
    signal: 'Meeting outcomes, fields, and follow-up tasks can diverge after the conversation.',
    boundary: 'AI proposes summary, fields, and tasks; the seller verifies facts and customer commitments.',
    build: 'Structured call summary, field suggestions, next actions, and unresolved-question flags.',
    adoption: 'Place review at the end of the call workflow, not in a separate AI destination.',
    evidence: 'Record completeness, correction rate, follow-up latency, and downstream rework.',
    disposition: 'Standardize',
    core: 'Verified continuity'
  },
  proposal: {
    label: 'Proposal QA',
    summary: 'Use AI as a bounded quality layer for consistency, evidence, and approval readiness while preserving accountable human sign-off.',
    signal: 'Late-stage documents can carry inconsistent claims, missing approvals, or unclear next steps.',
    boundary: 'AI detects and explains issues; commercial and legal owners approve final content.',
    build: 'Claim check, inconsistency flags, approval checklist, and revision rationale.',
    adoption: 'Attach to the proposal review path with explicit escalation for policy or commercial ambiguity.',
    evidence: 'First-pass quality, revision loops, exception closure, and reviewer acceptance.',
    disposition: 'Pilot with guardrails',
    core: 'Accountable quality'
  }
};
const defaults = 'inbound';
const buttons = [...document.querySelectorAll('[data-scenario]')];
const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
function applyScenario(key, announce=true) {
  const s = scenarios[key] || scenarios[defaults];
  buttons.forEach(btn => btn.setAttribute('aria-selected', String(btn.dataset.scenario === key)));
  setText('scenario-title', s.label);
  setText('scenario-summary', s.summary);
  setText('signal-output', s.signal);
  setText('boundary-output', s.boundary);
  setText('build-output', s.build);
  setText('adoption-output', s.adoption);
  setText('evidence-output', s.evidence);
  setText('disposition-output', s.disposition);
  setText('core-output', s.core);
  if (announce) setText('scenario-announcer', `${s.label} scenario loaded. Disposition: ${s.disposition}.`);
}
buttons.forEach(btn => btn.addEventListener('click', () => applyScenario(btn.dataset.scenario)));
const reset = document.getElementById('reset-scenario');
if (reset) reset.addEventListener('click', () => applyScenario(defaults));
applyScenario(defaults, false);
