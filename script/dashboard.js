let allIssues = [];
let openIssue = [];
let closeIssue = [];
const issueCont = document.getElementById('issueCont');
// For load issue
async function loadIssue() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const issues = await res.json();
    // console.log(data); 
    displayIssue(issues.data);
}

// For display issue by append in DOM
const displayIssue = (trees) => {
    issueCont.innerHTML = "";
    // console.log(trees);
    trees.forEach(tree => {
        // console.log(tree);
        const priority = tree.priority.toLowerCase();
        let btnColor = '';
        let topBorderColor = '';

        if (priority === 'high') {
            btnColor = 'btn-error';
        } else if (priority === 'medium') {
            btnColor = 'btn-warning';
        } else {
            btnColor = 'btn-soft';
        }

        // adding border color by status
        const status = tree.status.toLowerCase();
        if (status == 'open') {
            topBorderColor = 'border-t-green-600';
        }
        else {
            topBorderColor = 'border-t-purple-600';
        }
        // setting inner html
        const issueContainer = document.createElement('div');
        issueContainer.className = '';
        issueContainer.innerHTML = `
        <div class="p-4 border rounded-xl border-b-gray-200 h-full grid border-l-gray-200 border-r-gray-200 border-t-4 ${topBorderColor} shadow-sm">
                    <div class="mb-1 rounded-lg p-4">
                        <div class="flex justify-between items-center mb-4">
                            <img src="./assets/Open-Status.png" alt="openStatus">
                            <button id="btn-priority" class="btn btn-soft ${btnColor} rounded-full">${tree.priority.toUpperCase()}</button>
                        </div>
                        <div class="mb-3">
                            <h1 class="font-semibold text-xl text-[#1F2937] mb-2">${tree.title}</h1>
                            <p class="text-[#64748B]">${tree.description}</p>
                        </div>
                        <div class="flex gap-2 items-center mb-4">
                            <button class="btn btn-error text-lg btn-soft rounded-full">
                                <i class="fa-solid fa-bug"></i>
                                BUG
                            </button>
                            <button class="btn btn-warning text-lg btn-soft rounded-full">
                                <i class="fa-solid fa-life-ring"></i>
                                HELP WANTED
                            </button>
                        </div>
                    </div>
                    <hr/ class=" bg-gray-200 border-gray-200">
                    <div class="rounded-lg space-y-4 p-4">
                        <p class="text-[#64748B] text-sm">#1 by john_doe</p>
                        <p class="text-[#64748B] text-sm">1/15/2024</p>
                    </div>
                </div>
                `;
        issueCont.appendChild(issueContainer);

        // issue count
        const issuesCount = document.getElementById('issues_count');
        if (issuesCount) {
            issuesCount.innerText = trees.length;
        }
    });
}

loadIssue();


// filter Button


const allcards = () => {
    showSpinner(true)//lodding
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => cardsection(data.data))
}

const allIssueCards = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            issueCont;
        });
}

const openIssueCard = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then((data) => {
            const openIssues = data.data.filter(singleData => singleData.status === "open");
            console.log(openIssues);
            displayIssue(openIssues)
        })
}
const closeIssueCard = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then((data) => {
            const closedIssues = data.data.filter(singleData => singleData.status === "closed");
            console.log(closedIssues);
            displayIssue(closedIssues)
        })
}