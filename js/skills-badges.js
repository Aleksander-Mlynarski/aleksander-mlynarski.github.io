/* Ikony: https://simpleicons.org/ — kolory jak na GitHub README */
window.SKILL_BADGES = {
  cpp: { slug: "cplusplus", color: "#00599C", label: "C++" },
  python: { slug: "python", color: "#3776AB", label: "Python" },
  ros2: { slug: "ros", color: "#22314E", label: "ROS 2" },
  linux: { slug: "linux", color: "#FCC624", label: "Linux", dark: true },
  docker: { slug: "docker", color: "#2496ED", label: "Docker" },
  git: { slug: "git", color: "#F05032", label: "Git" },
  gitlab: { slug: "gitlab", color: "#FC6D26", label: "GitLab" },
  pytest: { slug: "pytest", color: "#0A9EDC", label: "pytest" },
  matlab: { slug: "mathworks", color: "#FF6600", label: "MATLAB" },
  simulink: { slug: "mathworks", color: "#D45F1C", label: "Simulink" },
  inventor: { slug: "autodesk", color: "#C63F1F", label: "Autodesk Inventor" },
  numpy: { slug: "numpy", color: "#013243", label: "NumPy" },
  scipy: { slug: "scipy", color: "#8CAAE6", label: "SciPy", dark: true },
  matplotlib: { slug: "matplotlib", color: "#11557C", label: "Matplotlib" },
  jupyter: { slug: "jupyter", color: "#F37626", label: "Jupyter" },
  opencv: { slug: "opencv", color: "#5C3EE8", label: "OpenCV" },
  sklearn: { slug: "scikitlearn", color: "#F7931E", label: "scikit-learn" },
};

function skillBadgeHtml(key) {
  const s = window.SKILL_BADGES[key];
  if (!s) return "";
  const iconColor = s.dark ? "000000" : "ffffff";
  const cls = s.dark ? " skill-badge--dark" : "";
  const icon = `https://cdn.simpleicons.org/${s.slug}/${iconColor}`;
  return `<li><span class="skill-badge${cls}" style="--badge:${s.color}"><img src="${icon}" alt="" width="14" height="14" loading="lazy"><span>${s.label}</span></span></li>`;
}

function renderSkillGroups() {
  const groups = [
    { cat: "skills.cat.lang", keys: ["cpp", "python"] },
    { cat: "skills.cat.robotics", keys: ["ros2", "linux"] },
    { cat: "skills.cat.devops", keys: ["docker", "git", "gitlab", "pytest"] },
    { cat: "skills.cat.engineering", keys: ["matlab", "simulink", "inventor"] },
    { cat: "skills.cat.science", keys: ["numpy", "scipy", "matplotlib", "jupyter", "opencv", "sklearn"] },
  ];

  const root = document.getElementById("skill-groups");
  if (!root) return;

  root.innerHTML = groups
    .map(
      (g) => `
    <div class="skill-group">
      <h4 data-i18n="${g.cat}"></h4>
      <ul class="skill-badges">${g.keys.map(skillBadgeHtml).join("")}</ul>
    </div>`
    )
    .join("");
}

window.renderSkillGroups = renderSkillGroups;
