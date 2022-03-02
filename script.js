import { parseFile } from './parser.js';

const obj = parseFile();
// console.log('🚀 ~ file: script.js ~ line 3 ~ obj', obj);

// отсортировать проекты по бестБефор
// console.log('было: ', JSON.stringify(obj.projects, null, 2));
obj.projects = obj.projects.sort((a, b) => a.bestBefore - b.bestBefore);
// console.log('стало: ', JSON.stringify(obj.projects, null, 2));

// пробовать заполнить первый проект человеками

// const checkCanFillProject = (project) => {
//   for (const skillReq of project.skillsRequired) {
//     // console.log(
//     //   '🚀 ~ file: script.js ~ line 15 ~ checkCanFillProject ~ skillReq',
//     //   skillReq
//     // );
//     // сначала ищем того у кого такой же скилл
//     const candidate = obj.contributors.find((contr) => {
//       // console.log('🚀 ~ file: script.js ~ line 21 ~ candidate ~ contr', contr);
//       // console.log(
//       //   'check name = ',
//       //   contr.skills.skillName === skillReq.skillName
//       // );
//       // console.log(
//       //   'check score = ',
//       //   contr.skills.skillScore === skillReq.skillScore
//       // );
//       const skill = contr.skills.find(
//         (s) => s.skillName === skillReq.skillName
//       );
//       if (skill && skill.skillScore === skillReq.skillScore) return true;
//     });
//     // console.log('candidate tmp = ', candidate);

//     if (candidate) {
//       console.log('--------');
//       console.log('project = ', project);
//       console.log('skillReq = ', skillReq);
//       console.log('candidate = ', candidate);
//       console.log('--------');
//     }
//   }
// };

const checkCanFillProject = (project) => {
  const getInitialData = () => {
    const skillsRequiredCopy = JSON.parse(
      JSON.stringify(project.skillsRequired)
    );
    console.log(
      '🚀 ~ file: script.js ~ line 49 ~ checkCanFillProject ~ skillsRequiredCopy',
      skillsRequiredCopy
    );

    const contributorsCopy = JSON.parse(JSON.stringify(obj.contributors));
    console.log(
      '🚀 ~ file: script.js ~ line 55 ~ checkCanFillProject ~ contributorsCopy',
      contributorsCopy
    );

    return {
      skillsRequired: skillsRequiredCopy,
      contributors: contributorsCopy,
    };
  };

  const data = getInitialData();
  console.log(
    '🚀 ~ file: script.js ~ line 70 ~ checkCanFillProject ~ data',
    JSON.stringify(data, null, 2)
  );

  data.skillsRequired.forEach((neededSkill) => {
    const candidates = data.contributors.filter((c) =>
      c.skills.some((s) => s.skillName === neededSkill.skillName)
    );

    const perfectVariant = candidates.find((c) =>
      c.skills.some(
        (s) =>
          s.skillName === neededSkill.skillName &&
          s.skillScore === neededSkill.skillScore
      )
    );

    if (perfectVariant) {
      neededSkill.contributor = perfectVariant;
      data.contributors.splice();
    }
  });
};

// console.log('obj.projects[1] = ', obj.projects[1]);
checkCanFillProject(obj.projects[1]);
// for (const project of obj.projects) {
//   checkCanFillProject(project);
// }

// проверяем остались ли свободные люди и лезут ли они в любой свободный проект
// если какой-то проект завершился - проверяем повышаются ли скиллы
// увеличиваем цифру текущего дня и если кто освободился - проверяем лезет ли он в свободный проект

// логгирование:
// день:
// проект в процессе:
// сотрудники:
