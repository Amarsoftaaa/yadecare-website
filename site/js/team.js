/* team.js — Team member data array and card rendering logic.
   Add or remove objects in the TEAM array to update the team section. */

'use strict';

var TEAM = [
  {
    initials: 'YK',
    name:     'Yade Karatas',
    role:     'Gesch\u00e4ftsf\u00fchrerin',
    bio:      'Examinierte Pflegefachkraft mit \u00fcber 15 Jahren Erfahrung. Gr\u00fcnderin von YadeCare und leidenschaftliche Pflegeexpertin, die jeden Patienten mit Herz und Fachwissen betreut.'
  },
  {
    initials: 'AH',
    name:     'Anna Hoffmann',
    role:     'Pflegedienstleitung',
    bio:      'Staatlich examinierte Gesundheits- und Krankenpflegerin. Koordiniert unser Pflegeteam und gew\u00e4hrleistet h\u00f6chste Qualit\u00e4tsstandards in jeder Pflegesituation.'
  },
  {
    initials: 'MK',
    name:     'Michael Kaya',
    role:     'Pflegefachkraft',
    bio:      'Spezialisiert auf Behandlungspflege und Palliativbegleitung. Bekannt f\u00fcr sein ruhiges Wesen und seine einf\u00fchlsame Art im Umgang mit Patienten und Angeh\u00f6rigen.'
  }
];

/** Build and inject team cards into #teamGrid. */
function renderTeam() {
  var grid = document.getElementById('teamGrid');
  if (!grid) return;

  grid.innerHTML = TEAM.map(function (member, index) {
    var delay = index > 0 ? ' d' + index : '';
    return (
      '<div class="team-card fade-up' + delay + '">' +
        '<div class="team-avatar" aria-hidden="true">' + member.initials + '</div>' +
        '<h3>' + member.name + '</h3>' +
        '<div class="team-role">' + member.role + '</div>' +
        '<p>' + member.bio + '</p>' +
      '</div>'
    );
  }).join('');
}

document.addEventListener('DOMContentLoaded', renderTeam);
