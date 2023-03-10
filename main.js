document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
const getInputValue = id => document.getElementById(id).value;
const issuesList = document.getElementById('issuesList');
let issues = [];

function submitIssue(e) {
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';
  const time = new Date().toLocaleString();
  const issue = { id, description, severity, assignedTo, status, time };
  if (description === "" || assignedTo === ""){
    alert('please input something')
    return;
  }
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
  const issues = JSON.parse(localStorage.getItem('issues'));
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
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status, time} = issues[i];
    const timeString = new Date(time).toLocaleString();
  
    issuesList.innerHTML += `<div class="jumbotron border py-4">
      <h6>Issue ID: ${id} </h6>
      <p><span class="time">Submitted: ${timeString}</span></p>
      <p><span class="label rounded px-2 ${status === 'Closed' ? 'bg-success' : 'bg-warning'}"> ${status} </span></p>
      <h3> ${description} </h3>
      <p><span>Severity: </span> ${severity}</p>
      <p><span class="user"></span> ${assignedTo}</p>
      <a onclick="closeIssue('${id}')" class="btn btn-warning font-weight-bold">Close</a>
      <a onclick="deleteIssue('${id}')" class="btn btn-danger font-weight-bold">Delete</a>
      </div>`;
  }
  
}

