document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
const getInputValue = id => document.getElementById(id).value;
let issues = [];

function submitIssue(e) {
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';
  const issue = { id, description, severity, assignedTo, status };

  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  let issues = JSON.parse(localStorage.getItem('issues'));
  const issueIndex = issues.findIndex(issue => issue.id === id);
  if (issueIndex !== -1) {
    issues[issueIndex].status = 'Closed';
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
  }
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
  
    issuesList.innerHTML += `<div class="well">
      <h6>Issue ID: ${id} </h6>
      <p><span class="label ${status === 'Closed' ? 'label-closed' : 'label-info'}"> ${status} </span></p>
      <h3> ${description} </h3>
      <p><span class="time"></span> ${severity}</p>
      <p><span class="user"></span> ${assignedTo}</p>
      <a href="#" onclick="closeIssue('${id}')" class="btn btn-warning">Close</a>
      <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
      </div>`;
  }
  
}
