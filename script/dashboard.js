const createElement = (arr) => {
    return arr.map((el) => {
        const label = el.toLowerCase();
        let colorClass = '';
        let icon = '';
        if (label === 'bug') {
            icon = '<i class="fa-solid fa-bug"></i>'
            colorClass = 'btn-error';
        } else if (label === 'enhancement') {
            icon = '<i class="fa-solid fa-wand-magic-sparkles"></i>'
            colorClass = 'btn-success';
        } else if (label === 'help wanted') {
            icon = '<i class="fa-solid fa-life-ring"></i>'
            colorClass = 'btn-warning';
        } else {
            colorClass = 'btn-accent';
            icon = '<i class="fa-solid fa-thumbs-up"></i>';
        }

        return `<span class="px-3 py-1 rounded-full text-[12px] btn btn-soft font-bold uppercase ${colorClass}">${icon} ${el}</span>`;
    }).join(' ');
}

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
        // setting time right
        const createdAt = new Date(tree.createdAt).toLocaleDateString();
        const updatedAt = new Date(tree.updatedAt).toLocaleDateString();
        // setting inner html
        const issueContainer = document.createElement('div');
        issueContainer.className = '';
        issueContainer.innerHTML = `
        <div>
                <div  onclick="my_modal_5.showModal()" class="p-4 border rounded-xl border-b-gray-200 h-full grid border-l-gray-200 border-r-gray-200 border-t-4 ${topBorderColor} shadow-sm">
                    <div class="mb-1 rounded-lg p-4">
                        <div class="flex justify-between items-center mb-4">
                           <img src="${tree.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}">
                            <button id="btn-priority" class="btn btn-soft ${btnColor} rounded-full">${tree.priority.toUpperCase()}</button>
                        </div>
                        <div class="mb-3">
                            <h1 class="font-semibold text-xl text-[#1F2937] mb-2">${tree.title}</h1>
                            <p class="text-[#64748B]">${tree.description}</p>
                        </div>
                        <div id="issueLabel" class="flexmax-sm:flex-wrap gap-2 space-y-2 items-center mb-4">${createElement(tree.labels)}</div>
                    </div>
                    <hr/ class=" bg-gray-200 border-gray-200">
                    <div class="rounded-lg space-y-4 p-4">
                        <div class="flex justify-between">
                            <p class="text-[#64748B] text-sm">#${tree.id} ${tree.author}</p>
                            <p class="text-[#64748B] text-sm">${createdAt}</p>
                            </div>
                            <div class="flex justify-between">
                            <p class="text-[#64748B] text-sm">Assignee: ${tree.assignee}</p>
                            <p class="text-[#64748B] text-sm">Updated At: ${updatedAt}</p>
                        </div>
                    </div>
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

// toggleing button and ading color
const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closedBtn = document.getElementById('close-btn');
allBtn.classList.add('btn-primary');
const toggleButton = (id) => {
    console.log(id);
    if (id === 'all-btn') {
        allBtn.classList.add('btn-primary');
        openBtn.classList.remove('btn-primary');
        closedBtn.classList.remove('btn-primary');
    }
    else if (id === 'open-btn') {
        openBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        closedBtn.classList.remove('btn-primary');
    }
    else if (id === 'close-btn') {
        closedBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        openBtn.classList.remove('btn-primary');
    }

}

// filtering data
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
            const allIssues = data.data;
            displayIssue(allIssues);
        });
}

const openIssueCard = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then((data) => {
            const openIssues = data.data.filter(singleData => singleData.status === "open");
            // console.log(openIssues);
            displayIssue(openIssues);
        })
}
const closeIssueCard = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then((data) => {
            const closedIssues = data.data.filter(singleData => singleData.status === "closed");
            // console.log(closedIssues);
            displayIssue(closedIssues);
        })
}

// Adding Level

const issueLevel = [];


// Modals
const modals = document.createElement('div');

modals.innerHTML = `
     <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
    <h3 class="text-2xl text-[#1F2937] mb-4 font-bold">Fix broken image uploads</h3>
    <div class="flex space-x-4 items-center">
        <button class="btn btn-success px-2 rounded-full py-[6px] text-white">Opened</button>
        <i class="fa-solid fa-circle text-xs text-[#64748B]"></i>
        <p class="text-[#64748B]">Opened by Fahim Ahmed</p>
        <i class="fa-solid fa-circle text-xs text-[#64748B]"></i>
        <p class="text-[#64748B]">22/02/2026</p>
    </div>




    <!-- Modal Close Button -->
    <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </form>
    </div>
</div>
    </dialog>
`;

const modalContainer = document.getElementById('modals-container');

modalContainer.appendChild(modals);