// Умения из массива left разделены на подгруппы и имеют уровни,
// группы в этом массиве не могут содержать умения, только подгруппы
// Умения из массива right не делятся на подгруппы
// и могут содержать только умения
// Это можно изменить отредактировав файл views/resume.html

module.exports = function(l10n) {
  return {
    left: [
      { group: l10n.resume.skills.job_related, items: [
        { subgroup: '.Net Framework', items: [
          { skill: 'C#', level: 5 },
          { skill: 'ASP.NET', level: 5 },
          { skill: 'Entity Framework', level: 4 },
          { skill: 'WPF', level: 3 },
          { skill: 'WCF', level: 3 }
        ] },
        { subgroup: 'Server development', items: [
          { skill: 'Node.js', level: 3 },
          { skill: 'Ruby/Rails', level: 3 }
        ] },
        { subgroup: 'Web development', items: [
          { skill: 'Javascipt', level: 4 },
          { skill: 'CSS (LESS, SCSS)', level: 4 }
        ] },
        { subgroup: 'Database development', items: [
          { skill: 'MS SQL Server', level: 4 },
          { skill: 'PostgreSQL', level: 3 },
          { skill: 'MongoDB', level: 3 }
        ] },
        { subgroup: 'Version control systems', items: [
          { skill: 'Git', level: 5 },
          { skill: 'SVN', level: 4 }
        ] },
        { subgroup: 'General', items: [
          { skill: 'SOLID', level: 4 },
          { skill: 'IoC/DI', level: 4 },
          { skill: 'TDD', level: 3 }
        ] }
      ] }
    ],
    right: [
      // { group: l10n.resume.skills.transferable, items: [
      //   { skill: l10n.resume.skills.creativity },
      //   { skill: l10n.resume.skills.punctual },
      //   { skill: l10n.resume.skills.helpful }
      // ] },
      { group: l10n.resume.skills.languages, items: [
        { skill: l10n.resume.skills.russian_lang },
        { skill: l10n.resume.skills.english_lang }
      ] }
    ]
  };
};
