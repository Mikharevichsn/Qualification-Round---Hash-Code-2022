import { readFileSync } from 'fs';

export const parseFile = (fileName = 'a_an_example.in.txt') => {
  const str = readFileSync(`./input_data/${fileName}`, 'utf8');
  let data = str
    .split('\n')
    .map((line) =>
      line.split(' ').map((el) => (Number.isNaN(Number(el)) ? el : Number(el)))
    );
  // console.log(data);

  if (data[data.length - 1].length === 1 && data[data.length - 1][0] === 0) {
    data = data.slice(0, data.length - 1);
  }

  // console.log(data);

  let currentLine = 0;
  const obj = {};
  obj.contributorsCount = data[currentLine][0];
  obj.projectsCount = data[currentLine][1];
  currentLine += 1;

  // console.log('---');
  // console.log('currentLine = ', currentLine);
  // console.log('obj = ', obj);
  // console.log('---');

  obj.contributors = [];
  for (let i = 1; i <= obj.contributorsCount; i += 1) {
    const teammate = {};
    teammate.name = data[currentLine][0];
    teammate.skillsCount = data[currentLine][1];
    teammate.skills = [];
    teammate.free = true;
    teammate.currentProject = null; // name of project
    teammate.daysBeforeFree = 0;
    currentLine += 1;
    // console.log('---');
    // console.log('currentLine = ', currentLine);
    // console.log('obj = ', obj);
    // console.log('teammate = ', teammate);
    // console.log('---');

    for (let s = 1; s <= teammate.skillsCount; s += 1) {
      const skill = {};
      skill.skillName = data[currentLine][0];
      skill.skillScore = data[currentLine][1];
      teammate.skills.push(skill);
      currentLine += 1;
      // console.log('---');
      // console.log('currentLine = ', currentLine);
      // console.log('obj = ', obj);
      // console.log('teammate = ', teammate);
      // console.log('---');
    }

    obj.contributors.push(teammate);
  }

  obj.projects = [];

  // console.log('-------- PROJECTS ----------');

  for (let i = 1; i <= obj.projectsCount; i += 1) {
    const project = {};
    project.projectName = data[currentLine][0];
    project.numberOfDaysToCompleteTheProject = data[currentLine][1];
    project.scoreAwarded = data[currentLine][2];
    project.bestBefore = data[currentLine][3];
    project.rolesCount = data[currentLine][4];
    project.skillsRequired = [];
    currentLine += 1;
    // console.log('---');
    // console.log('currentLine = ', currentLine);
    // console.log('obj = ', obj);
    // console.log('project = ', project);
    // console.log('---');

    for (let r = 1; r <= project.rolesCount; r += 1) {
      const requiredSkill = {};
      requiredSkill.skillName = data[currentLine][0];
      requiredSkill.skillScore = data[currentLine][1];
      project.skillsRequired.push(requiredSkill);
      currentLine += 1;
      // console.log('---');
      // console.log('currentLine = ', currentLine);
      // console.log('obj = ', obj);
      // console.log('project = ', project);
      // console.log('---');
    }

    obj.projects.push(project);
  }

  console.log('obj = ', JSON.stringify(obj, null, 2));

  return obj;
};

// parseFile();
