module.exports = function(l10n) {
  var rows = [];
  var row = [];
  l10n.resume.education.forEach(function(item) {
    row.push(item);
    if (row.length == 2) {
      rows.push(row);
      row = [];
    }
  });
  if (row.length) {
    rows.push(row);
  }
  return rows;
}
